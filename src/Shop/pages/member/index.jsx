import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import userAPI from "../../../api/userAPI";
import "./index.css";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import moment from "moment";
import exportInvoiceAPI from "../../../api/exportInvoiceAPI";
import detailExportInvoiceAPI from "../../../api/detailExportInvoiceAPI";
import { useSnackbar } from "notistack";
import img0 from "../../../assets/avatarmember.png";

function Index() {
  const { enqueueSnackbar } = useSnackbar();
  const [member, setMember] = useState([]);
  const [money, setMoney] = useState();
  const [allOrder, setAllOrder] = useState([]);
  const [successOrser, setSuccessOrser] = useState([]);
  const [cancelOrder, setCancelOrder] = useState([]);
  const [refundOrder, setRefundOrder] = useState([]);
  const id_kh = useSelector((state) => state?.user?.current.dataUser[0]?.id_kh);
  useEffect(() => {
    (async () => {
      try {
        const typeMember = await userAPI.getMember(id_kh);
        setMember(typeMember);
        const totalMoney = await userAPI.getSumMoneyUser(id_kh);
        setMoney(totalMoney[0]?.tongtien);
        const allOrder = await exportInvoiceAPI.getListExportInvoice(id_kh);
        for (let i = 0; i < allOrder.length; i++) {
          const data = await detailExportInvoiceAPI.getDetailExportInvoice(
            allOrder[i].id_hdx
          );
          setAllOrder((test) => [...test, { HDX: allOrder[i], CTHDX: data }]);
        }

        const successOrder = await exportInvoiceAPI.getOrders(id_kh, {
          status: "Đã giao hàng",
        });
        for (let i = 0; i < successOrder.length; i++) {
          const data = await detailExportInvoiceAPI.getDetailExportInvoice(
            successOrder[i].id_hdx
          );
          setSuccessOrser((test) => [
            ...test,
            { HDX: successOrder[i], CTHDX: data },
          ]);
        }

        const cancelOrder = await exportInvoiceAPI.getOrders(id_kh, {
          status: "Hủy",
        });
        for (let i = 0; i < cancelOrder.length; i++) {
          const data = await detailExportInvoiceAPI.getDetailExportInvoice(
            cancelOrder[i].id_hdx
          );
          setCancelOrder((test) => [
            ...test,
            { HDX: cancelOrder[i], CTHDX: data },
          ]);
        }

        const refundOrder = await exportInvoiceAPI.getOrders(id_kh, {
          status: "Hoàn hàng",
        });
        for (let i = 0; i < refundOrder.length; i++) {
          const data = await detailExportInvoiceAPI.getDetailExportInvoice(
            refundOrder[i].id_hdx
          );
          setRefundOrder((test) => [
            ...test,
            { HDX: refundOrder[i], CTHDX: data },
          ]);
        }
      } catch (error) {
        enqueueSnackbar(error.message, {
          variant: "error",
          autoHideDuration: 2000,
        });
      }
    })();
  }, []);
  return (
    <div className="member">
      <div className="center">
        <div className="cardm">
          <div className="additional">
            <div className="user-card">
              <div className="level center">
                <EmojiEventsOutlinedIcon
                  sx={{
                    color:
                      member[0]?.thanh_vien === 1
                        ? "#E1E1E2"
                        : member[0]?.thanh_vien === 2
                        ? "yellow"
                        : member[0]?.thanh_vien === 3
                        ? "red"
                        : "brown",
                    width: "50px",
                    height: "50px",
                  }}
                />
              </div>
              <div className="absolute top-[50%] left-[50%] translate-x-[-55%] translate-y-[-80%] w-[150px] text-center thanhvien">
                {member[0]?.thanh_vien === 1
                  ? "Bạc"
                  : member[0]?.thanh_vien === 2
                  ? "Vàng"
                  : member[0]?.thanh_vien === 3
                  ? "kim cương"
                  : "Đồng"}
              </div>
              <div className="points center">
                {new Intl.NumberFormat("it-IT", {
                  style: "currency",
                  currency: "VND",
                }).format(money)}
              </div>
            </div>
            <div className="more-info ">
              <h1 className="text-[20px] text-slate-50">Tên khách hàng</h1>
              <h1 className="font-extrabold italic text-[25px] text-yellow-300">{member[0]?.email_kh}</h1>
              <div className="coords">
                <span className="text-[17px]">Ngày tạo tài khoản</span>
                <span className="text-[17px]">Trạng thái tài khoản</span>
              </div>
              <div className="coords ">
                <span className="italic text-[20px] ">
                  {moment(member[0]?.ngay_tao_tk).format("DD/MM/YYYY")}
                </span>
                <span className="italic text-[20px]">
                  {member[0]?.trang_thai_kh === 0
                    ? "Đang hoạt động"
                    : "Tài khoản bị khóa"}
                </span>
              </div>
              <div className="stats">
                <div>
                  <div className="title">Thành công</div>
                  <i className="fa fa-trophy"></i>
                  <div className="value"> {successOrser.length}</div>
                </div>
                <div>
                  <div className="title">Đơn hoàn</div>
                  <i className="fa fa-gamepad"></i>
                  <div className="value">{refundOrder.length}</div>
                </div>
                <div>
                  <div className="title">Đơn hủy</div>
                  <i className="fa fa-group"></i>
                  <div className="value">{cancelOrder.length}</div>
                </div>
                <div>
                  <div className="title">Tổng đơn</div>
                  <i className="fa fa-coffee"></i>
                  <div className="value infinity">{allOrder.length}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="general ">
            <div className="relative flex justify-center items-center top-[50%] translate-y-[-50%] translate-x-[-50%] left-[50%]">
              <img
                className="animation_spin block w-[80%] rotate-[-20deg] z-20 absolute left-[10%]"
                src={img0}
                alt="hinh anh"
              />
              <div className="absolute w-[240px] h-[240px] bg-[#ffe2a8] rounded-[50%] z-10 shadow-xl "></div>
              <div className="absolute w-[220px] h-[220px] bg-[#FFEBC2] rounded-[50%] z-10"></div>
            </div>
            <span className="more italic text-white">Thẻ thành viên Tramxanh</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
