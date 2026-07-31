import { NextResponse } from "next/server";

export async function GET() {
  try {
    // LeetCode GraphQL API endpoint
    const query = `
      query getUserProfile($username: String!) {
        allQuestionsCount {
          difficulty
          count
        }
        matchedUser(username: $username) {
          contributions {
            points
          }
          profile {
            reputation
            ranking
          }
          submitStats {
            acSubmissionNum {
              difficulty
              count
              submissions
            }
            totalSubmissionNum {
              difficulty
              count
              submissions
            }
          }
          userCalendar(year: 2026) {
            submissionCalendar
          }
        }
      }
    `;

    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { username: "jarvis45" }
      }),
      next: { revalidate: 3600 } // cache for 1 hour
    });

    if (!res.ok) throw new Error("Failed to fetch LeetCode data");
    const data = await res.json();

    const matchedUser = data.data?.matchedUser;
    if (!matchedUser) throw new Error("User not found");

    const submitStats = matchedUser.submitStats.acSubmissionNum;
    const totalSolved = submitStats.find((s: any) => s.difficulty === "All")?.count || 0;
    const easySolved = submitStats.find((s: any) => s.difficulty === "Easy")?.count || 0;
    const mediumSolved = submitStats.find((s: any) => s.difficulty === "Medium")?.count || 0;
    const hardSolved = submitStats.find((s: any) => s.difficulty === "Hard")?.count || 0;

    return NextResponse.json({
      ranking: matchedUser.profile.ranking,
      totalSolved,
      easySolved,
      mediumSolved,
      hardSolved,
      rating: 1750, // Hardcoded from resume as LeetCode rating requires a different complex query
      submissionCalendar: matchedUser.userCalendar.submissionCalendar
    });
  } catch (error) {
    return NextResponse.json({ 
      error: "Failed to fetch LeetCode data",
      // Fallback data based on resume
      fallback: {
        ranking: 848,
        totalSolved: 500,
        easySolved: 150,
        mediumSolved: 250,
        hardSolved: 100,
        rating: 1750,
        submissionCalendar: "{}"
      }
    }, { status: 500 });
  }
}
