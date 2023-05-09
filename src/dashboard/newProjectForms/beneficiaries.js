import { Formik } from 'formik';
import Button from '@/utils/buttons';
import Input from '@/utils/inputFields/input';
import Link from 'next/link';
import { project, setlBeneficiaries } from '@/store/reducer/newProject';
import { useDispatch, useSelector } from 'react-redux';
import { updateProjectasDaft } from '@/services/coreProject';
import Hemergy from '@hemergy/core-sdk';
import { ethers } from 'ethers';
import { useState } from 'react';

const Beneficiaries = ({ setActive }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { draft, beneficiaries } = state.addProject;
  const [loader, setLoader] =  useState(false)
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
          if (values.users.filter((data) => data.address).length === 0) {
            errors.users = 'Atleast 1 benficiary required';
          }

          if (!values.company) {
            errors.company = 'Required';
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          const projectInfo = await updateProjectasDaft({
            beneficiaries: values.users,
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
                  <div
                    className="absolute cursor-pointer right-3 top-1"
                    onClick={() => {
                      if(index===0) return
                      setFieldValue(
                        'users',
                        values?.users?.filter(
                          (data, index2) => index2 !== index
                        )
                      );
                    }}
                  >
                    x
                  </div>
                  <div className="input-field">
                    <div className="flex items-center justify-between gap-6">
                      <div>
                        <label className="p-sm text-weight-medium ">
                          First name
                        </label>
                        <input
                          style={{ background: '#fff' }}
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
                          style={{ background: '#fff' }}
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
                          style={{ background: '#fff' }}
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
                  <div>
                  {(data?.address &&
                      data?.isKYCed) && <>{data?.isKYCed === 'yes'
                        ? <div className='text-[green]'>Beneficiary is KYCed</div>
                        : <div className='text-[red]'>Beneficiary is not KYCed</div>}</>}
                  </div>
                </div>
              );
            })}
            {touched.users && <p className="error p-x-sm">{errors.users}</p>}

            <div
              onClick={async () => {

                if(values.users.filter((data) => data.address).length !== values.users?.length) {
                  alert("kindly add beneficiary address first")
                  return
                }
                setLoader(true)
                try {
                  const e = await state.user.web3auth.connect();

                  const ethersProvider = new ethers.providers.Web3Provider(e);
                  const signer = await ethersProvider.getSigner();
                  console.log('signer address', await signer.getAddress());
                  const hemergy = new Hemergy({
                    baseURL: 'https://dev-core.hemergy.com',
                    signer,
                  });
                  const isKYCed = await hemergy.isKYCed(
                    values.users.filter((data) => !data.isKYCed)[0]?.address
                  );

                  setFieldValue(
                    'users',
                    [...values?.users?.map((data) => {
                      if (!data.isKYCed) {
                        return { ...data, isKYCed: isKYCed ? "yes": "no" };
                      } else {
                        return data;
                      }
                    }),{ firstName: '', lastName: '', address: '' }]
                  );


                  setLoader(false)
                } catch (e) {

                  alert("Invalid address")
                  setLoader(false)
                }

              }}
              className="text-textcolor p-sm text-weight-medium"
            >
              {loader ? "Adding beneficiary .... " :"Add another beneficiary"}
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
