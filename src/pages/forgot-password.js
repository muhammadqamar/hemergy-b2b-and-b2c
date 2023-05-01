import ForgotPassword from "@/components/Authentications/forgot-password";
import Image from "next/image";

const Register = () => {
    return (
        <div className="authentications-section">
            <div className="auth-header">
                <Image src="/images/hemergy-logo.svg" width={150} height={32} alt="logo" />
            </div>

            <div className="auth-container">

                <ForgotPassword />
            </div>

            <div className="auth-wather" />
        </div>
    );
};

export default Register;
