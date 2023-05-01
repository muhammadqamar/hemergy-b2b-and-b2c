import { useState } from 'react';
import { Formik } from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { toast } from 'react-toastify';

const SignUp = ({ setRegisterState }) => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setshowConfirm] = useState(false);
  return (
    <div className="registration-box">
      <h3 className="p-xl center-text">Sign up to use our API</h3>
      <Formik
        initialValues={{ email: '', password: '', confirmPassword: '' }}
        validate={(values) => {
          var regularExp = new RegExp(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})'
          );
          const errors = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }

          if (!values.password) {
            errors.password = 'Required';
          }
          if (!values.confirmPassword) {
            errors.confirmPassword = 'Required';
          } else if (values.confirmPassword !== values.password) {
            errors.confirmPassword = "passowrd didn't match";
          } else if (!regularExp.test(values.confirmPassword)) {
            errors.confirmPassword =
              'Minimum eight characters, at least one Upper letter, one number and one special character';
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const register = await axios.post(
              `${process.env.NEXT_PUBLIC_API_DOMAIN}/auth/register?type=developer`,
              values
            );
            setSubmitting(false);
            if (register?.data?.success) {
              setRegisterState(values);
            }

            // if (updateUser?.data?.userFound) {
            //   setStep(3)
            // }
          } catch (error) {
            setSubmitting(false);
            toast.error(error?.response?.data?.status || error.message, {
              position: 'bottom-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light',
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
          <form className="gap-6 form-cantainer" onSubmit={handleSubmit}>
            <div className="input-box">
              <label className="p-sm text-weight-medium">Email</label>
              <div className="input-field">
                <input
                  placeholder="Enter your email"
                  className="input p-sm"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
              </div>
              <p className="error p-x-sm">
                {' '}
                {errors.email && touched.email && errors.email}
              </p>
            </div>
            <div className="input-box">
              <label className="p-sm text-weight-medium">Password</label>
              <div className="input-field">
                <input
                  className="input p-sm"
                  placeholder="Password"
                  type={showPass ? 'text' : 'password'}
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
              <label className="p-sm text-weight-medium">
                Confirm Password
              </label>
              <div className="input-field">
                <input
                  className="input p-sm"
                  placeholder="confirm password"
                  type={showConfirm ? 'text' : 'password'}
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
                {errors.confirmPassword &&
                  touched.confirmPassword &&
                  errors.confirmPassword}
              </p>
            </div>

            <button
              className="btn secondary blue"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Image
                  src="/images/loader.svg"
                  alt="google"
                  width={20}
                  height={20}
                />
              ) : (
                'Sign up'
              )}
            </button>

            <div className="flex-box gap-x-sm">
              <div className="divider" />
              <p className="p-sm">or</p>
              <div className="divider" />
            </div>

            <button
              type="button"
              className="flex-box fit-width gap-x-sm btn-border secondary"
              onClick={() =>
                (window.location = `${process.env.NEXT_PUBLIC_API_DOMAIN}/auth/google-register`)
              }
            >
              <Image
                src="/images/Google.svg"
                alt="google"
                width={20}
                height={20}
              />
              Sign up with Google
            </button>

            <p className=" center-text p-sm">
              Already a member?&nbsp;
              <Link href="/login" className="text-weight-medium text-textcolor">
                Sign in
              </Link>
            </p>
            <p className=" center-text p-sm" style={{ marginBottom: '24px' }}>
              Only want to invest in projects?&nbsp;
              <a
                target="blank"
                href={`${process.env.NEXT_PUBLIC_B2C_URL}/register`}
                className="text-weight-medium text-textcolor"
              >
                Sign up here
              </a>
            </p>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
