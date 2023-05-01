import http from './http';
import { ShowError } from './error';

const projectDetail = async () => {
  try {
    return await http.get(`/project/create-project/getall`);
  } catch (error) {
    return error;
  }
};

const projectDetailId = async (id) => {
  try {
    return await http.get(`/project/create-project/${id}`);
  } catch (error) {
    return error;
  }
};

export { projectDetail, projectDetailId };
