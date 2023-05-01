import { Formik } from 'formik';
import Button from '@/utils/buttons';
import Input from '@/utils/inputFields/input';
import ReactFlagsSelect from 'react-flags-select';
import { usePlacesWidget } from 'react-google-autocomplete';
import { useState } from 'react';
import DrogAndDropFile from '@/utils/drogAndDropFiles';
import UpLoadFileAbout from '@/utils/upLoadFIleAbout';
import Image from 'next/image';
import Link from 'next/link';
import { project, setlLinkInvestments } from '@/store/reducer/newProject';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const LinkInvestmentVehicle = ({ setActive }) => {
  const [selected, setSelected] = useState('');
  const [addressManually, setAddressManually] = useState(false);
  const [addressFinder, setAddressFinder] = useState('');
  const dispatch = useDispatch();

  const { ref } = usePlacesWidget({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    onPlaceSelected: (place) => setAddressFinder(place.formatted_address),
  });
  return (
    <>
      <div className="form-info-box">
        <Image
          src="/images/info-blue.svg"
          className="flex-shrink-0"
          alt="info-blue"
          width={24}
          height={24}
        />
        <div className=" text-textblack">
          <h6 className="p-sm text-weight-semibold ">
            Creating an investment vehicle
          </h6>
          <p className="my-2 p-sm-semi text-weight-normal">
            If you haven't already contacted Hemergy to create an investment
            vehicle, please do so at&nbsp;
            <span>
              <a href="" className="text-textcolor text-weight-medium">
                info@hemergy.com
              </a>
            </span>
            &nbsp; and we will help guide you during this process <br /> <br />{' '}
            If you do not want to create an investment vehicle at this point,
            you can skip this step and publish the project, and source finance
            options later
          </p>

          <Link href="" className="text-textcolor">
            Get in touch to create
          </Link>
        </div>
      </div>
      <Formik
        initialValues={{
          companyName: '',
          companyNumber: '',
          country: '',
          addressLine1: '',
          addressLine2: '',
          city: '',
          postalCode: '',
          phoneNumber: '',
          address: addressFinder,
          manuallyAddress: '',
        }}
        enableReinitialize
        validate={(values) => {
          const errors = {};
          if (!values.companyName) {
            errors.companyName = 'Required';
          }
          if (!values.companyNumber) {
            errors.companyNumber = 'Required';
          }
          if (!selected) {
            errors.country = 'Required';
          }
          if (!values.addressLine1) {
            errors.addressLine1 = 'Required';
          }
          if (!values.city) {
            errors.city = 'Required';
          }
          if (!values.postalCode) {
            errors.postalCode = 'Required';
          }
          if (!values.phoneNumber) {
            errors.phoneNumber = 'Required';
          }
          //
          if (!values.address && !addressManually) {
            errors.address = 'Required';
          }
          if (!values.manuallyAddress && addressManually) {
            errors.manuallyAddress = 'Required';
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const project = await axios.post(
              `${process.env.NEXT_PUBLIC_API_DOMAIN}/project/create-project`,
              values
            );
            if (project.status == 200) {
              setActive(5);
              dispatch(setlLinkInvestments({ ...values, country: selected }));
            }
          } catch (error) {
            console.log(error);
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
            <Input
              label="Company name"
              placeholder="Company name"
              inputType="text"
              name="companyName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.companyName}
              errors={errors.companyName}
              touched={touched.companyName}
            />
            <Input
              label="Company number"
              placeholder="Company number"
              inputType="number"
              name="companyNumber"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.companyNumber}
              errors={errors.companyNumber}
              touched={touched.companyNumber}
            />
            <p className="p-sm text-weight-medium text-textblack">
              Company address
            </p>
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
                      name="manuallyAddress"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.manuallyAddress}
                    />
                  )}
                </div>
                <p className="error p-x-sm">
                  {!addressManually
                    ? errors.address && touched.address && errors.address
                    : errors.manuallyAddress &&
                      touched.manuallyAddress &&
                      errors.manuallyAddress}
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
              {!selected && (
                <p className="error p-x-sm">
                  {errors.country && touched.country && errors.country}
                </p>
              )}
            </div>

            <Input
              label="Address line 1"
              placeholder="Address line 1"
              inputType="text"
              name="addressLine1"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.addressLine1}
              errors={errors.addressLine1}
              touched={touched.addressLine1}
            />

            <Input
              label="Address line 2"
              placeholder="Address line 2"
              inputType="text"
              name="addressLine2"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.addressLine2}
              errors={errors.addressLine2}
              touched={touched.addressLine2}
            />

            <Input
              label="City"
              placeholder="City"
              inputType="text"
              name="city"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.city}
              errors={errors.city}
              touched={touched.city}
            />
            <Input
              label="Postal code"
              placeholder="Postal code"
              inputType="number"
              name="postalCode"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.postalCode}
              errors={errors.postalCode}
              touched={touched.postalCode}
            />

            <Input
              icon="/images/b_expand_more.svg"
              label="Company phone number"
              placeholder="Company phone number"
              inputType="tel"
              name="phoneNumber"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.phoneNumber}
              errors={errors.phoneNumber}
              touched={touched.phoneNumber}
            />

            <DrogAndDropFile label="Please upload:" list />
            <UpLoadFileAbout />
            <div className="flex items-center gap-2">
              <Button
                text="Next"
                type="submit"
                disabled={isSubmitting}
                bg="bg-textcolor"
                color
              />
              <Button
                text="Skip for now"
                onClick={() => setActive(5)}
                type="button"
                bg="bg-white"
                border
                borderColor
              />
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default LinkInvestmentVehicle;
