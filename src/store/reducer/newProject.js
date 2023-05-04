import { createSlice } from '@reduxjs/toolkit';

export const addProject = createSlice({
  name: 'CreateNewProject',
  initialState: {
    billing: null,
    projectDetails: null,
    createToken: null,
    linkAssets: null,
    linkInvestments: null,
    beneficiaries: null,
    draft: null,
  },
  reducers: {
    setBilling: (state, action) => {
      state.billing = action.payload;
    },
    setDraftInformation: (state, action) => {
      state.draft = action.payload;
    },
    applyDraftInformation: (state, action) => {
      state.billing = action.payload?.details?.billingMethod || state.billing;
      state.projectDetails =
        action.payload?.details?.information || state.projectDetails;
      state.createToken = action.payload?.details?.tokens || state.createToken;
      state.linkAssets =
        action.payload?.details?.linkAssets || state.linkAssets;
      state.beneficiaries =
        action.payload?.details?.beneficiaries || state.beneficiaries;
    },
    setProjectDetails: (state, action) => {
      state.projectDetails = action.payload;
    },
    setCreateToken: (state, action) => {
      state.createToken = action.payload;
    },
    setlLinkAssets: (state, action) => {
      state.linkAssets = action.payload;
    },
    setlLinkInvestments: (state, action) => {
      state.linkInvestments = action.payload;
    },
    setlBeneficiaries: (state, action) => {
      state.beneficiaries = action.payload;
    },
  },
});

export default addProject.reducer;
export const {
  setBilling,
  setProjectDetails,
  setCreateToken,
  setlLinkAssets,
  setlLinkInvestments,
  setlBeneficiaries,
  setDraftInformation,
  applyDraftInformation,
} = addProject.actions;
