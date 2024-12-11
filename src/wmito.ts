import { erc20Abi, parseEther } from 'viem';

import { publicClient } from './mitosis';
import { WalletClientWithAccount } from './wallet';

const WMITO_ADDRESS = '0x8b71fd76b23721d0d73ca14ea6464aad70149b67';

const WMITO_ABI = [
  {
    constant: false,
    inputs: [],
    name: 'deposit',
    outputs: [],
    payable: true,
    stateMutability: 'payable',

    type: 'function',
  },
  {
    constant: false,
    inputs: [{ name: 'wad', type: 'uint256' }],
    name: 'withdraw',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  ...erc20Abi,
] as const;

export const getWMITOBalance = async (client: WalletClientWithAccount) => {
  try {
    const balance = await publicClient.readContract({
      address: WMITO_ADDRESS,
      abi: WMITO_ABI,
      functionName: 'balanceOf',
      args: [client.account.address],
    });
    return balance;
  } catch (error) {
    console.error('Error getting MITO balance:', error);
    throw error;
  }
};

export const wrapMITO = async (client: WalletClientWithAccount, amountInMITO: string) => {
  try {
    const value = parseEther(amountInMITO);
    const hash = await client.writeContract({
      address: WMITO_ADDRESS,
      abi: WMITO_ABI,
      functionName: 'deposit',
      value,
    });
    const receipt = await publicClient.waitForTransactionReceipt({ hash });
    return receipt;
  } catch (error) {
    console.error('Error wrapping ETH:', error);
    throw error;
  }
};

export const unwrapWMITO = async (client: WalletClientWithAccount, amountInEth: string) => {
  try {
    const value = parseEther(amountInEth);
    const hash = await client.writeContract({
      address: WMITO_ADDRESS,
      abi: WMITO_ABI,
      functionName: 'withdraw',
      args: [value],
    });
    const receipt = await publicClient.waitForTransactionReceipt({ hash });
    return receipt;
  } catch (error) {
    console.error('Error unwrapping WETH:', error);
    throw error;
  }
};
