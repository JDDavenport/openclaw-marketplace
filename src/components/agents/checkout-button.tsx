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

  async function handleCheckout() {
    // Bug fix #1: Require auth before checkout — prevents anonymous purchases
    if (!session?.user) {
      window.location.href = `/signin?redirect=/agents/${agentSlug}`;
      return;
    }

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
      } else if (data.error === 'Unauthorized') {
        window.location.href = `/signin?redirect=/agents/${agentSlug}`;
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
