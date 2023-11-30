import axiosClient from "./axiosClient";

const detailExportInvoiceAPI = {
  createdetailExportInvoice(data) {
    const API_URL = "/api/manage/detail_exportInvoice/add";
    return axiosClient.post(API_URL, data);
  },
  getDetailExportInvoice(id_hdx) {
    const API_URL = `/api/manage/detail_exportInvoice/list/id_hdx=${id_hdx}`;
    return axiosClient.get(API_URL);
  },
  sumNumber(idsp) {
    const API_URL = `/api/manage/detail_exportInvoice/sum_number/idsp=${idsp}`;
    return axiosClient.get(API_URL);
  },

  sumNumberProduct(params) {
    const API_URL = "/api/manage/detail_exportInvoice/sum_number";
    return axiosClient.get(API_URL, {params});
  },
  getProduct(params) {
    const API_URL = "/api/manage/detail_exportInvoice/product";
    return axiosClient.get(API_URL, {params});
  }
};

export default detailExportInvoiceAPI;
