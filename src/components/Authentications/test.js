import { Web3AuthCore } from "@web3auth/core";
import { WALLET_ADAPTERS, CHAIN_NAMESPACES } from "@web3auth/base";
const clientId =
  'BI6y343_cgGmvdwPSlCa2_tIdtPqOtkyEpPEzMxOw4Trd5LSFe5c89M7hoaso485QVpjqH01VndcKvhn1avTsAY'; // get from https://dashboard.web3auth.io

const web3auth = new Web3AuthCore({
  clientId,
  chainConfig: {
    chainNamespace: CHAIN_NAMESPACES.EIP155, // SOLANA, OTHER
    chainId: "0x1",
    rpcTarget: "https://rpc.ankr.com/eth",
    displayName: "Ethereum Mainnet",
    blockExplorer: "https://etherscan.io",
    ticker: "ETH",
    tickerName: "Ethereum",
  },
});

const openloginAdapter = new OpenloginAdapter({
  adapterSettings: {
    network: "testnet",
    uxMode: "redirect", // also support popup
    loginConfig: {
      jwt: {
        name: "test",
        verifier: "hemergyweb3auth",
        typeOfLogin: "jwt",
        clientId,
      },
    },
  },
});

web3auth.configureAdapter(openloginAdapter);

await web3auth.init();

await web3auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
  loginProvider: "jwt",
  extraLoginOptions: {
    id_token: idToken,
    verifierIdField: "sub", // same as your JWT Verifier ID
    domain: "http://localhost:3000",
  },
});