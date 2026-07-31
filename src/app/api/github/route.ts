import { NextResponse } from "next/server";

export async function GET() {
  try {
    const headers: HeadersInit = process.env.GITHUB_TOKEN 
      ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } 
      : {};

    const res = await fetch("https://api.github.com/users/Ramkrishna45", { headers });
    if (!res.ok) throw new Error("Failed to fetch Github data");
    const data = await res.json();
    
    const reposRes = await fetch("https://api.github.com/users/Ramkrishna45/repos?sort=updated&per_page=6", { headers });
    const repos = await reposRes.ok ? await reposRes.json() : [];

    return NextResponse.json({
      followers: data.followers,
      public_repos: data.public_repos,
      avatar_url: data.avatar_url,
      repos: repos.map((r: any) => ({
        name: r.name,
        description: r.description,
        stars: r.stargazers_count,
        forks: r.forks_count,
        language: r.language,
        url: r.html_url
      }))
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch Github data" }, { status: 500 });
  }
}
