export type Entitlement = 'free' | 'premium';
export type BillingStatus = { entitlement: Entitlement; provider: 'demo' | 'app-store' | 'play-store'; active: boolean };

export interface BillingService {
  getStatus(): Promise<BillingStatus>;
  purchasePremium(): Promise<BillingStatus>;
  restorePurchases(): Promise<BillingStatus>;
}

export const disabledDemoBillingService: BillingService = {
  getStatus: async () => ({ entitlement: 'free', provider: 'demo', active: false }),
  purchasePremium: async () => { throw new Error('Billing is intentionally disabled until the client funds production integration.'); },
  restorePurchases: async () => ({ entitlement: 'free', provider: 'demo', active: false }),
};
