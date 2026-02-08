export interface Agent {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription: string | null;
  category: string;
  priceMonthly: number; // cents
  stripePriceId: string;
  botUsername: string;
  botToken: string;
  imageUrl: string | null;
  features: string[];
  isActive: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface UserSubscription {
  id: string;
  userId: string;
  agentId: string;
  stripeSubscriptionId: string;
  status: "active" | "canceled" | "past_due" | "trialing";
  currentPeriodStart: number | null;
  currentPeriodEnd: number | null;
  workspacePath: string;
  telegramChatId: string | null;
  onboardingCompleted: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
  telegramUserId: string | null;
  createdAt: number;
  updatedAt: number;
}

export interface CheckoutRequest {
  agentId: string;
  successUrl?: string;
  cancelUrl?: string;
}

export interface CheckoutResponse {
  sessionId: string;
  checkoutUrl: string;
}

export interface AgentListResponse {
  agents: Agent[];
  total: number;
}

export interface UserAgentsResponse {
  subscriptions: Array<{
    id: string;
    agent: Agent;
    status: string;
    nextBilling: string | null;
    telegramConnected: boolean;
    usage: {
      messageCount: number;
      lastActivity: string | null;
    };
  }>;
}
