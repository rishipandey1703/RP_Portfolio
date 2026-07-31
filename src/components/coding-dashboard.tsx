"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, Code, Trophy, Star, Code2, GitMerge } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { cn } from "@/lib/utils";

export function CodingDashboard() {
  const [activeTab, setActiveTab] = useState<"github" | "leetcode">("github");
  const [githubData, setGithubData] = useState<any>(null);
  const [leetcodeData, setLeetcodeData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [ghRes, lcRes] = await Promise.all([
          fetch("/api/github"),
          fetch("/api/leetcode")
        ]);
        
        const gh = await ghRes.json();
        const lc = await lcRes.json();
        
        setGithubData(gh);
        setLeetcodeData(lc.error ? lc.fallback : lc);
      } catch (error) {
        console.error("Failed to fetch dashboard data");
      }
      setLoading(false);
    };
    
    fetchData();
  }, []);

  return (
    <section id="coding" className="relative w-full py-24 px-6 lg:px-12 max-w-7xl mx-auto flex flex-col gap-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight flex items-center gap-4">
          <Activity className="w-8 h-8 sm:w-12 sm:h-12 text-green-400" />
          Live Coding Dashboard
        </h2>
        <div className="w-20 h-1 bg-white/20 rounded-full mb-8"></div>
        <p className="text-neutral-400 max-w-2xl text-lg mb-8">
          Real-time statistics fetched directly from my developer profiles.
        </p>

        {/* Custom Tabs */}
        <div className="flex items-center gap-4 border-b border-white/10 pb-4">
          <button 
            onClick={() => setActiveTab("github")}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl transition-all font-medium text-sm sm:text-base",
              activeTab === "github" ? "bg-white text-black" : "text-neutral-400 hover:text-white hover:bg-white/5"
            )}
          >
            <FaGithub className="w-4 h-4" /> GitHub
          </button>
          <button 
            onClick={() => setActiveTab("leetcode")}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl transition-all font-medium text-sm sm:text-base",
              activeTab === "leetcode" ? "bg-white text-black" : "text-neutral-400 hover:text-white hover:bg-white/5"
            )}
          >
            <Code className="w-4 h-4" /> LeetCode
          </button>
        </div>
      </motion.div>

      {/* Content Area */}
      <div className="w-full min-h-[400px]">
        {loading ? (
          <div className="w-full h-[400px] flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border-4 border-white/10 border-t-white animate-spin" />
          </div>
        ) : (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            {activeTab === "github" && githubData && (
              <div className="flex flex-col gap-8">
                {/* GitHub Stats Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex flex-col gap-2">
                    <span className="text-neutral-400 text-sm font-medium">Public Repos</span>
                    <span className="text-3xl font-bold text-white">{githubData.public_repos}</span>
                  </div>
                  <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex flex-col gap-2">
                    <span className="text-neutral-400 text-sm font-medium">Followers</span>
                    <span className="text-3xl font-bold text-white">{githubData.followers}</span>
                  </div>
                  <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex flex-col gap-2">
                    <span className="text-neutral-400 text-sm font-medium">Total Stars</span>
                    <span className="text-3xl font-bold text-yellow-400">
                      {githubData.repos?.reduce((acc: number, r: any) => acc + r.stars, 0) || 0}
                    </span>
                  </div>
                  <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex flex-col gap-2">
                    <span className="text-neutral-400 text-sm font-medium">Profile Views</span>
                    <span className="text-3xl font-bold text-white text-opacity-50 line-through">Hidden</span>
                  </div>
                </div>

                {/* Recent Repositories */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">Recent Repositories</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {githubData.repos?.map((repo: any) => (
                      <a 
                        key={repo.name} 
                        href={repo.url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-colors flex flex-col gap-3 h-[180px]"
                      >
                        <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                          <FaGithub className="w-5 h-5 text-neutral-400" />
                          {repo.name}
                        </h4>
                        <p className="text-sm text-neutral-400 line-clamp-2 flex-1">
                          {repo.description || "No description provided."}
                        </p>
                        <div className="flex items-center gap-4 text-xs font-medium text-neutral-500">
                          {repo.language && (
                            <span className="flex items-center gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                              {repo.language}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5" /> {repo.stars}
                          </span>
                          <span className="flex items-center gap-1">
                            <GitMerge className="w-3.5 h-3.5" /> {repo.forks}
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "leetcode" && leetcodeData && (
              <div className="flex flex-col gap-8">
                {/* LeetCode Header Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Rating Card */}
                  <div className="p-8 rounded-3xl bg-gradient-to-br from-[#ffa116]/20 to-transparent border border-[#ffa116]/30 flex flex-col items-center justify-center gap-4 relative overflow-hidden">
                    <Trophy className="w-12 h-12 text-[#ffa116]" />
                    <div className="text-center">
                      <span className="text-[#ffa116] font-semibold text-sm block mb-1">Max Rating</span>
                      <span className="text-5xl font-bold text-white">{leetcodeData.rating}</span>
                    </div>
                  </div>
                  
                  {/* Total Solved Card */}
                  <div className="p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-2">
                    <span className="text-neutral-400 font-medium">Problems Solved</span>
                    <span className="text-6xl font-bold text-white">{leetcodeData.totalSolved}</span>
                    <span className="text-neutral-500 text-sm mt-2">Global Rank: {leetcodeData.ranking?.toLocaleString() || "N/A"}</span>
                  </div>

                  {/* Difficulty Distribution */}
                  <div className="p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col justify-center gap-4">
                    <h4 className="text-neutral-400 font-medium mb-2">Difficulty</h4>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-[#00b8a3]">Easy</span>
                        <span className="text-sm font-bold text-white">{leetcodeData.easySolved}</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-[#00b8a3]/20">
                        <div className="h-full rounded-full bg-[#00b8a3]" style={{ width: `${(leetcodeData.easySolved / leetcodeData.totalSolved) * 100}%` }} />
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm font-medium text-[#ffc01e]">Medium</span>
                        <span className="text-sm font-bold text-white">{leetcodeData.mediumSolved}</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-[#ffc01e]/20">
                        <div className="h-full rounded-full bg-[#ffc01e]" style={{ width: `${(leetcodeData.mediumSolved / leetcodeData.totalSolved) * 100}%` }} />
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm font-medium text-[#ff375f]">Hard</span>
                        <span className="text-sm font-bold text-white">{leetcodeData.hardSolved}</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-[#ff375f]/20">
                        <div className="h-full rounded-full bg-[#ff375f]" style={{ width: `${(leetcodeData.hardSolved / leetcodeData.totalSolved) * 100}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
