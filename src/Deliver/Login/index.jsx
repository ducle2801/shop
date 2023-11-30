import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import employeeAPI from "../../api/employeeAPI";
import { login } from "../../redux/employeeSlice";
import { useSnackbar } from "notistack";
import FormLogin from "./FormLogin";
import { sha256 } from "js-sha256";
import img0 from "../../assets/logo.png"
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const id_cv = useSelector(
    (state) => state.employee?.currentDeliver[0]?.id_cv
  );
  const { enqueueSnackbar } = useSnackbar();
  const defaultValues = {
    email: "",
    password: "",
  };
  useEffect(() => {
    if (id_cv === "CV04") {
      navigate("/deliver/dashbroad");
    } else {
      navigate("/deliver/login");
    }
  }, [id_cv]);
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({ defaultValues });
  const setData = async (data) => {
    try {
      unwrapResult(
        dispatch(
          login({
            email: data.email,
            password: sha256(data.password),
          })
        )
      );
      const auth = await employeeAPI.login({
        email: data.email,
        password: sha256(data.password),
      });
      if (auth[0].id_cv === "CV04") {
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
      <div className="  w-[200px] h-[200px] absolute top-[15%] left-[50%] translate-x-[-50%]">
       <img src={img0}/>
      </div>
      <div className="absolute  top-[55%] left-2/4 -translate-x-2/4 -translate-y-2/4 w-[90%] max-w-[500px]  bg-[#F1F5F9] rounded-xl shadow-lg p-10 border-2 ">
        <p className="text-[35px] font-bold text-center">ĐĂNG NHẬP</p>
        <form onSubmit={handleSubmit((data) => setData(data))}>
          <FormLogin control={control} errors={errors} />
          <button className="w-full opacity-80 text-white font-bold mt-8 py-2 bg-lime-600 rounded-xl hover:opacity-100 duration-300 ">
            ĐĂNG NHẬP
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
