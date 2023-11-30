import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import BackspaceIcon from "@mui/icons-material/Backspace";
import bannerApi from "../../../api/bannerAPI";
import { useSelector } from "react-redux";
function Index() {
  const [listImage, setListImage] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [banner, setBanner] = useState([]);
  const [valueBrand, setValueBrand] = useState();
  const [valuePage, setValuePage] = useState();

  const brand = useSelector((state) => state?.brand?.brandlist);

  useEffect(() => {
    (async () => {
      const res = await bannerApi.getBanner();

      setBanner(res);
    })();
  }, []);
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

  const submitBanner = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (listImage) {
      for (let i = 0; i < listImage.length; i++) {
        formData.append("photos", listImage[i]);
      }
      formData.append("thuonghieu",valueBrand)
      formData.append("page",valuePage)
      for (const pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }
      const abc = await bannerApi.createBanner(formData);
      const bannerAffter = await bannerApi.getBanner();
      setBanner(bannerAffter);
      setImageUrl([])
    }
  };

  const btnActive = () => {
    document.getElementById("default-btn").click();
  };
  const uploadImage = async (e) => {
    setListImage(e.target.files);
    const imageNumber = e.target.files.length + imageUrl.length;
    if (imageNumber <= 5) {
      let i = 0;
      for (i; i < e.target.files.length; i++) {
        const file = e.target.files[i];
        if (!file) return;
        const base64 = await getBase64(file);
        setImageUrl((oldFile) => [...oldFile, { url: base64 }]);
      }
    } else {
      enqueueSnackbar("Tối đa là 5 ảnh!", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };
  const handleRemoveImage = (e) => {
    const name = e.target.getAttribute("name");
    setImageUrl(imageUrl.filter((item) => item.url !== name));
  };
  const deleteBanner = async (id) => {
    await bannerApi.deteleBanner(id);
    const bannerAffter = await bannerApi.getBanner();
    setBanner(bannerAffter);
  };
  const handleAddFormChange = (e) => {
    e.preventDefault();
    const fieldValue = e.target.value;
    setValueBrand(fieldValue)
    
  };
  const handleAddFormChangepage = (e) => {
    e.preventDefault();
    const fieldValue = e.target.value;
    setValuePage(fieldValue)
    
  };
  

  const renderBaner =
    !!banner &&
    banner?.map(({ id_ab, ten_ab }, idx) => (
      <div key={idx}>
        <div className=" relative text-center border  rounded-lg  shadow-lg ">
          <img
            className="rounded w-[250px] h-[100px]"
            src={ten_ab.slice(12, ten_ab.length)}
            alt="san pham"
          />
          <BackspaceIcon
            sx={{
              color: "red",
            }}
            onClick={() => deleteBanner(id_ab)}
            className="absolute right-1 top-1 cursor-pointer z-10 "
          />
        </div>
      </div>
    ));
  const renderImage = imageUrl?.map((urlImage, idx) => {
    return (
      <div className="relative" key={idx}>
        <img
          className="w-[100px] h-[100px] rounded-lg"
          src={urlImage.url}
          alt="anh bia"
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
  return (
    <div>
      <div className="px-[20px]">
        <div>
          <div className="flex gap-6">
            <button
              className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-lg"
              onClick={submitBanner}
            >
              Thêm Ảnh Bìa
            </button>
            <div className="">
              <span className="block">Thương hiệu</span>
              <select
                className="p-1 w-[200px] border border-slate-400 rounded-lg"
                name="thuonghieu"
                onChange={handleAddFormChange}
              >
                 <option value="">Trống</option>
                {brand &&
                  brand?.map(({ id_th, ten_th }, idx) => (
                    <option key={idx} value={id_th}>
                      {ten_th}
                    </option>
                  ))}
              </select>
            </div>
            <div className="">
              <span className="block">Hướng trang</span>
              <select
                className="p-1 w-[200px] border border-slate-400 rounded-lg"
                name="thuonghieu"
                onChange={handleAddFormChangepage}
              >
                <option value="">Trống</option>
                <option value="/shop/products">Sản phẩm</option>
                <option value="/shop/sale">Giảm giá</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex gap-4 mt-3">
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
          </div>
        </div>
      </div>
      <div className="grid grid-cols-6 gap-5 mt-5">{renderBaner}</div>
    </div>
  );
}

export default Index;
