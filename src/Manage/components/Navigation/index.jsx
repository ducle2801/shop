import React, { useEffect, useState } from "react";
import { AiOutlineBarChart, AiOutlineAppstoreAdd } from "react-icons/ai";
import { BsBoxSeam, BsPeople } from "react-icons/bs";
import { TiThMenuOutline } from "react-icons/ti";
import { RiBillLine } from "react-icons/ri";
import { MdOutlineReviews } from "react-icons/md";
import { Link } from "react-router-dom";
import PhotoCameraBackIcon from "@mui/icons-material/PhotoCameraBack";
import { useSelector } from "react-redux";
import exportInvoiceAPI from "../../../api/exportInvoiceAPI";


function Navigation() {
  const [openMenuProduct, setOpenMenuProduct] = useState(false);
  const [number, setNumber] = useState([]);
  const [openCategory, setOpenCategory] = useState(false);

  const handleMenuProduct = () => {
    setOpenMenuProduct(!openMenuProduct);
  };

  const handleCategory = () => {
    setOpenCategory(!openCategory);
  };

  const isLogin = useSelector((state) => state.employee?.current[0]?.email_nv);
  const role = useSelector((state) => state.employee?.current[0]?.id_cv);

  useEffect(() => {
    (async () => {
      const waitOrder = await exportInvoiceAPI.numberWait();
      setNumber(waitOrder);
    })();
  }, []);

  return (
    <div className=" bg-slate-200 overflow-hidden w-[250px] h-[100%]">
      <div className="py-6">
        <p className="text-[30px] text-center font-bold bg-text-color bg-clip-text ">
          Quản lý
        </p>
      </div>
      {isLogin ? (
        <div className="grid grid-cols-1 mt-6">
          {role === "CV01" && (
            <Link to="/manage/dashboard">
              <div className="flex gap-2 items-center px-6 py-3  cursor-pointer text-sm font-medium text-gray-700  hover:bg-teal-500 hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out ">
                <AiOutlineBarChart size={30} />
                <p className="text-[16px]">Thống kê</p>
              </div>
            </Link>
          )}

          {(role === "CV01" || role === "CV03") && (
            <React.Fragment>
              <div>
                <div
                  onClick={handleMenuProduct}
                  className="flex gap-2 items-center px-6 py-3  cursor-pointer text-sm font-medium text-gray-700  hover:bg-teal-500 hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out"
                >
                  <BsBoxSeam size={30} />
                  <p className="text-[16px]">Sản phẩm</p>
                </div>
                {openMenuProduct ? (
                  <div className="pl-14 text-[14px]">
                    <Link to="/manage/product/add">
                      <p className="hover:pl-4 hover:font-semibold p-2 text-[16px] duration-200">
                        Thêm sản phẩm
                      </p>
                    </Link>
                    <Link to="/manage/product/listproducts">
                      <p className="hover:pl-4 hover:font-semibold p-2 text-[16px] duration-200">
                        Danh sách sản phẩm
                      </p>
                    </Link>
                  </div>
                ) : (
                  <></>
                )}
              </div>

              {role === "CV01" && (
                <>
                  <div
                    onClick={handleCategory}
                    className="flex gap-2 items-center px-6 py-3  cursor-pointer text-sm font-medium text-gray-700  hover:bg-teal-500 hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out"
                  >
                    <TiThMenuOutline size={30} />
                    <p className="text-[16px]">Danh mục</p>
                  </div>

                  {openCategory ? (
                    <div className="pl-14 text-[14px]">
                      {/* <Link to="/manage/category/color">
                        <p className="hover:pl-4 hover:font-semibold p-2 text-[16px] duration-200">
                          Màu sắc
                        </p>
                      </Link> */}
                      {/* <Link to="/manage/category/size">
                        <p className="hover:pl-4 hover:font-semibold p-2 text-[16px] duration-200">
                          Kích thước
                        </p>
                      </Link> */}
                      <Link to="/manage/category/brand">
                        <p className="hover:pl-4 hover:font-semibold p-2 text-[16px] duration-200">
                          Thương hiệu
                        </p>
                      </Link>
                      <Link to="/manage/category/type_product">
                        <p className="hover:pl-4 hover:font-semibold p-2 text-[16px] duration-200">
                          Loại sản phẩm
                        </p>
                      </Link>
                    </div>
                  ) : (
                    <></>
                  )}
                </>
              )}

              {(role === "CV01" || role === "CV03") && (
                <Link to="/manage/bill/import_invoice">
                  <div className="flex gap-2 items-center px-6 py-3  cursor-pointer text-sm font-medium text-gray-700  hover:bg-teal-500 hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out">
                    <AiOutlineAppstoreAdd size={30} />
                    <p className="text-[16px]">Nhập kho</p>
                  </div>
                </Link>
              )}
            </React.Fragment>
          )}

          {(role === "CV01" || role === "CV02") && (
            <Link to="/manage/bill/export_invoice">
              <div className="flex gap-2 items-center px-6 py-3  cursor-pointer text-sm font-medium text-gray-700  hover:bg-teal-500 hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out">
                <RiBillLine size={30} />
                <p className="text-[16px]">
                  Đơn hàng{" "}
                  <span className="font-bold text-red-500">
                    ({number.length})
                  </span>
                </p>
              </div>
            </Link>
          )}
          {role === "CV01" && (
            <Link to="/manage/delivery">
              <div className="flex gap-2 items-center px-6 py-3  cursor-pointer text-sm font-medium text-gray-700  hover:bg-teal-500 hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out">
                <AiOutlineBarChart size={30} />
                <p className="text-[16px]">Trạng thái đơn</p>
              </div>
            </Link>
          )}
          {role === "CV01" && (
            <Link to="/manage/banner">
              <div className="flex gap-2 items-center px-6 py-3  cursor-pointer text-sm font-medium text-gray-700  hover:bg-teal-500 hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out">
                <PhotoCameraBackIcon size={30} />
                <p className="text-[16px]">Ảnh bìa</p>
              </div>
            </Link>
          )}

          {role === "CV01" && (
            <Link to="/manage/staff">
              <div className="flex gap-2 items-center px-6 py-3  cursor-pointer text-sm font-medium text-gray-700  hover:bg-teal-500 hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out">
                <BsPeople size={30} />
                <p className="text-[16px]">Nhân viên</p>
              </div>
            </Link>
          )}

          {role === "CV01" && (
            <Link to="/manage/customer">
              <div className="flex gap-2 items-center px-6 py-3  cursor-pointer text-sm font-medium text-gray-700  hover:bg-teal-500 hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out">
                <BsPeople size={30} />
                <p className="text-[16px]">Khách hàng</p>
              </div>
            </Link>
          )}

          {role === "CV01" && (
            <Link to="/manage/reviews">
              <div className="flex gap-2 items-center px-6 py-3  cursor-pointer text-sm font-medium text-gray-700  hover:bg-teal-500 hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out">
                <MdOutlineReviews size={30} />
                <p className="text-[16px]">Đánh giá</p>
              </div>
            </Link>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Navigation;
