import { useState, useEffect } from 'react';
import { Formik, Field } from 'formik';
import SumsubWebSdk from '@sumsub/websdk-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { getKYCAccessToken, kycVerified } from '@/store/actions/auth';
import { updatekyc } from '@/services/user';
import React from 'react';
// import WalletConnects from "./connectors";

const KycVerification = ({ setStep, userDetail, profileRoute }) => {
  const dispatch = useDispatch();
  let router = useRouter();
  const [viewAllWallet, setviewAllWallet] = useState(false);
  const user = useSelector((state) => state.user?.user);
  let [kycToken, setKycToken] = useState({
    token: '',
  });

  const sumsubConfig = {
    lang: 'ru-RU',
    email: 'muhammadqamar111@gmail.com',
    i18n: {
      document: {
        subTitles: {
          IDENTITY: 'Upload a document that proves your identity',
        },
      },
    },
    onMessage: (type, payload) => {
      console.log('WebSDK onMessage', type, payload);
    },
    uiConf: {
      customCssStr:
        ':root {\n  --black: #000000;\n   --grey: #F5F5F5;\n  --grey-darker: #B2B2B2;\n  --border-color: #DBDBDB;\n}\n\np {\n  color: var(--black);\n  font-size: 16px;\n  line-height: 24px;\n}\n\nsection {\n  margin: 40px auto;\n}\n\ninput {\n  color: var(--black);\n  font-weight: 600;\n  outline: none;\n}\n\nsection.content {\n  background-color: var(--grey);\n  color: var(--black);\n  padding: 40px 40px 16px;\n  box-shadow: none;\n  border-radius: 6px;\n}\n\nbutton.submit,\nbutton.back {\n  text-transform: capitalize;\n  border-radius: 6px;\n  height: 48px;\n  padding: 0 30px;\n  font-size: 16px;\n  background-image: none !important;\n  transform: none !important;\n  box-shadow: none !important;\n  transition: all 0.2s linear;\n}\n\nbutton.submit {\n  min-width: 132px;\n  background: none;\n  background-color: var(--black);\n}\n\n.round-icon {\n  background-color: var(--black) !important;\n  background-image: none !important;\n}',
    },
    onError: (error) => {
      console.error('WebSDK onError', error);
    },
  };
  useEffect(() => {
    // setLoading(true);
    getKYCAccessToken().then((token) => {
      console.log('token', token);
      setKycToken({ token: token?.token?.token });
      // setLoading(false);
    });
  }, []);
  const onSumsubVerified = async (payload) => {
    if (payload.reviewStatus && payload.reviewStatus === 'completed')
      console.log(payload);
    dispatch(kycVerified(payload));
    if (payload?.reviewStatus) {
      const result = await updatekyc({
        kyc: payload,
        email: user?.email,
        endUserAddress: user?.endUserAddress,
      });
    }
  };
  return (
    <div className={`registration-box ${!profileRoute && 'p-none'}`}>
      <div className="flex-box d-column gap-x-sm">
        {profileRoute && <h6 className="p-lg center-text ">Step 5 of 5</h6>}
        <h3 className="p-xl center-text">Identity check</h3>
      </div>
      <Formik
        initialValues={{}}
        onSubmit={async (values, { setSubmitting }) => {}}
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
          <form className="form-cantainer" onSubmit={handleSubmit}>
            <div
              className="form-cantainer"
              role="group"
              aria-labelledby="checkbox-group"
            >
              <div className="flex-box">
                <p className="p-sm-semi font-medium  text-center text-textblack">
                  As our activity is regulated, we verify the identity of all
                  our customers according to the law. In order to participate
                  into projects hold on our platform, please get verified
                </p>
              </div>
              {user.kyc.reviewStatus === 'complete' ||
              user.kyc.reviewStatus === 'completed' ? (
                <>already verified</>
              ) : (
                <div className="flex justify-center items-center w-full">
                  {kycToken?.token ? (
                    <SumsubWebSdk
                      className="w-full"
                      accessToken={kycToken?.token}
                      updateAccessToken={() => {}}
                      expirationHandler={() => Promise.resolve(kycToken?.token)}
                      config={sumsubConfig}
                      options={{
                        addViewportTag: false,
                        adaptIframeHeight: true,
                      }}
                      onMessage={(type, payload) => {
                        onSumsubVerified(payload);
                      }}
                      onError={(data) => console.log('onError', data)}
                    />
                  ) : null}
                </div>
              )}

              {/* <div className="flex  ml-2 gap-1.5">
                <Image src="/images/computer.svg" alt="logo" width={17} height={13} />
                <p className="p-sm-semi  text-textcolor">Desktop</p>
              </div> */}
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default KycVerification;
