import http from './http';
import { ShowError } from './error';

const updateUser = async (data) => {
  try {
    return await http.put(`/user/updateuser`, data);
  } catch (error) {
    ShowError(error?.response?.data?.status);
    // return error
  }
};

const updateQuestionair = async (data) => {
  try {
    return await http.put(`/user/questionair`, data);
  } catch (error) {
    ShowError(error?.response?.data?.status);
    // return error
  }
};

const updateFinancials = async (data) => {
  try {
    return await http.put(`/user/financials`, data);
  } catch (error) {
    ShowError(error?.response?.data?.status);
    // return error
  }
};

const updateBusinessdetails = async (data) => {
  try {
    return await http.put(`/user/businessdetails`, data);
  } catch (error) {
    ShowError(error?.response?.data?.status);
    // return error
  }
};

const updateCollectionmethod = async (data) => {
  try {
    return await http.put(`/user/collectionmethod`, data);
  } catch (error) {
    ShowError(error?.response?.data?.status);
    // return error
  }
};

const updatekyc = async (data) => {
  try {
    return await http.put(`/user/kyc`, data);
  } catch (error) {
    ShowError(error?.response?.data?.status);
    // return error
  }
};
export {
  updateUser,
  updateQuestionair,
  updateFinancials,
  updatekyc,
  updateBusinessdetails,
  updateCollectionmethod,
};
