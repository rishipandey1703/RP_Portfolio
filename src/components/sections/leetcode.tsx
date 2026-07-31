"use client";

import React, { useEffect, useState } from "react";
import SectionWrapper from "../ui/section-wrapper";
import { ActivityCalendar } from "react-activity-calendar";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import Link from "next/link";

interface LeetCodeData {
  ranking: number;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  rating: number;
  submissionCalendar: string;
}

export const LeetCodeSection = () => {
  const [data, setData] = useState<LeetCodeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/leetcode");
        const json = await res.json();
        
        if (res.ok) {
          setData(json);
        } else if (json.fallback) {
          setData(json.fallback);
        }
      } catch (error) {
        console.error("Failed to fetch LeetCode data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const parseCalendar = (calendarStr: string) => {
    try {
      const cal = JSON.parse(calendarStr);
      const days = Object.keys(cal).map(timestamp => {
        const date = new Date(parseInt(timestamp) * 1000);
        const count = cal[timestamp];
        
        let level = 0;
        if (count > 0) level = 1;
        if (count > 2) level = 2;
        if (count > 4) level = 3;
        if (count > 6) level = 4;
        
        return {
          date: format(date, "yyyy-MM-dd"),
          count,
          level
        };
      });
      
      days.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      return days;
    } catch (e) {
      return [];
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 80;
    const rotateY = (centerX - x) / 80;
    
    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg)`;
  };

  const calendarData = data ? parseCalendar(data.submissionCalendar) : [];
  const totalActiveDays = calendarData.filter(d => d.count > 0).length;

  return (
    <SectionWrapper id="leetcode" className="min-h-screen w-full flex items-center justify-center pt-20">
      
      <style dangerouslySetInnerHTML={{__html: `
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 20;
        }
        .activity-cell {
            width: 8px;
            height: 8px;
            border-radius: 1px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .activity-cell:hover {
            transform: scale(1.5);
            filter: brightness(1.5);
            box-shadow: 0 0 10px currentColor;
            z-index: 10;
        }
        .glass-panel {
            background: rgba(15, 20, 24, 0.7);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.05);
        }
        .scan-line {
            width: 100%;
            height: 100%;
            background: linear-gradient(to right, transparent, rgba(137, 206, 255, 0.05), transparent);
            position: absolute;
            top: 0;
            left: -100%;
            animation: scan 4s infinite linear;
            pointer-events: none;
        }
        @keyframes scan {
            0% { left: -100%; }
            100% { left: 100%; }
        }
        .glow-border {
            position: relative;
        }
        .glow-border::after {
            content: '';
            position: absolute;
            inset: -1px;
            background: linear-gradient(45deg, transparent, rgba(137, 206, 255, 0.2), transparent);
            border-radius: inherit;
            z-index: -1;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        .glow-border:hover::after {
            opacity: 1;
        }
        .corner-bracket {
            position: absolute;
            width: 8px;
            height: 8px;
            border-color: rgba(137, 206, 255, 0.3);
        }
        .top-left { top: 12px; left: 12px; border-top: 1px solid; border-left: 1px solid; }
        .top-right { top: 12px; right: 12px; border-top: 1px solid; border-right: 1px solid; }
        .bottom-left { bottom: 12px; left: 12px; border-bottom: 1px solid; border-left: 1px solid; }
        .bottom-right { bottom: 12px; right: 12px; border-bottom: 1px solid; border-right: 1px solid; }
      `}} />

      <div className="w-full max-w-5xl mx-auto relative px-4 z-[9999] mb-32">
        {/* Atmospheric Depth Elements */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#89ceff]/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#45dfa4]/5 blur-[120px] rounded-full pointer-events-none"></div>
        
        {/* Main Luxe Card */}
        <div 
          className="glass-panel rounded-[2rem] p-6 sm:p-10 relative overflow-hidden group transition-transform duration-100 ease-out" 
          style={{ transform: 'perspective(1200px) rotateX(0deg) rotateY(0deg)' }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="scan-line"></div>
          
          {loading ? (
            <div className="flex flex-col items-center justify-center h-96">
              <Loader2 className="w-8 h-8 text-[#89ceff] animate-spin mb-4" />
              <p className="text-[#bec8d2]">Syncing with LeetCode nodes...</p>
            </div>
          ) : data ? (
            <>
              {/* Header Section */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 relative z-10">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] text-[#89ceff]/60 tracking-[0.3em] uppercase" style={{fontFamily: 'Geist, sans-serif'}}>Ram krishna Tripathi</span>
                    <div className="h-[1px] w-8 bg-[#89ceff]/20"></div>
                  </div>
                  <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-[#dee3e9]" style={{fontFamily: 'Inter, sans-serif'}}>
                    Engineering <span className="font-bold text-[#89ceff]">Intelligence</span>
                  </h1>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden md:block">
                    <p className="text-[10px] text-[#bec8d2]/40 tracking-widest uppercase" style={{fontFamily: 'Geist, sans-serif'}}>Connectivity</p>
                    <p className="text-xs font-semibold text-[#45dfa4]">SECURE_ACTIVE</p>
                  </div>
                  <div className="px-4 py-3 glass-panel rounded-2xl border-white/5 flex items-center gap-3">
                    <div className="relative">
                      <div className="w-2 h-2 bg-[#45dfa4] rounded-full"></div>
                      <div className="absolute inset-0 w-2 h-2 bg-[#45dfa4] rounded-full animate-ping opacity-75"></div>
                    </div>
                    <span className="text-[11px] text-[#dee3e9] tracking-widest uppercase" style={{fontFamily: 'Geist, sans-serif'}}>Live Node</span>
                  </div>
                </div>
              </div>

              {/* Submission Activity: The Hero */}
              <div className="mb-12 relative z-10">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                  <div className="flex items-center gap-3">
                    {/* fallback for grid_view icon */}
                    <div className="w-4 h-4 grid grid-cols-2 gap-[2px]">
                      <div className="bg-[#89ceff] rounded-[2px]"></div>
                      <div className="bg-[#89ceff] rounded-[2px]"></div>
                      <div className="bg-[#89ceff] rounded-[2px]"></div>
                      <div className="bg-[#89ceff] rounded-[2px]"></div>
                    </div>
                    <h2 className="font-bold text-xs tracking-[0.2em] text-[#bec8d2] uppercase" style={{fontFamily: 'Geist, sans-serif'}}>Temporal Activity Matrix</h2>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-[#bec8d2]/60" style={{fontFamily: 'Geist, sans-serif'}}>
                      <span>L0</span>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-[1px] bg-white/5"></div>
                        <div className="w-2 h-2 rounded-[1px] bg-[#45dfa4]/30"></div>
                        <div className="w-2 h-2 rounded-[1px] bg-[#45dfa4]/60"></div>
                        <div className="w-2 h-2 rounded-[1px] bg-[#45dfa4]"></div>
                      </div>
                      <span>L4</span>
                    </div>
                    <span className="text-[10px] font-bold text-[#bec8d2] uppercase tracking-widest hidden sm:block" style={{fontFamily: 'Geist, sans-serif'}}>Cycle: 365D</span>
                  </div>
                </div>
                
                <div className="glass-panel border-white/5 rounded-2xl p-6 overflow-hidden">
                  <div className="overflow-x-auto pb-2 scrollbar-hide">
                    <div className="min-w-[700px] flex justify-center">
                      <ActivityCalendar 
                        data={calendarData}
                        theme={{
                          light: ['rgba(255,255,255,0.03)', '#45dfa4'],
                          dark: ['rgba(255,255,255,0.03)', 'rgba(69,223,164,0.15)', 'rgba(69,223,164,0.4)', 'rgba(69,223,164,0.7)', '#45dfa4']
                        }}
                        colorScheme="dark"
                        labels={{
                          totalCount: "{{count}} submissions in the last year",
                        }}
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center px-2">
                    <div className="flex gap-8">
                      <div>
                        <p className="text-[10px] text-[#bec8d2]/50 uppercase tracking-tighter" style={{fontFamily: 'Geist, sans-serif'}}>Current Streak</p>
                        <p className="text-xl font-light text-[#45dfa4]">14<span className="text-[10px] ml-1 opacity-60">DAYS</span></p>
                      </div>
                      <div>
                        <p className="text-[10px] text-[#bec8d2]/50 uppercase tracking-tighter" style={{fontFamily: 'Geist, sans-serif'}}>Total Active Days</p>
                        <p className="text-xl font-light text-[#dee3e9]">{totalActiveDays}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-[#bec8d2]/50 uppercase" style={{fontFamily: 'Geist, sans-serif'}}>Analysis</p>
                      <p className="text-xs text-[#89ceff] font-medium tracking-wide">Highly Consistent</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Stats & Difficulty Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
                {/* Left: Primary Aggregates */}
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Total Solved */}
                  <div className="glass-panel border-white/5 p-6 rounded-3xl glow-border group/stat">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[10px] text-[#bec8d2]/60 tracking-[0.2em] uppercase" style={{fontFamily: 'Geist, sans-serif'}}>Total Problems</span>
                      <div className="w-4 h-4 bg-[#89ceff]/40 group-hover/stat:bg-[#89ceff] transition-colors rounded-sm" style={{maskImage: 'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22currentColor%22%3E%3Cpath d=%22M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10zm-2-1h-6v-2h6v2zM6 15l-2-2 2-2 1.4 1.4-1.2 1.2h4.6v2H6.2l1.2 1.2L6 15z%22/%3E%3C/svg%3E")', WebkitMaskImage: 'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22currentColor%22%3E%3Cpath d=%22M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10zm-2-1h-6v-2h6v2zM6 15l-2-2 2-2 1.4 1.4-1.2 1.2h4.6v2H6.2l1.2 1.2L6 15z%22/%3E%3C/svg%3E")', WebkitMaskSize: 'contain', WebkitMaskRepeat: 'no-repeat'}}></div>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-thin tracking-tighter text-[#dee3e9]">{data.totalSolved}</span>
                      <span className="text-[#bec8d2]/40 text-sm">/ 3,100</span>
                    </div>
                    <div className="mt-6 h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-[#89ceff] shadow-[0_0_12px_rgba(137,206,255,0.5)]" style={{width: `${Math.min(100, (data.totalSolved / 3100) * 100)}%`}}></div>
                    </div>
                  </div>
                  
                  {/* World Rank */}
                  <div className="glass-panel border-white/5 p-6 rounded-3xl glow-border group/stat">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[10px] text-[#bec8d2]/60 tracking-[0.2em] uppercase" style={{fontFamily: 'Geist, sans-serif'}}>Global Ranking</span>
                      <div className="w-4 h-4 bg-[#ffb86e]/40 group-hover/stat:bg-[#ffb86e] transition-colors rounded-sm" style={{maskImage: 'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22currentColor%22%3E%3Cpath d=%22M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z%22/%3E%3C/svg%3E")', WebkitMaskImage: 'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22currentColor%22%3E%3Cpath d=%22M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z%22/%3E%3C/svg%3E")', WebkitMaskSize: 'contain', WebkitMaskRepeat: 'no-repeat'}}></div>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xs text-[#bec8d2]/60 uppercase">Rank</span>
                      <span className="text-4xl sm:text-5xl font-thin tracking-tighter text-[#dee3e9]">{data.ranking.toLocaleString()}</span>
                    </div>
                    <p className="mt-4 text-[10px] text-[#ffb86e]/80 uppercase tracking-widest" style={{fontFamily: 'Geist, sans-serif'}}>Competitive Ladder</p>
                  </div>
                  
                  {/* Contest Rating */}
                  <div className="sm:col-span-2 glass-panel border-white/5 p-6 rounded-3xl glow-border flex items-center justify-between group/stat">
                    <div>
                      <span className="text-[10px] text-[#bec8d2]/60 tracking-[0.2em] uppercase block mb-2" style={{fontFamily: 'Geist, sans-serif'}}>Competitive Rating</span>
                      <div className="flex items-center gap-4">
                        <span className="text-5xl font-thin tracking-tighter text-[#dee3e9]">{data.rating.toLocaleString()}</span>
                        <div className="px-3 py-1 bg-[#45dfa4]/10 border border-[#45dfa4]/20 rounded-lg">
                          <span className="text-[11px] font-bold text-[#45dfa4] tracking-[0.2em] uppercase">{data.rating >= 2150 ? 'Guardian' : data.rating >= 1600 ? 'Knight' : 'Active'}</span>
                        </div>
                      </div>
                    </div>
                    <div className="hidden sm:block">
                      <div className="w-10 h-10 bg-[#45dfa4]/20 group-hover/stat:bg-[#45dfa4]/60 transition-all duration-700" style={{maskImage: 'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22currentColor%22%3E%3Cpath d=%22M12 1L3 5v6c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.18l7 3.12v4.7c0 4.67-3.13 8.89-7 10.08-3.87-1.19-7-5.41-7-10.08V6.3l7-3.12zM12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z%22/%3E%3C/svg%3E")', WebkitMaskImage: 'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22currentColor%22%3E%3Cpath d=%22M12 1L3 5v6c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.18l7 3.12v4.7c0 4.67-3.13 8.89-7 10.08-3.87-1.19-7-5.41-7-10.08V6.3l7-3.12zM12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z%22/%3E%3C/svg%3E")', WebkitMaskSize: 'contain', WebkitMaskRepeat: 'no-repeat'}}></div>
                    </div>
                  </div>
                </div>
                
                {/* Right: Difficulty Breakdown */}
                <div className="glass-panel border-white/5 p-6 rounded-3xl flex flex-col justify-between gap-8 relative overflow-hidden">
                  <div className="corner-bracket top-left"></div>
                  <div className="corner-bracket top-right"></div>
                  <div className="corner-bracket bottom-left"></div>
                  <div className="corner-bracket bottom-right"></div>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-[#bec8d2]/60 tracking-[0.2em] uppercase" style={{fontFamily: 'Geist, sans-serif'}}>Complexity Matrix</span>
                      <span className="text-[9px] text-[#bec8d2]/30 uppercase" style={{fontFamily: 'Geist, sans-serif'}}>Dist_v4.2</span>
                    </div>
                    {/* Easy */}
                    <div className="group/diff">
                      <div className="flex justify-between items-end mb-2">
                        <span className="text-[10px] text-[#45dfa4]/80 tracking-widest uppercase" style={{fontFamily: 'Geist, sans-serif'}}>Easy</span>
                        <span className="text-lg font-light text-[#dee3e9]">{data.easySolved}</span>
                      </div>
                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-[#45dfa4] group-hover/diff:shadow-[0_0_10px_#45dfa4] transition-all" style={{width: `${Math.min(100, (data.easySolved / 800) * 100)}%`}}></div>
                      </div>
                    </div>
                    {/* Medium */}
                    <div className="group/diff">
                      <div className="flex justify-between items-end mb-2">
                        <span className="text-[10px] text-[#ffb86e]/80 tracking-widest uppercase" style={{fontFamily: 'Geist, sans-serif'}}>Medium</span>
                        <span className="text-lg font-light text-[#dee3e9]">{data.mediumSolved}</span>
                      </div>
                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-[#ffb86e] group-hover/diff:shadow-[0_0_10px_#ffb86e] transition-all" style={{width: `${Math.min(100, (data.mediumSolved / 1700) * 100)}%`}}></div>
                      </div>
                    </div>
                    {/* Hard */}
                    <div className="group/diff">
                      <div className="flex justify-between items-end mb-2">
                        <span className="text-[10px] text-[#ffb4ab]/80 tracking-widest uppercase" style={{fontFamily: 'Geist, sans-serif'}}>Hard</span>
                        <span className="text-lg font-light text-[#dee3e9]">{data.hardSolved}</span>
                      </div>
                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-[#ffb4ab] group-hover/diff:shadow-[0_0_10px_#ffb4ab] transition-all" style={{width: `${Math.min(100, (data.hardSolved / 800) * 100)}%`}}></div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-white/5">
                    <p className="text-[10px] text-[#bec8d2]/40 leading-relaxed italic uppercase" style={{fontFamily: 'Geist, sans-serif'}}>
                      "Persistence is the path to excellence."
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Footer Actions */}
              <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
                <div className="flex items-center gap-6">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-[#bec8d2]/40 uppercase" style={{fontFamily: 'Geist, sans-serif'}}>User Identification</span>
                    <span className="text-[11px] font-medium text-[#bec8d2]/70 tracking-widest uppercase" style={{fontFamily: 'Geist, sans-serif'}}>JARVIS45</span>
                  </div>
                  <div className="h-6 w-[1px] bg-white/5"></div>
                  <div className="flex flex-col">
                    <span className="text-[9px] text-[#bec8d2]/40 uppercase" style={{fontFamily: 'Geist, sans-serif'}}>Sync Status</span>
                    <span className="text-[11px] font-medium text-[#45dfa4]/70 tracking-widest uppercase" style={{fontFamily: 'Geist, sans-serif'}}>STABLE</span>
                  </div>
                </div>
                <Link href="https://leetcode.com/u/jarvis45/" target="_blank" className="w-full sm:w-auto px-8 py-3 bg-[#89ceff]/10 hover:bg-[#89ceff]/20 border border-[#89ceff]/20 hover:border-[#89ceff]/40 rounded-full transition-all duration-300 group/btn flex items-center justify-center gap-3 cursor-pointer">
                  <span className="text-[11px] text-[#89ceff] tracking-[0.3em] uppercase" style={{fontFamily: 'Geist, sans-serif'}}>Establish Profile Link</span>
                  {/* arrow outward icon fallback */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#89ceff] group-hover/btn:translate-x-1 transition-transform">
                    <path d="M7 17l9.2-9.2M17 17V7H7"/>
                  </svg>
                </Link>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-96 text-center">
              <p className="text-red-400 mb-2">Node synchronization failed.</p>
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
};
