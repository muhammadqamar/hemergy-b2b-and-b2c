import { Formik } from 'formik';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getSigner } from '@/components/helpers/signer';

import Hemergy from '@hemergy/core-sdk';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import { updateuserprojects } from '@/services/user';

const CreditCard = ({ projectData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const state = useSelector((state) => state);
  var hemergy;

  useEffect(async () => {
    if (state.user.web3auth) {
    }
  }, [state.user.web3auth]);

  return (
    <div className="token-form">
      <Formik
        initialValues={{
          cardNumber: '',
          month: '',
          year: '',
          nameoncard: '',
          cvv: '',
        }}
        validate={(values) => {
          const errors = {};

          if (!values.cardNumber) {
            errors.cardNumber = 'Required';
          }

          if (!values.month) {
            errors.month = 'Required';
          }
          if (!values.year) {
            errors.year = 'Required';
          }
          if (!values.nameoncard) {
            errors.nameoncard = 'Required';
          }
          if (!values.cvv) {
            errors.cvv = 'Required';
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const updateUser = await axios.put(
              `${process.env.NEXT_PUBLIC_API_DOMAIN}/user/financials`,
              {
                ...values,
                email: userDetail?.email || 'muhammadqamar111@gmail.com',
              }
            );
            setSubmitting(false);
            console.log(updateUser);
            if (updateUser?.data?.userFound) {
              router.push('/projects');
            }
          } catch (error) {
            setSubmitting(false);
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
              <label className="p-sm text-weight-medium text-white">
                Card number
              </label>
              <div className="input-field">
                <input
                  className="p-sm"
                  placeholder=""
                  type="number"
                  name="cardNumber"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.cardNumber}
                />
                <Image
                  src="/images/credit_card.svg"
                  alt="Credit Card"
                  width={20}
                  height={20}
                />
              </div>
              <p className="error p-x-sm">
                {errors.cardNumber && touched.cardNumber && errors.cardNumber}
              </p>
            </div>

            <div className="input-box">
              <label className="p-sm text-weight-medium text-white">
                Expiry date
              </label>
              <div className="w-full flex gap-4">
                <div className="w-full">
                  <div className="input-field">
                    <input
                      className="p-sm"
                      placeholder="Month"
                      type="month"
                      name="month"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.month}
                    />
                  </div>
                  <p className="error p-x-sm">
                    {errors.month && touched.month && errors.month}
                  </p>
                </div>
                <div className="w-[155px]">
                  <div className="input-field">
                    <input
                      className="p-sm"
                      placeholder="Year"
                      type="number"
                      min="1980"
                      max="2023"
                      name="year"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.year}
                    />
                  </div>
                  <p className="error p-x-sm">
                    {errors.year && touched.year && errors.year}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full flex gap-4">
              <div className="input-box">
                <label className="p-sm text-weight-medium text-white">
                  Name on card
                </label>
                <div className="input-field">
                  <input
                    className="p-sm"
                    placeholder=""
                    type="text"
                    name="nameoncard"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.nameoncard}
                  />
                </div>
                <p className="error p-x-sm">
                  {errors.nameoncard && touched.nameoncard && errors.nameoncard}
                </p>
              </div>

              <div className="input-box w-[129px]">
                <label className="p-sm text-weight-medium text-white">
                  CVV
                </label>
                <div className="input-field">
                  <input
                    className="p-sm"
                    placeholder=""
                    type="number"
                    name="cvv"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.cvv}
                  />
                </div>
                <p className="error p-x-sm">
                  {errors.cvv && touched.cvv && errors.cvv}
                </p>
              </div>
            </div>

            <div className="gap-4 flex-box ">
              {/* <button
                className="p-lg text-weight-medium text-white rounded-xl px-2 py-3 w-full bg-red600"
                type="submit"
                disabled={isSubmitting}
              >
                Buy now
              </button> */}
            </div>
          </form>
        )}
      </Formik>
      <button
        className="p-lg text-weight-medium text-white rounded-xl px-2 py-3 w-full bg-red600"
        onClick={async () => {
          setIsLoading(true);
          const e = await state.user.web3auth.connect();

          const ethersProvider = new ethers.providers.Web3Provider(e);
          const signer = await ethersProvider.getSigner();
          console.log('signer address', await signer.getAddress());
          const hemergy = new Hemergy({
            baseURL: 'https://dev-core.hemergy.com',
            signer,
          });

          try {
            await hemergy.mint(state.user.user?.accountAddress);
            const invest = await hemergy.investInProject(
              projectData?.projectAddress,
              state.user.user?.accountAddress,
              1000
            );
            if (state.user.user?.projectsasInvestor) {
              await updateuserprojects('projectsasInvestor', {
                email: state.user?.user?.email,
                endUserAddress: state.user?.user?.endUserAddress,
                projectAddress: [
                  ...state.user.user?.projectsasInvestor,
                  {
                    projectAddress: projectData?.projectAddress,
                    amount: '123',
                    time: new Date(),
                  },
                ],
              });
            } else {
              await updateuserprojects('projectsasInvestor', {
                email: state.user?.user?.email,
                endUserAddress: state.user?.user?.endUserAddress,
                projectAddress: [
                  {
                    projectAddress: projectData?.projectAddress,
                    amount: '123',
                    time: new Date(),
                  },
                ],
              });
            }
            setIsLoading(false);
            toast.success('You have successfully Invested in this Project', {
              position: 'bottom-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light',
            });
          } catch (e) {
            setIsLoading(false);
          }
        }}
      >
        {isLoading ? <img src="/images/loader.svg" /> : 'Buy now'}
      </button>
    </div>
  );
};

export default CreditCard;
