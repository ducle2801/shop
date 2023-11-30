import React, { useEffect, useState } from "react";
import deliverAPI from "../../../api/deliverAPI";
import moment from "moment";
function Delivery() {
  const [invoice, setInvoice] = useState([]);
  const [ship, setShip] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await deliverAPI.getAllInvoice();
      setInvoice(res);
      const ten_nvship = await deliverAPI.getnameShip();
      setShip(ten_nvship);
    })();
  }, []);
  const handleAddFormChange = async (e) => {
    e.preventDefault();
    const fieldValue = e.target.value;
    const getPriceShip = await deliverAPI.getPriceShip(fieldValue);
    setInvoice(getPriceShip);
  };
  console.log(invoice);
  return (
    <div className="px-[20px] ">
      <div className="w-[10%]">
        <select
          name="nv"
          onChange={handleAddFormChange}
          className="h-8 px-2 w-full border border-slate-400 outline-none rounded-lg"
        >
          <option value="">Nhân viên</option>
          {ship &&
            ship?.map(({ ten_nv, id_nv }, idx) => (
              <option key={idx} value={id_nv}>
                {ten_nv}
              </option>
            ))}
        </select>
      </div>
      <div className="grid grid-cols-5 gap-5 mt-5 overflow-y-auto h-[calc(68vh)]">
        {invoice.map(
          (
            {
              ten_kh,
              tong_tien_hdx,
              id_hdx,
              trang_thai_gh,
              ten_nv,
              ngay_lap_hdx,
              ngay_gh,
              ghi_chu,
              ten_sp,
            },
            idx
          ) => (
            <div
              key={idx}
              className=" relative p-4 bg-slate-100 rounded-md shadow-md border-2"
            >
              <p>Mã đơn hàng: {id_hdx}</p>
              <p>Tên khách hàng: {ten_kh}</p>
              <p>
                Tên sản phẩm: <span className="font-bold">{ten_sp} </span>
              </p>
              <p>
                Tổng tiền hóa đơn:{" "}
                <span className="text-red-600 font-bold">
                  {tong_tien_hdx.toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
              </p>
              <p>
                Tên nhân viên giao hàng:{" "}
                <span className="font-bold">{ten_nv}</span>
              </p>
              <p>
                Ngày lập đơn:{" "}
                <span className="font-bold">
                  {moment(ngay_lap_hdx).format("DD/MM/YYYY")}
                </span>
              </p>

              {trang_thai_gh === "Đã giao hàng" ? (
                <p className="text-green-500 font-bold">{trang_thai_gh}</p>
              ) : (
                <p className="text-orange-500 font-bold">{trang_thai_gh}</p>
              )}
              <p>Lý do trả hàng: {ghi_chu}</p>
              <p>
                Ngày Giao Hàng:{" "}
                {ngay_gh ? (
                  <span className="font-bold">
                    {moment(ngay_gh)?.format("DD/MM/YYYY")}
                  </span>
                ) : (
                  <span className="font-bold">Đơn hàng chưa hoàn thành</span>
                )}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Delivery;

