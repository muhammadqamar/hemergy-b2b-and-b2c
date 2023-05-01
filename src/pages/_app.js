import Head from 'next/head';
import { hotjar } from 'react-hotjar';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';
import { store } from '@/store/store';
import { Web3AuthNoModal } from '@web3auth/no-modal';
import { WALLET_ADAPTERS, CHAIN_NAMESPACES } from '@web3auth/base';
import { OpenloginAdapter } from '@web3auth/openlogin-adapter';
import { Provider, useSelector } from 'react-redux';
import { me } from '@/services/auth';
import { useDispatch } from 'react-redux';
import { addUser } from '@/store/reducer/user';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ADAPTER_EVENTS } from '@web3auth/base';
import { setweb3authReducer } from '@/store/reducer/user';

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
  const [ready, setReady] =  useState(false)
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const web3auth = new Web3AuthNoModal({
      clientId: process.env.NEXT_PUBLIC_CLIENTID_WEB3AUTH,
      chainConfig: {
        chainNamespace: CHAIN_NAMESPACES.OTHER,
        displayName: 'Chain Name',
        ticker: 'TKR',
        tickerName: 'Ticker Name',
      },
    });
    web3auth.on(ADAPTER_EVENTS.CONNECTED, async (data) => {
      console.log('connected to wallet', web3auth);
    });

    const openloginAdapter = new OpenloginAdapter({
      adapterSettings: {
        network: 'testnet',
        uxMode: 'popup', // also support popup
        loginConfig: {
          jwt: {
            name: 'test',
            verifier: 'hemergyweb3auth',
            typeOfLogin: 'jwt',
            clientId: process.env.NEXT_PUBLIC_CLIENTID_WEB3AUTH,
          },
          google: {
            name: 'testgoogle',
            verifier: 'hemergygoogleweb3', // Please create a verifier on the developer dashboard and pass the name here
            typeOfLogin: 'google', // Pass on the login provider of the verifier you've created
            clientId:
              '502195534544-p526a6dhnh79571jnf8460ll0o2qb9q5.apps.googleusercontent.com', // Pass on the clientId of the login provider here - Please note this differs from the Web3Auth ClientID. This is the JWT Client ID
          },
        },
      },
    });

    web3auth.configureAdapter(openloginAdapter);
    await web3auth.init();
    dispatch(setweb3authReducer(web3auth));
    dispatch(addUser())
    if(web3auth.status==='connected') {
      const checkToken = await me();
      setReady(true)
      if (checkToken.status==200) {
        dispatch(addUser(checkToken.data.user));

        if (routes.pathname === "/login") {
         routes.push("/");
        }
      } else {
        if (routes.pathname !== "/login") {
          routes.push("/login");
         }
      }

    } else {
      setReady(true)
      if (routes.pathname !== "/login") {
        routes.push("/login");
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
