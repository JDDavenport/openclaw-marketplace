import { AgentCard } from './agent-card';
import type { Agent } from '@/lib/agents-data';

export function AgentGrid({ agents }: { agents: Agent[] }) {
  if (agents.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-4xl mb-4">🔍</p>
        <p className="text-gray-400 text-lg">No agents found matching your criteria.</p>
        <p className="text-gray-500 text-sm mt-2">Try a different search or category.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {agents.map((agent) => (
        <AgentCard key={agent.slug} agent={agent} />
      ))}
    </div>
  );
}
