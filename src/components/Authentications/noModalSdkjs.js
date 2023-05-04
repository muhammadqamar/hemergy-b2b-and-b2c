import { useEffect, useState, useRef } from 'react';

import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';

import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { privateToAddress } from 'ethereumjs-util';
import { getSigner } from '../helpers/signer';
import { addUser } from '@/store/reducer/user';
import {
  investorLoginWeb3Auth,
  investorRegister,
  createCoreAccount,
} from '@/services/auth';
import RPC from '../../pages/api/etherRPC';

import React from 'react';

function App() {
  const router = useRouter();
  const [web3auth, setWeb3auth] = useState(null);
  const [provider, setProvider] = useState(null);
  const [options, setOptions] = useState(null);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const formikValidation = useRef();
  const { user } = useSelector((state) => state);
  useEffect(() => {
    if (user?.web3auth) {
      setProvider(user?.web3auth);
      setWeb3auth(user?.web3auth);
    }
  }, [user?.web3auth]);

  useEffect(() => {}, [router.query?.type]);

  const parseEvent = (contractInterface, log) => {
    const event = contractInterface.interface.parseLog(log);
    return event;
  };

  const login = async (loginProviderName) => {
    if (!web3auth) {
      console.log('web3auth not initialized yet');
      return;
    }
    console.log(web3auth);
    formikValidation.current?.setSubmitting(true);
    const web3authProvider = await web3auth.connect();

    setProvider(web3authProvider);

    const privateKey = await web3authProvider.request({
      method: 'private_key',
    });
    const getBuffer = (str) => Buffer.from(str, 'hex');

    const endUserAddress =
      '0x' + privateToAddress(getBuffer(privateKey)).toString('hex');

    const user = await web3auth.getUserInfo();
    if (user?.email && endUserAddress) {
      const checkLogin = await investorLoginWeb3Auth({
        email: user.email,
        endUserAddress: endUserAddress,
      });
      if (checkLogin.status === 200) {
        console.log(checkLogin);
        formikValidation.current?.setSubmitting(false);
        localStorage.setItem('hemergy-email', checkLogin?.data?.user?.email);
        localStorage.setItem('hemergy-token', checkLogin?.data?.token);
        dispatch(addUser(checkLogin.data.user));
        if (
          router.query.type?.toLowerCase() === 'developer' ||
          router.query.type?.toLowerCase() === 'investor'
        ) {
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
          privateKey,
          endUserAddress,
          user
        );
      }
    }
  };

  // const loginJWT = async (token) => {
  //   if (!web3auth) {
  //     uiConsole('web3auth not initialized yet');
  //     return;
  //   }

  //   // const web3authProvider = await web3auth.connectTo(WALLET_ADAPTERS.WALLET_CONNECT_V1);
  //   const web3authProvider = await web3auth.connectTo(
  //     WALLET_ADAPTERS.OPENLOGIN,
  //     {
  //       loginProvider: 'jwt',
  //       extraLoginOptions: {
  //         id_token: token,
  //         verifierIdField: 'sub', // same as your JWT Verifier ID
  //         domain: 'http://localhost:3000',
  //       },
  //     }
  //   );
  //   setProvider(web3authProvider);
  // };

  const getAccounts = async () => {
    if (!provider) {
      console.log('provider not initialized yet');
      return;
    }
    const rpc = new RPC(provider);
    const address = await rpc.getAccounts();
    console.log(address);
    return address;
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
        validate={(values) => {
          var regularExp = new RegExp(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})'
          );
          const errors = {};
          // if (!values.email) {
          //   errors.email = 'Required';
          // } else if (
          //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          // ) {
          //   errors.email = 'Invalid email address';
          // }

          // if (!values.password) {
          //   errors.password = 'Required';
          // }
          // if (!values.confirmPassword) {
          //   errors.confirmPassword = 'Required';
          // } else if (values.confirmPassword !== values.password) {
          //   errors.confirmPassword = "passowrd didn't match";
          // } else if (!regularExp.test(values.confirmPassword)) {
          //   errors.confirmPassword =
          //     'Minimum eight characters, at least one Upper letter, one number and one special character';
          // }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            // const register = await axios.post(
            //   `${process.env.NEXT_PUBLIC_API_DOMAIN}/auth/login`,
            //   values
            // );
            // setSubmitting(false);
            // console.log(register)
            // if (register?.data?.success) {
            //  // setRegisterState(values);
            //  loginJWT(register?.data.token)
            // }
            login();
            //loginJWT('register?.data.token');
            // if (updateUser?.data?.userFound) {
            //   setStep(3)
            // }
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
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form className="items-center gap-6 form-cantainer" onSubmit={handleSubmit}>
            {/* <div className="input-box">
              <label className="p-sm text-weight-medium">Email</label>
              <div className="input-field">
                <input
                  placeholder="Enter your email"
                  className="input p-sm"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
              </div>
              <p className="error p-x-sm">
                {' '}
                {errors.email && touched.email && errors.email}
              </p>
            </div> */}
            {options ?
            <div className="flex gap-[5px]">
              <div className=" cursor-pointer text-[30px] bold uppercase  w-[50%] flex h-[200px] rounded-[5px] border border-[#ccc] items-center justify-center">
                Investor
              </div>
              <div className=" cursor-pointer text-[30px] bold uppercase  w-[50%] flex h-[200px] rounded-[5px] border border-[#ccc] items-center justify-center">
                Developer
              </div>
            </div>
             :
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
}

            {/* <div className="flex-box gap-x-sm">
              <div className="divider" />
              <p className="p-sm">or</p>
              <div className="divider" />
            </div> */}

            {/* <div className="flex justify-center gap-[20px]">
              <button type="button" onClick={() => login('google')}>
                <Image
                  src="/images/Google.svg"
                  alt="google"
                  width={50}
                  height={50}
                />
              </button>
              <button type="button" onClick={() => login('twitter')}>
                <Image
                  src="/images/twitter.svg"
                  alt="google"
                  width={50}
                  height={50}
                />
              </button>
              <button type="button" onClick={() => login('linkedin')}>
                <Image
                  src="/images/Linkkedin.svg"
                  alt="google"
                  width={50}
                  height={50}
                />
              </button>
            </div> */}
          </form>
        )}
      </Formik>

      {showModal && (
        <div className="fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[800px] h-[800px] bg-blue600  p-6 rounded-xl">
          <div className="flex flex-col items-center justify-between w-full h-full">
            <button
              onClick={() => setShowModal(false)}
              className="w-auto p-1 ml-auto rounded-lg bg-blue400 text-blue800 hover:bg-blue300"
            >
              <Image
                src="/images/close.svg"
                alt="google"
                width={20}
                height={20}
              />
            </button>
            <h3 className="text-xl font-semibold text-white">
              Terms of Service
            </h3>
            <div className="p-6 space-y-6 text-white">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                With less than a month to go before the European Union enacts
                new consumer privacy laws for its citizens, companies around the
                world are updating their terms of service agreements to comply.
              </p>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                The European Union’s General Data Protection Regulation
                (G.D.P.R.) goes into effect on May 25 and is meant to ensure a
                common set of data rights in the European Union. It requires
                organizations to notify users as soon as possible of high-risk
                data breaches that could personally affect them.
              </p>
            </div>
            <button
              onClick={async () => {
                const user = await web3auth?.getUserInfo();
                const address = await getAccounts();
                const signerInformation = await createCoreAccount({
                  endUserAddress: address,
                });

                const signature = signer(
                  signerInformation.data?.domain,
                  signerInformation.data?.ForwardRequest,
                  signerInformation.data?.request
                );
                //   if(user) {
                //  const result =  await investorRegister({email:user.email,detail:user} )
                //  console.log(result)
                //    router.push('/');
                //   }
              }}
              type="button"
              className="w-full px-4 py-2 text-base font-medium rounded-lg bg-blue200 text-blue800 hover:bg-blue300"
            >
              Accept
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
