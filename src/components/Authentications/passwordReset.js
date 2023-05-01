import { useState } from "react";
import { Formik, Field } from "formik";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import InBox from "@/components/Authentications/inBox";

const ResetPassword = ({ code }) => {
  const [startCheckingState, setStartCheckingState] = useState(false);

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setshowConfirm] = useState(false);

  return !startCheckingState ? (
    <div className="registration-box">
      <h3 className="p-xl center-text">Set a new password</h3>

      <Formik
        initialValues={{ password: "", confirmPassword: "" }}
        validate={(values) => {
          var regularExp = new RegExp(
            "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
          );
          const errors = {};
          if (!values.password) {
            errors.password = "Required";
          } else if (!values.confirmPassword) {
            errors.confirmPassword = "Required";
          } else if (values.password !== values.confirmPassword) {
            errors.confirmPassword = "Password didn't match, Try again..!!";
          } else if (!regularExp.test(values.confirmPassword)) {
            errors.confirmPassword =
              "Minimum eight characters, at least one Upper letter, one number and one special character";
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const userFound = await axios.post(
              `${process.env.NEXT_PUBLIC_API_DOMAIN}/auth/update/password`,
              {
                ...values,
                code,
              }
            );
            setSubmitting(false);

            if (userFound?.data?.success) {
              setStartCheckingState(true);
            }
          } catch (error) {
            setSubmitting(false);

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
          <form className="form-cantainer gap-6" onSubmit={handleSubmit}>
            <div className="input-box">
              <label className="p-sm text-weight-medium">Password</label>
              <div className="input-field">
                <input
                  className="input p-sm"
                  placeholder="Password"
                  type={showPass ? "text" : "password"}
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                <div className="pointer"></div>
                <Image
                  onClick={() => {
                    setShowPass(!showPass);
                  }}
                  src="/images/visibility.svg"
                  alt="visibility"
                  width={20}
                  height={20}
                />
              </div>
              <p className="error p-x-sm">
                {errors.password && touched.password && errors.password}
              </p>
            </div>
            <div className="input-box">
              <label className="p-sm text-weight-medium">Confirm Password</label>
              <div className="input-field">
                <input
                  className="input p-sm"
                  placeholder="Confirm  Password"
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmPassword}
                />
                <div className="pointer"></div>
                <Image
                  onClick={() => {
                    setshowConfirm(!showConfirm);
                  }}
                  src="/images/visibility.svg"
                  alt="visibility"
                  width={20}
                  height={20}
                />
              </div>
              <p className="error p-x-sm">
                {errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}
              </p>
            </div>

            <button className="btn secondary blue" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <Image src="/images/loader.svg" alt="google" width={20} height={20} />
              ) : (
                "Send"
              )}
            </button>

            <div className="flex-box gap-x-sm">
              <div className="divider" />

              <div className="divider" />
            </div>

            <p className=" center-text p-sm" style={{ marginBottom: "24px" }}>
              Return to login page: &nbsp;
              <Link href="/login" className="text-weight-medium text-textcolor">
                Sign in
              </Link>
            </p>
          </form>
        )}
      </Formik>
    </div>
  ) : (
    <InBox type="password-recovery-success" hideButtons />
  );
};

export default ResetPassword;
