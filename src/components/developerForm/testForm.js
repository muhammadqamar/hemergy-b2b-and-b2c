import { Formik } from "formik";
import Button from "@/utils/buttons";
import Input from "@/utils/inputFields/input";

const TestForm = () => {
  return (
    <div className=" w-full text-left">
      <h3 className="p-lg text-textblack mb-4">Test</h3>
      <Formik
        initialValues={{
          secretKey: "",
          publicKey: "",
        }}
        validate={(values) => {
          const errors = {};

          if (!values.publicKey) {
            errors.publicKey = "Required";
          }
          if (!values.secretKey) {
            errors.secretKey = "Required";
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
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
            <Input
              label="Secret key"
              placeholder="Secret key"
              inputType="password"
              name="secretKey"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.secretKey}
              errors={errors.secretKey}
              touched={touched.secretKey}
            />

            <Input
              label="Public key"
              placeholder="Public key"
              inputType="password"
              name="publicKey"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.publicKey}
              errors={errors.publicKey}
              touched={touched.publicKey}
            />

            <Button
              text="Regenerate"
              type="submit"
              disabled={isSubmitting}
              bg="bg-textcolor"
              color
            />
          </form>
        )}
      </Formik>
    </div>
  );
};

export default TestForm;
