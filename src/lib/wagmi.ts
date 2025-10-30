import { http, createConfig } from 'wagmi';
import { celoSepolia } from 'wagmi/chains';
import { injected, walletConnect } from 'wagmi/connectors';

// Get WalletConnect project ID from environment
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

if (!projectId) {
  console.warn(
    'NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not set. WalletConnect will not work.'
  );
}

// Get chain ID from environment (default to Celo Sepolia)
const configuredChainId = process.env.NEXT_PUBLIC_CHAIN_ID
  ? parseInt(process.env.NEXT_PUBLIC_CHAIN_ID)
  : celoSepolia.id;

// Validate that we're using Celo Sepolia
if (configuredChainId !== celoSepolia.id) {
  console.warn(
    `NEXT_PUBLIC_CHAIN_ID is set to ${configuredChainId}, but only Celo Sepolia (${celoSepolia.id}) is supported. Using Celo Sepolia.`
  );
}

// Only support Celo Sepolia testnet
export const chains = [celoSepolia] as const;

// Get RPC URL from environment
const rpcUrl = process.env.NEXT_PUBLIC_CELO_RPC_URL;

if (!rpcUrl) {
  throw new Error(
    'NEXT_PUBLIC_CELO_RPC_URL environment variable is required'
  );
}

// Create wagmi config
export const config = createConfig({
  chains,
  connectors: [
    injected({
      shimDisconnect: true,
    }),
    ...(projectId
      ? [
          walletConnect({
            projectId,
            metadata: {
              name: 'CELO Token Launcher',
              description:
                'Launch builder tokens on CELO with human verification',
              url: typeof window !== 'undefined' ? window.location.origin : '',
              icons: [
                typeof window !== 'undefined'
                  ? `${window.location.origin}/icon.png`
                  : '',
              ],
            },
            showQrModal: true,
          }),
        ]
      : []),
  ],
  transports: {
    [celoSepolia.id]: http(rpcUrl),
  },
  ssr: true,
});

// Helper to get the default chain
export const getDefaultChain = () => {
  return chains[0];
};

// Chain metadata for display
export const CHAIN_METADATA = {
  [celoSepolia.id]: {
    name: 'Celo Sepolia Testnet',
    shortName: 'Celo Sepolia',
    nativeCurrency: {
      name: 'CELO',
      symbol: 'CELO',
      decimals: 18,
    },
    blockExplorer: 'https://celo-sepolia.blockscout.com',
    color: '#FBCC5C',
  },
} as const;

// Export types for use in components
export type Chain = (typeof chains)[number];
