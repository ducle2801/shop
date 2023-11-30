import axiosClient from "./axiosClient";

const discountAPI = {
  createDiscount(data) {
    const API_URL = "/api/manage/discount/add";
    return axiosClient.post(API_URL, data);
  },
  getDiscount(id) {
    const API_URL = `/api/manage/discount/id=${id}`;
    return axiosClient.get(API_URL);
  },

  getList() {
    const API_URL = "/api/manage/discount/list";
    return axiosClient.get(API_URL);
  },

  deleteDiscount(id) {
    const API_URL = `/api/manage/discount/delete=${id}`;
    return axiosClient.delete(API_URL);
  },
};

export default discountAPI;
