import Image from "next/image";
import React, { useEffect, useState } from "react";




// import { addWallets } from "../../redux/actions/user";
// import { setAlert } from "../../redux/actions/alert";
import { useWeb3React } from "@web3-react/core";
import {
  CoinbaseWallet,
  Injected,
  WalletConnect,
} from "@/functions/connectors";
import { useRouter } from "next/router";

const ConnectWallet = () => {
  let router = useRouter();
  //let wallet = useSelector((state) => state.auth?.user?.walletAddresses);
  let [walletSelector, setWalletSelector] = useState("");
  let [walletState, setWalletState] = useState();
  const { activate, deactivate, active, chainId, account, library } =
    useWeb3React();


  const handleWallet = async (provider) => {
    try {
      console.log(provider);
      await activate(provider);
      setWalletState(!walletState);
    } catch (error) {
      console.log(error);
    }
  };

  const walletsToSave = (backWallets, isWalletExists, newWallet) => {
    // if (isWalletExists[0])
    //   return dispatch(
    //     setAlert({
    //       type: "warning",
    //       message: "Can't use existing wallet",
    //       time: 1000,
    //     })
    //   );
    let allWallets = [...backWallets];
    allWallets.push(newWallet);
   // dispatch(addWallets(allWallets, setLoading));
  };

  useEffect(() => {
    if (walletState != undefined && account) {
      let isWalletExists = wallet?.filter((item, i) => item?.value === account);
      let { isCoinbaseWallet, isMetaMask } = library?.provider;
      let data = {
        value: account,
      };
      if (isCoinbaseWallet) data.provider = "Coinbase";
      else if (isMetaMask) data.provider = "Metamask";
      else if (!isCoinbaseWallet || !isMetaMask) data.provider = "Other";
      walletsToSave(wallet, isWalletExists, data);
    }
  }, [walletState]);

  return (
    <div >
      <div variant="h2">Connect your wallet</div>
      {/* <div className={styles.wallet_selectors}>
        <div>
          <small
            className={
              walletSelector === "qrcode" ? styles.active_wallet : styles.wallet
            }
            onClick={() => setWalletSelector("qrcode")}
          >
            Qr Code
          </small>
        </div>
        <div>
          <small
            className={
              walletSelector === "desktop"
                ? styles.active_wallet
                : styles.wallet
            }
            onClick={() => setWalletSelector("desktop")}
          >
            Desktop
          </small>
        </div>
      </div> */}
      {walletSelector === "qrcode" ? (
        <div >
          <small>Scan QR code with a WalletConnect-compatible wallet</small>
          <Image
            src="//images/questionaire/mock_qr.png"
            width={213}
            height={213}
            objectFit="contain"
            alt="mock qr code"
          />
          <span>Copy to clipboard</span>
        </div>
      ) : (
        <div >
          {/* <div className={styles.custom_input}>
            <Image
              src="//images/questionaire/serach_icon.png"
              width={16}
              height={16}
              objectFit="contain"
              alt="search icon"
            />
            <input type="text" placeholder="Search a wallet" />
          </div> */}
          <div >
            <div container>
              <div item xs={12} md={4} lg={3}>
                <div

                  onClick={() => handleWallet(Injected)}
                >
                  {/* <Image
                    src="//images/questionaire/metamask_logo.png"
                    width={50}
                    height={50}
                    objectFit="contain"
                    alt="mock search result"
                  /> */}
                  <small>Meta Mask</small>
                </div>
               </div>
              <div item xs={12} md={4} lg={3}>
                <div

                  onClick={() => handleWallet(CoinbaseWallet)}
                >
                  {/* <Image
                    src="//images/questionaire/coinbase_logo.png"
                    width={50}
                    height={50}
                    objectFit="contain"
                    alt="mock search result"
                  /> */}
                  <small>Coinbase</small>
                </div>
               </div>
              <div item xs={12} md={4} lg={3}>
                <div

                  onClick={() => handleWallet(WalletConnect)}
                >
                  {/* <Image
                    src="//images/wallet_connect.png"
                    width={50}
                    height={50}
                    objectFit="contain"
                    alt="mock search result"
                  /> */}
                  <small>Wallet Connect</small>
                </div>
               </div>
             </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ConnectWallet;
