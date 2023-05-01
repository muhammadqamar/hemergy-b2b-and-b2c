import { Formik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { updateFinancials } from "@/services/user";
import { useRouter } from "next/router";

import { addUser } from "@/store/reducer/user";

const Financials = ({ setStep, userDetail }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.user);
  return (
    <div className="registration-box">
      <div className="flex-box d-column gap-x-sm">
        <h6 className="p-lg center-text ">Step 3 of 5</h6>
        <h3 className="p-xl center-text">Financials</h3>
      </div>
      <Formik
        initialValues={{
          annualTurnover: user?.financials?.annualturnover || "",
          disposableIncome: user?.financials?.disposableIncome || "",
        }}
        validate={(values) => {
          const errors = {};

          if (!values.annualTurnover) {
            errors.annualTurnover = "Required";
          }

          if (!values.disposableIncome) {
            errors.disposableIncome = "Required";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          const result = await updateFinancials({ ...values, email: userDetail?.email });
          setSubmitting(false);
          if (result?.data?.userFound) {
            dispatch(addUser(result?.data?.userFound));
            if (
              user?.questionnaire.filter(
                (data) => data.question === "Are you familiar with cryptocurrencies?"
              )[0]?.selectedAnswers
            ) {
              setStep(4);
            } else {
              setStep(5);
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
          <form className="form-cantainer gap-6" onSubmit={handleSubmit}>
            <div className="input-box">
              <label className="p-sm text-weight-medium">Annual turnover</label>

              <div className="input-field">
                <p className="p-sm">€</p>
                <input
                  className="input p-sm"
                  placeholder="0.00"
                  type="number"
                  name="annualTurnover"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.annualTurnover}
                />
              </div>
              <p className=" p-x-sm text-[#6B6D88]">
                How much income do you have after monthly expenses
              </p>
              <p className="error p-x-sm">
                {errors.annualTurnover && touched.annualTurnover && errors.annualTurnover}
              </p>
            </div>

            <div className="input-box">
              <label className="p-sm text-weight-medium">Disposable income</label>
              <div className="input-field">
                <p className="p-sm">€</p>
                <input
                  className="input p-sm"
                  placeholder="0.00"
                  type="number"
                  name="disposableIncome"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.disposableIncome}
                />
                <p className="flex-shrink-0 p-sm">/ m</p>
              </div>
              <p className=" p-x-sm text-[#6B6D88]">
                How much income do you have after monthly expenses
              </p>
              <p className="error p-x-sm">
                {errors.disposableIncome && touched.disposableIncome && errors.disposableIncome}
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
              <button className="btn secondary blue" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "....." : "Next"}
              </button>
            </div>

            <p
              onClick={() => setStep(4)}
              className="font-medium text-center cursor-pointer p-sm text-textcolor"
            >
              Skip for now
            </p>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Financials;
