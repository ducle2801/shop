import React from "react";
import {Controller} from "react-hook-form";

function CardAddress({control, data, checked}) {
  return (
    <>
      <Controller
        control={control}
        name="sldiachi"
        rules={{
          required: true,
        }}
        render={({field: {onChange}}) => (
          <div className="w-full mb-4 p-5 text-[18px] bg-slate-100 rounded-lg">
            <input
              onChange={onChange}
              className="w-5 h-5"
              type="radio"
              value={data?.id_dc || ""}
              checked={checked ? checked : false}
              name="address"
            />
            <div className="leading-8">
              <div>
                <span className="mr-4 text-[18px]">{data.ten_kh}</span>
                <span className="text-[18px]">{data.sdt_kh}</span>
              </div>
              <p>{data.dia_chi_kh}</p>
            </div>
          </div>
        )}
      />
    </>
  );
}

export default CardAddress;
