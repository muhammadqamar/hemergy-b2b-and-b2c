import { Formik, Field } from "formik";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "@/services/user";
import { addUser } from "@/store/reducer/user";
import { usePlacesWidget } from "react-google-autocomplete";
import ReactFlagsSelect from "react-flags-select";
import Link from "next/link";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const AccountDetails = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.user);
  const [selected, setSelected] = useState("");
  const [addressManually, setAddressManually] = useState(false);
  console.log(user)
  const [addressFinder, setAddressFinder] = useState("");

  const { ref } = usePlacesWidget({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    onPlaceSelected: (place) => setAddressFinder(place.formatted_address),
  });

  useEffect(()=>{
    setSelected(user?.country)
  },[user])
  return (
    <div className="flex flex-col w-full h-auto gap-2 text-textblack">
      <Formik
        initialValues={{
          name: user?.firstName || "",
          surname: user?.lastName || "",
          birthDate: user?.dob || "",
          country: selected || "",
          address: user?.address || addressFinder,
          manuallyAddress: user?.manuallyAddress || "",
        }}
        enableReinitialize
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = "Required";
          }
          if (!values.surname) {
            errors.surname = "Required";
          }
          if (!values.birthDate) {
            errors.birthDate = "Required";
          }
          if (!values.country) {
            errors.country = "Required";
          }
          if (!values.address) {
            errors.address = "Required";
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const sendContact = await updateUser({ ...values, email: user?.email });
            setSubmitting(false);
              console.log(sendContact)
            if (sendContact?.data?.success) {
              toast.success("Profile Updated", {
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
          <form className="gap-2 form-cantainer" onSubmit={handleSubmit}>
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
                <p className="error p-x-sm"> {errors.name && touched.name && errors.name}</p>
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
                  value={values.birthDate.split('T')?.[0]}
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
              <p className="error p-x-sm">{errors.country && touched.country && errors.country}</p>
            </div>

            <div className="input-box">
              <label className="p-sm text-weight-medium">
                {addressManually ? "Enter address manually" : "Address finder"}
              </label>
              <>
                <div className="input-field">
                  <Image src="/images/search.svg" alt="google" width={20} height={20} />
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
                    : errors.manuallyAddress && touched.manuallyAddress && errors.manuallyAddress}
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
            <button className="btn secondary blue" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <Image src="/images/loader.svg" alt="google" width={20} height={20} />
              ) : (
                "Next"
              )}
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default AccountDetails;
