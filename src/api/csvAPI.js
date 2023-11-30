import axiosClient from "./axiosClient";

const csvAPI = {
  createCSV(data) {
    const API_URL = "/api/csv/add";
    return axiosClient.post(API_URL, data);
  },
  createdetailCSV(data) {
    const API_URL = "/api/csv/adddetail";
    return axiosClient.post(API_URL, data);
  },
  createImageCSV(data) {
    const API_URL = "/api/csv/image";
    return axiosClient.post(API_URL, data);
  },
//   getColor(id) {
//     const API_URL = `/api/color/id=${id}`;
//     return axiosClient.get(API_URL);
//   },

//   getOneColor(idms) {
//     const API_URL = `/api/color/idms=${idms}`;
//     return axiosClient.get(API_URL);
//   },

//   getListColor() {
//     const API_URL = "/api/color/list";
//     return axiosClient.get(API_URL);
//   },
//   deColor(idms) {
//     const API_URL = `/api/color/delete_color/${idms}`;
//     return axiosClient.delete(API_URL);
//   },
};

export default csvAPI;
