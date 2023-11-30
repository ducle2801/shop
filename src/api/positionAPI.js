import axiosClient from "./axiosClient";

const positionAPI = {

  getPosition(id) {
    const API_URL = `/api/manage/position/id=${id}`;
    return axiosClient.get(API_URL);
  },

  getListPosition() {
    const API_URL = "/api/manage/position/list";
    return axiosClient.get(API_URL);
  },
};

export default positionAPI;
