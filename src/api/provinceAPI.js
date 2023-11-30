import axios from "axios";

const provinceAPI = {
  // getListProvince() {
  //   return axios.get("https://provinces.open-api.vn/api/p/");
  // },
  // getProvince(provinceCode) {
  //   return axios.get(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`);
  // },
  // getDistricts(districtCode) {
  //   return axios.get(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`);
  // },
  // getWards(wardCode) {
  //   return axios.get(`https://provinces.open-api.vn/api/w/${wardCode}?depth=2`);
  // },
  getListProvince() {
    return axios.get("https://api.mysupership.vn/v1/partner/areas/province");
  },
  getProvince(provinceCode) {
    return axios.get(`https://api.mysupership.vn/v1/partner/areas/district?province=${provinceCode}`);
  },
  getDistricts(districtCode) {
    return axios.get(`https://api.mysupership.vn/v1/partner/areas/commune?district=${districtCode}`);
  },
  getWards(wardCode) {
    return axios.get(`https://api.mysupership.vn/v1/partner/areas/commune?district=${wardCode}`);
  },
};

export default provinceAPI;
