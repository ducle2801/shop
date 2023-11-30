import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import moment from "moment";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";

import detailExportInvoiceAPI from "../../../../api/detailExportInvoiceAPI";
import exportInvoiceAPI from "../../../../api/exportInvoiceAPI";

import reviewAPI from "../../../../api/reviewsAPI";
import imageReviewAPI from "../../../../api/imageReviewAPI";
import { useForm } from "react-hook-form";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

function DetailReview() {
  const enqueueSnackbar = useSnackbar();
  const params = useParams();
  const [value, setValue] = useState(0);
  const [imageUrl, setImageUrl] = useState([]);
  const [listImage, setListImage] = useState([]);
  const [product, setProduct] = useState([]);
  const [count, setCount] = useState(0);
  const [exportInvoice, setExportInvoice] = useState([]);
  const [detailExportInvoice, setDetailExportInvoice] = useState([]);
  const [checkReview, setCheckReview] = useState(0);
  const [imageReview, setImagereview] = useState([]);

  const [open, setOpen] = useState(false);

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    (async () => {
      try {
        const resExport = await exportInvoiceAPI.getExportInvoice(params.idhdx);
        const resDetailExport =
          await detailExportInvoiceAPI.getDetailExportInvoice(params.idhdx);

        setExportInvoice(resExport);
        setDetailExportInvoice(resDetailExport);
      } catch (error) {
        enqueueSnackbar(error.message, {
          variant: "error",
          autoHideDuration: 2000,
        });
      }
    })();
  }, [count]);

  const handleOpen = async (idsp, idms, idkt) => {
    const resProduct = await detailExportInvoiceAPI.getProduct({
      idhdx: params.idhdx,
      idsp: idsp,
      idms: idms,
      idkt: idkt,
    });
    const resReview = await reviewAPI.getOneReview({
      idhdx: params.idhdx,
      idsp: idsp,
      idms: idms,
      idkt: idkt,
    });
    const resImageReview = await imageReviewAPI.getImage(resReview[0]?.id_dg);
    setImagereview(resImageReview);
    setCheckReview(resReview);
    setProduct(resProduct);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };

  const handleClodeo = () => {
    setOpen(false);
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (err) => {
        reject(err);
      };
    });
  };

  const uploadImage = async (e) => {
    setListImage(e.target.files);
    const imageNumber = e.target.files.length + imageUrl.length;
    if (imageNumber <= 3) {
      let i = 0;
      for (i; i < e.target.files.length; i++) {
        const file = e.target.files[i];
        if (!file) return;
        const base64 = await getBase64(file);
        setImageUrl((oldFile) => [...oldFile, { url: base64 }]);
      }
    } else {
    }
  };

  const btnActive = () => {
    document.getElementById("default-btn-rv").click();
  };

  const handleRemoveImage = (e) => {
    const name = e.target.getAttribute("name");
    setImageUrl(imageUrl.filter((item) => item.url !== name));
  };

  const renderImage = imageUrl?.map((urlImage, idx) => {
    return (
      <div className="relative" key={idx}>
        <img
          className="w-[100px] h-[100px] rounded-lg"
          src={urlImage.url}
          alt="anhsanpham"
        />
        <div
          className="absolute -top-1 -right-1 bg-red-600 text-center text-[12px] text-white px-[6px] rounded-full cursor-pointer"
          name={urlImage.url}
          onClick={handleRemoveImage}
        >
          x
        </div>
      </div>
    );
  });

  const setData = async (data) => {
    if (value !== 0 && data.comment !== "" && listImage.length > 0) {
      const id_dg = await reviewAPI.createreview({
        sosao: value,
        noidung: data.comment,
        ngaydg: moment().format("YYYY-MM-DD"),
        idhdx: params.idhdx,
        idsp: product[0]?.id_sp,
        idms: product[0]?.id_ms,
        idkt: product[0]?.id_kt,
      });

      var formData = new FormData();
      if (listImage) {
        for (let i = 0; i < listImage.length; i++) {
          formData.append("photos", listImage[i]);
        }
        formData.append("iddg", id_dg[0]?.id_dg);
        await imageReviewAPI.createImageRV(formData);
      }
      handleClose();
    }
    else{
      enqueueSnackbar("Vui lòng nhập đủ thông tin!", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  const renderImageRV =
    imageReview &&
    imageReview?.map(({ hinh_anh_dg }, idx) => (
      <div key={idx}>
        <img
          className="w-[100px] h-[100px] rounded-lg"
          src={hinh_anh_dg.slice(12, hinh_anh_dg.length)}
          alt="hinh anh san pham"
        />
      </div>
    ));

  return (
    <div className="w-[50%] my-6 mx-auto">
      <div className="flex justify-between my-4">
        <p>
          Ngày: {moment(exportInvoice[0]?.ngay_lap_hdx).format("DD/MM/YYYY")}
        </p>
        <p className="text-green-700 font-bold">
          {exportInvoice[0]?.trang_thai}
        </p>
      </div>
      <div>
        {detailExportInvoice?.map(
          (
            {
              id_sp,
              ten_sp,
              hinh_anh,
              so_luong_xuat,
              id_ms,
              id_kt,
              ten_ms,
              ten_kt,
            },
            idx
          ) => (
            <div key={idx} className="mb-4 p-3 bg-slate-50 rounded-md">
              <Link to={`/shop/order/${params.idhdx}`}>
                <div className="relative flex justify-between gap-5 items-center">
                  <img
                    className="block w-[10%] align-middle rounded-lg"
                    src={hinh_anh}
                    alt=""
                  />
                  <span className="w-[70%] text-[20px] font-bold">
                    {ten_sp}
                  </span>
                  <span className="w-[20%] text-right">
                    Số lượng: {so_luong_xuat}
                  </span>
                  <div className="absolute flex gap-5 left-[12.5%] top-[75%] text-slate-500 text-[14px]">
                    <p>Thương hiệu: {ten_ms}</p>
                    <p>Loại sản phẩm: {ten_kt}</p>
                  </div>
                </div>
              </Link>

              <div>
                <p
                  onClick={() => handleOpen(id_sp, id_ms, id_kt)}
                  className="text-right text-yellow-500 font-medium cursor-pointer"
                >
                  Đánh giá
                </p>
              </div>
            </div>
          )
        )}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="relative mb-2 flex justify-between gap-5 items-center">
              <img
                className="block w-[10%] align-middle rounded-lg"
                src={product[0]?.hinh_anh}
                alt=""
              />
              <span className="w-[70%] text-[20px] font-bold">
                {product[0]?.ten_sp}
              </span>
              <span className="w-[20%] text-right">
                Số lượng: {product[0]?.so_luong_xuat}
              </span>
              <div className="absolute flex gap-5 left-[12.5%] top-[75%] text-slate-500 text-[14px]">
                <p>Thương hiệu: {product[0]?.ten_ms}</p>
                <p>Loại sản phẩm: {product[0]?.ten_kt}</p>
              </div>
            </div>

            {checkReview.length === 0 ? (
              <div>
                <Rating
                  className="my-2"
                  name="simple-controlled"
                  value={value}
                  size="large"
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
                <form onSubmit={handleSubmit((data) => setData(data))}>
                  <div className="my-2 flex gap-4">
                    <div className="flex gap-4">
                      <input
                        // {...register("file")}
                        type="file"
                        id="default-btn-rv"
                        className="hidden"
                        name="file"
                        onChange={(e) => {
                          uploadImage(e);
                        }}
                        multiple
                      />
                      <div
                        className="w-[100px] h-[100px] border border-slate-400 rounded-lg cursor-pointer"
                        onClick={() => btnActive()}
                      >
                        <div className="text-[25px] text-[#ccc] text-center leading-[90px] ">
                          +
                        </div>
                      </div>
                      {renderImage}
                    </div>
                  </div>
                  <textarea
                    {...register("comment")}
                    name="comment"
                    className="p-4 my-2 w-full border border-slate-500 rounded-md"
                    rows="8"
                  ></textarea>

                  <button className="block w-[100px] text-center py-2 ml-auto mr-0 bg-emerald-400 rounded-md text-white font-bold shadow-md">
                    Gửi
                  </button>
                </form>
              </div>
            ) : (
              <>
                <div>
                  <Rating
                    className="my-3"
                    name="read-only"
                    size="large"
                    value={checkReview[0]?.so_sao}
                    readOnly
                  />
                  <div className="flex gap-5">{renderImageRV}</div>
                  <p className="mt-5">
                    Đánh giá: {checkReview[0]?.noi_dung_dg}
                  </p>
                  <button
                    onClick={handleClodeo}
                    className="block py-2 px-4 ml-auto mr-0 bg-slate-200 rounded-md shadow-md"
                  >
                    Đóng
                  </button>
                </div>
              </>
            )}
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default DetailReview;
