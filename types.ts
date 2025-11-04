export enum ProjectCategory {
  NFT = 'NFT',
  GameFi = 'GameFi',
  DeFi = 'DeFi',
  Charity = 'Charity',
  Education = 'Education',
}

export enum ProjectStatus {
  Active = 'active',
  Completed = 'completed',
  Pending = 'pending',
}

export enum ProposalStatus {
  Active = 'Active',
  Passed = 'Passed',
  Failed = 'Failed',
  Executed = 'Executed',
}

export interface Socials {
    twitter?: string;
    website?: string;
    linkedin?: string;
    // FIX: Added 'github' property to support project links to GitHub repositories, resolving an error in constants.ts.
    github?: string;
}

export interface TeamMember {
    name: string;
    role: string;
    avatarUrl: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  description: string;
  thumbnail: string;
  banner: string;
  category: ProjectCategory;
  goal_amount_xrp: number;
  raised_amount_xrp: number;
  xrpl_wallet: string;
  status: ProjectStatus;
  donors: number;
  socials: Socials;
  team: TeamMember[];
}

export interface Proposal {
  id: string;
  title: string;
  proposer: string;
  description: string;
  status: ProposalStatus;
  votesFor: number;
  votesAgainst: number;
  endDate: string; // ISO string
}


export interface Donation {
    projectId: string;
    amountXRP: number;
    date: string;
}

export enum ActivityType {
    Donation = 'Donation',
    Vote = 'Vote'
}

export interface Activity {
    id: string;
    type: ActivityType;
    description: string;
    date: string;
    amountXRP?: number;
}

export interface User {
  address: string;
  xrpBalance: number;
  fortBalance: number; // Fortuna Governance Token
  avatarUrl: string;
  donations: Donation[];
  activityLog: Activity[];
}