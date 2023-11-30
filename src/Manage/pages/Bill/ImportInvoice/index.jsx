import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
// import csvAPI from "../../../../api/csvAPI";
import detailProductAPI from "../../../../api/detailProductAPI";
import colorAPI from "../../../../api/colorAPI";
import TableData from "./tableData";
import importInvoiceAPI from "../../../../api/importInvoiceAPI";
import detailImportInvoiceAPI from "../../../../api/detailImportInvoiceAPI";
import productAPI from "../../../../api/productAPI";
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

function ImportInvoice() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [nameProduct, setnameProduct] = useState("");
  const [date, setDate] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [sizeList, setSizeList] = useState([]);
  const [colorList, setColorList] = useState([]);
  const [numberProduct, setNumberProduct] = useState("");

  const [importInvoiceData, setImportInvoiceData] = useState([]);
  const [importInvoiceList, setImportInvoiceList] = useState([]);
  const [detailProduct, setDetailProduct] = useState([]);
  const [sumPriceInvoice, setSumPriceInvoice] = useState("");
  const [count, setCount] = useState(0);
  const [check, setCheck] = useState(false);
  const [dataProduct, setDataProduct] = useState([]);
  // const [file, setFile] = useState();
  const { enqueueSnackbar } = useSnackbar();

  const idnv = useSelector((state) => state.employee?.current[0]?.id_nv);

  useEffect(() => {
    (async () => {
      try {
        const res_products = await productAPI.getProductListManage();
        setDataProduct(res_products);
        const res_importInvoice =
          await importInvoiceAPI.getListImportInvoiceAPI();

        setImportInvoiceList(res_importInvoice);
      } catch (error) {
        enqueueSnackbar(error.message, {
          variant: "error",
          autoHideDuration: 2000,
        });
      }
    })(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  const getNameProduct = async (idsp) => {
    const resColor = await colorAPI.getColor(idsp);
    setnameProduct(idsp);
    setColorList(resColor);
  };

  const getColorProduct = async (idms) => {
    if (idms) {
      const resSize = await detailProductAPI.getListColor(nameProduct, idms);
      setSizeList(resSize);
      setColor(idms);
    }
  };
  const onchangeSize = (kt) => {
    setSize(kt);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ngaylaphdn: date,
      idsp: nameProduct,
      gianhap: price,
      mausac: color,
      kichthuoc: size,
      soluong: numberProduct,
    };
    const newImportInvoice = [...importInvoiceData, data];
    setImportInvoiceData(newImportInvoice);
  };
  const handleImportInvoiceData = async () => {
    if (importInvoiceData) {
      var sum = 0;
      for (let i = 0; i < importInvoiceData.length; i++) {
        sum = sum + importInvoiceData[i].gianhap * importInvoiceData[i].soluong;
      }
      console.log(importInvoiceData);
      const id_hdn = await importInvoiceAPI.createImportInvoiceAPI({
        ngaylaphdn: date,
        tongtienhdn: sum,
        idnv: idnv,
      });
      for (let i = 0; i < importInvoiceData.length; i++) {
        await detailImportInvoiceAPI.createdetailImportInvoiceAPI({
          idhdn: id_hdn[0].id_hdn,
          gianhap: importInvoiceData[i].gianhap,
          mausac: importInvoiceData[i].mausac,
          kichthuoc: importInvoiceData[i].kichthuoc,
          idsp: importInvoiceData[i].idsp,
          soluong: importInvoiceData[i].soluong,
        });
      }
      await detailProductAPI.updateNumberProduct(importInvoiceData);

      setCount((e) => e + 1);
      handleClose();
      window.location.reload();
    }
  };

  const handleView = async (idhdn) => {
    const res = await detailImportInvoiceAPI.getDetailProductList(idhdn);
    const res_sumPrice = await importInvoiceAPI.sumPriceInvoice(idhdn);
    setDetailProduct(res);
    setSumPriceInvoice(res_sumPrice[0]?.tong_tien_hdn);
    setCheck(true);
  };
  const handleDelete = async (idhdn) => {
    const res = await importInvoiceAPI.deleteImportInvoice(idhdn);
    setCount((e) => e + 1);
  };
  const deleteRow =(idindex)=>{
    setImportInvoiceData(importInvoiceData.filter((item,index)=> index !== idindex))
  }
  const columns = [
    {
      field: "idhdn",
      headerName: "Mã hóa đơn",
      headerAlign: "center",
      align: "center",
      width: 125,
    },
    {
      field: "ngaylaphdn",
      headerName: "Ngày lập hóa đơn",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "nhanviennhap",
      headerName: "Nhân viên nhập",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "hanhdong",
      headerName: "Hành Động",
      headerAlign: "center",
      width: 300,
      renderCell: (params) => (
        <div className="flex w-[100%] justify-between">
          <div>
            <button
              onClick={() => handleView(params.row.idhdn)}
              className="block mx-auto py-2 px-4 bg-blue-500 text-white rounded-lg w-[120px]"
            >
              Xem thông tin
            </button>
          </div>
          <div>
            <button
              onClick={() => handleDelete(params.row.idhdn)}
              className="block mx-auto py-2 px-4 bg-black text-white rounded-lg w-[120px]"
            >
              Xóa hóa đơn
            </button>
          </div>
        </div>
      ),
    },
  ];
  console.log(importInvoiceData)

  const rows = importInvoiceList?.map(
    ({ id_hdn, ngay_lap_hdn, ten_nv }, idx) => ({
      id: idx,
      idhdn: id_hdn,
      ngaylaphdn: moment(ngay_lap_hdn).format("DD-MM-YYYY"),
      nhanviennhap: ten_nv,
    })
  );

  return (
    <div className="px-[20px]">
      <div>
        <button
          className="py-2 px-4 text-white bg-green-700 shadow-md rounded-md"
          onClick={handleOpen}
        >
          Nhập hóa đơn
        </button>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <p className="text-[26px] text-center font-medium">NHẬP SẢN PHẨM</p>
            <form onSubmit={handleSubmit}>
              <div className="flex gap-5">
                <div className="w-1/2">
                  <input
                    onChange={(e) => setDate(e.target.value)}
                    className="block mb-4 p-2 px-4 w-full border rounded-md"
                    type="date"
                  />
                  <select
                    onChange={(e) => getNameProduct(e.target.value)}
                    className="block mb-4 p-2 px-4 w-full border rounded-md"
                  >
                    <option value="">Chọn sản phẩm</option>
                    {dataProduct?.map(({ id_sp, ten_sp }, idx) => (
                      <option key={idx} value={id_sp}>
                        {ten_sp}
                      </option>
                    ))}
                  </select>
                  <input
                    onChange={(e) => setPrice(e.target.value)}
                    className="block mb-4 p-2 px-4 w-full border rounded-md"
                    type="text"
                    placeholder="Giá nhập"
                  />
                </div>
                <div className="w-1/2">
                  <select
                    onClick={(e) => getColorProduct(e.target.value)}
                    className="block mb-4 p-2 px-4 w-full border rounded-md"
                  >
                    <option value="">Chọn thương hiệu</option>
                    {colorList.map(({ id_th, ten_th }, idx) => (
                      <option key={idx} value={id_th}>
                        {ten_th}
                      </option>
                    ))}
                  </select>
                  <select
                    onClick={(e) => onchangeSize(e.target.value)}
                    className="block mb-4 p-2 px-4 w-full border rounded-md"
                  >
                    <option value="">Chọn loại sản phẩm</option>
                    {sizeList.map(({ id_lsp, ten_lsp }, idx) => (
                      <option key={idx} value={id_lsp}>
                        {ten_lsp}
                      </option>
                    ))}
                  </select>
                  <input
                    onChange={(e) => setNumberProduct(e.target.value)}
                    className="block mb-4 p-2 px-4 w-full border rounded-md"
                    type="text"
                    placeholder="Số lượng"
                  />
                </div>
              </div>
              <button className="block ml-auto mr-0 py-2 px-4 bg-green-900 text-white rounded-md">
                Thêm
              </button>
            </form>

            <div className="mt-4">
              <TableData rows={importInvoiceData} datashoe={dataProduct} deletetrow ={deleteRow} />
              <button
                onClick={handleImportInvoiceData}
                className="block mt-4 ml-auto mr-0 py-2 px-4 bg-lime-600 text-white rounded-lg"
              >
                Xác Nhận
              </button>
            </div>
          </Box>
        </Modal>
      </div>

      <div className="flex gap-5 mt-5 mb-4">
        <div style={{ height: 500, width: "50%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={7}
            rowsPerPageOptions={[7]}
          />
        </div>
        <div className="w-1/2 p-4 border rounded-md">
          {check === true && (
            <>
              <p className="text-center text-[24px] font-bold">HÓA ĐƠN NHẬP</p>
              <p className="text-center text-[24px] font-bold">------</p>
              <div className="px-10">
                {detailProduct?.map(
                  (
                    { ten_sp, ten_th, ten_lsp, so_luong_nhap, gia_nhap },
                    idx
                  ) => (
                    <div key={idx} className="mt-4">
                      <div>
                        <div className="flex justify-between">
                          <p className="w-[80%]">
                            Tên sản phẩm:{" "}
                            <span className="font-medium">{ten_sp}</span>
                          </p>
                          <p className="w-[20%]">Số lượng: {so_luong_nhap}</p>
                        </div>
                        <p>
                          Giá nhập:{" "}
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(gia_nhap)}
                        </p>
                        <p>Thương hiệu: {ten_th}</p>
                        <p>Loại sản phẩm: {ten_lsp} </p>
                      </div>
                    </div>
                  )
                )}
                <p className="text-slate-500 text-center">
                  ----------------------------------------------------------------------------------
                </p>
                <p>
                  Tổng tiền hóa đơn:{" "}
                  <span className="text-[20px] font-bold text-red-600">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(sumPriceInvoice)}
                  </span>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ImportInvoice;
