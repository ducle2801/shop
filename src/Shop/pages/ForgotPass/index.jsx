import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import sha256 from "js-sha256";
import { useSnackbar } from "notistack";
import verifyEmailAPI from "../../../api/verifyEmailAPI";
import userAPI from "../../../api/userAPI";


const defaultValues = {
  email: "",
  password: "",
  confirmpassword: "",
  capcha: "",
};

function ForgotPass() {
  const { register, handleSubmit, watch,formState } = useForm({ defaultValues });
  const { errors} = formState;
  const password = useRef({});
  password.current = watch("password", "");
  const [dataEmail, setDataEmail] = useState("");
  const [code, setCode] = useState("");
  const [countdown, setCountDown] = useState(0);

  let navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const setData = async (data) => {
    try {
      if (data.capcha === code.code) {
        await userAPI.changePass(dataEmail, {
          password: sha256(data.password),
        });
        enqueueSnackbar("Đổi mật khẩu thành công", {
          variant: "success",
          autoHideDuration: 2000,
        });
        navigate("/shop/login ");
      } else {
        enqueueSnackbar("Mã xác thực không hợp lệ", {
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

  const sendEmail = async () => {
    if (!dataEmail) {
      enqueueSnackbar("Vui lòng nhập đầy đủ thông tin", {
        variant: "error",
        autoHideDuration: 2000,
      });
      return;
    }
    setCountDown(1);
    ProgressCountdown(61);
    const checkEmail = await userAPI.checkUser(dataEmail);
    if (checkEmail.length > 0) {
      if (dataEmail) {
        const verify = await verifyEmailAPI.verify(dataEmail);
        setCode(verify);
      }
      enqueueSnackbar("Đã gửi mã xác nhận đến email của bạn", {
        variant: "success",
        autoHideDuration: 2000,
      });
    } else {
      enqueueSnackbar("Email chưa đăng ký tài khoản", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  const email = (data) => {
    setDataEmail(data);
  };

  const ProgressCountdown = (timeleft) => {
    return new Promise((resolve, reject) => {
      var countdownTimer = setInterval(() => {
        timeleft--;
        document.getElementById("countdown").innerText = timeleft;
        if (timeleft <= 0) {
          clearInterval(countdownTimer);
          setCountDown(0);
          resolve(true);
        }
      }, 1000);
    });
  };

  return (
    <div>
      <div className="absolute top-[55%] left-2/4 -translate-x-2/4 -translate-y-2/4 w-[400px] p-10 bg-[#F1F5F9] rounded-xl shadow-lg">
        <p className="text-[25px] font-bold text-center">QUÊN MẬT KHẨU</p>
        <input
          onChange={(e) => email(e.target.value)}
          placeholder="Email"
          className="w-full mt-6 py-1 outline-none bg-[#F1F5F9] border-b-2 border-b-[#8A99AD]"
          type="email"
        />
        {countdown === 0 ? (
          <p
            onClick={() => sendEmail()}
            className="absolute right-10 top-[108px] text-blue-800 cursor-pointer"
          >
            Gửi
          </p>
        ) : (
          <p
            id="countdown"
            className="absolute right-10 top-[108px] text-slate-900 cursor-pointer"
          ></p>
        )}

        <form onSubmit={handleSubmit((data) => setData(data))}>
          <input
            name="password"
            {...register("password")}
            placeholder="Mật khẩu"
            className="w-full mt-6 py-1 outline-none bg-[#F1F5F9] border-b-2 border-b-[#8A99AD]"
            type="password"
          />

          <input
            name="confirmpassword"
            {...register("confirmpassword", {
              validate: (value) =>
                value === password.current || "Mật khẩu không khớp!",
            })}
            placeholder="Nhập lại mật khẩu"
            className="w-full mt-6 py-1 outline-none bg-[#F1F5F9] border-b-2 border-b-[#8A99AD]"
            type="password"
          />
          <p className="absolute text-[14px] text-red-600">
            {errors.confirmpassword?.message}
          </p>

          <input
            name="capcha"
            {...register("capcha")}
            placeholder="Mã xác thực"
            className="w-[40%] mt-6 py-2 outline-none bg-[#F1F5F9] border-b-2 border-b-[#8A99AD]"
            type="text"
          />

          <button className="w-full opacity-80 text-white font-bold mt-8 py-2 bg-sky-400 rounded-xl hover:opacity-100 duration-300">
            THAY ĐỔI MẬT KHẨU
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPass;
