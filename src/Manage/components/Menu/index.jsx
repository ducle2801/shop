import React from "react";
import { AiFillBell } from "react-icons/ai";
import { BsFillChatLeftDotsFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../../redux/employeeSlice";

function Menu(props) {
  const isLogin = useSelector((state) => state.employee.current[0]);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const logoutEmployee = () => {
    dispatch(logout());
    navigate("/manage/login", { replace: true });
  };
  const changeTitle = () => {
    let tittle = "";
    if (props.title === "dashboard") tittle = "Thống Kê";
    if (props.title === "product/add") tittle = "Thêm Sản Phẩm";
    if (props.title === "product/listproducts") tittle = "Danh Sách Sản Phẩm";
    if (props.title === "category/color") tittle = "Màu Sắc";
    if (props.title === "category/size") tittle = "Kích Thước";
    if (props.title === "category/brand") tittle = "Thương Hiệu";
    if (props.title === "category/type_product") tittle = "Loại Sản Phẩm";
    if (props.title === "bill/import_invoice") tittle = "Nhập kho";
    if (props.title === "bill/export_invoice") tittle = "Đơn Hàng";
    if (props.title === "delivery") tittle = "Trạng Thái Đơn";
    if (props.title === "staff") tittle = "Nhân Viên";
    if (props.title === "reviews") tittle = "Đánh giá";
    if (props.title === "banner") tittle = "Ảnh bìa";
    if (props.title === "customer") tittle = "Khách hàng";

    return tittle;
  };
  return (
    <div className="flex justify-between items-center w-full py-6 px-4 border-b">
      <div className="text-[25px] font-bold capitalize">{changeTitle()}</div>
      <div className="flex gap-8 mr-6">
        {!!isLogin ? (
          <>
            {/* <div className="p-2 border rounded-full">
              <AiFillBell size={20} />
            </div>
            <div className="p-2 border rounded-full">
              <BsFillChatLeftDotsFill size={20} />
            </div> */}
            <div className="group relative p-2 border rounded-full">
              <FaUserCircle size={20} />
              <div className="absolute z-10 -right-7 top-9 bg-slate-300 rounded-md hidden group-hover:block w-[110px] border-2">
                {/* <Link to="/shop/profile">
                  <p className="hover:bg-slate-100 py-2 px-4 rounded-t-md ">
                    Profile
                  </p>
                </Link>
                <Link to="/shop/orders">
                  <p className="hover:bg-slate-100 py-2 px-4 ">Order</p>
                </Link> */}
                <p
                  onClick={logoutEmployee}
                  className="hover:bg-slate-100 py-2 px-4 rounded-md cursor-pointer "
                >
                  Đăng xuất
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            <div>
              <Link to="/manage/login">
                <p>
                  <strong>Đăng nhập</strong>
                </p>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Menu;
