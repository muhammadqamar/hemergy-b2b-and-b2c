import { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/modal";
import RPC from "./api/etherRPC.js";

import { providers, Signer } from "ethers";

const Signup2 = () => {
  const [web3auth, setWeb3auth] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(async () => {
    // Initialize Web3Auth modal
    const web3auth = new Web3Auth({
      clientId:
        "BOweQo3kUPEy3FhGecCQrT30eF99IpGky0kIrCwev_wuSbCBvCQmSHpMVQTIa2yL6p0c6FB_sC5J-cIbhBNGOKs",
      chainConfig: {
        chainNamespace: "eip155",
        chainId: "0x1", // Please use 0x5 for Goerli Testnet
      },
    });

    setWeb3auth(web3auth);

    await web3auth.initModal();
    if (web3auth.provider) {
      setProvider(web3auth.provider);
    }

    return () => {
      // Cleanup code if necessary
    };
  }, []);

  const login = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
  };

  const getUserInfo = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const user = await web3auth.getUserInfo();
    console.log("🚀 ~ file: signup-web3auth.js:46 ~ getUserInfo ~ user:", user);
  };

  const logout = async () => {
    if (!web3auth) {
      console.log("provider not initialized yet");
      return;
    }

    await web3auth.logout();
    setProvider(null);
  };

  const signMessage = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }

    const rpc = new RPC(provider);
    const signedMessage = await rpc.signMessage();
    console.log(signedMessage);
  };

  const getAccount = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }

    const rpc = new RPC(provider);
    const address = await rpc.getAccounts();
    console.log(address);
  };

  return (
    <div className="authentications-section" style={{ padding: "10px" }}>
      <button onClick={login}>login</button>
      <br />
      <button onClick={getUserInfo}>user info</button>
      <br />
      <button onClick={logout}>logout</button>
      <br />
      <button onClick={signMessage}>signMessage</button>
      <br />
      <button onClick={getAccount}>getAccount</button>
    </div>
  );
};

export default Signup2;
