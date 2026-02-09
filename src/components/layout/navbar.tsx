import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-800/50 bg-gray-950/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-500">
            <span className="text-sm font-bold text-white">🐾</span>
          </div>
          <span className="text-lg font-bold text-white">OpenClaw Agents</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/agents" className="text-sm text-gray-400 hover:text-white transition-colors">
            Agents
          </Link>
          <Link href="/#how-it-works" className="text-sm text-gray-400 hover:text-white transition-colors">
            How It Works
          </Link>
          <Link href="/#pricing" className="text-sm text-gray-400 hover:text-white transition-colors">
            Pricing
          </Link>
          <Link href="/#faq" className="text-sm text-gray-400 hover:text-white transition-colors">
            FAQ
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/agents">
            <Button variant="gradient" size="sm">
              Browse Agents
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
