import { Formik } from 'formik';
import Button from '@/utils/buttons';
import Input from '@/utils/inputFields/input';
import ReactFlagsSelect from 'react-flags-select';
import { usePlacesWidget } from 'react-google-autocomplete';
import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DrogAndDropFile from '@/utils/drogAndDropFiles';
import UpLoadFileAbout from '@/utils/upLoadFIleAbout';
import Autocomplete from 'react-google-autocomplete';

import { setProjectDetails } from '@/store/reducer/newProject';
import Link from 'next/link';
import Image from 'next/image';
import { updateProjectasDaft } from '@/services/coreProject';

const ProjectDetails = ({ setActive }) => {
  const [projectName, setProjectName] = useState('');
  const [projctDescription, setProjctDescription] = useState('');
  const [projectPostal, setProjectPostal] = useState('');

  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');

  const [selected, setSelected] = useState('');
  const [addressManually, setAddressManually] = useState(false);
  const [addressFinder, setAddressFinder] = useState('');
  const dispatch = useDispatch();
  const { draft, projectDetails } = useSelector((state) => state.addProject);
  // const { ref } = usePlacesWidget({
  //   apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  //   onPlaceSelected: (place) => {
  //     console.log(place)
  //     setAddressFinder(place);
  //   },
  // });

  const [imageData, setImageData] = useState('');
  const [upload, setUpload] = useState('');
  const fileinput = useRef();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImageData(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setUpload(reader.result);
    };
  };

  return (
    <Formik
      initialValues={
        projectDetails
          ? {
              ...projectDetails,
              addressLine1:
                addressFinder?.formatted_address ||
                projectDetails.addressLine1 ||
                '',
              city:
                addressFinder?.address_components?.filter((data) =>
                  data?.types?.includes('administrative_area_level_1')
                )[0]?.long_name ||
                projectDetails.city ||
                '',
              country:
                addressFinder?.address_components?.filter((data) =>
                  data?.types?.includes('country')
                )[0]?.short_name ||
                projectDetails?.country ||
                '',
              lat:
                addressFinder?.geometry?.location?.lat() ||
                projectDetails.lat ||
                '',
              lang:
                addressFinder?.geometry?.location?.lng() ||
                projectDetails.lang ||
                '',
              image: upload || projectDetails.image || '',
            }
          : {
              projectName: projectName,
              projectDescription: projctDescription,

              manuallyAddress: '',
              addressLine1: addressFinder?.formatted_address || address1,
              addressLine2: address2,
              city:
                addressFinder?.address_components?.filter((data) =>
                  data?.types?.includes('administrative_area_level_1')
                )[0]?.long_name || city,
              postalCode: projectPostal,
              country:
                addressFinder?.address_components?.filter((data) =>
                  data?.types?.includes('country')
                )[0]?.short_name || selected,
              image: upload || '',
              lat: addressFinder?.geometry?.location?.lat() || '',
              lang: addressFinder?.geometry?.location?.lng() || '',
            }
      }
      enableReinitialize
      validate={(values) => {
        const errors = {};
        if (!values.projectName) {
          errors.projectName = 'Required';
        }
        if (!values.projectDescription) {
          errors.projectDescription = 'Required';
        }

        if (!values.country) {
          errors.country = 'Required';
        }
        if (!values.addressLine1) {
          errors.addressLine1 = 'Required';
        }
        if (!values.city) {
          errors.city = 'Required';
        }
        if (!values.postalCode) {
          errors.postalCode = 'Required';
        }
        if (!values.image) {
          errors.image = 'Required';
        }
        console.log(errors);
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        const projectInfo = await updateProjectasDaft({
          information: values,
          draftId: draft?._id,
          type: 'information',
          status: 'draft',
        });
        if (projectInfo.status == 200) {
          setActive(2);
          dispatch(
            setProjectDetails({
              ...values,
              country: selected,
              projectImages: upload,
            })
          );
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
            label="Project name"
            placeholder="Project name"
            inputType="text"
            name="projectName"
            onChange={(e) => {
              setProjectName(e.target.value);
            }}
            onBlur={handleBlur}
            value={values.projectName}
            errors={errors.projectName}
            touched={touched.projectName}
          />

          <Input
            textarea
            label="Project description"
            placeholder="Project description ..."
            inputType="text"
            name="projectDescription"
            onChange={(e) => {
              setProjctDescription(e.target.value);
            }}
            onBlur={handleBlur}
            value={values.projectDescription}
            errors={errors.projectDescription}
            touched={touched.projectDescription}
          />

          <div className="input-box">
            <label className="p-sm text-weight-medium">
              {addressManually ? 'Enter address manually' : 'Address finder'}
            </label>
            <>
              <div className="input-field" style={{justifyContent:"flex-start"}}>
                <>
                <Image
                  src="/images/search.svg"
                  alt="google"
                  width={20}
                  height={20}
                />
                <Autocomplete
                  apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
                  onPlaceSelected={(place) => {
                    console.log(place);
                    setAddressFinder(place);
                  }}
                />
                </>
                {/* <input
                  className={`input p-sm`}
                  ref={ref}
                  placeholder="Start typing the address"
                  type="text"
                  autocomplete
                  disabled={addressManually ? true : false}
                /> */}
              </div>
            </>
          </div>
          {!addressManually ? (
            <Link
              href="javascript: void(0)"
              onClick={() => setAddressManually(true)}
              className="p-sm text-weight-medium text-textcolor"
            >
              Enter address manually
            </Link>
          ) : (
            <Link
              href="javascript: void(0)"
              onClick={() => setAddressManually(false)}
              className="p-sm text-weight-medium text-textcolor"
            >
              Address finder
            </Link>
          )}

          <div className="input-box">
            <label className="p-sm text-weight-medium">Country</label>
            <div className="input-field">
              <ReactFlagsSelect
                className=" input"
                selectButtonClassName="country-drop-list"
                selected={values?.country}
                fullWidth={true}
                onSelect={(code) => {
                  setFieldValue('country', code);
                  setSelected(code);
                }}
                disabled={!addressManually ? true : false}
              />
            </div>

            <p className="error p-x-sm">
              {errors.country && touched.country && errors.country}
            </p>
          </div>

          <Input
            label="Address line 1"
            placeholder="Address line 1"
            inputType="text"
            name="addressLine1"
            onChange={(e) => {
              setFieldValue('addressLine1', e.target.value);
              setAddress1(e.target.value);
            }}
            onBlur={handleBlur}
            value={values.addressLine1}
            errors={errors.addressLine1}
            touched={touched.addressLine1}
          />

          <Input
            label="Address line 2"
            placeholder="Address line 2"
            inputType="text"
            name="addressLine2"
            onChange={(e) => {
              setFieldValue('addressLine2', e.target.value);
              setAddress2(e.target.value);
            }}
            onBlur={handleBlur}
            value={values.addressLine2}
            errors={errors.addressLine2}
            touched={touched.addressLine2}
          />

          <Input
            label="City"
            placeholder="City"
            inputType="text"
            name="city"
            onChange={(e) => {
              setFieldValue('city', e.target.value);
              setCity(e.target.value);
            }}
            onBlur={handleBlur}
            value={values.city}
            errors={errors.city}
            touched={touched.city}
            disabled={!addressManually ? true : false}
          />
          <Input
            label="Postal code"
            placeholder="Postal code"
            inputType="number"
            name="postalCode"
            onBlur={handleBlur}
            value={values.postalCode}
            errors={errors.postalCode}
            touched={touched.postalCode}
            onChange={(e) => {
              setFieldValue('postalCode', e.target.value);
              setProjectPostal(e.target.value);
            }}
          />
          <DrogAndDropFile
            onClick={() => {
              fileinput.current?.click();
            }}
            label="Project image/s"
          />

          <p className="error p-x-sm">
            {errors.image && touched.image && errors.image}
          </p>

          <UpLoadFileAbout img={imageData} upload={values?.image} />

          <input
            className="hidden"
            type="file"
            ref={fileinput}
            onChange={(event) => {
              handleImageUpload(event);
            }}
          />
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
  );
};

export default ProjectDetails;
