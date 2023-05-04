import { useEffect, useState } from 'react';

import InvestorProfile from '@/components/Authentications/investorProfile';
import Financials from '@/components/Authentications/financials';
import KycVerification from '@/components/verifications/kycVerification';
import VerificationBox from '@/components/Authentications/verification';
import BusinessDetails from '@/components/Authentications/businessDetails';
import PaymentMethod from '@/components/Authentications/paymentMethod';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const b2cOnBoading = [
  {
    id: 1,
    tabName: 'Lets Get to know you',
  },
  {
    id: 2,
    tabName: 'Investor profile',
  },
  {
    id: 3,
    tabName: 'Financials',
  },
  {
    id: 4,
    tabName: 'Identity check',
  },
];

const b2bOnBoading = [
  {
    id: 1,
    tabName: 'Lets Get to know you',
  },
  {
    id: 2,
    tabName: 'Business details',
  },
  {
    id: 3,
    tabName: 'Payment method',
  },
  {
    id: 4,
    tabName: 'Identity check',
  },
];
const Index = () => {
  const { user } = useSelector((state) => state.user);

  const [step, setStep] = useState(1);
  const [loader, setLoading] = useState(true);
  const [userDetail, setUserDetail] = useState();
  const [userCheck, setUserCheck] = useState('');
  const router = useRouter();

  const profileRoute = router.pathname !== '/profile' && '/profile';

  useEffect(() => {
    setUserCheck(user?.userType);
  }, [userCheck]);

  useEffect(() => {
    setUserDetail({ email: localStorage.getItem('hemergy-email') });
  }, [user]);

  return (
    <div className="info-bg">
      <div className="white-frame min-h-[848px]">
        <h1 className="mb-8 p-xl-semi text-textblack">
          Hi, {user?.detail?.name}!
        </h1>

        <div className="flex flex-col items-start gap-8 md:flex-row ">
          <div className=" w-full md:w-[276px] flex flex-row flex-wrap md:flex-col gap-2 ">
            {localStorage.getItem('user-type') === 'developer'
              ? b2cOnBoading?.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setStep(item.id)}
                    className={`tab-btn w-fit whitespace-nowrap md:w-full text-left px-3 py-[10px] rounded-xl p-sm text-weight-medium ${
                      step === item.id
                        ? 'text-textcolor bg-cardbg'
                        : 'text-textblack bg-white'
                    } `}
                  >
                    {item.tabName}
                  </button>
                ))
              : b2bOnBoading?.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setStep(item.id)}
                    className={`tab-btn w-fit whitespace-nowrap md:w-full text-left px-3 py-[10px] rounded-xl p-sm text-weight-medium ${
                      step === item.id
                        ? 'text-textcolor bg-cardbg'
                        : 'text-textblack bg-white'
                    } `}
                  >
                    {item.tabName}
                  </button>
                ))}
          </div>

          {localStorage.getItem('user-type') === 'developer' ? (
            <div className="">
              {step === 1 && (
                <VerificationBox
                  userDetail={userDetail}
                  setStep={setStep}
                  profileRoute={profileRoute}
                />
              )}
              {step === 2 && (
                <InvestorProfile
                  userDetail={userDetail}
                  setStep={setStep}
                  profileRoute={profileRoute}
                />
              )}
              {step === 3 && (
                <Financials
                  userDetail={userDetail}
                  setStep={setStep}
                  profileRoute={profileRoute}
                />
              )}

              {step === 4 && (
                <KycVerification
                  userDetail={userDetail}
                  setStep={setStep}
                  profileRoute={profileRoute}
                />
              )}
            </div>
          ) : (
            <div>
              {step === 1 && (
                <VerificationBox
                  userDetail={userDetail}
                  setStep={setStep}
                  profileRoute={profileRoute}
                />
              )}
              {step === 2 && (
                <BusinessDetails
                  userDetail={userDetail}
                  setStep={setStep}
                  profileRoute={profileRoute}
                />
              )}
              {step === 3 && (
                <PaymentMethod
                  userDetail={userDetail}
                  setStep={setStep}
                  profileRoute={profileRoute}
                />
              )}
              {step === 4 && (
                <KycVerification
                  userDetail={userDetail}
                  setStep={setStep}
                  profileRoute={profileRoute}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
