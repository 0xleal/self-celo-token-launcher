import { celoSepolia } from "viem/chains";
import type { Chain } from "viem/chains";

/**
 * Verification Registry ABI for Self.xyz integration
 */
export const VERIFICATION_REGISTRY_ABI = [
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "isVerified",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

/**
 * Chain configuration for Self.xyz verification
 */
export interface VerificationConfig {
  chain: Chain;
  verificationRegistryAddress: `0x${string}`;
  verificationRegistryAbi: typeof VERIFICATION_REGISTRY_ABI;
  scopeSeed: string;
  selfEndpointType: string;
}

/**
 * Get verification chain configuration
 * Always uses Celo Sepolia testnet for verification
 */
export function getVerificationChainConfig(): VerificationConfig {
  // Celo Sepolia testnet configuration
  return {
    chain: celoSepolia,
    verificationRegistryAddress: "0x8652f03Ae1c6c8aAc71C2Deb80e1C33C38a7e9a2",
    verificationRegistryAbi: VERIFICATION_REGISTRY_ABI,
    scopeSeed: "humanpay-multichain",
    selfEndpointType: "staging_celo",
  };
}
