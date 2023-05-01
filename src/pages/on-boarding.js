import { useEffect, useState } from "react";

import Image from "next/image";

import ConnectWeb3Auth from "@/components/Authentications/connectWeb3Auth"
import RegisterSlider from "@/components/Authentications/registerSlider";
import VerificationBox from "@/components/Authentications/verification";
import InvestorProfile from "@/components/Authentications/investorProfile";
import Financials from "@/components/Authentications/financials";
import AllWalletOption from "@/utils/walletConnect/allWalletOption";
import KycVerification from "@/components/verifications/kycVerification";
import Link from "next/link";
// import WalletOption from "@/components/Authentications/walletOption";

const Verification = () => {
  const [step, setStep] = useState(6);
  const [loader, setLoading] = useState(true);
  const [userDetail, setUserDetail] = useState();

  useEffect(() => {
    setUserDetail({ email: localStorage.getItem("hemergy-email") });
  }, []);

  return (
    <div className="authentications-section">
      <Link href="/" className="auth-header">
        <Image src="/images/hemergy-logo.svg" width={150} height={32} alt="logo" />
      </Link>

      {loader && (
        <div className="auth-container">
          <RegisterSlider />
          {step === 1 && <VerificationBox userDetail={userDetail} setStep={setStep} />}
          {step === 2 && <InvestorProfile userDetail={userDetail} setStep={setStep} />}
          {step === 3 && <Financials userDetail={userDetail} setStep={setStep} />}
          {/* {step === 4 && <WalletOption userDetail={userDetail} setStep={setStep} />} */}
          {step === 4 && <AllWalletOption userDetail={userDetail} setStep={setStep} />}
          {step === 5 && <KycVerification userDetail={userDetail} setStep={setStep} />}
          {step === 6 && <ConnectWeb3Auth userDetail={userDetail} setStep={setStep} />}
        </div>
      )}

      <div className="auth-wather" />
    </div>
  );
};

export default Verification;
