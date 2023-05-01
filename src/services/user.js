import http from "./http";
import { ShowError } from "./error";

const updateUser = async (data) => {
  try {
    return await http.put(`/user/updateuser?type=developer`, data);
  } catch (error) {
    ShowError(error?.response?.data?.status);
    // return error
  }
};

const updateQuestionair = async (data) => {
  try {
    return await http.put(`/user/questionair?type=developer`, data);
  } catch (error) {
    ShowError(error?.response?.data?.status);
    // return error
  }
};

const updateFinancials = async (data) => {
  try {
    return await http.put(`/user/financials?type=developer`, data);
  } catch (error) {
    ShowError(error?.response?.data?.status);
    // return error
  }
};
export { updateUser, updateQuestionair, updateFinancials };
