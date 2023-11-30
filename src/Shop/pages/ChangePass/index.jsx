import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import sha256 from "js-sha256";
import { useSnackbar } from "notistack";
import userAPI from "../../../api/userAPI";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../redux/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
const defaultValues = {
  password: "",
  confirmpassword1: "",
  confirmpassword: "",
};

function ChangePass() {
  const { register, handleSubmit, watch, formState } = useForm({
    defaultValues,
  });
  const { errors } = formState;
  const confirmpassword1 = useRef({});
  confirmpassword1.current = watch("confirmpassword1", "");
  const user = useSelector(
    (state) => state.user?.current?.dataUser[0]?.email_kh
  );
  const pass = useSelector(
    (state) => state.user?.current?.dataUser[0]?.mat_khau_kh
  );

  let navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const dataUser = (data) => {
    return {
      email: user,
      password: sha256(data.confirmpassword),
    };
  };
  const setData = async (data) => {
    try {
      if (pass === sha256(data.password)) {
        const changeres = await userAPI.changePass(user, {
          password: sha256(data.confirmpassword),
        });
        if (changeres) {
          unwrapResult(dispatch(login(dataUser(data))));
        }
        enqueueSnackbar("Đổi mật khẩu thành công", {
          variant: "success",
          autoHideDuration: 2000,
        });
        navigate("/shop ");
      } else {
        enqueueSnackbar("Tài khoản hoặc mật khẩu không đúng!", {
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
    <div>
      <div className="absolute top-[55%] left-2/4 -translate-x-2/4 -translate-y-2/4 w-[400px] p-10 bg-[#F1F5F9] rounded-xl shadow-lg">
        <p className="text-[25px] font-bold text-center">THAY ĐỔI MẬT KHẨU</p>

        <form onSubmit={handleSubmit((data) => setData(data))}>
          <input
            name="password"
            {...register("password")}
            placeholder="Mật khẩu"
            className="w-full mt-6 py-1 outline-none bg-[#F1F5F9] border-b-2 border-b-[#8A99AD]"
            type="password"
          />
          <input
            name="confirmpassword1"
            {...register("confirmpassword1")}
            placeholder="Mật khẩu mới"
            className="w-full mt-6 py-1 outline-none bg-[#F1F5F9] border-b-2 border-b-[#8A99AD]"
            type="password"
          />
          <input
            name="confirmpassword"
            {...register("confirmpassword", {
              validate: (value) =>
                value === confirmpassword1.current ||
                "Mật khẩu mới không khớp!",
            })}
            placeholder="Nhập lại mật khẩu mới"
            className="w-full mt-6 py-1 outline-none bg-[#F1F5F9] border-b-2 border-b-[#8A99AD]"
            type="password"
          />
          <p className="absolute text-[14px] text-red-600">
            {errors.confirmpassword?.message}
          </p>
          <button className="w-full opacity-80 text-white font-bold mt-8 py-2 bg-sky-400 rounded-xl hover:opacity-100 duration-300">
            THAY ĐỔI MẬT KHẨU
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePass;
