import Head from 'next/head';
import { hotjar } from 'react-hotjar';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';
import { store } from '@/store/store';
import { ethers } from 'ethers';
import { Web3Auth } from '@web3auth/modal';
import { CHAIN_NAMESPACES } from '@web3auth/base';
import { OpenloginAdapter } from '@web3auth/openlogin-adapter';
import { Provider, useSelector } from 'react-redux';
import { me } from '@/services/auth';
import { useDispatch } from 'react-redux';
import { addUser, setSignerToRedux } from '@/store/reducer/user';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ADAPTER_EVENTS } from '@web3auth/base';
import { setweb3authReducer } from '@/store/reducer/user';
import Hemergy from '@hemergy/core-sdk'

import '@/styles/globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    hotjar.initialize(3369122, 6);
  }, []);

  return (
    <>
      <Head>
        <title>Hemergy</title>
        <meta name="description" content="Hemergy  page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favi.svg" />
      </Head>
      <ToastContainer />

      <Provider store={store}>
        <AppPass Component={Component} pageProps={pageProps} />
      </Provider>
    </>
  );
}

const AppPass = ({ Component, pageProps }) => {
  const dispatch = useDispatch();
  const routes = useRouter();
  const [ready, setReady] = useState(false);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const web3auth = new Web3Auth({
      clientId: process.env.NEXT_PUBLIC_CLIENTID_WEB3AUTH,
      chainConfig: {
        chainNamespace: CHAIN_NAMESPACES.EIP155, // SOLANA, OTHER
        chainId: '0x7a69',
        rpcTarget: 'https://dev-node.hemergy.com',
        displayName: 'Ethereum Mainnet',

        ticker: 'ETH',
        tickerName: 'Ethereum',
      },
      uiConfig: {
        theme: 'light',
        loginMethodsOrder: ['facebook', 'google'],
        appLogo: 'https://hemergy-seven.vercel.app/images/hemergy-logo.svg', // Your App Logo Here
        loginMethodsOrder:["google", "linkedin", "twitter","apple", "reddit", "discord", "twitch", , "line", "github", "kakao", "linkedin", "weibo", "wechat", "email_passwordless"]
      },
      defaultLanguage: 'en',
      modalZIndex: '99998',
    });
    web3auth.on(ADAPTER_EVENTS.CONNECTED, async (data) => {
      // console.log('connected to wallet', data);
    });

    const openloginAdapter = new OpenloginAdapter({
      adapterSettings: {
        network: 'testnet',
        uxMode: 'popup', // also support popup

      },
    });

    web3auth.configureAdapter(openloginAdapter);
    await web3auth.initModal();


    if (web3auth?.status == 'connected') {
      const web3authProvider = await web3auth.connect();
      const ethersProvider = new ethers.providers.Web3Provider(
        web3authProvider
      );
      const signer = await  ethersProvider.getSigner();
      console.log(signer)
      const address = await signer?.getAddress();
      console.log('address on ethers', address)

      // const account = await hemergy?.createAccount();
      // console.log('account information', account)


    }
    dispatch(setweb3authReducer(web3auth));
    dispatch(addUser());

    if (web3auth.status === 'connected') {
      const checkToken = await me();
      setReady(true);
      if (checkToken.status == 200) {
        dispatch(addUser(checkToken.data.user));

        if (routes.pathname === '/login') {
          routes.push('/');
        }
      } else {
        if (routes.pathname !== '/login') {
          routes.push('/login');
        }
      }
    } else {
      setReady(true);
      if (routes.pathname !== '/login') {
        routes.push('/login');
      }
    }
  };

  return (
    <div>
      {ready ? (
        <Component {...pageProps} />
      ) : (
        <div className="loader-hemergy">
          <Image src="/images/logo_cue.svg" alt="logo" width={52} height={52} />
        </div>
      )}
    </div>
  );
};
