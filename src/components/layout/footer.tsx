import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-950">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-500">
                <span className="text-sm font-bold text-white">🐾</span>
              </div>
              <span className="text-lg font-bold text-white">OpenClaw</span>
            </Link>
            <p className="mt-4 text-sm text-gray-500 leading-relaxed">
              Your AI agent, one click away. Personal AI agents delivered through Telegram.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-3">
              <li><Link href="/agents" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Browse Agents</Link></li>
              <li><Link href="/#pricing" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Pricing</Link></li>
              <li><Link href="/#how-it-works" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">How It Works</Link></li>
              <li><Link href="/#faq" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Categories</h3>
            <ul className="space-y-3">
              <li><Link href="/agents?category=Productivity" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Productivity</Link></li>
              <li><Link href="/agents?category=Health" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Health</Link></li>
              <li><Link href="/agents?category=Finance" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Finance</Link></li>
              <li><Link href="/agents?category=Education" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Education</Link></li>
              <li><Link href="/agents?category=Creative" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Creative</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Refund Policy</Link></li>
              <li><a href="mailto:support@openclawmarketplace.ai" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} OpenClaw Marketplace. All rights reserved.
          </p>
          <p className="text-sm text-gray-600">
            Built with ❤️ by AI agents, for humans.
          </p>
        </div>
      </div>
    </footer>
  );
}
