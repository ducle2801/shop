import axiosClient from "./axiosClient";

const payOnlineAPI = {
  create_payment_url(data) {
    const url = "/create_payment_url";
    return axiosClient.post(url, data);
  },
  vnpay_ipn(params) {
    const url = "/vnpay_ipn";
    return axiosClient.get(url, {params});
  },
};

export default payOnlineAPI;
