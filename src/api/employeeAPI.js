import axiosClient from "./axiosClient";

const employeeAPI = {
  register(data) {
    const API_URL = "/api/auth/manage/employee/signup";
    return axiosClient.post(API_URL, data);
  },

  login(data) {
    const API_URL = "/api/auth/manage/employee/signin";
    return axiosClient.post(API_URL, data);
  },

  checkEmployee(email) {
    const API_URL = `/api/manage/checkEmployee/email=${email}`;
    return axiosClient.get(API_URL);
  },

  getEmployee(idnv) {
    const API_URL = `/api/manage/employee/idnv=${idnv}`;
    return axiosClient.get(API_URL);
  },

  getListEmployee() {
    const API_URL = "/api/manage/employee/list";
    return axiosClient.get(API_URL);
  },

  updateEmployee(idnv, data) {
    const API_URL = `/api/manage/employee/update/idnv=${idnv}`;
    return axiosClient.put(API_URL, data);
  },

  deleteEmployee(idnv) {
    const API_URL = `/api/manage/employee/delete/idnv=${idnv}`;
    return axiosClient.delete(API_URL);
  },

  getAllShiper() {
    const API_URL = "/api/manage/employee/get_all_shipper";
    return axiosClient.get(API_URL);
  },
};

export default employeeAPI;
