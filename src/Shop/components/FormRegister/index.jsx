import React, {useRef} from "react";
import {Controller} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";

function FormRegister({control, error, watch}) {
  const password = useRef({});
  password.current = watch("password", "");

  return (
    <section>
      <Controller
        control={control}
        name="email"
        rules={{required: true}}
        render={({field}) => (
          <input
            {...field}
            className="w-full mt-6 py-2 outline-none border-b-2 border-b-[#8A99AD] bg-[#F1F5F9]"
            placeholder="Email"
          />
        )}
      />
      <ErrorMessage
        errors={error}
        name="email"
        render={() => (
          <p className="absolute text-[14px] text-red-600">Vui lòng nhập email!</p>
        )}
      />

      <Controller
        control={control}
        name="password"
        rules={{required: true}}
        render={({field}) => (
          <input
            {...field}
            type="password"
            className="w-full mt-6 py-2 outline-none border-b-2 border-b-[#8A99AD] bg-[#F1F5F9]"
            placeholder="Mật khẩu"
          />
        )}
      />
      <ErrorMessage
        errors={error}
        name="password"
        render={() => (
          <p className="absolute text-[14px] text-red-600">
            Vui lòng nhập mật khẩu!
          </p>
        )}
      />

      <Controller
        control={control}
        name="confirmpassword"
        rules={{validate: (value) => value === password.current}}
        render={({field}) => (
          <input
            {...field}
            type="password"
            className="w-full mt-6 py-2 outline-none border-b-2 border-b-[#8A99AD] bg-[#F1F5F9]"
            placeholder="Nhập lại mật khẩu"
          />
        )}
      />
      <ErrorMessage
        errors={error}
        name="confirmpassword"
        render={() => (
          <p className="absolute text-[14px] text-red-600">
            Mật khẩu không trùng nhau!
          </p>
        )}
      />
    </section>
  );
}

export default FormRegister;
