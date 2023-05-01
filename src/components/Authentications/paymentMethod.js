import { Formik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { updateFinancials } from "@/services/user";
import { useRouter } from "next/router";
import { addUser } from "@/store/reducer/user";
import Link from "next/link";
import Image from "next/image";

const PaymentMethod = ({ setStep, userDetail }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.user);
  return (
    <div className="registration-box">
      <div className="flex-box d-column gap-x-sm">
        <h6 className="p-lg center-text ">Step 4 of 4</h6>
        <h3 className="p-xl center-text">Payment method</h3>
      </div>
      <div className="flex items-center justify-center gap-2">
        <button className="p-sm-semi text-weight-medium paybtn  text-blue700 bg-blue100 ">
          Bank account
        </button>
        <button className="p-sm-semi text-weight-medium paybtn text-textblack bg-white">
          Connect cryptowallet
        </button>
      </div>
      <Formik
        initialValues={{
          bicSwift: user?.financials?.bicSwift || "",
          accountNoIBAN: user?.financials?.accountNoIBAN || "",
          AdditionalWireInstructions: user?.financials?.AdditionalWireInstructions || "",
        }}
        validate={(values) => {
          const errors = {};

          if (!values.bicSwift) {
            errors.bicSwift = "Required";
          }

          if (!values.accountNoIBAN) {
            errors.accountNoIBAN = "Required";
          }
          if (!values.AdditionalWireInstructions) {
            errors.AdditionalWireInstructions = "Required";
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
              <div className="flex items-center gap-2">
                <label className="p-sm text-weight-medium">BIC / Swift</label>
                <Image src="/images/info-blue.svg" alt="info" width={20} height={20} />
              </div>
              <div className="input-field">
                <input
                  className="input p-sm"
                  placeholder=""
                  type="text"
                  name="bicSwift"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.bicSwift}
                />
              </div>
              <p className="error p-x-sm">
                {errors.bicSwift && touched.bicSwift && errors.bicSwift}
              </p>
            </div>

            <div className="input-box">
              <div className="flex items-center gap-2">
                <label className="p-sm text-weight-medium">Account no / IBAN</label>
                <Image src="/images/info-blue.svg" alt="info" width={20} height={20} />
              </div>
              <div className="input-field">
                <input
                  className="input p-sm"
                  placeholder=""
                  type="text"
                  name="accountNoIBAN"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.accountNoIBAN}
                />
              </div>
              <p className="error p-x-sm">
                {errors.accountNoIBAN && touched.accountNoIBAN && errors.accountNoIBAN}
              </p>
            </div>
            <div className="input-box">
              <div className="flex items-center gap-2">
                <label className="p-sm text-weight-medium">Additional wire instructions</label>
                <Image src="/images/info-blue.svg" alt="info" width={20} height={20} />
              </div>
              <div className="input-field">
                <input
                  className="input p-sm"
                  placeholder=""
                  type="text"
                  name="AdditionalWireInstructions"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.AdditionalWireInstructions}
                />
              </div>
              <p className="error p-x-sm">
                {errors.AdditionalWireInstructions &&
                  touched.AdditionalWireInstructions &&
                  errors.AdditionalWireInstructions}
              </p>
            </div>
            <div className="gap-4 flex-box">
              <button
                onClick={() => setStep(2)}
                type="button"
                className="justify-center flex-box gap-x-sm btn-border secondary"
              >
                Back
              </button>
              <button
                className="btn secondary blue opacity-[0.5]"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "....." : "Done"}
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default PaymentMethod;
