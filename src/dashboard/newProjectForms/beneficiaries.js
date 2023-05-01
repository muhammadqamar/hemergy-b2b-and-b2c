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
          if (values.users.filter(data=>data.address).length === 0) {
            errors.users = 'Atleast 1 benficiary required';
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
            status: 'draft',
          });
          if (projectInfo.status === 200) {
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
                <div className=" relative input-box bg-garbg p-[20px] rounded-[10px]">
                  <div className="absolute cursor-pointer right-3 top-1" onClick={()=>{
                     setFieldValue(
                      'users',
                      values?.users?.filter((data, index2) => index2!==index)
                    );
                  }}>x</div>
                  <div className="input-field">
                    <div className="flex items-center justify-between gap-6">
                      <div>
                        <label className="p-sm text-weight-medium ">
                          First name
                        </label>
                        <input
                        style={{background:'#fff'}}
                          className="input"
                          placeholder="First name"
                          inputType="text"
                          name="users"
                          onChange={(e) => {
                            setFieldValue(
                              'users',
                              values?.users?.map((data, index2) => {
                                if (index === index2) {
                                  return { ...data, firstName: e.target.value };
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
                        style={{background:'#fff'}}
                          className="input"
                          placeholder="Last name"
                          inputType="text"
                          name="users"
                          onChange={(e) => {
                            setFieldValue(
                              'users',
                              values?.users?.map((data, index2) => {
                                if (index === index2) {
                                  return { ...data, lastName: e.target.value };
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
                  <div className="input-field mt-[20px] w-full">
                    <div className="w-full">
                      <div>
                        <label className="p-sm text-weight-medium">
                          Wallet Address
                        </label>
                        <input
                        style={{background:'#fff'}}
                          className="w-full input"
                          placeholder="Last name"
                          inputType="text"
                          name="users"
                          onChange={(e) => {
                            setFieldValue(
                              'users',
                              values?.users?.map((data, index2) => {
                                if (index === index2) {
                                  return { ...data, address: e.target.value };
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
             {touched.users && <p className="error p-x-sm">{errors.users}</p>}

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

            {isSubmitting ? (
            <Button
              type="submit"
              bg="bg-textcolor"
              color
              border
              icon="/images/loader.svg"
            />
          ) : (
            <Button
              text="Next"
              type="submit"
              disabled={isSubmitting}
              bg="bg-textcolor"
              color
            />
          )}
          </form>
        )}
      </Formik>
    </>
  );
};

export default Beneficiaries;
