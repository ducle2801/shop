import {ErrorMessage} from "@hookform/error-message";
import React from "react";
import {Controller} from "react-hook-form";

function FormProfile({control, errors}) {
  return (
    <>
      <Controller
        control={control}
        name="tenkh"
        rules={{
          required: true,
        }}
        render={({field}) => (
          <div className="flex mb-6">
            <p className="w-[28%]">Tên</p>
            <input {...field} className="w-full py-2 px-2 rounded-lg" type="text" />
          </div>
        )}
      />

      <Controller
        control={control}
        name="sdtkh"
        rules={{required: true}}
        render={({field}) => (
          <div className="flex mb-6">
            <p className="w-[28%]">Số điện thoại</p>
            <input {...field} className="w-full py-2 px-2 rounded-lg" type="text" />
          </div>
        )}
      />

      <Controller
        control={control}
        name="dckh"
        rules={{required: true}}
        render={({field}) => (
          <div className="flex mb-6">
            <p className="w-[28%]">Địa chỉ</p>
            <input {...field} className="w-full py-2 px-2 rounded-lg" type="text" />
          </div>
        )}
      />

      <Controller
        control={control}
        name="dckh"
        rules={{required: true}}
        render={({field}) => (
          <div className="flex mb-6">
            <p className="w-[28%]">Địa chỉ</p>
            <input {...field} className="w-full py-2 px-2 rounded-lg" type="text" />
          </div>
        )}
      />

      <Controller
        control={control}
        name="dckh"
        rules={{required: true}}
        render={({field}) => (
          <div className="flex mb-6">
            <p className="w-[28%]">Địa chỉ</p>
            <input {...field} className="w-full py-2 px-2 rounded-lg" type="text" />
          </div>
        )}
      />

      <Controller
        control={control}
        name="dckh"
        rules={{required: true}}
        render={({field}) => (
          <div className="flex mb-6">
            <p className="w-[28%]">Địa chỉ</p>
            <input {...field} className="w-full py-2 px-2 rounded-lg" type="text" />
          </div>
        )}
      />
    </>
  );
}

export default FormProfile;
