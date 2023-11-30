import axiosClient from "./axiosClient";

const detailProductAPI = {
  createdetailProductAPI(data) {
    const API_URL = "/api/detail_product/add";
    return axiosClient.post(API_URL, data);
  },

  updateNumberProduct(data) {
    const API_URL = `/api/detail_product/update_number_product`;
    return axiosClient.put(API_URL, data);
  },

  getAllNumber() {
    const API_URL = "/api/detail_product/list";
    return axiosClient.get(API_URL);
  },

  getList(idsp) {
    const API_URL = `/api/detail_product/list/${idsp}`;
    return axiosClient.get(API_URL);
  },

  getListColor(idsp, idms) {
    const API_URL = `/api/detail_product/size/${idsp}/${idms}`;
    return axiosClient.get(API_URL);
  },

  getProductByNow(params) {
    const API_URL = "/api/detail_product/buy_now";
    return axiosClient.get(API_URL, {params});
  },

  getNumberProduct(idsp, idkt, idms) {
    const API_URL = `/api/detail_product/number_product/${idsp}/${idms}/${idkt}`;
    return axiosClient.get(API_URL);
  },

  removeProduct(data) {
    const API_URL = "/api/detail_product/remove_product";
    return axiosClient.put(API_URL, data);
  },

  addNumberProduct(data) {
    const API_URL = "/api/detail_product/add_product";
    return axiosClient.put(API_URL, data);
  },

  getNumberOneProduct(params) {
    const API_URL = "/api/detail_product/number_product";
    return axiosClient.get(API_URL, {params});
  },
  removeUpdate(params){
    const API_URL = `/api/detail_product/removeUpdate/${params}`;
    return axiosClient.put(API_URL);
  },
  updateDetailproduct(data){
    const API_URL = "/api/detail_product/update";
    return axiosClient.post(API_URL, data);
  }

};

export default detailProductAPI;
