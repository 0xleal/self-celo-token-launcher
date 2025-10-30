/**
 * Common TypeScript types for the CELO Token Launcher application
 */

import type { Address } from 'viem';

// Token types
export interface Token {
  address: Address;
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: bigint;
  creator: Address;
  createdAt: number;
  verified: boolean;
}

export interface TokenMetadata {
  description?: string;
  logoUrl?: string;
  website?: string;
  twitter?: string;
  telegram?: string;
  discord?: string;
}

// Milestone types
export interface Milestone {
  id: string;
  tokenAddress: Address;
  title: string;
  description: string;
  targetDate: number;
  status: MilestoneStatus;
  creator: Address;
  createdAt: number;
  completedAt?: number;
  proofUrl?: string;
  totalYesStake?: bigint;
  totalNoStake?: bigint;
}

export enum MilestoneStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

// Prediction market types
export interface PredictionMarket {
  id: string;
  milestoneId: string;
  tokenAddress: Address;
  totalYesStake: bigint;
  totalNoStake: bigint;
  resolved: boolean;
  outcome?: boolean;
  deadline: number;
}

export interface Bet {
  id: string;
  marketId: string;
  bettor: Address;
  amount: bigint;
  prediction: boolean; // true = yes, false = no
  timestamp: number;
  claimed: boolean;
}

// User types
export interface User {
  address: Address;
  verified: boolean;
  tokensCreated: number;
  milestonesCompleted: number;
  totalBetsPlaced: bigint;
}

// UI helper types
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

// Form types
export interface TokenLaunchForm {
  ticket: string;
}

// Token constants used for all launches
export const TOKEN_CONSTANTS = {
  name: "Builder Token",
  totalSupply: "1000000",
  decimals: 18,
  description: "A builder token with milestone-based credibility",
} as const;

export interface MilestoneForm {
  title: string;
  description: string;
  targetDate: Date;
}

export interface BetForm {
  amount: string;
  prediction: boolean;
}

// Contract event types
export interface TokenCreatedEvent {
  tokenAddress: Address;
  creator: Address;
  name: string;
  symbol: string;
  timestamp: number;
}

export interface MilestoneCreatedEvent {
  milestoneId: string;
  tokenAddress: Address;
  creator: Address;
  title: string;
  targetDate: number;
  timestamp: number;
}

export interface BetPlacedEvent {
  marketId: string;
  bettor: Address;
  amount: bigint;
  prediction: boolean;
  timestamp: number;
}
