import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import deliverAPI from "../../api/deliverAPI";
import img0 from "../../assets/logo.png"
function CompleteOrder() {
  const [invoice, setInvoice] = useState([]);
  const id_nv = useSelector(
    (state) => state.employee?.currentDeliver[0]?.id_nv
  );
  useEffect(() => {
    (async () => {
      const res = await deliverAPI.getInvoiceStatus(id_nv, {
        status: "Đã giao hàng",
      });
      console.log("first");
      setInvoice(res);
    })();
  }, [id_nv]);
  return (
    <div className="pb-20">
      <div className="py-5">
        <p className="w-[150px] h-[150px] relative left-[50%] translate-x-[-50%]">
          {" "}
          <img src={img0} />
        </p>
      </div>
      <div className="px-4">
        <p className="text-[20px]">Đơn hàng đã được giao</p>
        <div>
          {invoice?.map(
            (
              {
                id_hdx,
                ten_kh,
                so_dien_thoai,
                tong_tien_hdx,
                dia_chi_hdx,
                trang_thai_gh,
              },
              idx
            ) => (
              <div
                key={idx}
                className="mt-5 bg-slate-100 p-4 rounded-lg shadow-lg max-w-[500px]"
              >
                <Link to={`/deliver/${id_hdx}`}>
                  <p>Mã đơn hàng: {id_hdx}</p>
                  <p>Tên khách hàng: {ten_kh}</p>
                  <p>Số điện thoại: {so_dien_thoai}</p>
                  <p>
                    Số tiền cần thu:{" "}
                    <strong>
                      {tong_tien_hdx.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </strong>
                  </p>
                  <p>Địa chỉ: {dia_chi_hdx}</p>
                </Link>

                {trang_thai_gh === "Đang giao hàng" && (
                  <button
                    // onClick={() => successShip(id_hdx)}
                    className="block mt-4 px-4 py-2 bg-green-600 text-white rounded-lg shadow-md"
                  >
                    Xác nhận giao hàng
                  </button>
                )}

                {trang_thai_gh === "Đã giao hàng" && (
                  <button className="block mt-4 px-4 py-2 bg-green-600 text-white rounded-lg shadow-md cursor-not-allowed opacity-60">
                    Đã giao hàng
                  </button>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default CompleteOrder;
