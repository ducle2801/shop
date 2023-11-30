import axiosClient from "./axiosClient";

const typeProductAPI = {
  createTypeProduct(data) {
    const API_URL = "/api/manage/typeproduct/add";
    return axiosClient.post(API_URL, data);
  },
  getTypeProduct(id) {
    const API_URL = `/api/manage/typeproduct/id=${id}`;
    return axiosClient.get(API_URL);
  },

  getList() {
    const API_URL = "/api/manage/typeproduct/list";
    return axiosClient.get(API_URL);
  },
  getListBrand(id) {
    const API_URL = `/api/manage/typeproduct/list/id=${id}`;
    return axiosClient.get(API_URL);
  },

  deTypeProduct(idlsp) {
    const API_URL = `/api/manage/typeproduct/delete/${idlsp}`;
    return axiosClient.delete(API_URL);
  },
};

export default typeProductAPI;
