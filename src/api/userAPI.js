import axiosClient from "./axiosClient";

const userAPI = {
  login(data) {
    const API_URL = "/api/auth/signin";
    return axiosClient.post(API_URL, data);
  },

  register(data) {
    const API_URL = "/api/auth/signup";
    return axiosClient.post(API_URL, data);
  },

  checkUser(email) {
    const API_URL = `/api/checkuser/email=${email}`;
    return axiosClient.get(API_URL);
  },

  changePass(email, password) {
    const API_URL = `/api/change_password/email=${email}`;
    return axiosClient.put(API_URL, password);
  },

  getOneUser(id_kh) {
    const API_URL = `/api/get_user/id_kh=${id_kh}`;
    return axiosClient.get(API_URL);
  },

  getListClient() {
    const API_URL = "/api/get_user/list";
    return axiosClient.get(API_URL);
  },

  updateStatusUser(idkh, status) {
    const API_URL = `/api/update_user/status=${status}/idkh=${idkh}`;
    return axiosClient.put(API_URL);
  },
  getMember(id_kh) {
    const API_URL = `/api/get_user/detail/id_kh=${id_kh}`;
    return axiosClient.get(API_URL);
  },

  getSumMoneyUser(id_kh) {
    const API_URL = `/api/get_user/money/id_kh=${id_kh}`;
    return axiosClient.get(API_URL);
  },
  updateMember(idkh, type) {
    const API_URL = `/api/update_user/money/type=${type}/idkh=${idkh}`;
    return axiosClient.put(API_URL);
  },
};

export default userAPI;
