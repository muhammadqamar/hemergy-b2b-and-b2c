import http from './http';
import { ShowError } from './error';

const relayer = async (data) => {
  try {
    return await http.postCore(`/relayer`, data);
  } catch (error) {
    ShowError(error?.response?.data?.status);
    return error;
  }
};

const investProject = async (data) => {
  try {
    return await http.postCore(`/projects/sds/invest`, data);
  } catch (error) {
    ShowError(error?.response?.data?.status);
    return error;
  }
};


const meta = async () => {
  try {
    return await http.getCore(`/meta`);
  } catch (error) {
    ShowError(error?.response?.data?.status);
    return error;
  }
};



export { relayer, meta, investProject };
