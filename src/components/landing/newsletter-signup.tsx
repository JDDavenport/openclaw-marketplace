'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function NewsletterSignup({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setStatus('success');
      setMessage(data.message);
      setEmail('');
    } catch (err: unknown) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Something went wrong');
    }
  }

  if (status === 'success') {
    return (
      <div className={compact ? '' : 'text-center'}>
        <div className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm text-green-400">
          <span>✓</span> {message}
        </div>
      </div>
    );
  }

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2 max-w-md">
        <Input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1"
        />
        <Button type="submit" variant="gradient" size="md" disabled={status === 'loading'}>
          {status === 'loading' ? '...' : 'Notify Me'}
        </Button>
      </form>
    );
  }

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <div className="rounded-2xl border border-gray-800 bg-gradient-to-b from-gray-900/80 to-gray-950 p-10 md:p-14">
          <div className="text-3xl mb-4">🔔</div>
          <h2 className="text-2xl font-bold md:text-3xl mb-3">
            Get Notified When New Agents Drop
          </h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            Be the first to know when we launch new worker agents. No spam — just new agents and updates.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
            />
            <Button type="submit" variant="gradient" size="md" disabled={status === 'loading'}>
              {status === 'loading' ? 'Subscribing...' : 'Get Notified'}
            </Button>
          </form>
          {status === 'error' && (
            <p className="mt-3 text-sm text-red-400">{message}</p>
          )}
          <p className="mt-4 text-xs text-gray-600">No spam. Unsubscribe anytime.</p>
        </div>
      </div>
    </section>
  );
}
