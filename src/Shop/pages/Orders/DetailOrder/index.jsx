import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {styled} from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Check from "@mui/icons-material/Check";
import StepConnector, {stepConnectorClasses} from "@mui/material/StepConnector";

import {AiFillSetting} from "react-icons/ai";
import {FaBox} from "react-icons/fa";
import {MdDeliveryDining} from "react-icons/md";
import {BsCheckLg} from "react-icons/bs";
import {Link, useParams} from "react-router-dom";
import {useSnackbar} from "notistack";
import moment from "moment";
import detailExportInvoiceAPI from "../../../../api/detailExportInvoiceAPI";
import exportInvoiceAPI from "../../../../api/exportInvoiceAPI";

const QontoStepIconRoot = styled("div")(({theme, ownerState}) => ({
  color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
  display: "flex",
  height: 22,
  alignItems: "center",
  ...(ownerState.active && {
    color: "#784af4",
  }),
  "& .QontoStepIcon-completedIcon": {
    color: "#784af4",
    zIndex: 1,
    fontSize: 18,
  },
  "& .QontoStepIcon-circle": {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
}));

function QontoStepIcon(props) {
  const {active, completed, className} = props;

  return (
    <QontoStepIconRoot ownerState={{active}} className={className}>
      {completed ? <Check className="QontoStepIcon-completedIcon" /> : <div className="QontoStepIcon-circle" />}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = styled(StepConnector)(({theme}) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")(({theme, ownerState}) => ({
  backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage: "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage: "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%)",
  }),
}));

function ColorlibStepIcon(props) {
  const {active, completed, className} = props;

  const icons = {
    1: <AiFillSetting size={30} />,
    2: <FaBox size={25} />,
    3: <MdDeliveryDining size={35} />,
    4: <BsCheckLg size={25} />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{completed, active}} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

function DetailOrder() {
  const param = useParams();
  const enqueueSnackbar = useSnackbar();
  const [detailExportInvoice, setDetailExportInvoice] = useState([]);
  const [exportInvoice, setexportInvoice] = useState([]);
  const [step, setStep] = useState(0);

  var steps = ["Đang xử lý", "Đã đóng gói", "Đang vận chuyển", "Đã giao hàng"];
  useEffect(() => {
    (async () => {
      try {
        const result_1 = await exportInvoiceAPI.getExportInvoice(param.idhdx);
        const result_2 = await detailExportInvoiceAPI.getDetailExportInvoice(param.idhdx);

        if (result_1[0]?.trang_thai === "Đã giao hàng") setStep(3);
        if (result_1[0]?.trang_thai === "Đang giao hàng") setStep(2);
        if (result_1[0]?.trang_thai === "Đã xác nhận") setStep(1);
        if (result_1[0]?.trang_thai === "Đang xử lý") setStep(0);
        if (result_1[0]?.trang_thai === "Hủy") setStep(-1);
        if (result_1[0]?.trang_thai === "Hoàn hàng") setStep(-1);

        setexportInvoice(result_1);
        setDetailExportInvoice(result_2);
      } catch (error) {
        enqueueSnackbar(error.message, {
          variant: "error",
          autoHideDuration: 2000,
        });
      }
    })();
  }, []);

  return (
    <div className="w-[80%] mx-auto my-8">
      <Link to={"/shop/orders"}>
        <p className="py-1 px-2 w-[80px] text-white text-center font-medium rounded-md bg-neutral-500">Trở về</p>
      </Link>
      <div>
        <Stack sx={{width: "100%"}} spacing={4}>
          <Stepper alternativeLabel activeStep={step} connector={<ColorlibConnector />}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Stack>
      </div>
      <div className="w-[80%] mt-6 mx-auto">
        <div className="flex justify-between">
          <p>Ngày: {moment(exportInvoice[0]?.ngay_lap_hdx).format("DD/MM/YYYY")}</p>
          <p>{exportInvoice[0]?.trang_thai}</p>
        </div>
        <div>
          {detailExportInvoice?.map(({ten_sp, hinh_anh, so_luong_xuat, ten_ms, ten_kt}, idx) => (
            <div key={idx} className="relative flex justify-between gap-5 items-center mb-4 mt-4">
              <img className="block w-[10%] align-middle rounded-lg" src={hinh_anh} alt="" />
              <span className="w-[70%] text-[20px] font-bold">{ten_sp}</span>
              <span className="w-[20%] text-right">Số lượng: {so_luong_xuat}</span>
              <div className="absolute flex gap-5 left-[12.5%] top-[75%] text-slate-500 text-[14px]">
                <p>Thương hiệu: {ten_ms}</p>
                <p>Loại sản phẩm: {ten_kt}</p>
              </div>
            </div>
          ))}
        </div>
        <hr className="mt-5" />
        <div className="flex justify-between mt-5">
          <div className="w-[55%] p-4 bg-slate-100 rounded-md">
            <p className="text-[20px] font-medium">Địa chỉ</p>
            <div>
              <p>Tên khách hàng: {exportInvoice[0]?.ten_kh}</p>
              <p>Số điện thoại: {exportInvoice[0]?.so_dien_thoai}</p>
              <p>Địa chỉ: {exportInvoice[0]?.dia_chi_hdx}</p>
            </div>
          </div>
          <div className="w-[40%]">
            <p className="text-[20px] font-medium">Tổng cộng</p>
            <div>
              <div className="flex justify-between">
                <p>Tổng tiền:</p>
                <p>
                  {new Intl.NumberFormat("vi-VN", {style: "currency", currency: "VND"}).format(
                    exportInvoice[0]?.tong_tien_hdx - exportInvoice[0]?.tien_vc,
                  )}
                </p>
              </div>
              <div className="flex justify-between">
                <p>Phí vận chuyển:</p>
                <p>
                  {new Intl.NumberFormat("vi-VN", {style: "currency", currency: "VND"}).format(
                    exportInvoice[0]?.tien_vc,
                  )}
                </p>
              </div>
              <hr className="mt-4" />
              <div className="flex justify-between">
                <p>Tổng cộng:</p>
                <p className="text-[20px] font-medium">
                  {new Intl.NumberFormat("vi-VN", {style: "currency", currency: "VND"}).format(
                    exportInvoice[0]?.tong_tien_hdx,
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailOrder;
