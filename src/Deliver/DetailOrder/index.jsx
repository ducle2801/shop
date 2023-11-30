import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import deliverAPI from "../../api/deliverAPI";
import detailExportInvoiceAPI from "../../api/detailExportInvoiceAPI";
import exportInvoiceAPI from "../../api/exportInvoiceAPI";
import userAPI from "../../api/userAPI";
import img0 from "../../assets/logo.png"
function DetailOrder() {
  let params = useParams();

  const [invoiceData, setInvoiceData] = useState([]);
  const [exportInvoice, setExportInvoice] = useState([]);
  const [count, setCount] = useState(0);
  const id_nv = useSelector(
    (state) => state.employee?.currentDeliver[0]?.id_nv
  );
  const naviagte = useNavigate();

  useEffect(() => {
    (async () => {
      if (id_nv) {
        const res = await detailExportInvoiceAPI.getDetailExportInvoice(
          params.idhdx
        );
        const res_exportInvoice = await deliverAPI.getOneInvoice(params.idhdx);
        setExportInvoice(res_exportInvoice);
        setInvoiceData(res);
      } else {
        naviagte("/deliver/login");
      }
    })();
  }, [params.idhdx, count]);
  const waitShip = async (idhdx, idkh) => {
    await deliverAPI.updateStatus({
      idhdx: idhdx,
      status: "Đang giao hàng",
    });
    await exportInvoiceAPI.updateStatus(idhdx, {
      status: "Đang giao hàng",
    });

    setCount((e) => e + 1);
  };

  const successShip = async (idhdx, tongtien, idkh) => {
    const totalMoney = await userAPI.getSumMoneyUser(idkh);
    const typeMember =
      tongtien + totalMoney[0]?.tongtien >= 10000000 &&
      tongtien + totalMoney[0]?.tongtien < 30000000
        ? 1
        : tongtien + totalMoney[0]?.tongtien >= 30000000 &&
          tongtien + totalMoney[0]?.tongtien < 50000000
        ? 2
        : tongtien + totalMoney[0]?.tongtien >= 50000000
        ? 3
        : 0;
    await deliverAPI.updateStatus({
      idhdx: idhdx,
      status: "Đã giao hàng",
    });
    await exportInvoiceAPI.updateStatus(idhdx, {
      status: "Đã giao hàng",
    });
    await userAPI.updateMember(idkh, typeMember);

    setCount((e) => e + 1);
  };

  return (
    <div className="px-4 pb-20">
     <div className="py-5">
        <p className="w-[150px] h-[150px] relative left-[50%] translate-x-[-50%]">
          {" "}
          <img src={img0} />
        </p>
      </div>
      <div>
        <Link to={"/deliver/dashbroad"}>
          <IoMdArrowRoundBack size={25} />
        </Link>
        <p className="text-[20px] text-center font-bold">Chi Tiết Hóa Đơn</p>
        <div className="mt-5">
          <p>Mã hóa đơn: {params.idhdx}</p>
          {invoiceData?.map(
            (
              { ten_sp, hinh_anh, ten_ms, ten_kt, gia_ban_sp, so_luong_xuat },
              idx
            ) => (
              <div key={idx} className="flex gap-4 mt-4">
                <img
                  className="w-[120px] h-[120px] rounded-lg"
                  src={hinh_anh}
                  alt=""
                />
                <div>
                  <p>
                    Tên sản phẩm: <span className="font-medium"> {ten_sp}</span>
                  </p>
                  <p>Thương hiệu: {ten_ms}</p>
                  <p>Loại sản phẩm: {ten_kt}</p>
                  <p>Số lượng: {so_luong_xuat}</p>
                  <p>
                    Giá:{" "}
                    <strong>
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(gia_ban_sp)}
                    </strong>
                  </p>
                </div>
              </div>
            )
          )}
          <hr className="mt-6" />

          <div className="mt-4">
            <p className="text-[25px] font-medium">Tổng Cộng</p>
            <div className="flex justify-between">
              <p>Tổng tiền:</p>
              <p>
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(
                  exportInvoice[0]?.tong_tien_hdx - exportInvoice[0]?.tien_vc
                )}
              </p>
            </div>
            <div className="flex justify-between">
              <p>Phí vận chuyển</p>
              <p>
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(exportInvoice[0]?.tien_vc)}
              </p>
            </div>
            <div className="flex justify-between">
              <p>Tổng cộng</p>
              <p className="text-[20px] text-red-600 font-bold">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(exportInvoice[0]?.tong_tien_hdx)}
              </p>
            </div>
          </div>
          <div>
            {exportInvoice[0]?.trang_thai_gh === "Đang xử lý" && (
              <button
                onClick={() => waitShip(exportInvoice[0]?.id_hdx)}
                className="block ml-auto mr-0 mt-4 px-4 py-2 bg-amber-600 text-white rounded-lg shadow-md"
              >
                Giao hàng
              </button>
            )}

            {exportInvoice[0]?.trang_thai_gh === "Đang giao hàng" && (
              <button
                onClick={() =>
                  successShip(
                    exportInvoice[0]?.id_hdx,
                    exportInvoice[0]?.tong_tien_hdx,
                    exportInvoice[0]?.id_kh
                  )
                }
                className="block ml-auto mr-0 mt-4 px-4 py-2 bg-green-600 text-white rounded-lg shadow-md"
              >
                Xác nhận giao hàng
              </button>
            )}

            {exportInvoice[0]?.trang_thai_gh === "Đã giao hàng" && (
              <button className="block ml-auto mr-0 mt-4 px-4 py-2 bg-green-600 text-white rounded-lg shadow-md cursor-not-allowed opacity-60">
                Đã giao hàng
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailOrder;
