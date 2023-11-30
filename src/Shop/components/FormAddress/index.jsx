import React, {useState} from "react";
import {Controller} from "react-hook-form";

function FormAddress({control, provinces}) {
  const [province, setProvince] = useState([]);

  console.log(province);
  return (
    <>
      <div className="flex gap-5">
        <div className="w-1/2">
          <Controller
            control={control}
            name="tenkh"
            rules={{
              required: true,
            }}
            render={({field}) => (
              <div className="mt-4">
                <p>Họ tên</p>
                <input {...field} className="w-full py-2 px-2 border border-slate-600 rounded-lg" type="text" />
              </div>
            )}
          />

          <Controller
            control={control}
            name="sdtkh"
            rules={{required: true}}
            render={({field}) => (
              <div className="mt-4">
                <p>Số điện thoại</p>
                <input {...field} className="w-full py-2 px-2 border border-slate-600 rounded-lg" type="text" />
              </div>
            )}
          />
        </div>

        <div className="w-1/2">
          <Controller
            control={control}
            name="dckh"
            rules={{required: true}}
            render={({field}) => (
              <div className="mt-4">
                <p>Địa chỉ nhận hàng</p>
                <input {...field} className="w-full py-2 px-2 border border-slate-600 rounded-lg" type="text" />
              </div>
            )}
          />

          <Controller
            control={control}
            name="thanhpho"
            rules={{required: true}}
            render={({field}) => (
              <div className="mt-4">
                <p>Tỉnh/Thành phố</p>
                <select
                  {...field}
                  onChange={(e) => setProvince(e.target.value)}
                  className="w-full py-2 px-2 border border-slate-600 rounded-lg"
                  type="text"
                >
                  <option value=""></option>
                  {provinces?.data?.map(({name, code}, idx) => (
                    <option key={idx} value={code}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          />

          <Controller
            control={control}
            name="huyen"
            rules={{required: true}}
            render={({field}) => (
              <div className="mt-4">
                <p>Quận/Huyện</p>

                <select {...field} className="w-full py-2 px-2 border border-slate-600 rounded-lg" type="text">
                  {province === province?.data?.code &&
                    province?.data?.map(({name, code}, idx) => (
                      <option key={idx} value={code}>
                        {name}{" "}
                      </option>
                    ))}
                </select>
              </div>
            )}
          />

          <Controller
            control={control}
            name="xa"
            rules={{required: true}}
            render={({field}) => (
              <div className="mt-4">
                <p>Phường/Xã</p>
                <select {...field} className="w-full py-2 px-2 border border-slate-600 rounded-lg" type="text"></select>
              </div>
            )}
          />
        </div>
      </div>
    </>
  );
}

export default FormAddress;
