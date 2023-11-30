import React from "react";
import {Controller} from "react-hook-form";
import {   ErrorMessage  } from "@hookform/error-message";

function FormLogin({control, errors}) {
  return (
    <section>
      <Controller
        control={control}
        name="email"
        rules={{
          required: true,
        }}
        render={({field}) => (
          <input
            {...field}
            placeholder="Email"
            className="w-full mt-6 py-2 outline-none bg-[#F1F5F9] border-b-2 border-b-[#8A99AD]"
          />
        )}
      />
      <ErrorMessage
        errors={errors}
        name="email"
        render={() => <p className="absolute text-[14px] text-red-600">Email không được để trống </p>}
      />

      <Controller
        control={control}
        name="password"
        rules={{required: true}}
        render={({field}) => (
          <input
            {...field}
            type="password"
            placeholder="Mật khẩu"
            className="w-full mt-6 py-2 outline-none bg-[#F1F5F9] border-b-2 border-b-[#8A99AD]"
          />
        )}
      />
      <ErrorMessage
        errors={errors}
        name="password"
        render={() => <p className="absolute text-[14px] text-red-600">Mật khẩu không được để trống</p>}
      />
    </section>
  );
}

export default FormLogin;
