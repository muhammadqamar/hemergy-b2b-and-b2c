import { Formik, Field } from "formik";
import Image from "next/image";
import axios from 'axios';
import { toast } from 'react-toastify';
import { Web3Button } from '@web3modal/react'
import { useAccount, useEnsAvatar } from 'wagmi'
import { useEffect } from "react";

const WalletOption = ({ setStep, userDetail }) => {
  const { address, isConnected, connector } = useAccount()

  console.log(userDetail)
  return (
    <div className="registration-box">
      <div className="flex-box d-column gap-x-sm">

        {connector?.name ? <h3 className="p-xl center-text">Connected to {connector.name}</h3> : <h3 className="p-xl center-text">Connect Your Wallet</h3>}

      </div>
      <div className="mt-10 text-center h-28">
        <Web3Button icon="show" label="Connect Wallet" balance="show" />

      </div>
      <div className="gap-4 flex-box">
        <button
          onClick={() => setStep(2)}
          type="button"
          className="justify-center flex-box gap-x-sm btn-border secondary"
        >
          Back
        </button>
        <button disabled={!address} className="btn secondary blue" type="submit" onClick={async()=>{
              if (isConnected) {

                var resulter = []
                if (userDetail?.walletAddresses) {
                  resulter = [...userDetail?.walletAddresses, { provider: connector?.name, value: address }]
                } else {
                  resulter = [{ provider: connector?.name, value: address }]
                }
                try {
                const updateWallet = await axios.post(
                  `${process.env.NEXT_PUBLIC_API_DOMAIN}/user/wallet`,
                  { wallet: resulter, email: userDetail?.email }

                )
                setStep(3)
              }catch(e) {

                }


              }
        }} >
          {'Done'}
        </button>
      </div>

      <p className="font-medium text-center p-sm text-textcolor">Skip for now</p>

    </div>
  );
};

export default WalletOption;
