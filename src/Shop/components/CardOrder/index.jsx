import React from "react";
import moment from "moment";
import {Link} from "react-router-dom";
import detailExportInvoiceAPI from "../../../api/detailExportInvoiceAPI";
import detailProductAPI from "../../../api/detailProductAPI";
import exportInvoiceAPI from "../../../api/exportInvoiceAPI";

function CardOrder({data}) {
  const cancelOrder = async (idhdx) => {
    const data_hdx = await detailExportInvoiceAPI.getDetailExportInvoice(idhdx);
    await detailProductAPI.addNumberProduct(data_hdx);
    await exportInvoiceAPI.updateStatus(idhdx, {
      status: "Hủy",
    });
    window.location.reload();
  };
  return (
    <div>
      {data?.map(({HDX, CTHDX}, idx) => (
        <div key={idx} className="mt-5 p-4 min-h-[230px] mx-auto bg-cyan-50 rounded-lg shadow-md">
          <Link to={`/shop/order/${HDX.id_hdx}`}>
            <div>
              <div className="flex justify-between">
                <span className="block">{moment(HDX.ngay_lap_hdx).format("DD/MM/YYYY")}</span> <br />
                <span className="block font-medium px-6 py-1 bg-slate-50 rounded-2xl">{HDX.trang_thai}</span>
              </div>
              {CTHDX.map(({ten_sp, hinh_anh, so_luong_xuat, ten_ms, ten_kt}, idx) => (
                <div key={idx} className="relative flex justify-between gap-5 items-center mb-4 mt-4">
                  <img className="block w-[75px] align-middle rounded-lg" src={hinh_anh} alt="" />

                  <div className="w-[90%] ">
                    <p className="text-[18px] font-medium">{ten_sp}</p>
                    <div className="flex gap-5 text-[14px] text-slate-500">
                      <span>Màu sắc: {ten_ms}</span>
                      <span>Kích thước: {ten_kt}</span>
                    </div>
                  </div>
                  <span className="w-[20%] text-center">Số lượng: {so_luong_xuat}</span>
                </div>
              ))}
              <div className="text-right pr-5">
                <span className="text-[20px] text-red-800 font-bold">
                  {new Intl.NumberFormat("vi-VN", {style: "currency", currency: "VND"}).format(HDX.tong_tien_hdx)}
                </span>
              </div>
            </div>
          </Link>
          <div className="pr-5">
            {HDX.trang_thai === "Đã giao hàng" ? (
              <Link to={`/shop/review/${HDX.id_hdx}`}>
              <button className="mt-5 mr-5 text-white font-medium px-4 py-2 bg-amber-400 rounded-lg">
                Đánh giá
              </button>
              </Link>
            ) : (
              <></>
            )}

            {HDX.trang_thai === "Đang xử lý" ? (
              <button
                onClick={() => cancelOrder(HDX.id_hdx)}
                className="mt-5 text-white font-medium px-4 py-2 bg-red-500 rounded-lg"
              >
                Hủy
              </button>
            ) : (
              <button className="mt-5 text-white font-medium px-4 py-2 bg-red-500 rounded-lg opacity-60 cursor-not-allowed">
                Hủy
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CardOrder;
