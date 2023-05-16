import NoTransaction from '../common/noTransaction';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Hemergy from '@hemergy/core-sdk';
import { ethers } from 'ethers';

import Progress from './progress';
import TrasactionCard from '@/utils/TransactionCard';

const Wallet = () => {
  const state = useSelector((state) => state);
  const [balance, setBalance] = useState();

  // useEffect(() => {
  //   (async () => {
  //     const e = await state.user.web3auth.connect();

  //     const ethersProvider = new ethers.providers.Web3Provider(e);
  //     const signer = await ethersProvider.getSigner();
  //     console.log('signer address', await signer.getAddress());
  //     const hemergy = new Hemergy({
  //       baseURL: 'https://dev-core.hemergy.com',
  //       signer,
  //     });
  //     const balance = await hemergy.getBalance(
  //       state?.user.user?.accountAddress
  //     );
  //     console.log('balance', balance);

  //     let hexNumber = balance._hex;
  //     const bigIntNumber = BigInt(hexNumber);
  //     const number = Number(bigIntNumber);
  //     setBalance(number/Math.pow(10,18));
  //   })();
  // }, [state?.user]);

  return (
    <div className="insight-card w-full laptop:w-[32%] bg-blue800 ">
      <div className="mb-8">
        <h2 className="mb-3 text-white p-xl">Wallet</h2>
        <p className="text-white p-sm">
          Your earnings are automatically saved.
        </p>
      </div>
      <div className="mb-[60px]">
        <Progress balance={state?.user?.balance} />
      </div>
      <div className="flex flex-col items-center justify-center gap-2 mb-8">
        <button className="flex items-center justify-center text-white secondary rounded-xl bg-blue700">
          Connect Cryptowallet
        </button>
        <button className="btn secondary">Withdraw</button>
      </div>

      <div className="mb-6">
        <h3 className="mb-2 text-white p-lg">Latest returns</h3>
      </div>
      <div className="gradient-bg h-[354px] scrollbar-hide">
        <div className="transac-bg ">
          {[1, 2, 3, 4, 5, 6, 7, 8]?.map((item, index) => (
            <div key={index}>
              <TrasactionCard
                txShort="Tx"
                txName="7fjhf89fhjf989"
                txDate="1 min ago"
                txToken="3.45"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wallet;
