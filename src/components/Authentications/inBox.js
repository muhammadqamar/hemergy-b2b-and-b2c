import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import Image from "next/image";
import { useRouter } from "next/router";

const InBox = ({ setRegisterState, registerState, type, hideButtons }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  return (
    <div className="registration-box">
      <div className="inbox-img flex-box">
        <img
          src={
            type === "password-recovery-success" ? " /images/tickmark.svg" : "/images/favorite.svg"
          }
          alt="inbox"
        />
      </div>
      <h4 className="p-xl center-text">
        {type === "password-recovery-success" ? "Password reset Successfully" : "Check your inbox!"}
      </h4>
      <p
        className="p-sm center-text"
        style={{ display: type === "password-recovery-success" ? "none" : "block" }}
      >
        {type == "password-recovery" ? (
          <>
            We have sent you a recovery link to:<strong> {registerState?.email} </strong>
            to complete password-recovery
          </>
        ) : (
          <>
            Please follow the confirmation link sent to email address{" "}
            <strong> {registerState?.email} </strong>
            to complete registration
          </>
        )}
      </p>
      {!hideButtons && (
        <div className="flex-box d-column gap-sm">
          {registerState?.status !== "400" && (
            <button
              onClick={async () => {
                try {
                  setIsSubmitting(true);
                  const userFound = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_DOMAIN}/auth/sendEmailAgain`,
                    { email: registerState?.email, passowrd: registerState?.password }
                  );

                  if (userFound?.data?.success) {
                    setIsSubmitting(false);
                    toast.success(userFound?.data?.status, {
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
                } catch (error) {
                  setIsSubmitting(false);
                  toast.error(error?.response?.data?.status || error.message, {
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
              }}
              className="btn secondary blue"
            >
              {isSubmitting ? (
                <Image src="/images/loader.svg" alt="google" width={20} height={20} />
              ) : (
                "Resend email"
              )}
            </button>
          )}

          <button
            onClick={() => {
              setRegisterState("");
              router.push("/register");
            }}
            className=" btn-border secondary"
          >
            Sign up with a different email
          </button>
        </div>
      )}
      {!hideButtons && (
        <p className="mb-6 center-text p-sm">
          Already a member?&nbsp;
          <Link href="/login" className="text-textcolor text-weight-medium">
            Sign in
          </Link>
        </p>
      )}
    </div>
  );
};

export default InBox;
