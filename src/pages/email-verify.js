import InBox from "@/components/Authentications/inBox";
import Image from "next/image";
import Link from "next/link";


const EmailVerifyBox = ({ query }) => {

  return (
    <div className="authentications-section">
      <Link href="/" className="auth-header">
        <Image src="/images/hemergy-logo.svg" width={150} height={32} alt="logo" />
      </Link>

      <div className="auth-container">
        <InBox registerState={{email:query.email}} hideButtons />
      </div>

      <div className="wather-haf-white-bg" />
    </div>
  );
};

export default EmailVerifyBox;



export const getServerSideProps = (context) => {
  return {
    props: {
      query: context?.query,
    },
  };
};
