import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Backdrop, Fade, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Grid from '@mui/material/Grid';

import importInvoiceAPI from '../../../../api/importInvoiceAPI';
import colorAPI from '../../../../api/colorAPI';
import sizeAPI from '../../../../api/sizeAPI';
import brandAPI from '../../../../api/brandAPI';
import typeProductAPI from '../../../../api/typeProductAPI';
import imageAPI from '../../../../api/imageAPI';
import productAPI from '../../../../api/productAPI';
import discountAPI from '../../../../api/discountAPI';
import detailProductAPI from '../../../../api/detailProductAPI';

import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
// import detailImportInvoiceAPI from "../../../../api/detailImportInvoiceAPI";

const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: '#fff',
  p: 2,
};

const defaultValues = {
  priceDiscount: 0,
  endDate: null,
};

const schema = yup.object().shape({
  priceDiscount: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? null : value))
    .min(1, 'Vui lòng nhập khuyến mãi lớn hơn 0')
    .max(100, 'Vui lòng nhập khuyến mãi dưới 100')
    .required('Vui lòng nhập giá khuyến mãi'),
  endDate: yup
    .date()
    .required('Vui lòng nhập ngày')
    .min(new Date(), 'Vui lòng nhập lớn hơn ngày hiện tại'),
});

function ListProducts() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm({ resolver: yupResolver(schema), defaultValues: defaultValues });

  const [IdPD, setIdPD] = useState('');

  const [openInfor, setOpenInfor] = useState(false);
  const [openDiscount, setOpenDiscount] = useState(false);
  // const [openAddProduct, setOpenAddProduct] = useState(false);
  const [dataDetailProduct, setDataDetailProduct] = useState('');
  const [dataBrand, setDataBrand] = useState('');
  // const [dataColor, setDataColor] = useState("");
  // const [dataSize, setDataSize] = useState("");
  const [dataImage, setDataImage] = useState('');
  const [dataTypeProduct, setDataTypeProduct] = useState('');
  const [infoProducts, setInfoProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [discount, setDiscount] = useState([]);

  // const [datadetail, setDatadetail] = useState([]);
  // const [color, setColor] = useState([]);
  // const [size, setSize] = useState([]);

  // const [idProduct, setIdProduct] = useState("");
  // const [idColor, setIdColor] = useState("");
  // const [idSize, setIdSize] = useState("");
  // const [idImportInvoice, setIdImportInvoice] = useState("");
  // const [number, setNumber] = useState("");

  const { enqueueSnackbar } = useSnackbar();

  const [dataProduct, setDataProduct] = useState([]);

  const handleOpenInfor = () => setOpenInfor(true);
  const handleCloseInfor = () => setOpenInfor(false);

  const handleOpenDiscount = () => setOpenDiscount(true);
  const handleCloseDiscount = () => setOpenDiscount(false);

  // const handleOpenAddProduct = () => setOpenAddProduct(true);
  // const handleCloseAddProduct = () => setOpenAddProduct(false);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (isSubmitSuccessful) {
        reset(defaultValues);
      }
      try {
        const res = await productAPI.getProductListManage();
        setDataProduct(res);
      } catch (error) {
        enqueueSnackbar(error.message, {
          variant: 'error',
          autoHideDuration: 2000,
        });
      }
    })(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);
  const deleteProduct = async (id_sp, id_hdn) => {
    try {
      await productAPI.deleteProduct(id_sp);
      await importInvoiceAPI.deleteImportInvoice(id_hdn);
      enqueueSnackbar('Xóa sản phẩm thành công', {
        variant: 'success',
        autoHideDuration: 2000,
      });
      setCount((e) => e + 1);
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error',
        autoHideDuration: 2000,
      });
    }
  };

  const detailProduct = async (idsp) => {
    const result = await detailProductAPI.getList(idsp);
    const resProduct = await productAPI.getProduct(idsp);
    // const resColor = await colorAPI.getColor(resProduct[0].id_ms);
    const resTypeProduct = await typeProductAPI.getTypeProduct(
      resProduct[0].id_lsp
    );
    const resBrand = await brandAPI.getBrand(resProduct[0].id_th);
    // const resSize = await sizeAPI.getSize(resProduct[0].id_kt);
    const resImage = await imageAPI.getImage(resProduct[0].id_sp);
    const resDiscount = await discountAPI.getDiscount(idsp);
    setInfoProducts(result);
    setDiscount(resDiscount);
    setDataImage(resImage);
    setDataTypeProduct(resTypeProduct);
    setDataBrand(resBrand);
    // setDataSize(resSize);
    // setDataColor(resColor);
    setDataDetailProduct(resProduct);
    handleOpenInfor();
  };

  const editProduct = (id) => {
    navigate(`/manage/product/edit/${id}`, { replace: true });
  };

  // const handleColor = async (idms) => {
  //   const result = await detailProductAPI.getListColor(idProduct, idms);
  //   setSize(result);
  //   setIdColor(idms);
  // };

  // const handleSize = async (idkt) => {
  //   setIdSize(idkt);
  // };

  // const addProduct = async (id_sp, id_hdn) => {
  //   handleOpenAddProduct();
  //   const detail_product = await detailProductAPI.getList(id_sp);
  //   const result = await colorAPI.getColor(id_sp);
  //   setColor(result);
  //   setIdProduct(id_sp);
  //   setIdImportInvoice(id_hdn);
  //   setDatadetail(detail_product);
  // };

  // const handleSubmitAdd = async () => {
  //   if (number && color && size) {
  //     await detailProductAPI.addNumberProduct({
  //       so_luong: number,
  //       id_sp: idProduct,
  //       id_kt: idSize,
  //       id_ms: idColor,
  //     });
  //     await detailImportInvoiceAPI.addNumberProduct({
  //       id_hdn: idImportInvoice,
  //       so_luong: number,
  //     });
  //     setCount((e) => e + 1);
  //     handleCloseAddProduct();
  //     enqueueSnackbar("Thêm số lượng sản phẩm thành công", {
  //       variant: "success",
  //       autoHideDuration: 2000,
  //     });
  //   } else {
  //     enqueueSnackbar("Vui lòng nhập đầy đủ thông tin", {
  //       variant: "error",
  //       autoHideDuration: 2000,
  //     });
  //   }
  // };

  const addDiscount = async (id) => {
    try {
      handleOpenDiscount();
      const resDiscount = await discountAPI.getDiscount(id);
      setDiscount(resDiscount);
      setIdPD(id);
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error',
        autoHideDuration: 2000,
      });
    }
  };

  const deleteDiscount = async (id) => {
    try {
      await discountAPI.deleteDiscount(id);
      handleCloseDiscount();
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error',
        autoHideDuration: 2000,
      });
    }
  };

  const columns = [
    {
      field: 'id_sp',
      headerName: 'ID',
      width: 80,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'ten_sp',
      headerName: 'Tên Sản Phẩm',
      headerAlign: 'center',
      width: 300,
    },
    {
      field: 'gia_ban',
      headerName: 'Giá Bán',
      width: 120,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'hanh_dong',
      headerName: 'Hành Động',
      headerAlign: 'center',
      width: 400,
      renderCell: (params) => (
        <div className="flex justify-between w-full">
          <div>
            <button
              onClick={() => detailProduct(params.row.id_sp)}
              className="py-2 px-4 text-white font-bold bg-[#00CED1] rounded-lg shadow-lg"
            >
              Xem
            </button>
          </div>

          {/* <div>
            <button
              onClick={() => addProduct(params.row.id_sp, params.row.id_hdn)}
              className="py-2 px-4 text-white font-bold bg-[#630e9f] rounded-lg shadow-lg"
            >
              Thêm
            </button>
            <Modal
              open={openAddProduct}
              onClose={handleCloseAddProduct}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <p className="text-[20px] text-center">Thêm sản phẩm</p>
                <div className="flex gap-5 mt-4">
                  <div className="w-[33%]">
                    <select
                      className="w-full px-4 py-2 border border-slate-900 rounded-md"
                      onChange={(e) => handleColor(e.target.value)}
                    >
                      <option value="">Màu sắc</option>
                      {color?.map(({id_ms, ten_ms}, idx) => (
                        <option key={idx} value={id_ms}>
                          {ten_ms}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="w-[33%]">
                    <select
                      className="w-full px-4 py-2 border border-slate-900 rounded-md"
                      onChange={(e) => handleSize(e.target.value)}
                    >
                      <option value="">Kích thước</option>
                      {size?.map(({id_kt, ten_kt}, idx) => (
                        <option key={idx} value={id_kt}>
                          {ten_kt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="w-[33%]">
                    <input
                      onChange={(e) => setNumber(e.target.value)}
                      className="w-full px-4 py-2 border border-slate-900 rounded-md"
                      type="text"
                      placeholder="Số lượng"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    onClick={() => handleSubmitAdd()}
                    className="block ml-auto mr-0 text-white px-4 py-2 bg-teal-500 rounded-lg shadow-md"
                  >
                    Thêm
                  </button>
                </div>
              </Box>
            </Modal>
          </div> */}

          <div>
            <button
              onClick={() => editProduct(params.row.id_sp)}
              className="py-2 px-4 text-white font-bold bg-[#008000] rounded-lg shadow-lg"
            >
              Sửa
            </button>
          </div>

          <div>
            <button
              onClick={() => deleteProduct(params.row.id_sp, params.row.id_hdn)}
              className="py-2 px-4 text-white font-bold bg-[#FF0000] rounded-lg shadow-lg"
            >
              Xóa
            </button>
          </div>

          <div>
            <button
              onClick={() => addDiscount(params.row.id_sp)}
              className="py-2 px-4 text-white font-bold bg-[#FF4500] rounded-lg shadow-lg"
            >
              Khuyến mãi
            </button>
          </div>
        </div>
      ),
    },
  ];

  const rows = dataProduct?.map(
    (
      {
        id_sp,
        id_hdn,
        id_th,
        id_ms,
        id_kt,
        id_lsp,
        ten_sp,
        gia_nhap_sp,
        gia_ban_sp,
        so_luong_hdn,
        ngay_lap_hdx,
      },
      idx
    ) => ({
      id: idx,
      id_sp: id_sp,
      id_th: id_th,
      id_ms: id_ms,
      id_kt: id_kt,
      id_lsp: id_lsp,
      ten_sp: ten_sp,
      gia_ban: `${new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(gia_ban_sp)}`,
      ngay_nhap: moment(ngay_lap_hdx).format('DD-MM-YYYY'),
    })
  );

  const renderImage =
    dataImage &&
    dataImage?.map(({ hinh_anh_sp }, idx) => (
      <div key={idx}>
        <img
          className="w-[100px] h-[100px] rounded-lg"
          src={hinh_anh_sp.slice(12, hinh_anh_sp.length)}
          alt="hinh anh san pham"
        />
      </div>
    ));

  const dataDiscount = (data) => {
    return {
      giakm: data.priceDiscount,
      idsp: IdPD,
      hankhuyenmai: moment(new Date(data.endDate)).format(
        'YYYY-MM-DD HH:mm:ss'
      ),
    };
  };
  const setData = async (data) => {
    try {
      await discountAPI.createDiscount(dataDiscount(data));
      setCount((e) => e + 1);
      handleCloseDiscount();
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error',
        autoHideDuration: 2000,
      });
    }
  };

  return (
    <div>
      <div className="px-[20px]">
        <div className="border border-slate-300">
          <div style={{ height: '80vh', width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={8}
              rowsPerPageOptions={[8]}
              rowHeight={60}
            />
          </div>
        </div>
      </div>
      {dataDetailProduct && (
        <>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openInfor}
            onClose={handleCloseInfor}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 300,
            }}
          >
            <Fade in={openInfor}>
              <Box sx={{ ...style, borderRadius: '16px' }}>
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                >
                  {dataDetailProduct[0]?.id_sp} - {dataDetailProduct[0]?.ten_sp}
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography
                      id="transition-modal-description"
                      sx={{ mt: 1 }}
                    >
                      Giá bán:{' '}
                      {dataDetailProduct[0]?.gia_ban_sp.toLocaleString(
                        'it-IT',
                        {
                          style: 'currency',
                          currency: 'VND',
                        }
                      )}
                    </Typography>
                    <Typography sx={{ mt: 1 }}>
                      Loại sản phẩm: {dataTypeProduct[0]?.ten_lsp}
                    </Typography>
                    {/* <Typography sx={{ mt: 1 }}>
                      Kích thước:{" "}
                      {infoProducts?.map(({ ten_kt }, idx) => (
                        <span key={idx}>{ten_kt},</span>
                      ))}
                    </Typography> */}
                    {/* <Typography sx={{ mt: 1 }}>
                      Màu sắc:{" "}
                      {infoProducts?.map(({ ten_ms }, idx) => (
                        <span key={idx}>{ten_ms},</span>
                      ))}
                    </Typography> */}
                    <Typography sx={{ mt: 1 }}>
                      Thương hiệu: {dataBrand[0]?.ten_th}
                    </Typography>
                    <Typography sx={{ mt: 1 }}>
                      Giảm giá: {discount[0]?.gia_km} %
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography sx={{ mt: 1 }}>
                      Thông tin sản phẩm: <br />{' '}
                      {dataDetailProduct[0]?.thong_tin_sp}
                    </Typography>
                  </Grid>
                </Grid>
                <Box
                  sx={{
                    display: 'grid',
                    mt: 2,
                    gap: 1,
                    gridTemplateColumns: 'repeat(6, 1fr)',
                  }}
                >
                  {renderImage}
                </Box>
              </Box>
            </Fade>
          </Modal>
        </>
      )}

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openDiscount}
        onClose={handleCloseDiscount}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 300,
        }}
      >
        <Fade in={openDiscount}>
          <Box sx={{ ...style, borderRadius: '16px' }}>
            {discount?.length === 0 ? (
              <form onSubmit={handleSubmit((data) => setData(data))}>
                <div className="mt-5">
                  <span>Giá khuyến mãi (%)</span>
                  <input
                    className="mt-2 px-2 py-2 w-full border border-slate-400 rounded-lg"
                    type="number"
                    name="priceDiscount"
                    {...register('priceDiscount', { max: 100 })}
                  />
                  <p className="absolute text-[14px] text-red-600">
                    {errors.priceDiscount?.message}
                  </p>
                </div>
                <div className="flex justify-between">
                  <div className="mt-5">
                    <span>Ngày kết thúc</span>
                    <input
                      className="mt-2 px-2 py-2 w-full border border-slate-400 rounded-lg"
                      type="datetime-local"
                      name="endDate"
                      {...register('endDate')}
                    />
                    <p className="absolute text-[14px] text-red-600">
                      {errors.endDate?.message}
                    </p>
                  </div>
                </div>
                <div className="mt-8">
                  <button
                    type="submit"
                    className="float-right font-bold text-white py-2 px-4 bg-slate-500 rounded-lg"
                  >
                    Xác nhận
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="p-4">
                  <h4 className="text-[20px]">
                    Giá khuyến mãi: <span>{discount[0]?.gia_km} %</span>
                  </h4>
                  <button
                    onClick={() => deleteDiscount(discount[0]?.id_km)}
                    className="bg-red-600 py-1 px-2 mt-2 rounded-lg text-white"
                  >
                    Xóa
                  </button>
                </div>
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default ListProducts;
