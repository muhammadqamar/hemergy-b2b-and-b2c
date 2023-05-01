import http from './http';
import { ShowError } from './error';

const investorLogin = async (data) => {
  try {
    return await http.post(`/auth/login`, data);
  } catch (error) {
    ShowError(error?.response?.data?.status);
    return error;
  }
};

const investorRegister = async (data) => {
  try {
    return await http.post(`/auth/registerWeb3Auth`, data);
  } catch (error) {
    ShowError(error?.response?.data?.status);
    return error;
  }
};

const investorLoginWeb3Auth = async (data) => {
  try {
    return await http.post(`/auth/loginWeb3`, data);
  } catch (error) {
    //ShowError(error?.response?.data?.status);
    return error;
  }
};

const createCoreAccount = async (data) => {
  //try {
    return await http.postCore(`/accounts`, data);
  // } catch (error) {
  //   ShowError(error?.response?.data?.status);
  //   return error;
  // }
};



const me = async () => {
  try {
    return await http.get(`/auth/me`);
  } catch (error) {

    return error;
  }
};




export { investorLogin, me, investorLoginWeb3Auth, investorRegister, createCoreAccount };
