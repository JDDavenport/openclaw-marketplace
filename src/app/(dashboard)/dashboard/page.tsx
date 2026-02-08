import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">My Dashboard</h1>
          <Link
            href="/agents"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white font-medium hover:bg-blue-700"
          >
            Browse Agents
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Agents</h2>
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <p className="text-gray-500 mb-4">
              You don&apos;t have any agents yet.
            </p>
            <Link
              href="/agents"
              className="inline-block rounded-md bg-blue-600 px-6 py-2 text-white font-medium hover:bg-blue-700"
            >
              Get Your First Agent
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Stats
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <p className="text-sm text-gray-500">Active Agents</p>
              <p className="text-2xl font-bold text-gray-900">0</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <p className="text-sm text-gray-500">Messages This Month</p>
              <p className="text-2xl font-bold text-gray-900">0</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <p className="text-sm text-gray-500">Monthly Spend</p>
              <p className="text-2xl font-bold text-gray-900">$0.00</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
