import axiosClient from "./axiosClient";

const sizeAPI = {
  createSize(data) {
    const API_URL = "/api/manage/size/add";
    return axiosClient.post(API_URL, data);
  },
  getSize(id) {
    const API_URL = `/api/manage/size/id=${id}`;
    return axiosClient.get(API_URL);
  },

  getList() {
    const API_URL = "/api/manage/size/list";
    return axiosClient.get(API_URL);
  },

  deSize(idkt) {
    console.log(idkt)
    const API_URL = `/api/manage/size/delete/${idkt}`;
    return axiosClient.delete(API_URL);
  },
};

export default sizeAPI;
