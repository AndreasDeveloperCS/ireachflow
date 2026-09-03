export enum UserRole {
  Owner = 'owner',
  Admin = 'admin',
  MarketingManager = 'marketing_manager',
  CampaignManager = 'campaign_manager',
  Analyst = 'analyst',
  Viewer = 'viewer',
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  organizationId: string;
  isActive: boolean;
}

export const ROLE_LABELS: Record<UserRole, string> = {
  [UserRole.Owner]: 'Owner',
  [UserRole.Admin]: 'Admin',
  [UserRole.MarketingManager]: 'Marketing Manager',
  [UserRole.CampaignManager]: 'Campaign Manager',
  [UserRole.Analyst]: 'Analyst',
  [UserRole.Viewer]: 'Viewer',
};
