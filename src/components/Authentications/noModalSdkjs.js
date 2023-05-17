import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { ethers } from 'ethers';
import Hemergy from '@hemergy/core-sdk';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { privateToAddress } from 'ethereumjs-util';
import { getSigner } from '../helpers/signer';
import { addUser, setAccountBalance } from '@/store/reducer/user';
import {
  investorLoginWeb3Auth,
  investorRegister,
  createCoreAccount,
} from '@/services/auth';

import React from 'react';

function App() {
  const router = useRouter();
  const [web3auth, setWeb3auth] = useState(null);
  const [provider, setProvider] = useState(null);
  const [options, setOptions] = useState(null);
  const dispatch = useDispatch();

  const formikValidation = useRef();
  const { user } = useSelector((state) => state);
  useEffect(() => {
    if (user?.web3auth) {
      setProvider(user?.web3auth);
      setWeb3auth(user?.web3auth);
    }
  }, [user?.web3auth]);

  useEffect(() => {}, [router.query?.type]);

  const login = async () => {
    if (!web3auth) {
      console.log('web3auth not initialized yet');
      return;
    }

    formikValidation.current?.setSubmitting(true);
    const web3authProvider = await web3auth.connect();
    let endUserAddress
    if (web3authProvider.selectedAddress) {
      endUserAddress = web3authProvider.selectedAddress;
    } else {
      const privateKey = await web3authProvider.request({
        method: 'private_key',
      });
      const getBuffer = (str) => Buffer.from(str, 'hex');

      endUserAddress =
        '0x' + privateToAddress(getBuffer(privateKey)).toString('hex');
    }
    const user = await web3auth.getUserInfo();
    console.log('user', user);
    if (user?.email || endUserAddress) {
      const checkLogin = await investorLoginWeb3Auth({
        email: user.email,
        endUserAddress: endUserAddress,
      });
      if (checkLogin.status === 200) {

        const ethersProvider = new ethers.providers.Web3Provider(
          web3authProvider
        );
        const signer = await ethersProvider.getSigner();

        const hemergy = new Hemergy({
          baseURL: 'https://dev-core.hemergy.com',
          signer,
        });

        const balance = await hemergy.getBalance(
          checkLogin.data.user.accountAddress
        );

        let hexNumber = balance._hex;
        const bigIntNumber = BigInt(hexNumber);
        const number = Number(bigIntNumber);

        dispatch(setAccountBalance(number / Math.pow(10, 18)));
        formikValidation.current?.setSubmitting(false);
        localStorage.setItem('hemergy-email', checkLogin?.data?.user?.email);
        localStorage.setItem('hemergy-token', checkLogin?.data?.token);
        dispatch(addUser(checkLogin.data.user));
        if (
          router.query.type?.toLowerCase() === 'developer' ||
          router.query.type?.toLowerCase() === 'investor'
        ) {
          localStorage.setItem('user-type', router.query.type?.toLowerCase());
          router.push('/');
        } else {
          setOptions(true);
        }
      } else {
        const signerInformation = await createCoreAccount({
          endUserAddress: endUserAddress,
        });

        signer(
          signerInformation.data?.domain,
          {
            ForwardRequest: signerInformation.data?.ForwardRequest,
          },
          signerInformation.data?.request,
          '',
          endUserAddress,
          user
        );
      }
    }
  };

  const signer = async (
    domain,
    types,
    message,
    privateKey,
    providerDetail,
    user1
  ) => {
    const accountAddress = await getSigner(
      user?.web3auth,
      domain,
      types,
      message,
      'account'
    );
    const web3authProvider = await web3auth.connect();
    const ethersProvider = new ethers.providers.Web3Provider(
      web3authProvider
    );
    const signer1 = await ethersProvider.getSigner();
    const hemergy = new Hemergy({
      baseURL: 'https://dev-core.hemergy.com',
      signer:signer1,
    });

    const balance = await hemergy.getBalance(
      accountAddress
    );
    await hemergy.mint(accountAddress);

    dispatch(setAccountBalance(number / Math.pow(10, 18)));
    let hexNumber = balance._hex;
    const bigIntNumber = BigInt(hexNumber);
    const number = Number(bigIntNumber);

    const result = await investorRegister({
      email: user1.email,
      detail: user1,
      provider: providerDetail,
      address: accountAddress,
      //   isInvestor:router.query.type?.toLowerCase()!=="developer"? true : undefined,
      //   isDeveloper:router.query.type?.toLowerCase()==="developer"? true : undefined
    });
    if (result.status == 200) {
      formikValidation.current?.setSubmitting(false);
      localStorage.setItem('hemergy-email', result?.data?.user?.email);
      localStorage.setItem('hemergy-token', result?.data?.token);
      dispatch(addUser(result.data.user));

      if (
        router.query.type?.toLowerCase() === 'developer' ||
        router.query.type?.toLowerCase() === 'investor'
      ) {
        localStorage.setItem('user-type', router.query.type?.toLowerCase());
        router.push('/');
      } else {
        setOptions(true);
      }
    }
  };

  return (
    <>
      <Formik
        initialValues={{ email: '', password: '', confirmPassword: '' }}
        innerRef={formikValidation}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            login();
          } catch (error) {
            setSubmitting(false);
            toast.error(error?.response?.data?.status || error.message, {
              position: 'bottom-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light',
            });
          }
        }}
      >
        {({
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form
            className="items-center gap-6 form-cantainer"
            onSubmit={handleSubmit}
          >
            {options ? (
              <div className="flex items-center justify-between w-full gap-4">
                <Link
                  href="/"
                  onClick={() => {
                    localStorage.setItem('user-type', 'investor');
                  }}
                  className="cursor-pointer text-lg font-medium  uppercase  w-[50%] flex  p-3 rounded-[5px] border-[2px] border-textcolor text-textcolor items-center justify-center hover:bg-blue600 hover:text-white"
                >
                  Investor
                </Link>
                <Link
                  href="
                  /"
                  onClick={() => {
                    localStorage.setItem('user-type', 'developer');
                  }}
                  className="cursor-pointer text-lg font-medium  uppercase text-textcolor w-[50%] flex  p-3 rounded-[5px] border-[2px] border-textcolor items-center justify-center hover:bg-blue600 hover:text-white"
                >
                  developer
                </Link>
              </div>
            ) : (
              <button
                className="btn secondary blue"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Image
                    src="/images/loader.svg"
                    alt="google"
                    width={20}
                    height={20}
                  />
                ) : (
                  'Proceed'
                )}
              </button>
            )}
          </form>
        )}
      </Formik>
    </>
  );
}

export default App;
