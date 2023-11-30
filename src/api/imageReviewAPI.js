import axiosClient from "./axiosClient";
const imageReviewAPI = {
  createImageRV(data) {
    const API_URL = "/api/manage/review/photos/upload";
    return axiosClient.post(API_URL, data, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  },

  getImage(iddg) {

    const API_URL = `/api/manage/image_review/iddg=${iddg}`;
    return axiosClient.get(API_URL);
  },
};

export default imageReviewAPI;
