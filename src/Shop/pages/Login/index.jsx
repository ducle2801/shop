import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import sha256 from "js-sha256";
import FormLogin from "../../components/FormLogin";
import { unwrapResult } from "@reduxjs/toolkit";

import { useDispatch } from "react-redux";
import { login } from "../../../redux/userSlice";
import { useSnackbar } from "notistack";
import userAPI from "../../../api/userAPI";

const defaultValues = {
  email: "",
  password: "",
};

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

function Login() {
  const { enqueueSnackbar } = useSnackbar();
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({ defaultValues });

  let navigate = useNavigate();
  const dispatch = useDispatch();

  const dataUser = (data) => {
    return {
      email: data.email,
      password: sha256(data.password),
    };
  };

  const Login = async (data) => {
    try {
      let arr = [];
      const res = await userAPI.login(dataUser(data));

      arr.push(res.dataUser[0]);
      if (arr[0]?.trang_thai_kh === 1) {
        enqueueSnackbar("Tài khoản đã bị khóa", {
          variant: "error",
          autoHideDuration: 2000,
        });
        return;
      }
      if (arr[0]?.id_kh) {
        unwrapResult(dispatch(login(dataUser(data))));
        navigate("/shop/products", { replace: true });
        window.sessionStorage.setItem("token", res.accessToken);
        enqueueSnackbar("Đăng nhập thành công", {
          variant: "success",
          autoHideDuration: 2000,
        });
      } else {
        enqueueSnackbar("Tài khoản hoặc mật khẩu không đúng", {
          variant: "error",
          autoHideDuration: 2000,
        });
      }
    } catch (error) {
      enqueueSnackbar("Tài khoản hoặc mật khẩu không đúng", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  return (
    <div>
      <div className="absolute top-[55%] left-2/4 -translate-x-2/4 -translate-y-2/4 w-[400px] p-10 bg-[#F1F5F9] rounded-xl shadow-lg">
        <p className="text-[35px] font-bold text-center">ĐĂNG NHẬP</p>
        <form onSubmit={handleSubmit((data) => Login(data))}>
          <FormLogin control={control} errors={errors} />
          <Link to="/shop/forgot_password">
            <p className="mt-6 text-[14px] text-cyan-500 text-right cursor-pointer">
              Quên mật khẩu ?
            </p>{" "}
          </Link>
          <button className="w-full opacity-80 text-white font-bold mt-8 py-2 bg-blue-400 rounded-xl hover:opacity-100 duration-300">
            ĐĂNG NHẬP
          </button>
          <p className="text-center mt-4">
            Chưa có tài khoản?
            <Link className="text-sky-500" to="/shop/register">
              {" "}
              Đăng ký
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
