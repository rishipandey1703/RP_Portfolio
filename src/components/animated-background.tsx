"use client";

import React, {
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Application,
  SplineEvent,
} from "@splinetool/runtime";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Spline = React.lazy(() => import("@splinetool/react-spline"));

import {
  Skill,
  SkillNames,
  SKILLS,
} from "@/data/constants";

import { sleep } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { usePreloader } from "./preloader";
import { useTheme } from "next-themes";
import {
  Section,
  getKeyboardState,
} from "./animated-background-config";
import { useSounds } from "./realtime/hooks/use-sounds";
import { usePerfProfile } from "@/hooks/use-perf-profile";

gsap.registerPlugin(ScrollTrigger);

const KeyboardScene = ({
  maxDpr,
}: {
  maxDpr: number;
}) => {
  const { isLoading, bypassLoading } = usePreloader();
  const { theme } = useTheme();
  const isMobile = useMediaQuery("(max-width: 767px)");

  const splineContainer =
    useRef<HTMLDivElement>(null);

  const [splineApp, setSplineApp] =
    useState<Application>();

  const selectedSkillRef =
    useRef<Skill | null>(null);

  const {
    playPressSound,
    playReleaseSound,
  } = useSounds();

  const [selectedSkill, setSelectedSkill] =
    useState<Skill | null>(null);

  const [activeSection, setActiveSection] =
    useState<Section>("hero");

  // Animation controllers
  const bongoAnimationRef =
    useRef<{
      start: () => void;
      stop: () => void;
    } | null>(null);

  const keycapAnimationsRef =
    useRef<{
      start: () => void;
      stop: () => void;
    } | null>(null);

  const [keyboardRevealed, setKeyboardRevealed] =
    useState(false);

  /*
   * Prevent duplicate sounds when both the browser keyboard
   * event and Spline's keyDown event fire for the same key.
   */
  const lastKeyboardSoundTimeRef =
    useRef(0);

  const playKeyboardPressSound = () => {
    const now = performance.now();

    if (now - lastKeyboardSoundTimeRef.current < 80) {
      return;
    }

    lastKeyboardSoundTimeRef.current = now;

    console.log("🔊 playPressSound() called");
    playPressSound();
  };

  const playKeyboardReleaseSound = () => {
    console.log("🔊 playReleaseSound() called");
    playReleaseSound();
  };

  // ---------------------------------------------------------
  // Spline mouse hover
  // ---------------------------------------------------------

  const handleMouseHover = (
    e: SplineEvent
  ) => {
    if (!splineApp) return;

    if (
      selectedSkillRef.current?.name ===
      e.target.name
    ) {
      return;
    }

    if (
      e.target.name === "body" ||
      e.target.name === "platform"
    ) {
      if (selectedSkillRef.current) {
        playKeyboardReleaseSound();
      }

      setSelectedSkill(null);
      selectedSkillRef.current = null;

      if (
        splineApp.getVariable("heading") &&
        splineApp.getVariable("desc")
      ) {
        splineApp.setVariable(
          "heading",
          ""
        );

        splineApp.setVariable(
          "desc",
          ""
        );
      }

      return;
    }

    const skill =
      SKILLS[
        e.target.name as SkillNames
      ];

    if (!skill) return;

    if (
      !selectedSkillRef.current ||
      selectedSkillRef.current.name !==
        e.target.name
    ) {
      if (selectedSkillRef.current) {
        playKeyboardReleaseSound();
      }

      playKeyboardPressSound();

      setSelectedSkill(skill);
      selectedSkillRef.current = skill;

      splineApp.setVariable(
        "heading",
        skill.label
      );

      splineApp.setVariable(
        "desc",
        skill.shortDescription
      );
    }
  };

  // ---------------------------------------------------------
  // Spline keyboard interactions
  // ---------------------------------------------------------

  const handleSplineInteractions = () => {
    if (!splineApp) return;

    const isInputFocused = () => {
      const activeElement =
        document.activeElement;

      return (
        activeElement &&
        (
          activeElement.tagName ===
            "INPUT" ||
          activeElement.tagName ===
            "TEXTAREA" ||
          (
            activeElement as HTMLElement
          ).isContentEditable
        )
      );
    };

    const handleKeyUp = () => {
      if (isInputFocused()) return;

      console.log(
        "🎹 Spline keyUp event"
      );

      playKeyboardReleaseSound();

      splineApp.setVariable(
        "heading",
        ""
      );

      splineApp.setVariable(
        "desc",
        ""
      );
    };

    const handleKeyDown = (
      e: SplineEvent
    ) => {
      if (isInputFocused()) return;

      console.log(
        "🎹 Spline keyDown event:",
        e.target?.name
      );

      const skill =
        SKILLS[
          e.target.name as SkillNames
        ];

      if (skill) {
        playKeyboardPressSound();

        setSelectedSkill(skill);
        selectedSkillRef.current = skill;

        splineApp.setVariable(
          "heading",
          skill.label
        );

        splineApp.setVariable(
          "desc",
          skill.shortDescription
        );
      } else {
        /*
         * Even if the Spline object doesn't map to one
         * of our SKILLS, still play the keyboard sound.
         */
        playKeyboardPressSound();
      }
    };

    splineApp.addEventListener(
      "keyUp",
      handleKeyUp
    );

    splineApp.addEventListener(
      "keyDown",
      handleKeyDown
    );

    splineApp.addEventListener(
      "mouseHover",
      handleMouseHover
    );

    /*
     * IMPORTANT:
     * Return cleanup functions so listeners don't stack
     * after Fast Refresh or Spline remounts.
     */
    return () => {
      splineApp.removeEventListener(
        "keyUp",
        handleKeyUp
      );

      splineApp.removeEventListener(
        "keyDown",
        handleKeyDown
      );

      splineApp.removeEventListener(
        "mouseHover",
        handleMouseHover
      );
    };
  };

  // ---------------------------------------------------------
  // Browser keyboard fallback
  // ---------------------------------------------------------

  useEffect(() => {
    const handleBrowserKeyDown = (
      event: KeyboardEvent
    ) => {
      const target =
        event.target as HTMLElement | null;

      if (
        target &&
        (
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable
        )
      ) {
        return;
      }

      /*
       * This is a fallback for browsers/Spline versions
       * where the Spline keyDown event isn't fired reliably.
       */
      if (
        event.repeat
      ) {
        return;
      }

      playKeyboardPressSound();
    };

    const handleBrowserKeyUp = (
      event: KeyboardEvent
    ) => {
      const target =
        event.target as HTMLElement | null;

      if (
        target &&
        (
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable
        )
      ) {
        return;
      }

      if (event.repeat) return;

      playKeyboardReleaseSound();
    };

    window.addEventListener(
      "keydown",
      handleBrowserKeyDown
    );

    window.addEventListener(
      "keyup",
      handleBrowserKeyUp
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleBrowserKeyDown
      );

      window.removeEventListener(
        "keyup",
        handleBrowserKeyUp
      );
    };
  }, []);

  // ---------------------------------------------------------
  // Animation setup
  // ---------------------------------------------------------

  const createSectionTimeline = (
    triggerId: string,
    targetSection: Section,
    prevSection: Section,
    start: string = "top 50%",
    end: string = "bottom bottom"
  ) => {
    if (!splineApp) return;

    const kbd =
      splineApp.findObjectByName(
        "keyboard"
      );

    if (!kbd) return;

    return gsap.timeline({
      scrollTrigger: {
        trigger: triggerId,
        start,
        end,
        scrub: true,

        onEnter: () => {
          setActiveSection(
            targetSection
          );

          const state =
            getKeyboardState({
              section: targetSection,
              isMobile,
            });

          gsap.to(kbd.scale, {
            ...state.scale,
            duration: 1,
          });

          gsap.to(kbd.position, {
            ...state.position,
            duration: 1,
          });

          gsap.to(kbd.rotation, {
            ...state.rotation,
            duration: 1,
          });
        },

        onLeaveBack: () => {
          setActiveSection(
            prevSection
          );

          const state =
            getKeyboardState({
              section: prevSection,
              isMobile,
            });

          gsap.to(kbd.scale, {
            ...state.scale,
            duration: 1,
          });

          gsap.to(kbd.position, {
            ...state.position,
            duration: 1,
          });

          gsap.to(kbd.rotation, {
            ...state.rotation,
            duration: 1,
          });
        },
      },
    });
  };

  const setupScrollAnimations =
    (): gsap.core.Timeline[] => {
      if (
        !splineApp ||
        !splineContainer.current
      ) {
        return [];
      }

      const kbd =
        splineApp.findObjectByName(
          "keyboard"
        );

      if (!kbd) return [];

      const heroState =
        getKeyboardState({
          section: "hero",
          isMobile,
        });

      gsap.set(
        kbd.scale,
        heroState.scale
      );

      gsap.set(
        kbd.position,
        heroState.position
      );

      return [
        createSectionTimeline(
          "#skills",
          "skills",
          "hero"
        ),

        createSectionTimeline(
          "#projects",
          "projects",
          "skills",
          "top 70%"
        ),

        createSectionTimeline(
          "#contact",
          "contact",
          "projects",
          "top 30%"
        ),
      ].filter(Boolean) as gsap.core.Timeline[];
    };

  // ---------------------------------------------------------
  // Bongo animation
  // ---------------------------------------------------------

  const getBongoAnimation = () => {
    const framesParent =
      splineApp?.findObjectByName(
        "bongo-cat"
      );

    const frame1 =
      splineApp?.findObjectByName(
        "frame-1"
      );

    const frame2 =
      splineApp?.findObjectByName(
        "frame-2"
      );

    if (
      !frame1 ||
      !frame2 ||
      !framesParent
    ) {
      return {
        start: () => {},
        stop: () => {},
      };
    }

    let interval:
      ReturnType<typeof setInterval>;

    const start = () => {
      let i = 0;

      framesParent.visible = true;

      interval = setInterval(() => {
        if (i % 2) {
          frame1.visible = false;
          frame2.visible = true;
        } else {
          frame1.visible = true;
          frame2.visible = false;
        }

        i++;
      }, 100);
    };

    const stop = () => {
      clearInterval(interval);

      framesParent.visible = false;
      frame1.visible = false;
      frame2.visible = false;
    };

    return {
      start,
      stop,
    };
  };

  // ---------------------------------------------------------
  // Keycap animation
  // ---------------------------------------------------------

  const getKeycapsAnimation = () => {
    if (!splineApp) {
      return {
        start: () => {},
        stop: () => {},
      };
    }

    let floatTweens:
      gsap.core.Tween[] = [];

    let settleTweens:
      gsap.core.Tween[] = [];

    const killFloat = () => {
      floatTweens.forEach(
        (tween) => tween.kill()
      );

      floatTweens = [];
    };

    const killSettle = () => {
      settleTweens.forEach(
        (tween) => tween.kill()
      );

      settleTweens = [];
    };

    const start = () => {
      killSettle();
      killFloat();

      Object.values(SKILLS)
        .sort(
          () => Math.random() - 0.5
        )
        .forEach(
          (skill, idx) => {
            const keycap =
              splineApp.findObjectByName(
                skill.name
              );

            if (!keycap) return;

            floatTweens.push(
              gsap.to(
                keycap.position,
                {
                  y:
                    Math.random() * 200 +
                    200,

                  duration:
                    Math.random() * 2 +
                    2,

                  delay:
                    idx * 0.6,

                  repeat: -1,
                  yoyo: true,

                  yoyoEase: "none",

                  ease:
                    "elastic.out(1,0.3)",
                }
              )
            );
          }
        );
    };

    const stop = () => {
      killFloat();
      killSettle();

      Object.values(SKILLS).forEach(
        (skill) => {
          const keycap =
            splineApp.findObjectByName(
              skill.name
            );

          if (!keycap) return;

          settleTweens.push(
            gsap.to(
              keycap.position,
              {
                y: 0,
                duration: 4,
                ease:
                  "elastic.out(1,0.7)",
              }
            )
          );
        }
      );
    };

    return {
      start,
      stop,
    };
  };

  // ---------------------------------------------------------
  // Keyboard reveal
  // ---------------------------------------------------------

  const updateKeyboardTransform =
    async () => {
      if (!splineApp) return;

      const kbd =
        splineApp.findObjectByName(
          "keyboard"
        );

      if (!kbd) {
        setKeyboardRevealed(true);
        return;
      }

      kbd.visible = false;

      await sleep(400);

      kbd.visible = true;

      setKeyboardRevealed(true);

      const currentState =
        getKeyboardState({
          section: activeSection,
          isMobile,
        });

      gsap.fromTo(
        kbd.scale,

        {
          x: 0.01,
          y: 0.01,
          z: 0.01,
        },

        {
          ...currentState.scale,
          duration: 1.5,
          ease:
            "elastic.out(1, 0.6)",
        }
      );

      const allObjects =
        splineApp.getAllObjects();

      const keycaps =
        allObjects.filter(
          (obj) =>
            obj.name === "keycap"
        );

      await sleep(900);

      if (isMobile) {
        const mobileKeyCaps =
          allObjects.filter(
            (keycap) =>
              keycap.name ===
              "keycap-mobile"
          );

        mobileKeyCaps.forEach(
          (keycap) => {
            keycap.visible = true;
          }
        );
      } else {
        const desktopKeyCaps =
          allObjects.filter(
            (keycap) =>
              keycap.name ===
              "keycap-desktop"
          );

        desktopKeyCaps.forEach(
          async (
            keycap,
            idx
          ) => {
            await sleep(idx * 70);
            keycap.visible = true;
          }
        );
      }

      keycaps.forEach(
        async (
          keycap,
          idx
        ) => {
          keycap.visible = false;

          await sleep(idx * 70);

          keycap.visible = true;

          gsap.fromTo(
            keycap.position,

            {
              y: 200,
            },

            {
              y: 50,
              duration: 0.5,
              delay: 0.1,
              ease: "bounce.out",
            }
          );
        }
      );
    };

  // ---------------------------------------------------------
  // Initialize Spline + animations
  // ---------------------------------------------------------

  useEffect(() => {
    if (!splineApp) return;

    const cleanupInteractions =
      handleSplineInteractions();

    const timelines =
      setupScrollAnimations();

    bongoAnimationRef.current =
      getBongoAnimation();

    keycapAnimationsRef.current =
      getKeycapsAnimation();

    return () => {
      cleanupInteractions?.();

      bongoAnimationRef.current?.stop();

      keycapAnimationsRef.current?.stop();

      timelines.forEach(
        (timeline) => {
          timeline.scrollTrigger?.kill();
          timeline.kill();
        }
      );
    };
  }, [
    splineApp,
    isMobile,
  ]);

  // ---------------------------------------------------------
  // Theme / section text
  // ---------------------------------------------------------

  useEffect(() => {
    if (!splineApp) return;

    const textDesktopDark =
      splineApp.findObjectByName(
        "text-desktop-dark"
      );

    const textDesktopLight =
      splineApp.findObjectByName(
        "text-desktop"
      );

    const textMobileDark =
      splineApp.findObjectByName(
        "text-mobile-dark"
      );

    const textMobileLight =
      splineApp.findObjectByName(
        "text-mobile"
      );

    if (
      !textDesktopDark ||
      !textDesktopLight ||
      !textMobileDark ||
      !textMobileLight
    ) {
      return;
    }

    const setVisibility = (
      dDark: boolean,
      dLight: boolean,
      mDark: boolean,
      mLight: boolean
    ) => {
      textDesktopDark.visible =
        dDark;

      textDesktopLight.visible =
        dLight;

      textMobileDark.visible =
        mDark;

      textMobileLight.visible =
        mLight;
    };

    if (
      activeSection !== "skills"
    ) {
      setVisibility(
        false,
        false,
        false,
        false
      );
    } else if (
      theme === "dark"
    ) {
      if (isMobile) {
        setVisibility(
          false,
          false,
          false,
          true
        );
      } else {
        setVisibility(
          false,
          true,
          false,
          false
        );
      }
    } else {
      if (isMobile) {
        setVisibility(
          false,
          false,
          true,
          false
        );
      } else {
        setVisibility(
          true,
          false,
          false,
          false
        );
      }
    }
  }, [
    theme,
    splineApp,
    isMobile,
    activeSection,
  ]);

  // ---------------------------------------------------------
  // Selected skill
  // ---------------------------------------------------------

  useEffect(() => {
    if (
      !selectedSkill ||
      !splineApp
    ) {
      return;
    }

    splineApp.setVariable(
      "heading",
      selectedSkill.label
    );

    splineApp.setVariable(
      "desc",
      selectedSkill.shortDescription
    );
  }, [
    selectedSkill,
    splineApp,
  ]);

  // ---------------------------------------------------------
  // Rotation / section animations
  // ---------------------------------------------------------

  useEffect(() => {
    if (!splineApp) return;

    let cancelled = false;

    let rotateKeyboard:
      gsap.core.Tween | undefined;

    let teardownKeyboard:
      gsap.core.Tween | undefined;

    const kbd =
      splineApp.findObjectByName(
        "keyboard"
      );

    if (!kbd) return;

    if (!rotateKeyboard) {
      rotateKeyboard = gsap.to(
        kbd.rotation,
        {
          y: "+=6.28319",
          duration: 10,
          repeat: -1,
          ease: "linear",
        }
      );
    }

    if (!teardownKeyboard) {
      teardownKeyboard =
        gsap.fromTo(
          kbd.rotation,

          {
            y: 0,
            x: -Math.PI,
            z: 0,
          },

          {
            y: -Math.PI / 2,
            duration: 5,
            repeat: -1,
            yoyo: true,
            yoyoEase: true,
            delay: 2.5,
            immediateRender: false,
            paused: true,
          }
        );
    }

    const manageAnimations =
      async () => {
        if (
          activeSection !== "skills"
        ) {
          splineApp.setVariable(
            "heading",
            ""
          );

          splineApp.setVariable(
            "desc",
            ""
          );
        }

        if (
          activeSection === "hero"
        ) {
          rotateKeyboard?.restart();
          teardownKeyboard?.pause();
        } else if (
          activeSection === "contact"
        ) {
          rotateKeyboard?.pause();
        } else {
          rotateKeyboard?.pause();
          teardownKeyboard?.pause();
        }

        if (
          activeSection === "projects"
        ) {
          await sleep(300);

          if (cancelled) return;

          bongoAnimationRef.current?.start();
        } else {
          await sleep(200);

          if (cancelled) return;

          bongoAnimationRef.current?.stop();
        }

        if (
          activeSection === "contact"
        ) {
          await sleep(600);

          if (cancelled) return;

          teardownKeyboard?.restart();

          keycapAnimationsRef.current?.start();
        } else {
          await sleep(600);

          if (cancelled) return;

          teardownKeyboard?.pause();

          keycapAnimationsRef.current?.stop();
        }
      };

    manageAnimations();

    return () => {
      cancelled = true;

      rotateKeyboard?.kill();
      teardownKeyboard?.kill();
    };
  }, [
    activeSection,
    splineApp,
  ]);

  // ---------------------------------------------------------
  // URL hash + keyboard reveal
  // ---------------------------------------------------------

  useEffect(() => {
    const hash =
      activeSection === "hero"
        ? ""
        : `#${activeSection}`;

    const url =
      window.location.pathname +
      window.location.search +
      hash;

    window.history.replaceState(
      window.history.state,
      "",
      url
    );

    if (
      !splineApp ||
      isLoading ||
      keyboardRevealed
    ) {
      return;
    }

    updateKeyboardTransform();
  }, [
    splineApp,
    isLoading,
    activeSection,
  ]);

  // ---------------------------------------------------------
  // Pixel ratio
  // ---------------------------------------------------------

  useEffect(() => {
    if (!splineApp) return;

    return capSplinePixelRatio(
      splineApp,
      maxDpr
    );
  }, [
    splineApp,
    maxDpr,
  ]);

  // ---------------------------------------------------------
  // Pause Spline when browser tab is hidden
  // ---------------------------------------------------------

  useEffect(() => {
    if (!splineApp) return;

    const onVisibility = () => {
      if (document.hidden) {
        splineApp.stop();
      } else {
        splineApp.play();
      }
    };

    document.addEventListener(
      "visibilitychange",
      onVisibility
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        onVisibility
      );
    };
  }, [splineApp]);

  // ---------------------------------------------------------
  // Render
  // ---------------------------------------------------------

  return (
    <Suspense
      fallback={
        <div>Loading...</div>
      }
    >
      <Spline
        className="w-full h-full fixed"
        ref={splineContainer}
        onLoad={(
          app: Application
        ) => {
          console.log(
            "🎨 Spline scene loaded"
          );

          setSplineApp(app);
          bypassLoading();
        }}
        scene="https://prod.spline.design/TJ-inkdM01Li8BZr/scene.splinecode"
      />
    </Suspense>
  );
};

/**
 * Gate the heavy WebGL scene behind
 * device/preference detection.
 */
const AnimatedBackground = () => {
  const {
    disable3D,
    maxDpr,
    ready,
  } = usePerfProfile();

  if (
    !ready ||
    disable3D
  ) {
    return null;
  }

  return (
    <KeyboardScene
      maxDpr={maxDpr}
    />
  );
};

/**
 * Cap the Spline/Three.js renderer's
 * pixel ratio.
 */
function capSplinePixelRatio(
  app: Application,
  maxDpr: number
) {
  const apply = () => {
    try {
      const renderer = (
        app as unknown as {
          _renderer?: {
            setPixelRatio?: (
              n: number
            ) => void;
          };
        }
      )._renderer;

      if (
        renderer?.setPixelRatio
      ) {
        renderer.setPixelRatio(
          Math.min(
            window.devicePixelRatio,
            maxDpr
          )
        );
      }
    } catch {
      // Internal API moved.
      // Scene continues rendering normally.
    }
  };

  apply();

  window.addEventListener(
    "resize",
    apply,
    {
      passive: true,
    }
  );

  return () =>
    window.removeEventListener(
      "resize",
      apply
    );
}

export default AnimatedBackground;
