export type DemoRole = 'user' | 'premium' | 'moderator' | 'owner';

export type DemoAccountCredential = {
  id: string;
  email: string;
  password: string;
  displayName: string;
  username: string;
  role: DemoRole;
  roleLabel: string;
  description: string;
};

export type DemoAccount = Omit<DemoAccountCredential, 'password'>;

export const demoAccounts: DemoAccountCredential[] = [
  {
    id: 'demo-user-001',
    email: 'user@allthingsfitness.demo',
    password: 'DemoUser1!',
    displayName: 'Jordan Member',
    username: 'jordan_moves',
    role: 'user',
    roleLabel: 'Regular user',
    description: 'Free member experience with standard fitness, nutrition and community features.',
  },
  {
    id: 'demo-premium-001',
    email: 'premium@allthingsfitness.demo',
    password: 'DemoPremium1!',
    displayName: 'Taylor Premium',
    username: 'taylor_plus',
    role: 'premium',
    roleLabel: 'Paying user',
    description: 'Active demo premium entitlement without a real charge or store subscription.',
  },
  {
    id: 'demo-moderator-001',
    email: 'moderator@allthingsfitness.demo',
    password: 'DemoModerator1!',
    displayName: 'Morgan Moderator',
    username: 'atf_moderator',
    role: 'moderator',
    roleLabel: 'Moderator',
    description: 'Access to the local report queue and moderation architecture preview.',
  },
  {
    id: 'demo-owner-001',
    email: 'owner@allthingsfitness.demo',
    password: 'DemoOwner1!',
    displayName: 'ATF Owner & Board',
    username: 'atf_board',
    role: 'owner',
    roleLabel: 'Owner / board',
    description: 'Full demo oversight with premium and moderation access.',
  },
];

export function findDemoAccount(email: string, password: string) {
  return demoAccounts.find((account) => account.email === email.trim().toLowerCase() && account.password === password);
}

export function toPublicDemoAccount(account: DemoAccountCredential): DemoAccount {
  const { password: _password, ...publicAccount } = account;
  return publicAccount;
}
