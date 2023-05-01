import { Formik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { updateFinancials } from "@/services/user";
import { useRouter } from "next/router";
import { addUser } from "@/store/reducer/user";
import Link from "next/link";
import Image from "next/image";

const BusinessDetails = ({ setStep, userDetail }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.user);
  return (
    <div className="registration-box">
      <div className="flex-box d-column gap-x-sm">
        <h6 className="p-lg center-text ">Step 3 of 4</h6>
        <h3 className="p-xl center-text">Business details</h3>
      </div>
      <Formik
        initialValues={{
          businessName: user?.financials?.businessName || "",
          financialLegalNumber: user?.financials?.financialLegalNumber || "",
          businessAddress: user?.financials?.businessAddress || "",
        }}
        validate={(values) => {
          const errors = {};

          if (!values.businessName) {
            errors.businessName = "Required";
          }

          if (!values.financialLegalNumber) {
            errors.financialLegalNumber = "Required";
          }
          if (!values.businessAddress) {
            errors.businessAddress = "Required";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          const result = await updateFinancials({ ...values, email: userDetail?.email });
          // setSubmitting(false);
          // if (result?.data?.userFound) {
          //   dispatch(addUser(result?.data?.userFound));
          //   if (
          //     user?.questionnaire.filter(
          //       (data) => data.question === "Are you familiar with cryptocurrencies?"
          //     )[0]?.selectedAnswers
          //   ) {
          //     setStep(4);
          //   } else {
          //     setStep(5);
          //   }
          // }
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
                {errors.businessName && touched.businessName && errors.businessName}
              </p>
            </div>

            <div className="input-box">
              <label className="p-sm text-weight-medium">Financial / legal number thing</label>
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
              <label className="p-sm text-weight-medium">Business address</label>
              <div className="input-field">
                <Image src="/images/search.svg" alt="google" width={20} height={20} />
                <input
                  className="input p-sm"
                  placeholder="Start typing the address"
                  type="address"
                  name="businessAddress"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.businessAddress}
                />
              </div>
              <p className="error p-x-sm">
                {errors.businessAddress && touched.businessAddress && errors.businessAddress}
              </p>
            </div>

            <Link href="" className="p-sm text-weight-medium text-textcolor">
              Enter address manually
            </Link>

            <div className="gap-4 flex-box">
              <button
                onClick={() => setStep(2)}
                type="button"
                className="justify-center flex-box gap-x-sm btn-border secondary"
              >
                Back
              </button>
              <button className="btn secondary blue " type="submit" disabled={isSubmitting}>
                {isSubmitting ? "....." : "Next"}
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default BusinessDetails;
