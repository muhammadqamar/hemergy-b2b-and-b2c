import SimpleReactValidator from "simple-react-validator";
import jwt_decode from "jwt-decode";
import { ethers } from "ethers";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import { setAlert } from "../redux/actions/alert";
import { addWallets } from "../redux/actions/user";
import Web3Modal from "web3modal";


let validator = new SimpleReactValidator();

export const emailValidator = (email) => {
  if (!email) {
    return false;
  }
  return validator.check(email, "email");
};

export const nameValidator = (name) => {
  return validator.check(name, "required|min:2|max:120'");
};

export const jwtTokenDecode = (token) => {
  if (token) {
    let decodedVal = jwt_decode(token);
    return decodedVal;
  }
};

export const connectMetaMaskWallet = async (
  dispatch,
  wallet,
  key,
  setLoading
) => {
  if (key === "another") {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      provider.getSigner();
      if (window.ethereum?.selectedAddress) {
        dispatch(
          setAlert({
            type: "error",
            message: "Please disconnect your first wallet",
            time: 1000,
          })
        );
      } else {
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        await provider.getBlockNumber();
        let walletAddress = await provider._getAddress("ethers.eth");
        let data = { provider: "metamask", value: walletAddress };
        if (walletAddress) {
          if (wallet[0]) {
            wallet.filter((wal, i) => {
              if (wal.value === walletAddress?.value) {
                dispatch(
                  setAlert({
                    type: "error",
                    message: "Can't use existing address",
                    time: 2000,
                  })
                );
              } else {
                dispatch(addWallets(data, setLoading));
              }
            });
          } else {
            dispatch(addWallets(data, setLoading));
          }
        }
        // return { provider: "metamask", value: walletAddress };
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      provider.getSigner();
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      await provider.getBlockNumber();
      let walletAddress = await provider._getAddress("ethers.eth");
      return { provider: "metamask", value: walletAddress };
    } catch (error) {
      console.log(error);
    }
  }
};

export const connectCoinBaseWallet = async () => {
  try {
    const APP_NAME = "My Awesome App";
    const APP_LOGO_URL = "https://example.com/logo.png";
    const DEFAULT_ETH_JSONRPC_URL =
      "https://mainnet.infura.io/v3/6be4fc6b3e494bc4bfa6965194591b77";
    const DEFAULT_CHAIN_ID = 1;

    const coinbaseWallet = new CoinbaseWalletSDK({
      appName: APP_NAME,
      appLogoUrl: APP_LOGO_URL,
      darkMode: false,
    });
    const ethereum = coinbaseWallet.makeWeb3Provider(
      DEFAULT_ETH_JSONRPC_URL,
      DEFAULT_CHAIN_ID
    );
    let response = await ethereum.request({ method: "eth_requestAccounts" });
    return { provider: "coinbase", value: response[0] };
  } catch (error) {
    console.log(error);
  }
};

export const connectMultiWallet = async (setWalletState, setModalState) => {
  try {
    const providerOptions = {
      // coinbasewallet: {
      //   package: CoinbaseWalletSDK,
      //   options: {
      //     appName: "Demo Site",
      //     infuraId: `6be4fc6b3e494bc4bfa6965194591b77`,
      //   },
      // },
    };
    let web3Modal = new Web3Modal({
      cacheProvider: false,
      providerOptions,
    });
    let web3ModalInstance = await web3Modal.connect();
    let web3ModalProvider = new ethers.providers.Web3Provider(
      web3ModalInstance
    );
    setWalletState(web3ModalProvider);
    setModalState(web3Modal);
    return web3ModalProvider;
  } catch (error) {
    console.log(error);
  }
};

export const tagFormator = (val) => {
  let index = val?.indexOf("_");
  if (index == "-1") {
    return val;
  } else {
    let lastIndex = val?.length;
    let result = `${val?.slice(0, index)} ${val?.slice(index + 1, lastIndex)}`;
    return result;
  }
};
// chase derive action alley label perfect chuckle include mercy evil tower canoe
