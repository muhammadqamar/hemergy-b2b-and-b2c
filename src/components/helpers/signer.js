import { ethers } from 'ethers';
import { relayer, meta } from '@/services/transaction';
const parseEvent = (contractInterface, log) => {
  const event = contractInterface?.interface?.parseLog(log);
  return event;
};
export const getSigner = async (
  web3authProvider,
  domain,
  types,
  message,
  type
) => {
  console.log(web3authProvider)
  const provider = new ethers.providers.JsonRpcProvider(
    'http://34.162.229.194:8545'
  );
  const privateKey = await web3authProvider.provider?.request({
    method: 'private_key',
  });

  const signer = new ethers.Wallet(privateKey, provider);

  const signedMessage = await signer._signTypedData(domain, types, message);
  const relayInfo = await relayer({
    request: message,
    signature: signedMessage,
  });
  const metaInformation = await meta();
  var accountsFactoryContract = '';
  if (type == 'account') {
    accountsFactoryContract = new ethers.Contract(
      metaInformation.data?.accountsFactoryAddress || '',
      metaInformation.data?.accountsFactoryABI,
      signer
    );
    const accountEvent = parseEvent(
      accountsFactoryContract,
      relayInfo.data.logs?.[0]
    );

    const accountAddress = accountEvent.args.account;
    console.log('account address', accountAddress);
    return accountAddress;
  } else if (type === 'project') {
    accountsFactoryContract = new ethers.Contract(
      metaInformation.data?.projectsFactoryAddress || '',
      metaInformation.data?.projectsFactoryABI,
      signer
    );
    const accountEvent = parseEvent(
      accountsFactoryContract,
      relayInfo.data.logs?.[0]
    );

    const accountAddress = accountEvent.args.project;
    console.log('project address', accountAddress);
    return accountAddress;
  }
};
