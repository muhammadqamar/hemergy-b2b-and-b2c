import { useEffect, useState } from 'react';
import { Web3Auth } from '@web3auth/modal';
import { ADAPTER_EVENTS } from '@web3auth/base';
import axios from 'axios';
import RPC from '../../pages/api/etherRPC';

import { providers, Signer, ethers } from 'ethers';

const Signup2 = () => {
  const [web3auth, setWeb3auth] = useState(null);
  const [provider, setProvider] = useState(null);
  const [walletConnection, setWalletConneciton] = useState(false);
  const [addressConnected, setAddressConnected] = useState();
  const handleSubmit = async () => {
    try {
      // start challenge
      const proofStartResponse = await axios.post(
        'http://localhost:4000/api/hemergycore/proof/start',
        {
          address: addressConnected,
        }
      );

      const { identifier, timestamp, nonce } = proofStartResponse.data.response;

      // sign message
      const signature = await signMessage(`${address}${timestamp}${nonce}`);

      // verify challenge
      const proofValidateResponse = await axios.post(
        'http://localhost:4000/api/hemergycore/proof/validate',
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
        'http://localhost:4000/api/auth/signup2',
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
            provider: 'metamask',
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(async () => {
    // Initialize Web3Auth modal
    const web3auth = new Web3Auth({
      clientId:
        'BOweQo3kUPEy3FhGecCQrT30eF99IpGky0kIrCwev_wuSbCBvCQmSHpMVQTIa2yL6p0c6FB_sC5J-cIbhBNGOKs',
      chainConfig: {
        chainNamespace: 'eip155',
        chainId: '0x1', // Please use 0x5 for Goerli Testnet
      },
    });
    // subscribe to lifecycle events emitted by web3auth
    web3auth.on(ADAPTER_EVENTS.CONNECTED, async (data) => {
      console.log('connected to wallet', web3auth);
      setWalletConneciton(true);
      const rpc = new RPC(web3auth.provider);
      const address = await rpc.getAccounts();
      setAddressConnected(address);

      // web3auth.provider will be available here after user is connected
    });
    web3auth.on(ADAPTER_EVENTS.CONNECTING, () => {
      console.log('connecting');
    });
    web3auth.on(ADAPTER_EVENTS.DISCONNECTED, () => {
      console.log('disconnected');
      setWalletConneciton(false);
    });

    setWeb3auth(web3auth);

    await web3auth.initModal();
    // if (web3auth.provider) {
    //   setProvider(web3auth.provider);
    // }

    return () => {
      // Cleanup code if necessary
    };
  }, []);

  useEffect(() => {
    console.log(web3auth);
  }, [web3auth]);
  const login = async () => {
    if (!web3auth) {
      console.log('web3auth not initialized yet');
      return;
    }
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
  };

  const getUserInfo = async () => {
    if (!web3auth) {
      console.log('web3auth not initialized yet');
      return;
    }
    const user = await web3auth.getUserInfo();
    console.log('🚀 ~ file: signup-web3auth.js:46 ~ getUserInfo ~ user:', user);
  };

  const logout = async () => {
    if (!web3auth) {
      console.log('provider not initialized yet');
      return;
    }

    await web3auth.logout();
    setProvider(null);
  };

  const signMessage = async () => {
    if (!provider) {
      console.log('provider not initialized yet');
      return;
    }

    const rpc = new RPC(provider);
    const signedMessage = await rpc.signMessage();
    console.log(signedMessage);
  };

  const getAccount = async () => {
    alert();
    if (!provider) {
      console.log('provider not initialized yet');
      return;
    }

    const rpc = new RPC(provider);
    const address = await rpc.getAccounts();

    return address;
  };

  const connectWalletMetaMusk = async () => {
    try {
      await window.ethereum.enable();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const connectedAddress = await signer.getAddress();
      console.log(`Connected to wallet address: ${connectedAddress}`);
      setWalletConneciton(true)
      setAddressConnected(connectedAddress)
      //setAddress(connectedAddress);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="registration-box">
      <div className="flex-box d-column gap-x-sm">
        <h6 className="p-lg center-text ">Step 1 of 5</h6>
        <h3 className="p-xl center-text">Connect You Wallet</h3>
      </div>
      {walletConnection ? (
        <div className="connected-app">
          <button className="bg-[#F9705A] float-right  justify-end text-[#fff]  p-[7px] rounded-[5px] font-semibold text-[10px] leading-[20px]" onClick={logout}>logout</button>
          <p className="font-semibold py-[15px] clear-both text-center">{addressConnected}</p>
          <button className="bg-[#3D50D9] block mx-auto text-[#fff]  p-[10px] rounded-[5px] font-semibold text-[14px] leading-[20px] " onClick={handleSubmit}>Connect to Chains</button>
        </div>
      ) : (
        <div className="web3auth-connect">
          <div className="box" onClick={connectWalletMetaMusk}>
            <img src="./images/metamask.svg" alt="metamask" />
          </div>
          <div className="box" onClick={() => login()}>
            {' '}
            <img src="./images/web3.svg" alt="metamask" />
          </div>
        </div>
      )}
    </div>
    // <div className="authentications-section" style={{ padding: "10px" }}>
    //   <button onClick={login}>login</button>
    //   <br />
    //   <button onClick={getUserInfo}>user info</button>
    //   <br />
    //   <button onClick={logout}>logout</button>
    //   <br />
    //   <button onClick={signMessage}>signMessage</button>
    //   <br />
    //   <button onClick={getAccount}>getAccount</button>
    // </div>
  );
};

export default Signup2;
