import axiosClient from "./axiosClient";

const detailImportInvoiceAPI = {
  createdetailImportInvoiceAPI(data) {
    const API_URL = "/api/manage/detail_importInvoice/add";
    return axiosClient.post(API_URL, data);
  },
  sumNumber(idsp) {
    const API_URL = `/api/manage/detailImportInvoice/sum_number/idsp=${idsp}`;
    return axiosClient.get(API_URL);
  },

  addNumberProduct(data) {
    const API_URL = "/api/manage/detail_import_invoice/add_product";
    return axiosClient.put(API_URL, data);
  },

  getDetailProductList(idhdn) {
    const API_URL = `/api/manage/detail_import_invoice/list/idhdn=${idhdn}`;
    return axiosClient.get(API_URL);
  },
};

export default detailImportInvoiceAPI;
