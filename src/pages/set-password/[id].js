import Image from "next/image";
import PasswordReset from "@/components/Authentications/passwordReset";

const Verification = ({ params }) => {
    return (
        <div className="authentications-section">
            <div className="auth-header">
                <Image src="/images/hemergy-logo.svg" width={150} height={32} alt="logo" />
            </div>
            <div className="auth-container">
                <PasswordReset code={params?.id} />
            </div>
            <div className="auth-wather" />
        </div>
    );
};

export default Verification;


export const getServerSideProps = (context) => {
    return {
        props: {
            params: context?.params,
        },
    };
};