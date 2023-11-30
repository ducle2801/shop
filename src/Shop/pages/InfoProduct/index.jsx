import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './style.css';
import './zoomImage.js';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../../../components/Footer';
import { addtoCart } from '../../../redux/cartSlide';
import { addtoListBuy } from '../../../redux/listbuySlice';

import productAPI from '../../../api/productAPI';
import imageAPI from '../../../api/imageAPI';
import colorAPI from '../../../api/colorAPI';
import reviewAPI from '../../../api/reviewsAPI';
import detailProductAPI from '../../../api/detailProductAPI';
import imageReviewAPI from '../../../api/imageReviewAPI';
import ReviewsProduct from './Reviews';
import { Rating } from '@mui/material';

function InfoProduct() {
  const isLogin = useSelector((state) => state.user.current?.dataUser?.length);
  let params = useParams();
  let { SP } = useParams();
  //   console.log(SP);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  //   console.log(params, "a");
  const { enqueueSnackbar } = useSnackbar();
  const [product, setProduct] = useState([]);
  const [image, setImage] = useState([]);
  //   const [color, setColor] = useState([]);
  const [changeImagem, setChangeImage] = useState('');
  const [review, setReview] = useState([]);
  //   const [listSize, setListSize] = useState([]);
  const [numberProduct, setNumberProduct] = useState([]);
  const [imageReview, setImagereview] = useState([]);
  // const [slColor, setSlColor] = useState("");
  const [slSize, setSlSize] = useState('');
  const [danhgia, setdanhgia] = useState([]);
  const [numberBuy, setNumberBuy] = useState(1);
  const cartList = useSelector((state) => state.cart?.cartItem);
  // const errorNumber = useSelector(state => state.cart.errorNumber)

  useEffect(() => {
    (async () => {
      const resProduct = await productAPI.getProduct(params.SP);
      const resImage = await imageAPI.getImage(params.SP);
      const resColor = await colorAPI.getColor(params.SP);
      const resReview = await reviewAPI.getReviewProduct(params.SP);
      const resdanhgia = await reviewAPI.getdanhgia(params.SP);
      const resImageReview = await imageReviewAPI.getImage(resReview[0]?.id_dg);
      const result = await detailProductAPI.getNumberProduct(
        params.SP,
        resProduct[0].id_lsp,
        resProduct[0].id_th
      );
      setNumberProduct(result[0]?.so_luong_nhap);
      setImagereview(resImageReview);
      setReview(resReview);
      setSlSize(result);
      //   setColor(resColor);
      setImage(resImage);
      setProduct(resProduct);
      setdanhgia(resdanhgia);
    })();
  }, [params, cartList]);

  const sum = danhgia.reduce((accumulator, value) => {
    return accumulator + value.so_sao;
  }, 0);
  // const soluong = 1;
  const addCart = (idsp) => {
    if (!isLogin) {
      enqueueSnackbar('Vui lòng đăng nhập', {
        variant: 'error',
        autoHideDuration: 2000,
      });
      return navigation('/shop/login');
    }
    if (!!slSize) {
      if (numberProduct > 0) {
        dispatch(
          addtoCart({
            id_sp: idsp,
            ten_sp: product[0]?.ten_sp,
            id_ms: slSize[0]?.id_th,
            id_kt: slSize[0]?.id_lsp,
            ten_ms: slSize[0]?.ten_th,
            ten_kt: slSize[0]?.ten_lsp,
            so_luong_xuat: numberBuy,
            soluong: numberProduct,
            gia_ban: product[0]?.gia_ban_sp,
            hinh_anh: image[0]?.hinh_anh_sp.slice(
              12,
              image[0]?.hinh_anh_sp.length
            ),
            giam_gia: product[0]?.gia_km ? product[0]?.gia_km : 0,
            type: 'cart',
          })
        );
        enqueueSnackbar('Đã thêm vào giỏ hàng', {
          variant: 'success',
          autoHideDuration: 2000,
        });
      } else {
        enqueueSnackbar('Sản phẩm đã hết hàng', {
          variant: 'error',
          autoHideDuration: 2000,
        });
      }
    } else {
      enqueueSnackbar('Vui lòng chọn màu sắc và kích thước', {
        variant: 'error',
        autoHideDuration: 2000,
      });
    }
  };

  const buyNow = () => {
    if (!isLogin) {
      enqueueSnackbar('Vui lòng đăng nhập', {
        variant: 'error',
        autoHideDuration: 2000,
      });
      return navigation('/shop/login');
    }
    if (!!slSize) {
      if (numberProduct > 0) {
        navigation('/shop/order/detail_pay_order');
        dispatch(
          addtoListBuy([
            {
              id_sp: params.SP,
              ten_sp: product[0].ten_sp,
              id_ms: slSize[0].id_th,
              id_kt: slSize[0].id_lsp,
              ten_ms: slSize[0].ten_th,
              soluong: numberProduct,
              ten_kt: slSize[0].ten_lsp,
              giam_gia: product[0].gia_km,
              gia_ban: product[0].gia_ban_sp,
              hinh_anh: image[0]?.hinh_anh_sp.slice(
                12,
                image[0]?.hinh_anh_sp.length
              ),
              so_luong_xuat: numberBuy,
              type: 'buynow',
            },
          ])
        );
      } else {
        enqueueSnackbar('Sản phẩm đã hết hàng', {
          variant: 'error',
          autoHideDuration: 2000,
        });
      }
    } else {
      enqueueSnackbar('Vui lòng chọn màu sắc và kích thước', {
        variant: 'error',
        autoHideDuration: 2000,
      });
    }
  };
  //   const selectColor = async (e, idms) => {
  //     const result = await detailProductAPI.getListColor(params.SP, idms);
  //     setListSize(result);
  //     setSlColor(idms);
  //     setSlSize("");

  //     const tab1 = document.querySelectorAll(".tabcolor");

  //     for (let i = 0; i < tab1.length; i++) {
  //       tab1[i].classList.remove("active__color");
  //     }
  //     e.target.classList.add("active__color");

  //     const tab2 = document.querySelectorAll(".tabsize");
  //     for (let i = 0; i < tab2.length; i++) {
  //       tab2[i].classList.remove("active__size");
  //     }
  //   };

  //   const selectSize = async (e, idkt) => {
  //     const result = await detailProductAPI.getNumberProduct(
  //       params.SP,
  //       idkt,
  //       slColor
  //     );

  //     setNumberProduct(result[0].so_luong_sp);
  //     setSlSize(result);

  //     const tab = document.querySelectorAll(".tabsize");
  //     for (let i = 0; i < tab.length; i++) {
  //       tab[i].classList.remove("active__size");
  //     }
  //     e.target.classList.add("active__size");
  //   };

  //   const renderImageRV =
  //     imageReview &&
  //     imageReview?.map(({ hinh_anh_dg }, idx) => (
  //       <div key={idx}>
  //         <img
  //           className="w-[100px] h-[100px] rounded-lg"
  //           src={hinh_anh_dg.slice(12, hinh_anh_dg.length)}
  //           alt="hinh anh san pham"
  //         />
  //       </div>
  //     ));

  const renderInfoProduct = (text) => {
    const formattedText = text.replace(/\./g, '.<br>');
    return <p dangerouslySetInnerHTML={{ __html: formattedText }} />;
  };

  const addAnDeleteProduct = (number) => {
    if (
      (!number && numberBuy <= 1) ||
      (number && numberBuy === numberProduct)
    ) {
      enqueueSnackbar('Sản phẩm vượt quá số lượng', {
        variant: 'error',
        autoHideDuration: 2000,
      });
      return;
    }

    setNumberBuy((state) => (number ? state + 1 : state - 1));
  };

  return (
    <>
      <div className="flex gap-10 mt-[50px] w-[75%] mx-auto">
        <div className="flex gap-2 w-[50%]">
          <div>
            {image?.map(({ hinh_anh_sp }, idx) => (
              <div
                onClick={() => {
                  setChangeImage(hinh_anh_sp);
                }}
                className="mb-2 w-[100px] h-[100px]"
                key={idx}
              >
                <img
                  className="rounded-lg cursor-pointer"
                  src={hinh_anh_sp.slice(12, hinh_anh_sp.length)}
                  alt=""
                />
              </div>
            ))}
          </div>

          <div>
            <div className="screen-image">
              <img
                className="screen-image__img"
                src={
                  changeImagem
                    ? changeImagem.slice(12, changeImagem.length)
                    : image[0]?.hinh_anh_sp.slice(
                        12,
                        image[0]?.hinh_anh_sp.length
                      )
                }
                alt=""
              />
              <div className="screen-image__cover"></div>
            </div>
          </div>
        </div>

        <div className="w-[50%]">
          <div className="mb-8">
            <p className="text-4xl font-bold">{product[0]?.ten_sp}</p>
          </div>
          <div className="mb-8">
            {!product[0]?.gia_km ? (
              <>
                {
                  <span className="text-2xl font-bold text-red-800">
                    {new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(product[0]?.gia_ban_sp)}
                  </span>
                }
              </>
            ) : (
              <>
                <span className="text-2xl font-bold text-red-800">
                  {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(
                    product[0]?.gia_ban_sp -
                      (product[0]?.gia_ban_sp * product[0]?.gia_km) / 100
                  )}
                </span>
                <span className="ml-4 text-1xl text-slate-500 line-through">
                  {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(product[0]?.gia_ban_sp)}
                </span>
              </>
            )}
          </div>
          {/* <div className="flex gap-5 items-center mb-8 min-h-[50px]">
            <div>
              <p className="text-[18px]">Màu sắc</p>
            </div>
            {color?.map(({ id_ms, ten_ms }, idx) => (
              <button
                onClick={(e) => selectColor(e, id_ms)}
                className="tabcolor p-2 min-w-[50px] text-center bg-slate-300 rounded-lg"
                key={idx}
              >
                {ten_ms}
              </button>
            ))}
          </div> */}

          {/* <div className="flex gap-5 items-center mb-8 min-h-[50px]">
            Kích thước
            {listSize?.map(({ id_kt, ten_kt }, idx) => (
              <button
                onClick={(e) => selectSize(e, id_kt)}
                key={idx}
                className="tabsize p-2 min-w-[50px] text-center bg-slate-300 rounded-lg"
              >
                {ten_kt}
              </button>
            ))}
          </div> */}

          <div className="mb-8">
            {numberProduct >= 0 ? <>Số lượng: {numberBuy}</> : <></>}
            <div style={{ display: 'flex', gap: '20px' }}>
              <button
                onClick={() => addAnDeleteProduct(false)}
                className="py-1 px-5 text-[18px] text-white font-bold bg-green-600 rounded-lg shadow-lg"
              >
                -
              </button>
              <button
                onClick={() => addAnDeleteProduct(true)}
                className="py-1 px-5 text-[18px] text-white font-bold bg-green-600 rounded-lg shadow-lg"
              >
                +
              </button>
            </div>
          </div>
          <div className="mb-8 flex gap-5">
            <button
              onClick={() => buyNow()}
              className="py-3 px-5 text-[18px] text-white font-bold bg-green-600 rounded-lg shadow-lg"
            >
              Mua Ngay
            </button>

            <button
              onClick={() => addCart(product[0]?.id_sp)}
              className="py-3 px-5 text-[18px] text-white font-bold bg-green-600 rounded-lg shadow-lg"
            >
              Thêm vào giỏ hàng
            </button>
          </div>
          <div className="w-full leading-10">
            {/* <p>CHÍNH SÁCH GIAO HÀNG VÀ ĐỔI TRẢ</p>
            <p>HƯỠNG DẪN BẢO QUẢN</p> */}
          </div>
        </div>
      </div>
      <hr className="w-[75%] mx-auto mt-5" />
      <div className="flex gap-10 mt-[50px] w-[75%] mx-auto">
        <div className="w-1/2">
          <p className="text-[22px] text-center font-medium">Mô tả sản phẩm</p>
          {/* <div> */}
          {product.length !== 0 && renderInfoProduct(product[0]?.thong_tin_sp)}
          {/* </div> */}
        </div>

        <div className="w-1/2">
          <div className="flex justify-end">
            <p className="text-[22px] text-center font-medium mr-[15%]">
              Đánh Giá
            </p>
            <p className="text-[22px] text-center font-medium ml-5">
              <sup>
                {isNaN(sum / danhgia.length)
                  ? ''
                  : (sum / danhgia.length).toFixed(0)}
              </sup>
              /<sub>5</sub>
            </p>
            <Rating value={sum / danhgia.length} readOnly size="large"></Rating>
          </div>
          <div className="overflow-y-auto h-[calc(230px)]">
            {danhgia?.map(
              ({ so_sao, noi_dung_dg, ngay_dg, id_dg, trang_thai_dg }, idx) => (
                <div key={idx}>
                  {trang_thai_dg === 0 ? (
                    <ReviewsProduct
                      key={idx}
                      data={{
                        id_dg: id_dg,
                        so_sao: so_sao,
                        noi_dung_dg: noi_dung_dg,
                        ngay_dg: ngay_dg,
                      }}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default InfoProduct;
