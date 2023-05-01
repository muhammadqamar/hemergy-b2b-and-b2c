import { useState } from "react";
import { Formik, Field } from "formik";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import InBox from "@/components/Authentications/inBox";

const ForgetPassword = () => {
  const [startCheckingState, setStartCheckingState] = useState(false);
  const [registerState, setRegisterState] = useState("");

  return !startCheckingState ? (
    <div className="registration-box">
      <h3 className="p-xl center-text">Can't connect?</h3>
      <p className=" text-[20px] center-text">we will send a recovery link to:</p>
      <Formik
        initialValues={{ email: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = "Invalid email address";
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const userFound = await axios.post(
              `${process.env.NEXT_PUBLIC_API_DOMAIN}/auth/forgot/password`,
              values
            );
            setSubmitting(false);

            if (userFound?.data?.success) {
              setStartCheckingState(true);
              setRegisterState(values);
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
              <label className="p-sm text-weight-medium">Email</label>
              <div className="input-field">
                <input
                  placeholder="Email"
                  className="input p-sm"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
              </div>
              <p className="error p-x-sm"> {errors.email && touched.email && errors.email}</p>
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
    <InBox type="password-recovery" registerState={registerState} hideButtons />
  );
};

export default ForgetPassword;
