import { useEffect, useState } from 'react';

import Image from 'next/image';

import RegisterSlider from '@/components/Authentications/registerSlider';
import VerificationBox from '@/components/Authentications/verification';
import BusinessDetails from '@/components/Authentications/businessDetails';
import PaymentMethod from '@/components/Authentications/paymentMethod';
import AllWalletOption from '@/utils/walletConnect/allWalletOption';
import KycVerification from '@/components/verifications/kycVerification';
import Link from 'next/link';
// import WalletOption from "@/components/Authentications/walletOption";

const Verification = () => {
  const [step, setStep] = useState(1);
  const [loader, setLoading] = useState(true);
  const [userDetail, setUserDetail] = useState();

  useEffect(() => {
    setUserDetail({ email: localStorage.getItem('hemergy-email') });
  }, []);

  return (
    <div className="authentications-section">
      <Link href="/" className="auth-header">
        <Image
          src="/images/hemergy-logo.svg"
          width={150}
          height={32}
          alt="logo"
        />
      </Link>

      {loader && (
        <div className="auth-container">
          <RegisterSlider />
          {step === 1 && (
            <VerificationBox userDetail={userDetail} setStep={setStep} />
          )}
          {step === 2 && (
            <BusinessDetails userDetail={userDetail} setStep={setStep} />
          )}
          {step === 3 && (
            <PaymentMethod userDetail={userDetail} setStep={setStep} />
          )}

          {step === 4 && (
            <AllWalletOption userDetail={userDetail} setStep={setStep} />
          )}
        </div>
      )}

      <div className="auth-wather" />
    </div>
  );
};

export default Verification;
