import { Formik } from 'formik';
import Button from '@/utils/buttons';
import Input from '@/utils/inputFields/input';
import Select from '@/utils/inputFields/select';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { project, setlLinkAssets } from '@/store/reducer/newProject';
import { updateProjectasDaft } from '@/services/coreProject';

const typeToken = [
  {
    option: 'Solar',
    id: '1',
  },
  {
    option: 'Wind',
    id: '2',
  },
  {
    option: 'Water',
    id: '3',
  },
  {
    option: 'Oil',
    id: '4',
  },
  {
    option: 'Gas',
    id: '5',
  },
];

const LinkAssets = ({ setActive }) => {
  const { draft, linkAssets } = useSelector((state) => state.addProject);
  const dispatch = useDispatch();
  return (
    <>
      <div className="form-info-box">
        <Image
          src="/images/info-blue.svg"
          alt="info-blue"
          width={24}
          height={24}
        />
        <div className=" text-textblack">
          <h6 className="mb-2 p-sm text-weight-semibold ">Linking assets</h6>
          <p className="p-sm-semi text-weight-normal">
            If the asset exists you can search to link it here, or skip for now
          </p>
        </div>
      </div>

      <Formik
        initialValues={
          linkAssets || {
            assetType: '',

            assetID: '',
            assetName: '',
            assetLocation: '',
            assetOwner: '',
          }
        }
        validate={(values) => {
          const errors = {};

          if (!values.assetID) {
            errors.assetID = 'Required';
          }
          if (!values.assetType) {
            errors.assetType = 'Required';
          }
          if (!values.assetName) {
            errors.assetName = 'Required';
          }
          if (!values.assetLocation) {
            errors.assetLocation = 'Required';
          }
          if (!values.assetOwner) {
            errors.assetOwner = 'Required';
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          const projectInfo = await updateProjectasDaft({
            linkAssets: values,
            draftId: draft?._id,
            type: 'linkAssets',
            status: 'draft',
          });
          if (projectInfo.status == 200) {
            setActive(4);
            dispatch(setlLinkAssets(values));
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
            <Select
              label="Asset type"
              data={typeToken}
              placeholder="Select"
              name="assetType"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.assetType}
              errors={errors.assetType}
              touched={touched.assetType}
            />
            <Input
              label="Search for assets"
              placeholder="Start typing the assets"
              inputType="search"
              icon="/images/search.svg"
            />
            <Input
              label="Asset ID"
              placeholder="Asset ID"
              inputType="number"
              name="assetID"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.assetID}
              errors={errors.assetID}
              touched={touched.assetID}
            />
            <Input
              label="Asset name"
              placeholder="Asset name"
              inputType="text"
              name="assetName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.assetName}
              errors={errors.assetName}
              touched={touched.assetName}
            />
            <Input
              label="Asset location"
              placeholder="Asset location"
              inputType="text"
              name="assetLocation"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.assetLocation}
              errors={errors.assetLocation}
              touched={touched.assetLocation}
            />

            <Input
              label="Asset owner"
              placeholder="Asset owner"
              inputType="text"
              name="assetOwner"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.assetOwner}
              errors={errors.assetOwner}
              touched={touched.assetOwner}
            />
            <div className="flex items-center gap-2">
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
              <Button
                text="Skip for now"
                onClick={() => setActive(4)}
                type="button"
                bg="bg-white"
                border
                borderColor
              />
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default LinkAssets;
