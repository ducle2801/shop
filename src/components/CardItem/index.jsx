import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import imageAPI from "../../api/imageAPI";
import { useSnackbar } from "notistack";

function CardItem({ data }) {
  const [urlImage, setUrlImage] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const resUrlImage = await imageAPI.getImage(data.id_sp);
        setUrlImage(resUrlImage);
      } catch (error) {
        enqueueSnackbar(error.message, {
          variant: "error",
          autoHideDuration: 2000,
        });
      }
    })();
  }, [data]);

  const SelectProduct = () => {
    navigate(`/shop/products/${data.id_sp}`);
    const a = document.querySelector(".boxSearch");
    a.style = "display: none";
  };

  return (
    <React.Fragment>
      <div
        onClick={() => SelectProduct()}
        className="flex my-3 border rounded-lg bg-slate-100 cursor-pointer"
      >
        <div className=" w-[80px] ">
          <img
            className="rounded-lg w-[100%] h-[100%] border-2"
            src={urlImage[0]?.hinh_anh_sp.slice(
              12,
              urlImage[0]?.hinh_anh_sp.length
            )}
            alt="san pham"
          />
        </div>
        <div className=" ml-2  w-[100%] overflow-hidden  ">
          <div className="text-[16px] px-1 font-medium text-center text-ellipsis overflow-hidden whitespace-nowrap">
            {data.ten_sp}
          </div>
          {!!data?.gia_km ? (
            <>
              <p className="text-red-600  text-[18px] ml-2 font-bold">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(
                  data?.gia_ban_sp - (data?.gia_ban_sp * data?.gia_km) / 100
                )}
              </p>
              <div className="h-[25px] mb-2">
                <p className="text-slate-700 ml-2 line-through">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(data?.gia_ban_sp)}
                </p>
              </div>
            </>
          ) : (
            <>
              <p className="text-red-600 mb-2 text-[18px] ml-2 font-bold">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(data.gia_ban_sp)}
              </p>
              <div className="h-[25px]"></div>
            </>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

export default CardItem;
