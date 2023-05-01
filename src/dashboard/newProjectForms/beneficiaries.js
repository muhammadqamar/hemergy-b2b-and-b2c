import { Formik } from 'formik';
import Button from '@/utils/buttons';
import Input from '@/utils/inputFields/input';
import Link from 'next/link';
import { project, setlBeneficiaries } from '@/store/reducer/newProject';
import { useDispatch, useSelector } from 'react-redux';
import { updateProjectasDaft } from '@/services/coreProject';

const Beneficiaries = ({ setActive }) => {
  const dispatch = useDispatch();
  const { draft, beneficiaries } = useSelector((state) => state.addProject);
  return (
    <>
      <h3 className="mb-6 p-lg text-textblack">Beneficiary 1</h3>
      <Formik
        initialValues={
          beneficiaries || {
            company: '',
            description: '',
            users: [{ firstName: '', lastName: '' }],
          }
        }
        validate={(values) => {
          const errors = {};
          if (!values.description) {
            errors.description = 'Required';
          }
          if (values.users?.length === 0) {
            errors.users = 'Required';
          }
          if (!values.company) {
            errors.company = 'Required';
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          const projectInfo = await updateProjectasDaft({
            beneficiaries: values,
            draftId: draft?._id,
            type: 'beneficiaries',
            status: 'complete',
          });
          if (projectInfo.status == 200) {
            setActive(6);
            dispatch(setlBeneficiaries(values));
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
          setFieldValue,
          /* and other goodies */
        }) => (
          <form className="gap-6 form-cantainer" onSubmit={handleSubmit}>
            <Input
              label="Company "
              placeholder="Company "
              inputType="text"
              name="company"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.company}
              errors={errors.company}
              touched={touched.company}
            />
            <Input
              label="Description"
              placeholder="Description ..."
              textarea
              inputType="text"
              name="description"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
              errors={errors.description}
              touched={touched.description}
            />

            <p className="p-sm text-weight-medium text-textblack">
              Representative:
            </p>
            {values?.users?.map((data, index) => {
              return (
                <div className="input-box">
                  <div className="input-field">
                    <div className="flex items-center justify-between gap-6">
                      <div>
                        <label className="p-sm text-weight-medium">
                          First name
                        </label>
                        <input
                          className="input"
                          placeholder="First name"
                          inputType="text"
                          name="users"
                          onChange={(e) => {
                            setFieldValue(
                              'users',
                              values?.users?.map((data, index2) => {
                                if (index === index2) {
                                  return {...data, firstName: e.target.value};
                                } else {
                                  return data;
                                }
                              })
                            );
                          }}
                        />
                      </div>
                      <div>
                        <label className="p-sm text-weight-medium">
                          Last name
                        </label>
                        <input
                          className="input"
                          placeholder="Last name"
                          inputType="text"
                          name="users"
                          onChange={(e) => {
                            setFieldValue(
                              'users',
                              values?.users?.map((data, index2) => {
                                if (index === index2) {
                                  return {...data, lastName: e.target.value};
                                } else {
                                  return data;
                                }
                              })
                            );
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <div
              onClick={() => {
                setFieldValue('users', [
                  ...values.users,
                  { firstName: '', lastName: '' },
                ]);
              }}
              className="text-textcolor p-sm text-weight-medium"
            >
              Add another beneficiary
            </div>

            <Button
              text="Preview Smart Contract"
              type="submit"
              disabled={isSubmitting}
              bg="bg-textcolor"
              color
            />
          </form>
        )}
      </Formik>
    </>
  );
};

export default Beneficiaries;
