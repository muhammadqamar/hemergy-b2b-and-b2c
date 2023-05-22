import { ethers } from 'ethers';
import Hemergy from '@hemergy/core-sdk';
import { store } from '@/store/store';
export const getBalance = async (address) => {
  const { user } = store.getState();
  const web3authProvider = await user.web3auth.connect();
  const ethersProvider = new ethers.providers.Web3Provider(web3authProvider);
  const signer1 = await ethersProvider.getSigner();
  const hemergy = new Hemergy({
    baseURL: 'https://dev-core.hemergy.com',
    signer: signer1,
  });
  var number;
  if (address) {
    const balance = await hemergy.getBalance(address);
    let hexNumber = balance._hex;
    const bigIntNumber = BigInt(hexNumber);
    number = Number(bigIntNumber)/Math.pow(10,2);
  }
  return number?.toFixed(3);
};
