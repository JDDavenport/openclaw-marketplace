import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Agent } from '@/lib/agents-data';

export function AgentCard({ agent }: { agent: Agent }) {
  return (
    <Link href={`/agents/${agent.slug}`}>
      <Card className="group p-6 hover:border-gray-700 hover:bg-gray-900/80 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5 cursor-pointer h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <span className="text-4xl">{agent.emoji}</span>
          <Badge>{agent.category}</Badge>
        </div>

        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
          {agent.name}
        </h3>

        <p className="text-sm text-gray-400 leading-relaxed mb-6 flex-1">
          {agent.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-2xl font-bold text-white">${agent.priceMonthly}</span>
            <span className="text-sm text-gray-500">/mo</span>
          </div>
          <Button variant="gradient" size="sm">
            Get Agent →
          </Button>
        </div>
      </Card>
    </Link>
  );
}
