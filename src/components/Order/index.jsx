import React from "react";
import moment from "moment";
import exportInvoiceAPI from "../../api/exportInvoiceAPI";
import {useSnackbar} from "notistack";

function Order({data}) {
  const {enqueueSnackbar} = useSnackbar();
  const cancelOrder = async (id_hdx) => {
    await exportInvoiceAPI.updateStatus(id_hdx, {
      status: "Hủy",
    });
    enqueueSnackbar("Đã hủy đơn hàng", {
      variant: "error",
      autoHideDuration: 2000,
    });
    window.location.reload();
  };

  return (
    <>
      <p className="text-[30px] font-bold text-center ">HÓA ĐƠN</p>
      {data?.map(({HDX, CTHDX}, idx) => (
        <div key={idx} className="mt-5 p-4 w-[45%] min-h-[230px] mx-auto bg-cyan-50 rounded-lg shadow-md">
          <div>
            <span>{moment(HDX.ngay_lap_hdx).format("DD/MM/YYYY")}</span> <br />
            <span className="font-bold">{HDX.trang_thai}</span>
          </div>
          {CTHDX.map(({ten_sp, hinh_anh, so_luong_xuat, id_hdx}, idx) => (
            <div key={idx} className="flex gap-5 items-center mb-4 mt-4">
              <img className="block w-[75px] align-middle rounded-lg" src={hinh_anh} alt="" />
              <span className="text-[20px] font-bold">{ten_sp}</span>
              <span>x{so_luong_xuat}</span>
            </div>
          ))}
          <span className="text-[20px] text-red-800 font-bold">
            {HDX.tong_tien_hdx.toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })}
          </span>
          <div className="flex justify-end">
            {HDX.trang_thai === "Chờ xác nhận" ? (
              <>
                <button
                  onClick={() => cancelOrder(HDX.id_hdx)}
                  className="py-2 px-6 text-white text-[16px] bg-red-500 font-bold shadow-md rounded-lg"
                >
                  Hủy
                </button>
              </>
            ) : (
              <>
                <button className="float-right py-2 px-6 text-white text-[16px] bg-red-500 opacity-50 cursor-not-allowed font-bold shadow-md rounded-lg">
                  Hủy
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </>
  );
}

export default Order;
