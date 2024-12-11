import { formatEther } from 'viem';

import { publicClient } from './mitosis';
import { account, walletClient } from './wallet';
import { getWMITOBalance, wrapMITO } from './wmito';

async function main() {
  const mitoBalance = await publicClient.getBalance({ address: account.address });
  console.log('MITO', formatEther(mitoBalance));

  const wmitoBalance = await getWMITOBalance(walletClient);
  console.log('WMITO', formatEther(wmitoBalance));

  const wrapReceipt = await wrapMITO(walletClient, '40');
  console.log('txHash', wrapReceipt.transactionHash);
}

main().catch(console.error);
