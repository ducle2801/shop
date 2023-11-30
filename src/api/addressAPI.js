import axiosClient from "./axiosClient";

const addressAPI = {
  createAddress(data) {
    const API_URL = "/api/manage/address/add";
    return axiosClient.post(API_URL, data);
  },
  getListAddress() {
    const API_URL = "/api/manage/address/list";
    return axiosClient.get(API_URL);
  },

  getAddress(id_kh) {
    const API_URL = `/api/manage/address/idkh=${id_kh}`;
    return axiosClient.get(API_URL);
  },

  getIdAddress(id_dc) {
    const API_URL = `/api/manage/address/iddc=${id_dc}`;
    return axiosClient.get(API_URL);
  },

  deleteAddress(iddc) {
    const API_URL = `/api/manage/address/delete/id=${iddc}`;
    return axiosClient.delete(API_URL);
  },
};

export default addressAPI;
