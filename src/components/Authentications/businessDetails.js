import { Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { updateBusinessdetails } from '@/services/user';
import { useRouter } from 'next/router';
import { addUser } from '@/store/reducer/user';
import Link from 'next/link';
import Image from 'next/image';
import { usePlacesWidget } from 'react-google-autocomplete';
import { useState } from 'react';

const BusinessDetails = ({ setStep, userDetail, profileRoute }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.user);
  const [addressManually, setAddressManually] = useState(false);
  const [addressFinder, setAddressFinder] = useState('');

  const { ref } = usePlacesWidget({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    onPlaceSelected: (place) => setAddressFinder(place.formatted_address),
  });

  return (
    <div className={`registration-box ${!profileRoute && 'p-none'}`}>
      <div className="flex-box d-column gap-x-sm">
        {profileRoute && <h6 className="p-lg center-text ">Step 3 of 4</h6>}
        <h3 className="p-xl center-text">Business details</h3>
      </div>
      <Formik
        initialValues={{
          businessName: user?.businessDetails?.businessName || '',
          financialLegalNumber:
            user?.businessDetails?.financialLegalNumber || '',
          address: user?.businessDetails?.businessAddress || addressFinder,
        }}
        validate={(values) => {
          const errors = {};

          if (!values.businessName) {
            errors.businessName = 'Required';
          }

          if (!values.financialLegalNumber) {
            errors.financialLegalNumber = 'Required';
          }

          if (!values.address && !addressManually) {
            errors.address = 'Required';
          }
          if (!values.manuallyAddress && addressManually) {
            errors.manuallyAddress = 'Required';
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          const result = await updateBusinessdetails({
            ...values,
            email: userDetail?.email,
            endUserAddress: user?.endUserAddress,
          });
          setSubmitting(false);
          if (result?.data?.userFound) {
            dispatch(addUser(result?.data?.userFound));
            !profileRoute && setStep(3);
            if (
              user?.questionnaire.filter(
                (data) =>
                  data.question === 'Are you familiar with cryptocurrencies?'
              )?.[0]?.selectedAnswers
            ) {
              profileRoute && setStep(4);
            } else {
              profileRoute && setStep(5);
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
              <label className="p-sm text-weight-medium">Business name</label>

              <div className="input-field">
                <input
                  className="input p-sm"
                  placeholder="Business Name"
                  type="text"
                  name="businessName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.businessName}
                />
              </div>
              <p className="error p-x-sm">
                {errors.businessName &&
                  touched.businessName &&
                  errors.businessName}
              </p>
            </div>

            <div className="input-box">
              <label className="p-sm text-weight-medium">
                Financial / legal number thing
              </label>
              <div className="input-field">
                <input
                  className="input p-sm"
                  placeholder=""
                  type="number"
                  name="financialLegalNumber"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.financialLegalNumber}
                />
              </div>
              <p className="error p-x-sm">
                {errors.financialLegalNumber &&
                  touched.financialLegalNumber &&
                  errors.financialLegalNumber}
              </p>
            </div>

            <div className="input-box">
              <label className="p-sm text-weight-medium">
                Business address
              </label>
              <>
                <div className="input-field">
                  <Image
                    src="/images/search.svg"
                    alt="google"
                    width={20}
                    height={20}
                  />
                  {ref && !addressManually && (
                    <input
                      className={`input p-sm`}
                      ref={ref}
                      placeholder="Start typing the address"
                      type="text"
                      autocomplete
                      name="address"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.address}
                    />
                  )}
                  {addressManually && (
                    <input
                      className="input p-sm"
                      placeholder="Start typing the manually address"
                      type="text"
                      name="address"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.address}
                    />
                  )}
                </div>
                <p className="error p-x-sm">
                  {errors.address && touched.address && errors.address}
                </p>
              </>
            </div>
            {!addressManually ? (
              <Link
                href="javascript: void(0)"
                onClick={() => setAddressManually(true)}
                className="p-sm text-weight-medium text-textcolor"
              >
                Enter address manually
              </Link>
            ) : (
              <Link
                href="javascript: void(0)"
                onClick={() => setAddressManually(false)}
                className="p-sm text-weight-medium text-textcolor"
              >
                Address finder
              </Link>
            )}

            {profileRoute === false ? (
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
                  'Save'
                )}
              </button>
            ) : (
              <div className="gap-4 flex-box">
                <button
                  onClick={() => setStep(2)}
                  type="button"
                  className="justify-center flex-box gap-x-sm btn-border secondary"
                >
                  Back
                </button>
                <button
                  className="btn secondary blue "
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? '.....' : 'Next'}
                </button>
              </div>
            )}
          </form>
        )}
      </Formik>
    </div>
  );
};

export default BusinessDetails;
