import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import productAPI from "../../../../api/productAPI";
import imageAPI from "../../../../api/imageAPI";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import detailProductAPI from "../../../../api/detailProductAPI";

const defaultValues = {
  giaban: "",
  kichthuoc: "",
  loaisanpham: "",
  mausac: "",
  tensanpham: "",
  thongtinsanpham: "",
  thuonghieu: "",
  soluong: "",
  gianhap: "",
};

function EditProduct() {
  const { register, handleSubmit, reset } = useForm({ ...defaultValues });
  const [dataDetailProduct, setDataDetailProduct] = useState("");
  const [imageUrl, setImageUrl] = useState([]);
  const [listImage, setListImage] = useState([]);
  const [addImage, setAddImage] = useState([]);
  // const [dataDetail, setdataDetail] = useState([]);
  const [detailProduct, setDetailProduct] = useState([]);
//   const [addFormData, setAddFormData] = useState({
//     idsp: "",
//     id_ms: "",
//     id_kt: "",
//     so_luong_sp: "",
//   });
  const [count, setCount] = useState(0);
  const { enqueueSnackbar } = useSnackbar();

  let params = useParams();
  const navigate = useNavigate();

//   const color = useSelector((state) => state?.color?.colorlist);
//   const size = useSelector((state) => state?.size?.sizelist);
  const brand = useSelector((state) => state?.brand?.brandlist);
  const typeProduct = useSelector(
    (state) => state?.typeProduct?.typeProductlist
  );

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
    const imageNumber =
      e.target.files.length + imageUrl?.length + listImage?.length;
    if (imageNumber <= 5) {
      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files[i];
        if (!file) return;
        const base64 = await getBase64(file);
        setImageUrl((oldFile) => [...oldFile, { url: base64 }]);
      }
      setAddImage(e.target.files);
    } else {
      console.log("Image is max 5");
      enqueueSnackbar("Image is max 5", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  const btnActive = () => {
    document.getElementById("default-btn").click();
  };

  useEffect(() => {
    (async () => {
      try {
        // document.cookie = "username=John Doe; expires=Thu, 18 Dec 2013 12:00:00 UTC";
        // console.log("a",document.cookie);
        const resProduct = await productAPI.getProduct(params.idsp);
        const resDetailProduct = await productAPI.getDetailProduct(params.idsp);
        const resImage = await imageAPI.getImage(params.idsp);
        setListImage(resImage);
        setDetailProduct(resDetailProduct);
        reset({
          tensanpham: resProduct[0].ten_sp,
          thongtinsanpham: resProduct[0].thong_tin_sp,
          giaban: resProduct[0]?.gia_ban_sp,
          gianhap: resProduct[0]?.gia_nhap_sp,
          kichthuoc: resProduct[0]?.id_kt,
          loaisanpham: resProduct[0]?.id_lsp,
          mausac: resProduct[0]?.id_ms,
          thuonghieu: resProduct[0]?.id_th,
        });
        setDataDetailProduct(resProduct);
      } catch (error) {
        enqueueSnackbar(error.message, {
          variant: "error",
          autoHideDuration: 2000,
        });
      }
    })(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset, count]);

  const dataProduct = (data) => {
    return {
      giaban: data.giaban,
      kichthuoc: data.kichthuoc,
      loaisanpham: data.loaisanpham,
      mausac: data.mausac,
      tensanpham: data.tensanpham,
      thongtinsanpham: data.thongtinsanpham,
      thuonghieu: data.thuonghieu,
    };
  };

  const setData = async (data) => {
    const formData = new FormData();
    try {
      await productAPI.updateProduct(params.idsp, dataProduct(data));
      await detailProductAPI.removeUpdate(params.idsp);

      if (detailProduct) {
        console.log(detailProduct);
        for (let i = 0; i < detailProduct.length; i++) {
          await detailProductAPI.updateDetailproduct({
            idsp: detailProduct[i]?.id_sp,
            idkt: detailProduct[i]?.id_kt,
            idms: detailProduct[i]?.id_ms,
            soluong: detailProduct[i]?.so_luong_sp,
          });
        }
      }

      enqueueSnackbar("Sửa sản phẩm thành công", {
        variant: "success",
        autoHideDuration: 2000,
      });

      navigate("/manage/product/listproducts", { replace: true });
      for (let i = 0; i < addImage?.length; i++) {
        formData.append("photos", addImage[i]);
      }
      formData.append("idsp", params.idsp);
      await imageAPI.createImage(formData);
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  const handleRemoveImage = (e) => {
    const name = e.target.getAttribute("name");
    setImageUrl(imageUrl.filter((item) => item.url !== name));
  };

  const deleteImage = async (id) => {
    try {
      await imageAPI.deleteImage(id);
      setCount((e) => e + 1);
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
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

  const editImage = listImage?.map(({ id_ha, hinh_anh_sp }, idx) => {
    return (
      <div className="relative" key={idx}>
        <img
          className="w-[100px] h-[100px] rounded-lg"
          src={hinh_anh_sp.slice(12, hinh_anh_sp.length)}
          alt="anhsanpham"
        />
        <div
          className="absolute -top-1 -right-1 bg-red-600 text-center text-[12px] text-white px-[6px] rounded-full cursor-pointer"
          onClick={() => deleteImage(id_ha)}
        >
          x
        </div>
      </div>
    );
  });

//   const handleAddFormChange = (e) => {
//     e.preventDefault();
//     const fieldName = e.target.getAttribute("name");
//     const fieldValue = e.target.value;
//     const newFormData = { ...addFormData };

//     newFormData[fieldName] = fieldValue;
//     setAddFormData(newFormData);
//   };

//   const handleAddFormSubmit = (e) => {
//     e.preventDefault();
//     const newDetailProduct = {
//       id_sp: params.idsp,
//       id_ms: addFormData.mausac,
//       id_kt: addFormData.kichthuoc,
//       so_luong_sp: addFormData.soluong,
//     };
//     const newDetailProducts = [...detailProduct, newDetailProduct];
//     setDetailProduct(newDetailProducts);
//   };
//   const deleteRow = (idrow) => {
//     setDetailProduct(detailProduct.filter((item, index) => index !== idrow));
//   };

  return (
    <div className="relative">
      <NavLink to="/manage/product/listproducts">
        <button className="ml-7 px-10 py-2 mb-5 text-white bg-slate-400 rounded shadow-lg">
          Trở về
        </button>
      </NavLink>
      <form id="addProduct" onSubmit={handleSubmit((data) => setData(data))}>
        <div className="px-7">
          <div className="mt-5">
            <span>Tên sản phẩm </span>
            <input
              className="px-2 py-1 w-full border border-slate-400 rounded-lg"
              type="text"
              name="tensanpham"
              defaultValue={dataDetailProduct[0]?.ten_sp}
              {...register("tensanpham")}
            />
          </div>

          <div className="mt-5">
            <span>Thông tin sản phẩm</span> <br />
            <textarea
              className="w-full p-2 h-[200px] border border-slate-400 rounded-lg"
              name="thongtinsanpham"
              id=""
              rows="10"
              ref={register}
              {...register("thongtinsanpham")}
            ></textarea>
          </div>

          <div>
            <span>Hình ảnh</span>
            <div className="flex gap-4">
              <div className="flex gap-4">
                <input
                  type="file"
                  id="default-btn"
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
                {editImage}
              </div>
            </div>
          </div>

          <div className="flex gap-5">
            <div>
              <div className="mt-5">
                <span className="block">Loại sản phẩm</span>
                <select
                  className="p-1 w-[200px] border border-slate-400 rounded-lg"
                  name="loaisanpham"
                  id=""
                  ref={register}
                  {...register("loaisanpham")}
                >
                  {typeProduct &&
                    typeProduct?.map(({ id_lsp, ten_lsp }, idx) => (
                      <option key={idx} value={id_lsp}>
                        {ten_lsp}
                      </option>
                    ))}
                </select>
              </div>

              <div className="mt-5">
                <span className="block">Thương hiệu</span>
                <select
                  className="p-1 w-[200px] border border-slate-400 rounded-lg"
                  name="thuonghieu"
                  id=""
                  ref={register}
                  {...register("thuonghieu")}
                >
                  {brand &&
                    brand?.map(({ id_th, ten_th }, idx) => (
                      <option key={idx} value={id_th}>
                        {ten_th}
                      </option>
                    ))}
                </select>
              </div>

              {/* <div className="mt-5">
                <span className="block">Giá nhập</span>
                <input
                  className="p-1 w-[200px] border border-slate-400 rounded-lg"
                  type="text"
                  name="gianhap"
                  ref={register}
                  {...register("gianhap")}
                />
              </div> */}

              <div className="mt-5">
                <span className="block">Giá bán</span>
                <input
                  className="p-1 w-[200px] border border-slate-400 rounded-lg"
                  type="text"
                  name="giaban"
                  ref={register}
                  {...register("giaban")}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <button className="mt-1 ml-7 px-10 py-2 text-white bg-sky-600 rounded shadow-lg">
            Sửa
          </button>
        </div>
      </form>

      {/* <form onSubmit={handleAddFormSubmit}>
        <div className="flex justify-between gap-6 w-[40%] mt-6 mb-10 px-7  absolute top-[63%] left-[18%]">
          <div className="w-[30%]">
            <select
              name="mausac"
              onChange={handleAddFormChange}
              className="h-8 px-2 w-full border border-slate-400 outline-none rounded-lg"
            >
              <option value="">Màu sắc</option>
              {color &&
                color?.map(({ id_ms, ten_ms }, idx) => (
                  <option key={idx} value={id_ms}>
                    {ten_ms}
                  </option>
                ))}
            </select>
          </div>
          <div className="w-[30%]">
            <select
              name="kichthuoc"
              onChange={handleAddFormChange}
              className="h-8 px-2 w-full border border-slate-400 outline-none rounded-lg"
            >
              <option value="">Kích thước</option>
              {size &&
                size?.map(({ id_kt, ten_kt }, idx) => (
                  <option key={idx} value={id_kt}>
                    {ten_kt}
                  </option>
                ))}
            </select>
          </div>
          <div className="w-[30%]">
            <input
              name="soluong"
              placeholder="Số lượng"
              onChange={handleAddFormChange}
              className="h-8 px-2 w-full border border-slate-400 outline-none rounded-lg"
              type="number"
              min={0}
            />
          </div>
          <button className="px-4 bg-slate-400 rounded-lg">Thêm</button>
        </div>
      </form> */}
      {/* <div className="absolute top-[72%] w-[35%] left-[20%]">
        <table>
          <thead>
            <tr>
              <th className="h-8 border border-slate-400 w-[20%]">Màu Sắc</th>
              <th className="h-8 border border-slate-400 w-[20%]">Kích Thước</th>
              <th className="h-8 border border-slate-400 w-[20%]">Số Lượng</th>
              <th className="h-8 border border-slate-400 w-[20%]">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {detailProduct?.map(({ id_ms, id_kt, so_luong_sp }, idx) => (
              <tr key={idx}>
                <td className="w-[20%] text-center border border-slate-400">
                  {color.filter((item) => item.id_ms === id_ms)[0].ten_ms}
                </td>
                <td className="w-[20%] text-center border border-slate-400">
                  {size.filter((item) => item.id_kt === id_kt)[0].ten_kt}
                </td>
                <td className="w-[20%] text-center border border-slate-400">
                  {so_luong_sp}
                </td>
                <td
                  className="w-[20%] text-center border border-slate-400 cursor-pointer hover:bg-zinc-500"
                  onClick={() => deleteRow(idx)}
                >
                  x
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
    </div>
  );
}

export default EditProduct;
