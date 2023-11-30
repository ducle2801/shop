import axiosClient from "./axiosClient";

const verifyEmailAPI = {
  verify(email) {
    const API_URL = `/api/verify_email/email=${email}`;
    return axiosClient.get(API_URL);
  },
};
export default verifyEmailAPI;
