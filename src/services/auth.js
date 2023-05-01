import http from './http';
import { ShowError } from './error';

const investorLogin = async (data) => {
  try {
    return await http.post(`/auth/login?type=developer`, data);
  } catch (error) {
    ShowError(error?.response?.data?.status);
    return error;
  }
};

const investorLoginWeb3Auth = async (data) => {
  try {
    return await http.post(`/auth/loginWeb3`, data);
  } catch (error) {
    ShowError(error?.response?.data?.status);
    return error;
  }
};

export { investorLogin, investorLoginWeb3Auth };
