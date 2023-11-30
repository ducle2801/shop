import axiosClient from "./axiosClient";

const brandAPI = {
  createBrand(data) {
    const API_URL = "/api/manage/brand/add";
    return axiosClient.post(API_URL, data);
  },
  getBrand(id) {
    const API_URL = `/api/manage/brand/id=${id}`;
    return axiosClient.get(API_URL);
  },

  getList() {
    const API_URL = "/api/manage/brand/list";
    return axiosClient.get(API_URL);
  },
  deBrand(idth) {
    const API_URL = `/api/manage/brand/delete=${idth}`;
    return axiosClient.delete(API_URL);
  },
};

export default brandAPI;
