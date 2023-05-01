import React, { useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import Image from "next/image";
const WalletCard = (props) => {
  const {
    userDetail,
    setConnButtonText,
    setErrorMessage,
    setDefaultAccount,
    setUserBalance,
    errorMessage,
    connButtonText,
  } = props;

  const connectWalletHandler = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      console.log("MetaMask Here!");

      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(async (result) => {
          console.log(result);
          var resulter = [];
          if (userDetail?.user?.wallets) {
            resulter = [
              ...userDetail?.user?.wallets,
              { provider: "Metamusk", value: result[0] },
            ];
          } else {
            resulter = [{ provider: "MetaMask", value: result[0] }];
          }
          // try {
          const updateWallet = await axios.post(
            `${process.env.NEXT_PUBLIC_API_DOMAIN}/user/wallet`,
            { wallet: resulter, email: userDetail?.email }
          );

          //   } catch (error) {

          //   }
          accountChangedHandler(result[0]);
          setConnButtonText("Wallet Connected");
          getAccountBalance(result[0]);
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    } else {
      console.log("Need to install MetaMask");
      setErrorMessage("Please install MetaMask browser extension to interact");
    }
  };

  // update account, will cause component re-render
  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    getAccountBalance(newAccount.toString());
  };

  const getAccountBalance = (account) => {
    window.ethereum
      .request({ method: "eth_getBalance", params: [account, "latest"] })
      .then((balance) => {
        setUserBalance(ethers.utils?.formatEther(balance));
      })
      .catch((error) => {
        //setErrorMessage(error.message);
      });
  };

  const chainChangedHandler = () => {
    // reload the page to avoid any errors with chain change mid use of application
    window.location.reload();
  };
  if (typeof window !== "undefined") {
    // listen for account changes
    window.ethereum?.on("accountsChanged", accountChangedHandler);

    window.ethereum?.on("chainChanged", chainChangedHandler);
  }

  return (
    <div className="px-4 py-3 bg-white shadow-smshadow rounded-xl">
      <div className="mb-3 flex-box">
        <h4 className="font-semibold p-lg"> {"Connection to MetaMask"} </h4>
        <Image
          src="/images/metamask-logo.png"
          alt="metamask"
          width={42}
          height={42}
        />
      </div>
      <button
        type="button"
        className="mb-3 btn secondary bg-textcolor"
        onClick={connectWalletHandler}
      >
        {connButtonText}
      </button>

      {errorMessage && <p className="p-sm text-red600">{errorMessage}</p>}
    </div>
  );
};

export default WalletCard;
