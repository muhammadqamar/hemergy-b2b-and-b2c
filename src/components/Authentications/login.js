import { useState } from 'react';
import { Formik, Field } from 'formik';
import Image from 'next/image';
import Link from 'next/link';

import InBox from '@/components/Authentications/inBox';
import { useSelector, useDispatch } from 'react-redux';
import { addUser } from '@/store/reducer/user';
import { useRouter } from 'next/router';

import { investorLogin } from '@/services/auth';

const SignIn = () => {
  const [startCheckingState, setStartCheckingState] = useState(false);
  const user = useSelector((state) => state.user);
  const [showPass, setShowPass] = useState(false);
  const [registerState, setRegisterState] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();
  console.log('user', user);
  return user?.isVerified || !startCheckingState ? (
    <div className="registration-box">
      <h3 className="p-xl center-text">Sign In to Hemergy</h3>
      <Formik
        initialValues={{ email: '', password: '', checked: [] }}
        validate={(values) => {
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
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          const userFound = await investorLogin(values);
          setSubmitting(false);
          if (userFound?.data) {
            setRegisterState({
              email: userFound?.data?.user?.email,
              passowrd: userFound?.data?.user?.password,
            });
            dispatch(addUser(userFound?.data?.user));
            if (userFound?.data?.user?.isVerified) {
              localStorage.setItem(
                'hemergy-email',
                userFound?.data?.user?.email
              );
              localStorage.setItem('hemergy-token', userFound?.data?.token);
              if (userFound?.data?.user?.firstName) {
                router.push('/');
              } else {
                router.push('/on-boarding');
              }
            } else {
              setStartCheckingState(true);
            }
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
                  placeholder="Email"
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

            <div className="flex-box">
              <div role="group" aria-labelledby="checkbox-group">
                {/* <label className="flex-box gap-x-sm ">
                  <Field className="checkbox" type="checkbox" name="checked" value="Remember me" />
                  <p className="p-sm">Remember me</p>
                </label> */}
              </div>
              <Link
                href="/forgot-password"
                className="p-sm text-weight-medium p-link"
              >
                Forgot password?
              </Link>
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
                'Sign In'
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
                (window.location = `${process.env.NEXT_PUBLIC_API_DOMAIN}/auth/google-login`)
              }
            >
              <Image
                src="/images/Google.svg"
                alt="google"
                width={20}
                height={20}
              />
              Sign In with Google
            </button>

            <p className=" center-text p-sm" style={{ marginBottom: '24px' }}>
              Create a new Account &nbsp;
              <Link
                href="/register"
                className="text-weight-medium text-textcolor"
              >
                Sign up
              </Link>
            </p>
          </form>
        )}
      </Formik>
    </div>
  ) : (
    <InBox registerState={registerState} setRegisterState={setRegisterState} />
  );
};

export default SignIn;
