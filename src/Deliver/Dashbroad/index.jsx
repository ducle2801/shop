import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import img0 from "../../assets/logo.png"
import deliverAPI from "../../api/deliverAPI";
import exportInvoiceAPI from "../../api/exportInvoiceAPI";
import detailExportInvoiceAPI from "../../api/detailExportInvoiceAPI";
import detailProductAPI from "../../api/detailProductAPI";
import userAPI from "../../api/userAPI";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

function Dashbroad() {
  const [invoice, setInvoice] = useState([]);
  const [invoice2, setInvoice2] = useState([]);
  const [count, setCount] = useState(0);
  const [note, setNote] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const id_nv = useSelector(
    (state) => state.employee?.currentDeliver[0]?.id_nv
  );
  const naviagte = useNavigate();
  useEffect(() => {
    (async () => {
      if (id_nv) {
        const res_1 = await deliverAPI.getInvoiceStatus(id_nv, {
          status: "Đang xử lý",
        });
        setInvoice(res_1);
        const res_2 = await deliverAPI.getInvoiceStatus(id_nv, {
          status: "Đang giao hàng",
        });
        setInvoice2(res_2);
      } else {
        naviagte("/deliver/login");
      }
    })();
  }, [count]);
  const waitShip = async (idhdx) => {
    await deliverAPI.updateStatus({
      idhdx: idhdx,
      status: "Đang giao hàng",
    });

    await exportInvoiceAPI.updateStatus(idhdx, {
      status: "Đang giao hàng",
    });

    setCount((e) => e + 1);
  };

  const cancelShip = async (idhdx) => {
    await deliverAPI.deleteInvoice(idhdx);
    await exportInvoiceAPI.updateStatus(idhdx, {
      status: "Đang xử lý",
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
      ngaygh: moment().format("YYYY-MM-DD"),
      status: "Đã giao hàng",
    });
    await exportInvoiceAPI.updateStatus(idhdx, {
      status: "Đã giao hàng",
    });
    console.log("tongngoai:", tongtien, "khach", totalMoney[0]?.tongtien, "type", typeMember);
    await userAPI.updateMember(idkh, typeMember);
    setCount((e) => e + 1);
  };

  const handleBackOrder = async (idhdx) => {
    if (!!note) {
      await deliverAPI.updateStatusNote({
        idhdx: idhdx,
        status: "Hoàn hàng",
        ngaygh: moment().format("YYYY-MM-DD"),
        ghichu: note,
      });
      await exportInvoiceAPI.updateStatus(idhdx, {
        status: "Hoàn hàng",
      });
      const data_hdx = await detailExportInvoiceAPI.getDetailExportInvoice(
        idhdx
      );
      await detailProductAPI.addNumberProduct(data_hdx);
      handleClose();
    } else {
      console.log("NO");
    }
    setCount((e) => e + 1);
  };
  return (
    <div className="pb-20">
    <div className="py-5">
        <p className="w-[150px] h-[150px] relative left-[50%] translate-x-[-50%]">
          {" "}
          <img src={img0} />
        </p>
      </div>
      <div className="px-4">
        <p className="text-[20px]">Đơn hàng cần được giao</p>
        <div>
          {invoice2?.map(
            (
              {
                id_hdx,
                ten_kh,
                so_dien_thoai,
                tong_tien_hdx,
                dia_chi_hdx,
                trang_thai_gh,
                id_kh,
              },
              idx
            ) => (
              <div
                key={idx}
                className="mt-5  p-4 rounded-lg shadow-lg max-w-[600px]"
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
                {trang_thai_gh === "Đang xử lý" && (
                  <div className="flex gap-5">
                    <button
                      onClick={() => waitShip(id_hdx)}
                      className="block mt-4 px-4 py-2 bg-amber-600 text-white rounded-lg shadow-md"
                    >
                      Giao hàng
                    </button>
                    <button
                      onClick={() => cancelShip(id_hdx)}
                      className="block mt-4 px-4 py-2 bg-red-500 text-white rounded-lg shadow-md"
                    >
                      Hủy
                    </button>
                  </div>
                )}

                {trang_thai_gh === "Đang giao hàng" && (
                  <>
                    <button
                      onClick={() => successShip(id_hdx, tong_tien_hdx, id_kh)}
                      className="block mt-4 px-4 py-2 bg-green-600 text-white rounded-lg shadow-md"
                    >
                      Xác nhận giao hàng
                    </button>
                    <button
                      onClick={handleOpen}
                      className="block mt-4 px-4 py-2 bg-orange-600 text-white rounded-lg shadow-md"
                    >
                      Hoàn hàng
                    </button>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <p>Ghi chú</p>
                        <textarea
                          onChange={(e) => setNote(e.target.value)}
                          className="p-2 w-full border border-slate-600 outline-none rounded-lg"
                          rows="5"
                        ></textarea>
                        <button
                          onClick={() => handleBackOrder(id_hdx)}
                          className="block mt-4 px-4 py-2 bg-orange-600 text-white rounded-lg shadow-md"
                        >
                          Xác nhận
                        </button>
                      </Box>
                    </Modal>
                  </>
                )}

                {trang_thai_gh === "Hoàn hàng" && (
                  <button className="block mt-4 px-4 py-2 bg-orange-600 text-white rounded-lg shadow-md cursor-not-allowed opacity-80">
                    Đã hoàn hàng
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
          {invoice?.map(
            (
              {
                id_hdx,
                ten_kh,
                so_dien_thoai,
                tong_tien_hdx,
                dia_chi_hdx,
                trang_thai_gh,
                id_kh,
              },
              idx
            ) => (
              <div
                key={idx}
                className="mt-5 bg-slate-100 p-4 rounded-lg shadow-lg max-w-[600px]"
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
                {trang_thai_gh === "Đang xử lý" && (
                  <div className="flex gap-5">
                    <button
                      onClick={() => waitShip(id_hdx)}
                      className="block mt-4 px-4 py-2 bg-amber-600 text-white rounded-lg shadow-md"
                    >
                      Giao hàng
                    </button>
                    <button
                      onClick={() => cancelShip(id_hdx)}
                      className="block mt-4 px-4 py-2 bg-red-500 text-white rounded-lg shadow-md"
                    >
                      Hủy
                    </button>
                  </div>
                )}

                {trang_thai_gh === "Đang giao hàng" && (
                  <button
                    onClick={() => successShip(id_hdx)}
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

export default Dashbroad;
