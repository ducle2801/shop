import axiosClient from "./axiosClient";

const exportInvoiceAPI = {
  createExportInvoice(data) {
    const API_URL = "/api/manage/exportInvoice/add";
    return axiosClient.post(API_URL, data);
  },
  getListExportInvoice(idkh) {
    const API_URL = `/api/manage/exportInvoice/list/idkh=${idkh}`;
    return axiosClient.get(API_URL);
  },

  getAll() {
    const API_URL = "/api/manage/exportInvoice/get_all";
    return axiosClient.get(API_URL);
  },

  getExportInvoice(idhdx) {
    const API_URL = `/api/manage/exportInvoice/list/idhdx=${idhdx}`;
    return axiosClient.get(API_URL);
  },

  updateStatus(id_hdx, data) {
    const API_URL = `/api/manage/exportInvoice/update/id_hdx=${id_hdx}`;
    return axiosClient.put(API_URL, data);
  },

  deleteExportInvoice(id) {
    const API_URL = `/api/manage/exportInvoice/delete/id=${id}`;
    return axiosClient.delete(API_URL);
  },

  sumPriceInvoices(params) {
    const API_URL = "/api/manage/exportInvoice/sum_price";
    return axiosClient.get(API_URL, {params});
  },

  getPriceExportInvoice(params) {
    const API_URL = "/api/manage/exportInvoice/price_statistical";
    return axiosClient.get(API_URL, {params});
  },

  getOrders(idkh, status) {
    const API_URL = `/api/manage/exportInvoice/wait_orders/idkh=${idkh}`;
    return axiosClient.put(API_URL, status);
  },

  numberWait() {
    const API_URL = `/api/manage/exportInvoice/wait_orders/list`;
    return axiosClient.get(API_URL);
  }
};

export default exportInvoiceAPI;
