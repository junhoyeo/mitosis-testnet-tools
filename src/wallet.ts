import dotenv from 'dotenv';
import { createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';

import { mitosisTestnet } from './mitosis';

dotenv.config();

export const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`);

export const walletClient = createWalletClient({
  account,
  chain: mitosisTestnet,
  transport: http(),
});

export type WalletClientWithAccount = typeof walletClient;
