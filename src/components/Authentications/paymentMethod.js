import { Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { updateCollectionmethod } from '@/services/user';
import { useRouter } from 'next/router';
import { addUser } from '@/store/reducer/user';
import Link from 'next/link';
import Image from 'next/image';

const PaymentMethod = ({ setStep, userDetail, profileRoute }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.user);
  return (
    <div className={`registration-box ${!profileRoute && 'p-none'}`}>
      <div className="flex-box d-column gap-x-sm">
        {profileRoute && <h6 className="p-lg center-text ">Step 4 of 4</h6>}
        <h3 className="p-xl center-text">
          {profileRoute ? 'Payment method' : 'Collection method'}
        </h3>
      </div>
      <div className="flex items-center justify-center gap-2">
        <button className="p-sm-semi text-weight-medium paybtn text-blue700 bg-blue100 ">
          Bank account
        </button>
        {profileRoute && (
          <button className="bg-white p-sm-semi text-weight-medium paybtn text-textblack">
            Connect cryptowallet
          </button>
        )}
      </div>
      <Formik
        initialValues={{
          bicSwift: user?.collectionmethod?.bicSwift || '',
          accountNoIBAN: user?.collectionmethod?.accountNoIBAN || '',
          additionalWireInstructions:
            user?.collectionmethod?.additionalWireInstructions || '',
        }}
        validate={(values) => {
          const errors = {};

          if (!values.bicSwift) {
            errors.bicSwift = 'Required';
          }

          if (!values.accountNoIBAN) {
            errors.accountNoIBAN = 'Required';
          }
          if (!values.additionalWireInstructions) {
            errors.additionalWireInstructions = 'Required';
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          const result = await updateCollectionmethod({
            ...values,
            email: userDetail?.email,
            endUserAddress: user?.endUserAddress,
          });
          setSubmitting(false);
          if (result?.data?.userFound) {
            dispatch(addUser(result?.data?.userFound));
            !profileRoute && setStep(4);
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
              <div className="flex items-center gap-2">
                <label className="p-sm text-weight-medium">BIC / Swift</label>
                <Image
                  src="/images/info-blue.svg"
                  alt="info"
                  width={20}
                  height={20}
                />
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
                <label className="p-sm text-weight-medium">
                  Account no / IBAN
                </label>
                <Image
                  src="/images/info-blue.svg"
                  alt="info"
                  width={20}
                  height={20}
                />
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
                {errors.accountNoIBAN &&
                  touched.accountNoIBAN &&
                  errors.accountNoIBAN}
              </p>
            </div>
            <div className="input-box">
              <div className="flex items-center gap-2">
                <label className="p-sm text-weight-medium">
                  Additional wire instructions
                </label>
                <Image
                  src="/images/info-blue.svg"
                  alt="info"
                  width={20}
                  height={20}
                />
              </div>
              <div className="input-field">
                <input
                  className="input p-sm"
                  placeholder=""
                  type="text"
                  name="additionalWireInstructions"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.additionalWireInstructions}
                />
              </div>
              <p className="error p-x-sm">
                {errors.additionalWireInstructions &&
                  touched.additionalWireInstructions &&
                  errors.additionalWireInstructions}
              </p>
            </div>
            {profileRoute === false ? (
              <button
                className="btn secondary blue "
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
                  {isSubmitting ? '.....' : 'Done'}
                </button>
              </div>
            )}
          </form>
        )}
      </Formik>
    </div>
  );
};

export default PaymentMethod;
