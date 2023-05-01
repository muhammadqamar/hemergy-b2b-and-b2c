import RegisterSlider from "@/components/Authentications/registerSlider";
import LogIn from "@/components/Authentications/login";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { ShowError } from "@/services/error";

const Login = ({ query }) => {
  useEffect(() => {
    if (query.success === "false") {
      ShowError("Email not Exist!");
    }
  }, [query]);
  return (
    <div className="authentications-section">
      <Link href="/" className="auth-header">
        <Image src="/images/hemergy-logo.svg" width={150} height={32} alt="logo" />
      </Link>

      <div className="auth-container">
        <RegisterSlider />
        <LogIn />
      </div>

      <div className="wather-haf-white-bg" />
    </div>
  );
};

export default Login;

export const getServerSideProps = (context) => {
  return {
    props: {
      query: context?.query,
    },
  };
};
