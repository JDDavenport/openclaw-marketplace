'use client';

import { useState } from 'react';
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
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    try {
      const body: Record<string, string> = { agentSlug };
      if (stripePriceId) body.priceId = stripePriceId;

      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Something went wrong. Please try again.');
        setLoading(false);
      }
    } catch {
      alert('Something went wrong. Please try again.');
      setLoading(false);
    }
  }

  return (
    <Button
      variant="gradient"
      size="lg"
      className="w-full mb-4"
      onClick={handleCheckout}
      disabled={loading}
    >
      {loading ? 'Redirecting...' : (label || `Get ${agentName} →`)}
    </Button>
  );
}
