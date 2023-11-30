import axiosClient from "./axiosClient";

const deliverAPI = {
  createDeliver(data) {
    const API_URL = "/api/manage/delivier/add";
    return axiosClient.post(API_URL, data);
  },
  getnameShip(){
    const API_URL = "/api/manage/delivier/getnameship";
    return axiosClient.get(API_URL);
  },
  getInvoice(idnv) {
    const API_URL = `/api/manage/deliver/list_invoice/idnv=${idnv}`;
    return axiosClient.get(API_URL);
  },

  getInvoiceStatus(idnv, status) {
    const API_URL = `/api/manage/deliver/get_invoice_status/idnv=${idnv}`;
    return axiosClient.put(API_URL, status);
  },

  updateStatusNote(data) {
    const API_URL = `/api/manage/deliver/update_status_note`;
    return axiosClient.post(API_URL, data);
  },

  updateStatus(data) {
    const API_URL = `/api/manage/deliver/update_status`;
    return axiosClient.post(API_URL, data);
  },

  getOneInvoice(idhdx) {
    const API_URL = `/api/manage/deliver/one_invoice/idhdx=${idhdx}`;
    return axiosClient.get(API_URL);
  },

  getAllInvoice() {
    const API_URL = "/api/manage/deliver/list_invoice";
    return axiosClient.get(API_URL);
  },
  getPriceShip(data){
    const API_URL = `/api/manage/deliver/shipinvoice/idnv=${data}`;
    return axiosClient.get(API_URL)
  },
  deleteInvoice(idhdx) {
    const API_URL = `/api/manage/deliver/delete_invoice/idhdx=${idhdx}`;
    return axiosClient.delete(API_URL);
  },
};

export default deliverAPI;
