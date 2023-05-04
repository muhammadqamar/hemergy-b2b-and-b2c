import { useState, useMemo } from 'react';
import { Formik, Field } from 'formik';
import { usePlacesWidget } from 'react-google-autocomplete';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '@/services/user';
import { addUser } from '@/store/reducer/user';
import ReactFlagsSelect from 'react-flags-select';
const Verification = ({ setStep, profileRoute }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.user);
  const [selected, setSelected] = useState('');
  const [addressManually, setAddressManually] = useState(false);

  const [addressFinder, setAddressFinder] = useState('');

  const { ref } = usePlacesWidget({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    onPlaceSelected: (place) => setAddressFinder(place.formatted_address),
  });

  return (
    <div className={`registration-box ${!profileRoute && 'p-none'}`}>
      <div className="flex-box d-column gap-x-sm">
        {profileRoute && <h6 className="p-lg center-text ">Step 1 of 5</h6>}

        <h3 className="p-xl center-text">Let’s get to know you</h3>
      </div>

      <Formik
        initialValues={{
          name: user?.detail?.name || '',
          surname: user?.detail?.surname || '',
          birthDate: user?.detail?.birthDate?.split('T')?.[0] || '',
          country: user?.detail?.country || '',
          address: user?.detail?.address || addressFinder,
        }}
        enableReinitialize
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = 'Required';
          }
          if (!values.surname) {
            errors.surname = 'Required';
          }
          if (!values.birthDate) {
            errors.birthDate = 'Required';
          }
          if (!selected) {
            errors.country = 'Required';
          }
          if (!values.address && !addressManually) {
            errors.address = 'Required';
          }
          if (!values.manuallyAddress && addressManually) {
            errors.manuallyAddress = 'Required';
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting, setFieldValue }) => {
          const result = await updateUser({
            detail: { ...user.detail, ...values },
            country: selected,
            email: user?.email,
            endUserAddress: user?.endUserAddress,
          });
          if (result?.data?.userFound) {
            dispatch(addUser(result?.data?.userFound));
            setStep(2);
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
            <div className="flex-col flex-box gap-sm sm:flex-row">
              <div className="input-box">
                <label className="p-sm text-weight-medium">First name</label>
                <div className="input-field">
                  <input
                    className="input p-sm"
                    placeholder="Name"
                    type="name"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                </div>
                <p className="error p-x-sm">
                  {' '}
                  {errors.name && touched.name && errors.name}
                </p>
              </div>

              <div className="input-box">
                <label className="p-sm text-weight-medium">Last name</label>
                <div className="input-field">
                  <input
                    className="input p-sm"
                    placeholder="Surname"
                    type="surname"
                    name="surname"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.surname}
                  />
                </div>
                <p className="error p-x-sm">
                  {errors.surname && touched.surname && errors.surname}
                </p>
              </div>
            </div>

            <div className="input-box">
              <label className="p-sm text-weight-medium">Birth date</label>
              <div className="input-field">
                <input
                  className="input p-sm"
                  placeholder=""
                  type="date"
                  name="birthDate"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.birthDate}
                />
              </div>
              <p className="error p-x-sm">
                {errors.birthDate && touched.birthDate && errors.birthDate}
              </p>
            </div>
            <div className="input-box">
              <label className="p-sm text-weight-medium">Country</label>
              <div className="input-field">
                <ReactFlagsSelect
                  className="w-full p-sm text-weight-medium country-drop-main "
                  selectButtonClassName="country-drop-list"
                  selected={selected}
                  fullWidth={true}
                  onSelect={(code) => setSelected(code)}
                />
              </div>
              <p className="error p-x-sm">
                {errors.country && touched.country && errors.country}
              </p>
            </div>

            <div className="input-box">
              <label className="p-sm text-weight-medium">
                {addressManually ? 'Enter address manually' : 'Address finder'}
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
              ) : profileRoute === false ? (
                'Save'
              ) : (
                'Next'
              )}
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Verification;
