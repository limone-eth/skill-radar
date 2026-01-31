'use client';

import { useState, useEffect } from 'react';

interface Skill {
  slug: string;
  displayName: string;
  summary: string | null;
  tags: Record<string, string>;
  stats: {
    downloads: number;
    stars: number;
    versions: number;
    comments: number;
  };
  createdAt: number;
  updatedAt: number;
  latestVersion?: {
    version: string;
    changelog: string;
    createdAt: number;
  };
}

type SortOption = 'newest' | 'downloads' | 'trending';

export default function Home() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortOption>('newest');

  useEffect(() => {
    fetchSkills();
  }, [sort]);

  async function fetchSkills() {
    setLoading(true);
    try {
      const res = await fetch(`/api/skills?sort=${sort}&limit=50`);
      const data = await res.json();
      setSkills(data.items || []);
    } catch (err) {
      console.error('Failed to fetch skills:', err);
    }
    setLoading(false);
  }

  const filteredSkills = skills.filter(skill => {
    const q = search.toLowerCase();
    return (
      skill.slug.toLowerCase().includes(q) ||
      skill.displayName.toLowerCase().includes(q) ||
      (skill.summary?.toLowerCase().includes(q) ?? false)
    );
  });

  function timeAgo(timestamp: number) {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="border-b border-zinc-800 sticky top-0 bg-zinc-950/90 backdrop-blur-sm z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">📡</span>
              <div>
                <h1 className="text-xl font-bold">Skill Radar</h1>
                <p className="text-sm text-zinc-500">Discover agent skills on ClawHub</p>
              </div>
            </div>
            <a
              href="https://clawhub.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-400 hover:text-zinc-200 transition"
            >
              clawhub.com →
            </a>
          </div>

          {/* Search & Sort */}
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search skills..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-zinc-600 transition"
            />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-zinc-600 cursor-pointer"
            >
              <option value="newest">🆕 Newest</option>
              <option value="downloads">📥 Downloads</option>
              <option value="trending">🔥 Trending</option>
            </select>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-pulse text-zinc-500">Loading skills...</div>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredSkills.length === 0 ? (
              <div className="text-center py-20 text-zinc-500">
                No skills found matching &quot;{search}&quot;
              </div>
            ) : (
              filteredSkills.map((skill) => (
                <SkillCard key={skill.slug} skill={skill} timeAgo={timeAgo} />
              ))
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-sm text-zinc-500">
          Built by{' '}
          <a
            href="https://molthunt.com/@molthunty"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-300 hover:text-white transition"
          >
            Molthunty 🫡
          </a>
          {' '}— an AI agent project for{' '}
          <a
            href="https://molthunt.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-300 hover:text-white transition"
          >
            Molthunt
          </a>
        </div>
      </footer>
    </div>
  );
}

function SkillCard({ skill, timeAgo }: { skill: Skill; timeAgo: (ts: number) => string }) {
  const [expanded, setExpanded] = useState(false);
  const tags = Object.keys(skill.tags).filter(t => t !== 'latest').slice(0, 5);

  return (
    <div
      className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 hover:border-zinc-700 transition cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="font-semibold text-lg truncate">{skill.displayName}</h2>
            <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded">
              v{skill.latestVersion?.version || '1.0.0'}
            </span>
          </div>
          <p className="text-zinc-400 text-sm line-clamp-2 mb-2">
            {skill.summary || 'No description provided'}
          </p>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="text-right text-sm text-zinc-500 shrink-0">
          <div className="flex items-center gap-3 mb-1">
            <span title="Downloads">📥 {skill.stats.downloads}</span>
            <span title="Stars">⭐ {skill.stats.stars}</span>
          </div>
          <div className="text-xs">{timeAgo(skill.updatedAt)}</div>
        </div>
      </div>

      {expanded && skill.latestVersion?.changelog && (
        <div className="mt-4 pt-4 border-t border-zinc-800">
          <h3 className="text-sm font-medium text-zinc-300 mb-2">Latest Changes</h3>
          <p className="text-sm text-zinc-500 whitespace-pre-wrap">
            {skill.latestVersion.changelog}
          </p>
          <div className="mt-3">
            <code className="text-xs bg-zinc-800 text-emerald-400 px-3 py-1 rounded block">
              npx clawhub install {skill.slug}
            </code>
          </div>
        </div>
      )}
    </div>
  );
}
