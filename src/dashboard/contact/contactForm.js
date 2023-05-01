import React from "react";
import { Formik, Field } from "formik";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
const ContactForm = () => {
  return (
    <Formik
      initialValues={{
        subject: "",
        reason: "",
        message: "",
      }}
      validate={(values) => {
        const errors = {};

        if (!values.reason) {
          errors.reason = "Required";
        }
        if (!values.message) {
          errors.message = "Required";
        }
        if (!values.subject) {
          errors.subject = "Required";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.subject)) {
          errors.subject = "Invalid subject address";
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const sendContact = await axios.post(`${process.env.NEXT_PUBLIC_API_DOMAIN}/auth/contact`, values);
          setSubmitting(false);

          if (sendContact?.data?.success) {
            toast.success("Contact Form Submitted", {
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
        <>
          <form onSubmit={handleSubmit}>
            <div className="label-box birth-box">
              <label>Subject line</label>
              <input
                className="birth-input"
                type="subject"
                name="subject"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.subject}
                placeholder="name@address.com"
              />
              <p className="error p-x-sm">{errors.subject && touched.subject && errors.subject}</p>
            </div>
            <div className="label-box birth-box">
              <label>Reason for contacting</label>
              <Field
                className="birth-input"
                as="select"
                name="reason"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.reason}
              >
                <option value="red">Red</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
              </Field>
              <p className="error p-x-sm">{errors.reason && touched.reason && errors.reason}</p>
            </div>
            <div className="label-box">
              <label>Your message</label>
              <textarea
                name="message"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.message}
                rows="6"
                cols="50"
                placeholder="Tell us what you need..."
              />
              <p className="error p-x-sm">{errors.message && touched.message && errors.message}</p>
            </div>
            <button className="send-btn" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <Image src="/images/loader.svg" alt="google" width={20} height={20} />
              ) : (
                <>
                  <p className="send-text">Send</p>
                  <Image src="/images/send-logo.png" alt="" width={20} height={20} />
                </>
              )}
            </button>
          </form>
        </>
      )}
    </Formik>
  );
};

export default ContactForm;
