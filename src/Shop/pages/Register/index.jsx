import React, {useState} from "react";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import moment from "moment";
import sha256 from "js-sha256";
import {useSnackbar} from "notistack";
import {useNavigate} from "react-router-dom";
import Modal from "@mui/material/Modal";
import {Box} from "@mui/material";

import FormRegister from "../../components/FormRegister";
import userAPI from "../../../api/userAPI";
import verifyEmailAPI from "../../../api/verifyEmailAPI";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const defaultValues = {
  email: "",
  password: "",
  confirmpassword: "",
};

function Register() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [number, setNumber] = useState([]);
  const [dataSignup, setDataSignup] = useState("");

  const {enqueueSnackbar} = useSnackbar();
  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: {errors},
    control,
    watch,
  } = useForm({defaultValues});

  const dataUser = (data) => {
    return {
      email: data.email,
      password: sha256(data.password),
      ngaytaotk: moment().format("YYYY-MM-DD"),
    };
  };

  const verify = (data) => {
    if (number) {
      if (data.target.value === number.code && data.target.value.length === 6) {
        console.log(number.code);
        register(dataSignup);
        handleClose();
      }
      if (data.target.value !== number.code && data.target.value.length === 6) {
        enqueueSnackbar("Xác thực thất bại", {
          variant: "error",
          autoHideDuration: 2000,
        });
      }
    }
  };

  const register = async (data) => {
    await userAPI.register(dataUser(data)).then(() => {
      enqueueSnackbar("Đăng ký thành công", {
        variant: "success",
        autoHideDuration: 2000,
      });
      navigate("/shop/login");
    });
  };

  const getData = async (data) => {
    try {
      const email = await userAPI.checkUser(data.email);
      if (email?.length === 0) {
        const code = await verifyEmailAPI.verify(data.email);
        setNumber(code);
        handleOpen();
        setDataSignup(data);
      } else {
        enqueueSnackbar("Tài khoản đã tồn tại", {
          variant: "error",
          autoHideDuration: 2000,
        });
      }
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  return (
    <div className="absolute top-[55%] left-2/4 -translate-x-2/4 -translate-y-2/4 w-[400px] px-10 py-6 bg-[#F1F5F9] rounded-xl shadow-lg">
      <p className="text-[35px] font-bold text-center">ĐĂNG KÝ</p>
      <form onSubmit={handleSubmit((data) => getData(data))}>
        <FormRegister control={control} error={errors} watch={watch} />

        <button className="w-full text-white font-bold mt-10 py-2 bg-blue-400 rounded-xl">ĐĂNG KÝ</button>
        <p className="text-center mt-4">
          Đã có tài khoản?
          <Link className="text-sky-500" to="/shop/login">
            {" "}
            Đăng nhập
          </Link>
        </p>
      </form>
      <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <input
            onChange={(data) => verify(data)}
            className="py-2 px-4 text-[20px] text-center w-full border border-slate-900 rounded-lg"
            type="text"
            placeholder="Nhập mã xác thực"
          />
        </Box>
      </Modal>
    </div>
  );
}

export default Register;
