import { Formik } from 'formik';
import Button from '@/utils/buttons';
import Input from '@/utils/inputFields/input';

import Select from '@/utils/inputFields/select';
import { project, setCreateToken } from '@/store/reducer/newProject';
import { useDispatch, useSelector } from 'react-redux';
import { updateProjectasDaft } from '@/services/coreProject';

const typeToken = [
  {
    value: 'equity',
    option: 'Equity',
  },
  {
    value: 'ahkity',
    option: 'Ahkity',
  },
  {
    value: 'dVuiy',
    option: 'DVuiy',
  },
];

const CreateToken = ({ setActive }) => {
  const dispatch = useDispatch();
  const { draft, createToken } = useSelector((state) => state.addProject);
  return (
    <Formik
      initialValues={
        createToken || {
          tokenName: '',
          numberOfTokens: '',
          tokenType: '',
          tokenPrice: '',
          amountToRaise: '',
          projectMidcap: '',
        }
      }
      enableReinitialize
      validate={(values) => {
        const errors = {};
        if (!values.tokenName) {
          errors.tokenName = 'Required';
        }
        if (!values.numberOfTokens) {
          errors.numberOfTokens = 'Required';
        }
        if (!values.tokenType) {
          errors.tokenType = 'Required';
        }
        if (!values.tokenPrice) {
          errors.tokenPrice = 'Required';
        }
        if (!values.amountToRaise) {
          errors.amountToRaise = 'Required';
        }
        if (!values.projectMidcap) {
          errors.projectMidcap = 'Required';
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        const projectInfo = await updateProjectasDaft({
          tokens: values,
          draftId: draft?._id,
          type: 'tokens',
          status: 'draft',
        });
        if (projectInfo.status == 200) {
          setActive(3);
          dispatch(setCreateToken(values));
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
          <Input
            label="Token name"
            placeholder="Token name"
            inputType="text"
            name="tokenName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.tokenName}
            errors={errors.tokenName}
            touched={touched.tokenName}
          />

          <Select
            label="Token type"
            data={typeToken}
            placeholder="Token type"
            name="tokenType"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.tokenType}
            errors={errors.tokenType}
            touched={touched.tokenType}
          />

          <Input
            label="Number of tokens"
            placeholder="Number of tokens"
            inputType="number"
            name="numberOfTokens"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.numberOfTokens}
            errors={errors.numberOfTokens}
            touched={touched.numberOfTokens}
          />
          <Input
            label="Token price"
            icon="/images/b_expand_more.svg"
            inputName="USDC"
            placeholder="Token price"
            inputType="number"
            name="tokenPrice"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.tokenPrice}
            errors={errors.tokenPrice}
            touched={touched.tokenPrice}
          />
          <Input
            label="Amount to raise"
            placeholder="Amount to raise"
            inputName="USDC"
            inputType="number"
            name="amountToRaise"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.amountToRaise}
            errors={errors.amountToRaise}
            touched={touched.amountToRaise}
          />

          <Input
            label="Project midcap"
            placeholder="Project midcap"
            inputName="USDC"
            inputType="number"
            name="projectMidcap"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.projectMidcap}
            errors={errors.projectMidcap}
            touched={touched.projectMidcap}
            inputAbout="Minimum amount to start the project"
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

export default CreateToken;
