import { React, useState } from 'react';
import Button from '@/utils/buttons';
import { useDispatch, useSelector } from 'react-redux';
import { setBilling, setDraftInformation } from '@/store/reducer/newProject';
import { Formik, Field, Form } from 'formik';
import {
  createProjectasDraft,
  updateProjectasDaft,
  deleteProjectasDaft,
} from '@/services/coreProject';

export default function index({ setActive, useDraftProject }) {
  const dispatch = useDispatch();
  const { draft, billing } = useSelector((state) => state.addProject);
  return (
    <div className="billing-box">
      <Formik
        enableReinitialize
        initialValues={{
          billingMethod: billing?.id || '1',
        }}
        validate={(values) => {
          const errors = {};
          if (!values.billingMethod) {
            errors.billingMethod = 'Required';
          }
          return errors;
        }}
        onSubmit={async (values) => {
          if (useDraftProject) {
            const project = await updateProjectasDaft({
              billingMethod: {
                id: values.billingMethod,
                name:
                  values?.billingMethod === 1
                    ? 'sold energy shares'
                    : 'hemergy as benificiary',
              },
              status: 'draft',
              type: 'billingMethod',
              draftId: draft?._id,
            });
            if (project.status == 200) {
              dispatch(setBilling(values.billingMethod)), setActive(1);
            }
          } else {
            if (draft?._id) {
              await deleteProjectasDaft(draft?._id);
            }
            const project = await createProjectasDraft({
              details: {
                billingMethod: {
                  id: values.billingMethod,
                  name:
                    values?.billingMethod === 1
                      ? 'sold energy shares'
                      : 'hemergy as benificiary',
                },
              },
              status: 'draft',
            });

            if (project.status == 200) {
              console.log(project)
              dispatch(setBilling(values.billingMethod)),
              dispatch(setDraftInformation(project.data?.doc));

              setActive(1);
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
        }) => (
          <form onSubmit={handleSubmit}>
            <div
              role="group"
              className="flex flex-col gap-6 mb-6"
              aria-labelledby="my-radio-group"
            >
              <p className="project-text billing-text" id="my-radio-group">
                Please select one of the billing options below:
              </p>
              <div className="checkbox-box">
                <input
                  type="radio"
                  className="input-checkbox"
                  name="billingMethod"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={'1'}
                  checked={values?.billingMethod === '1' ? true : false}
                />
                <div className="checkbox-content">
                  <h3 className="info-heading checkbox-heading">
                    Sold energy shares
                  </h3>
                  <p className="info-text">
                    Take advantage of free setup and token crowdsale for&nbsp;
                    <strong>10%</strong> of sold energy
                  </p>
                </div>
              </div>
              <div className="checkbox-box">
                <input
                  type="radio"
                  className="input-checkbox"
                  name="billingMethod"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={'2'}
                  checked={values?.billingMethod === '2' ? true : false}
                />
                <div className="checkbox-content">
                  <h3 className="info-heading checkbox-heading">
                    Hemergy as beneficiary
                  </h3>
                  <p className="info-text">
                    Hemergy will take&nbsp;<strong>5%</strong> of the amount
                    raised as a beneficiary on your project
                  </p>
                </div>
              </div>
              {errors.billingMethod && touched.billingMethod && (
                <div className="text-red600">{errors.billingMethod}</div>
              )}
            </div>
            <Button
              type="submit"
              bg="bg-textcolor"
              color
              border
              text="Confirm & continue"
            />
          </form>
        )}
      </Formik>
    </div>
  );
}
