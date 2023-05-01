import http from "./http";
import { ShowError } from "./error";

const createProjectasDraft = async (data) => {
  try {
    return await http.post(`/project/create-project`, data);
  } catch (error) {
    ShowError(error.response?.data);
    return error

  }
};

const getProjectasDraft = async (data) => {
    try {
      return await http.get(`/project/create-project/draft`, data);
    } catch (error) {
      // ShowError(error.response);
      return error
    }
  };

  const updateProjectasDaft = async (data) => {
    try {
      return await http.post(`/project/create-project/updatedraft`, data);
    } catch (error) {
      ShowError(error.response);
      return error
    }
  };

  const deleteProjectasDaft = async (id) => {
    try {
      return await http.remove(`/project/create-project/delete/${id}`);
    } catch (error) {
      ShowError(error.response);
      return error
    }
  };

  const createProjectonDetail = async (data) => {
    try {
      return await http.postCore(`/projects`, data);
    } catch (error) {
      return error;
    }
  };

  const accountKYC = async (data) => {
    try {
      return await http.postCore(`/accounts/sds/kyc`, data);
    } catch (error) {
      return error;
    }
  };


export {createProjectasDraft, getProjectasDraft, updateProjectasDaft, deleteProjectasDaft, createProjectonDetail, accountKYC};
