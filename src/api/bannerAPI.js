import axiosClient from "./axiosClient";

const bannerApi = {
  createBanner(data) {
    const API_URL = "/api/manage/banner/upload";
    return axiosClient.post(API_URL, data, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  },
  getBanner() {
    const API_URL = "/api/manage/banner";
    return axiosClient.get(API_URL);
  },
  deteleBanner(id) {
    const API_URL = `/api/manage/banner/delete=${id}`;
    return axiosClient.delete(API_URL);
  },
};

export default bannerApi;
