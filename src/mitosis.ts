import { createPublicClient, defineChain, http } from 'viem';

export const mitosisTestnet = defineChain({
  id: 124832,
  name: 'Mitosis Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'MITO',
    symbol: 'MITO',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.testnet.mitosis.org'],
    },
  },
});

export const publicClient = createPublicClient({
  chain: mitosisTestnet,
  transport: http(),
});
