import Image from "next/image";
import axios from "axios";

// import AllWalletOption from "@/utils/walletConnect/allWalletOption";
import Link from "next/link";

import { useEffect, useState } from "react";
import { ethers } from "ethers";

const WalletConnect = () => {
  const [address, setAddress] = useState(null);
  const [signature, setSignature] = useState(null);
  const [account, setAccount] = useState(false);

  useEffect(() => {
    async function fetchAccountData() {
      const res = await axios.get(
        `http://localhost:4000/api/user/${address}/exists`
      );

      console.log("🚀 ~ file: signup2.js:20 ~ fetchData ~ res:", res);

      const data = res?.data;

      if (data.found) {
        setAccount(data);
      }
    }

    if (address) {
      fetchAccountData();
    }
  }, [address]);

  const connectWallet = async () => {
    try {
      await window.ethereum.enable();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const connectedAddress = await signer.getAddress();
      console.log(`Connected to wallet address: ${connectedAddress}`);
      setAddress(connectedAddress);
    } catch (error) {
      console.error(error);
    }
  };

  const signMessage = async (message) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const signature = await signer.signMessage(message);
      console.log(`Signed message: ${message}`);
      console.log(`Signature: ${signature}`);
      setSignature(signature);

      return signature;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    try {
      // start challenge
      const proofStartResponse = await axios.post(
        "http://localhost:4000/api/hemergycore/proof/start",
        {
          address,
        }
      );

      const { identifier, timestamp, nonce } = proofStartResponse.data.response;

      // sign message
      const signature = await signMessage(`${address}${timestamp}${nonce}`);

      // verify challenge
      const proofValidateResponse = await axios.post(
        "http://localhost:4000/api/hemergycore/proof/validate",
        {
          identifier: identifier,
          signature,
          address,
          timestamp: timestamp,
          nonce: nonce,
        }
      );

      // signup
      const response = await axios.post(
        "http://localhost:4000/api/auth/signup2",
        {
          proof: {
            identifier,
            signature,
            address,
            timestamp,
            nonce,
          },
          wallet: {
            address,
            provider: "metamask",
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={connectWallet}>Connect to Wallet</button>
      {address && (
        <div>
          <p>Connected to wallet address: {address}</p>

          {account && account.onChainData && (
            <p>
              You have Account contract under this address:
              {account.onChainData.Account}
            </p>
          )}

          {!account && (
            <button onClick={handleSubmit}>Create Account On Chain</button>
          )}
        </div>
      )}
    </div>
  );
};

const Signup2 = () => {
  const [step, setStep] = useState(1);
  const [loader, setLoading] = useState(true);
  const [userDetail, setUserDetail] = useState();

  return (
    <div className="authentications-section">
      <Link href="/" className="auth-header">
        <Image
          src="/images/hemergy-logo.svg"
          width={150}
          height={32}
          alt="logo"
        />
      </Link>

      {loader && (
        <div className="auth-container">
          <WalletConnect />
        </div>
      )}

      <div className="auth-wather" />
    </div>
  );
};

export default Signup2;
