import axiosClient from './axiosClient';

const filterAPI = {
  sortBy(key) {
    const API_URL = `/api/manage/filter/sortby/${key}`;
    return axiosClient.get(API_URL);
  },

  sortBrand(key) {
    const API_URL = `/api/manage/filter/sortbrand/${key}`;
    return axiosClient.get(API_URL);
  },
  sortSize(params) {
    const API_URL = '/api/manage/filter/sortSize';
    return axiosClient.get(API_URL, { params });
  },
  sortSizeBrand(params) {
    const API_URL = '/api/manage/filter/sortSizeBrand';
    return axiosClient.get(API_URL, { params });
  },
  sortSizeBrandSale(params) {
    const API_URL = '/api/manage/filter/sortSizeBrandSale';
    return axiosClient.get(API_URL, { params });
  },

  search(key) {
    const API_URL = `/api/manage/filter/search/${key}`;
    return axiosClient.get(API_URL);
  },

  rangePrice(params) {
    const API_URL = '/api/manage/filter/range_price';
    return axiosClient.get(API_URL, { params });
  },

  sortType(key) {
    const API_URL = `/api/manage/filter/sorttype/${key}`;
    return axiosClient.get(API_URL);
  },

  sortBySale(key) {
    const API_URL = `/api/manage/filter/sortbySale/${key}`;
    return axiosClient.get(API_URL);
  },

  sortBrandSale(key) {
    const API_URL = `/api/manage/filter/sortbrandSale/${key}`;
    return axiosClient.get(API_URL);
  },
  sortSizeSale(params) {
    const API_URL = '/api/manage/filter/sortSizeSale';
    return axiosClient.get(API_URL, { params });
  },
  sortTypeSale(key) {
    const API_URL = `/api/manage/filter/sortTypeSale/${key}`;
    return axiosClient.get(API_URL);
  },
  rangePriceSale(params) {
    const API_URL = '/api/manage/filter/range_priceSale';
    return axiosClient.get(API_URL, { params });
  },
};

export default filterAPI;
