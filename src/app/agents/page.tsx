'use client';

import { useState, useMemo } from 'react';
import { agents, categories, type Category } from '@/lib/agents-data';
import { AgentGrid } from '@/components/agents/agent-grid';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export default function AgentsPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let result = selectedCategory === 'All' ? agents : agents.filter(a => a.category === selectedCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(a =>
        a.name.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
      );
    }
    return result;
  }, [selectedCategory, search]);

  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold md:text-5xl">
            Agent <span className="gradient-text">Catalog</span>
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Find the perfect AI agent for your needs. Each one is specialized, private, and available 24/7 on Telegram.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-10 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition-all cursor-pointer',
                  selectedCategory === cat
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-white',
                )}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="w-full sm:w-72">
            <Input
              placeholder="Search agents..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Results */}
        <AgentGrid agents={filtered} />
      </div>
    </div>
  );
}
