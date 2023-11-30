import axiosClient from "./axiosClient";

const reviewAPI = {
  createreview(data) {
    const API_URL = "/api/manage/review/add";
    return axiosClient.post(API_URL, data);
  },

  getListReview() {
    const API_URL = "/api/manage/review/list";
    return axiosClient.get(API_URL);
  },

  getReview(idhdx) {
    const API_URL = `/api/manage/review/idhdx=${idhdx}`;
    return axiosClient.get(API_URL);
  },

  getReviewProduct(idsp) {
    const API_URL = `/api/manage/review/idsp=${idsp}`;
    return axiosClient.get(API_URL);
  },
  getdanhgia(idsp) {
    const API_URL = `/api/manage/danhgia/idsp=${idsp}`;
    return axiosClient.get(API_URL);
  },

  getReviewInvoice(idhdx) {
    const API_URL = `/api/manage/review/idhdx=${idhdx}`;
    return axiosClient.get(API_URL);
  },

  getOneReview(params) {
    const API_URL = "/api/manage/one_review";
    return axiosClient.get(API_URL, { params });
  },

  updateStatus(iddg, status) {
    const API_URL = `/api/manage/update_status/status=${status}/iddg=${iddg}`;
    return axiosClient.put(API_URL);
  },
  deleteReview(iddg) {
    const API_URL = `/api/manage/review/delete/iddg=${iddg}`;
    return axiosClient.delete(API_URL);
  },
};

export default reviewAPI;
