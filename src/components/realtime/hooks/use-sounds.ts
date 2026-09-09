"use client";

import { useCallback, useEffect, useRef } from "react";

export const useSounds = () => {
  const audioContextRef = useRef<AudioContext | null>(null);

  const pressBufferRef = useRef<AudioBuffer | null>(null);
  const releaseBufferRef = useRef<AudioBuffer | null>(null);
  const confettiBufferRef = useRef<AudioBuffer | null>(null);

  /*
   * Create the AudioContext only when needed.
   * This avoids browser autoplay restrictions.
   */
  const getContext = useCallback(() => {
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as typeof window & {
          webkitAudioContext?: typeof AudioContext;
        }).webkitAudioContext;

      if (!AudioContextClass) {
        console.warn("Web Audio API is not supported.");
        return null;
      }

      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContextClass();
      }

      const ctx = audioContextRef.current;

      if (ctx.state === "suspended") {
        void ctx.resume();
      }

      return ctx;
    } catch (error) {
      console.error("Failed to create AudioContext:", error);
      return null;
    }
  }, []);

  /*
   * Load all audio files.
   */
  useEffect(() => {
    let cancelled = false;

    const loadSounds = async () => {
      try {
        const AudioContextClass =
          window.AudioContext ||
          (window as typeof window & {
            webkitAudioContext?: typeof AudioContext;
          }).webkitAudioContext;

        if (!AudioContextClass) {
          console.warn("Web Audio API is not supported.");
          return;
        }

        const ctx =
          audioContextRef.current ?? new AudioContextClass();

        audioContextRef.current = ctx;

        const loadBuffer = async (url: string) => {
          const response = await fetch(url);

          if (!response.ok) {
            throw new Error(
              `Failed to load ${url}: ${response.status}`
            );
          }

          const arrayBuffer = await response.arrayBuffer();

          return await ctx.decodeAudioData(arrayBuffer);
        };

        const [press, release, confetti] =
          await Promise.all([
            loadBuffer(
              "/assets/keycap-sounds/press.mp3"
            ),
            loadBuffer(
              "/assets/keycap-sounds/release.mp3"
            ),
            loadBuffer(
              "/assets/sounds/vine-boom.mp3"
            ),
          ]);

        if (cancelled) return;

        pressBufferRef.current = press;
        releaseBufferRef.current = release;
        confettiBufferRef.current = confetti;

        console.log(
          "🔊 Portfolio sounds loaded successfully"
        );
      } catch (error) {
        console.error(
          "❌ Failed to load portfolio sounds:",
          error
        );
      }
    };

    void loadSounds();

    return () => {
      cancelled = true;
    };
  }, []);

  /*
   * Play an AudioBuffer.
   *
   * IMPORTANT:
   * The source is connected directly to the destination
   * through a gain node and is started only after the
   * AudioContext has resumed.
   */
  const playSoundBuffer = useCallback(
    (
      buffer: AudioBuffer | null,
      volume = 0.7,
      detune = 0
    ) => {
      try {
        if (!buffer) {
          console.warn(
            "Sound buffer is not loaded yet."
          );
          return;
        }

        const ctx = getContext();

        if (!ctx) return;

        const source = ctx.createBufferSource();
        source.buffer = buffer;

        source.detune.value =
          detune + Math.random() * 100 - 50;

        const gainNode = ctx.createGain();

        gainNode.gain.setValueAtTime(
          volume,
          ctx.currentTime
        );

        source.connect(gainNode);
        gainNode.connect(ctx.destination);

        const startSound = () => {
          try {
            source.start(0);

            console.log(
              "🔊 Sound started successfully"
            );
          } catch (error) {
            console.error(
              "Failed to start sound:",
              error
            );
          }
        };

        if (ctx.state === "suspended") {
          void ctx.resume().then(startSound);
        } else {
          startSound();
        }
      } catch (error) {
        console.error(
          "Failed to play sound:",
          error
        );
      }
    },
    [getContext]
  );

  /*
   * Keyboard press sound.
   */
  const playPressSound = useCallback(() => {
    console.log("⌨️ playPressSound() called");

    playSoundBuffer(
      pressBufferRef.current,
      0.8
    );
  }, [playSoundBuffer]);

  /*
   * Keyboard release sound.
   */
  const playReleaseSound = useCallback(() => {
    console.log("⌨️ playReleaseSound() called");

    playSoundBuffer(
      releaseBufferRef.current,
      0.8
    );
  }, [playSoundBuffer]);

  /*
   * Simple generated tone.
   */
  const playTone = useCallback(
    (
      startFreq: number,
      endFreq: number,
      duration: number,
      volume: number
    ) => {
      try {
        const ctx = getContext();

        if (!ctx) return;

        const oscillator =
          ctx.createOscillator();

        const gainNode =
          ctx.createGain();

        const startTime =
          ctx.currentTime;

        oscillator.type = "sine";

        oscillator.frequency.setValueAtTime(
          startFreq,
          startTime
        );

        oscillator.frequency.exponentialRampToValueAtTime(
          endFreq,
          startTime + duration
        );

        gainNode.gain.setValueAtTime(
          0,
          startTime
        );

        gainNode.gain.linearRampToValueAtTime(
          volume,
          startTime + 0.01
        );

        gainNode.gain.exponentialRampToValueAtTime(
          0.001,
          startTime + duration
        );

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        const startTone = () => {
          oscillator.start(startTime);
          oscillator.stop(
            startTime + duration
          );
        };

        if (ctx.state === "suspended") {
          void ctx.resume().then(startTone);
        } else {
          startTone();
        }
      } catch (error) {
        console.error(
          "Failed to play tone:",
          error
        );
      }
    },
    [getContext]
  );

  const playSendSound = useCallback(() => {
    playTone(
      600,
      300,
      0.25,
      0.08
    );
  }, [playTone]);

  const playReceiveSound = useCallback(() => {
    playTone(
      800,
      400,
      0.35,
      0.1
    );
  }, [playTone]);

  /*
   * Confetti / boom sound.
   */
  const playConfettiSound = useCallback(
    (intensity = 0.5) => {
      try {
        const buffer =
          confettiBufferRef.current;

        if (!buffer) {
          console.warn(
            "Confetti sound is not loaded yet."
          );
          return;
        }

        const ctx = getContext();

        if (!ctx) return;

        const source =
          ctx.createBufferSource();

        source.buffer = buffer;

        source.playbackRate.value =
          1.2 - intensity * 0.4;

        source.detune.value =
          Math.random() * 100 - 50;

        const gainNode =
          ctx.createGain();

        gainNode.gain.setValueAtTime(
          0.15 + intensity * 0.5,
          ctx.currentTime
        );

        source.connect(gainNode);
        gainNode.connect(ctx.destination);

        const startSound = () => {
          source.start(0);

          console.log(
            "🎉 Confetti sound started"
          );
        };

        if (ctx.state === "suspended") {
          void ctx.resume().then(startSound);
        } else {
          startSound();
        }
      } catch (error) {
        console.error(
          "Failed to play confetti sound:",
          error
        );
      }
    },
    [getContext]
  );

  /*
   * Charge tone.
   */
  const chargeOscRef =
    useRef<OscillatorNode | null>(null);

  const chargeGainRef =
    useRef<GainNode | null>(null);

  const startChargeTone = useCallback(() => {
    try {
      const ctx = getContext();

      if (!ctx || chargeOscRef.current) {
        return;
      }

      const oscillator =
        ctx.createOscillator();

      const gainNode =
        ctx.createGain();

      oscillator.type = "sine";

      oscillator.frequency.value = 200;

      gainNode.gain.value = 0;

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.start();

      chargeOscRef.current =
        oscillator;

      chargeGainRef.current =
        gainNode;

      console.log(
        "🔊 Charge tone started"
      );
    } catch (error) {
      console.error(
        "Failed to start charge tone:",
        error
      );
    }
  }, [getContext]);

  const updateChargeTone =
    useCallback(
      (intensity: number) => {
        const oscillator =
          chargeOscRef.current;

        const gainNode =
          chargeGainRef.current;

        if (!oscillator || !gainNode) {
          return;
        }

        oscillator.frequency.value =
          200 + intensity * 600;

        gainNode.gain.value =
          intensity * 0.06;
      },
      []
    );

  const stopChargeTone =
    useCallback(() => {
      try {
        chargeOscRef.current?.stop();

        console.log(
          "🔇 Charge tone stopped"
        );
      } catch {
        // Already stopped.
      }

      chargeOscRef.current = null;
      chargeGainRef.current = null;
    }, []);

  /*
   * Clean up when the hook unmounts.
   */
  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        void audioContextRef.current.close();
        audioContextRef.current = null;
      }
    };
  }, []);

  return {
    playSendSound,
    playReceiveSound,
    playPressSound,
    playReleaseSound,
    playConfettiSound,
    startChargeTone,
    updateChargeTone,
    stopChargeTone,
  };
};
