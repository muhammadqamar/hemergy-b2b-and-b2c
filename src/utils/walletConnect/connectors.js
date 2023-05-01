import { WagmiConfig, createClient, configureChains, mainnet } from "wagmi";

import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
// import { SequenceConnector } from '@0xsequence/wagmi-connector'
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";

import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import Profile from "./profile";

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, provider, webSocketProvider } = configureChains(
  [mainnet],
  [alchemyProvider({ apiKey: "yourAlchemyApiKey" }), publicProvider()]
);

// Set up client
const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "wagmi",
      },
    }),
    // new SequenceConnector({
    //     chains,
    //     options: {
    //       connect: {
    //         app: 'Demo-app',
    //         networkId: 137
    //       }
    //     }
    //   }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
});

// Pass client to React Context Provider
function WalletConnects({ setviewAllWallet, viewAllWallet, setisMaskConnected }) {
  return (
    <WagmiConfig client={client}>
      <Profile
        setviewAllWallet={setviewAllWallet}
        viewAllWallet={viewAllWallet}
        setisMaskConnected={setisMaskConnected}
      />
    </WagmiConfig>
  );
}

export default WalletConnects;
