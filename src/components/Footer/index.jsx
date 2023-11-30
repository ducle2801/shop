import React from 'react';
import { BsInstagram, BsFacebook } from 'react-icons/bs';
import './index.css';
// import {FaTiktok} from "react-icons/fa";
import logo from '../../assets/logo.png';
function Footer() {
  return (
    <div className="mt-10 p-6 container-footer">
      <div className="flex gap-6 leading-8 h-[100%] justify-center ">
        <div className="w-[25%]  ml-[10%]  ">
          <div style={{ width: '150px' }}>
            <img src={logo} />
          </div>
          <div className="mt-6">
            <p>
              Le Minh Duc <br /> B1906460 - Can Tho University <br /> Đã đăng ký
              Bản quyền.
            </p>
          </div>
        </div>
        <div className=" text-center w-[35%]">
          <p className="font-bold ">CÔNG TY PHÁT TRIỂN NÔNG NGHIỆP TRẠM XANH</p>
          <div className="mt-6">
            <p className="thong-tin" style={{ textAlign: 'left' }}>
              Địa chỉ: Mặt bằng số 01, tầng 2, khu VL1A, Chợ thương mại, dịch vụ
              tổng hợp Trung Văn, p. Trung Văn, q. Nam Từ Liêm, Tp. Hà Nội
            </p>
            <p className="thong-tin" style={{ textAlign: 'left' }}>
              VPGD: 489 Hoàng Quốc Việt - Phường Cổ Nhuế 1 - Quận Bắc Từ Liêm -
              Thành phố Hà Nội
            </p>
            <p className="thong-tin" style={{ textAlign: 'left' }}>
              Điện thoại: 0862772966
            </p>
            <p className="thong-tin" style={{ textAlign: 'left' }}>
              Mã số doanh nghiệp: 0108596772 do Sở KHĐT TP. Hà Nội, cấp lần đầu
              ngày 22/01/2019.
            </p>
          </div>
        </div>
        <div className="w-[25%] text-center ">
          <p className="text-[25px] font-bold">CỬA HÀNG</p>
          <div className="mt-6">
            <p className="thong-tin">Thông tin</p>
            <p className="thong-tin">Giới thiệu</p>
            <p className="thong-tin">Liên hệ</p>
            <p className="thong-tin">Về chúng tôi</p>
          </div>
        </div>
        <div className="w-[25%]  ">
          <p className="text-[25px] font-bold">DỊCH VỤ</p>
          <div className="mt-6">
            <p className="thong-tin">Chính sách giao hàng và nhận hàng</p>
            <p className="thong-tin">Cam kết và bảo hành</p>
            <p className="thong-tin">Điều khoản</p>
            <p className="thong-tin">Bảo mật</p>
          </div>
        </div>
        <div className="w-[20%] ">
          <p className="text-[25px] font-bold">MẠNG XÃ HỘI</p>
          <div className="mt-6">
            <div className="mt-4 flex gap-4 items-center">
              <BsInstagram size={25} /> <p>@Minh_Duc</p>
            </div>
            <div className="mt-4 flex gap-4 items-center">
              <BsFacebook size={25} /> <p>@Minh_Duc</p>
            </div>
            {/* <div className="mt-4 flex gap-4 items-center">
              <BsGithub size={25} /> <p>Khanh_Duy</p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
