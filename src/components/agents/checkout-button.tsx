'use client';

import { useState } from 'react';
import { useSession } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';

export function CheckoutButton({
  agentSlug,
  agentName,
  stripePriceId,
  label,
}: {
  agentSlug: string;
  agentName: string;
  stripePriceId?: string;
  label?: string;
}) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [error, setError] = useState('');

  async function handleCheckout() {
    if (!session?.user) {
      window.location.href = `/signin?redirect=/agents/${agentSlug}`;
      return;
    }

    if (!showCode) {
      setShowCode(true);
      return;
    }

    if (!promoCode.trim()) {
      setError('Enter your access code');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agentSlug, promoCode: promoCode.trim() }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else if (data.error === 'Unauthorized') {
        window.location.href = `/signin?redirect=/agents/${agentSlug}`;
      } else {
        setError(data.error || 'Payment system offline. Try again later.');
        setLoading(false);
      }
    } catch {
      setError('Payment system offline. Try again later.');
      setLoading(false);
    }
  }

  return (
    <div className="w-full mb-4">
      {showCode && (
        <div className="mb-3">
          <input
            type="text"
            placeholder="Enter access code"
            value={promoCode}
            onChange={(e) => { setPromoCode(e.target.value); setError(''); }}
            className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white text-center text-lg tracking-widest focus:outline-none focus:border-blue-500"
            autoFocus
          />
          {error && <p className="text-red-400 text-sm mt-2 text-center">{error}</p>}
        </div>
      )}
      <Button
        variant="gradient"
        size="lg"
        className="w-full"
        onClick={handleCheckout}
        disabled={loading}
      >
        {loading ? 'Activating...' : showCode ? 'Activate →' : (label || `Get ${agentName} →`)}
      </Button>
    </div>
  );
}
