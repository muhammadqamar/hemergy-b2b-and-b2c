import http from "@/services/http";
const BASE_URL = process.env.NEXT_PUBLIC_API_DOMAIN;
export const getKYCAccessToken = async (setLoading) => {
  try {
    let response = await http.post(`${BASE_URL}/investor/generate/sumsub-token`);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
export const kycVerified = () => async (dispatch) => {
  // setLoading(true);
  try {
    let response = await http.post(`${BASE_URL}/investor/verified/identity`);
    dispatch({
      type: "success",
      message: response?.config?.status,
      time: 1000,
    });
    // setLoading(false);
  } catch (error) {
    // setLoading(false);
    if (error?.response?.data) {
      dispatch(
        setAlert({
          type: "error",
          message: error?.response?.data?.status,
          time: 1000,
        })
      );
    } else {
      dispatch(setAlert({ type: "error", message: error?.message, time: 1000 }));
    }
    console.log(error);
  }
};
