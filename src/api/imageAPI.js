import axiosClient from "./axiosClient";

const imageAPI = {
  createImage(data) {
    const API_URL = "/api/manage/photos/upload";
    return axiosClient.post(API_URL, data, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  },
  getImage(id) {
    const API_URL = `/api/manage/photos/id=${id}`;
    return axiosClient.get(API_URL);
  },

  deleteImage(id) {
    const API_URL = `/api/manage/photos/delete=${id}`;
    return axiosClient.delete(API_URL);
  },
};

export default imageAPI;
