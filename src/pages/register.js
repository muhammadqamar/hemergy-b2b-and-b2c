import Image from "next/image";
import RegisterSlider from "@/components/Authentications/registerSlider";
import SignUp from "@/components/Authentications/signUp";
import InBox from "@/components/Authentications/inBox";
import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";

const Register = ({ query }) => {
  const [registerState, setRegisterState] = useState("");
  useEffect(() => {
    console.log(query);
    if (query?.email) {
      setRegisterState({ email: query?.email });
    } else {
      if (query?.status === "400") {
        toast.error("Email Already Exist", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      setRegisterState({ status: query?.status });
    }
  }, [query]);

  return (
    <div className="authentications-section">
      <Link href="/" className="auth-header">
        <Image src="/images/hemergy-logo.svg" width={150} height={32} alt="logo" />
      </Link>

      <div className="auth-container">
        <RegisterSlider />
        {query?.success || !!registerState?.email ? (
          <InBox setRegisterState={setRegisterState} registerState={registerState} />
        ) : (
          <SignUp setRegisterState={setRegisterState} />
        )}
      </div>

      <div className="auth-wather" />
    </div>
  );
};

export default Register;

export const getServerSideProps = (context) => {
  return {
    props: {
      query: context?.query,
    },
  };
};
