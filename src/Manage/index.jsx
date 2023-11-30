import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import NotFound from "../components/NotFound";
import Menu from "./components/Menu";
import Navigation from "./components/Navigation";
import Category from "./pages/Category";
import Customer from "./pages/Customer";
import Reviews from "./pages/Reviews";
import PrivateRoutes from "./PrivateRoutes";
import img0 from "../assets/logo.png"
const LoginManage = React.lazy(() => import("./pages/LoginManage"));
const Staff = React.lazy(() => import("./pages/Staff"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Delivery = React.lazy(() => import("./pages/Delivery"));
const Product = React.lazy(() => import("./pages/Product"));
const Bill = React.lazy(() => import("./pages/Bill"));
const Banner = React.lazy(() => import("./pages/Banner"));
function Manage() {
  const location = useLocation();
  const title = location.pathname.slice(8);
  const isLogin = useSelector((state) => state.employee?.current[0]?.email_nv);

  return (
    <div className="flex ">
      <div className="h-[100vh]">{isLogin ? <Navigation /> : ""}</div>
      <div className="flex-1 ">
        {!isLogin ? (
          <div className=" font-[900]  text-blue-500 bg-text-color bg-clip-text absolute left-[50%] translate-x-[-50%] w-[200px] h-[200px]">
            <img src={img0}/>
          </div>
        ) : (
          ""
        )}

        <div>
          <Menu title={title} />
        </div>
        <div className="mt-8">
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/category/*" element={<Category />} />
              <Route path="/product/*" element={<Product />} />
              <Route path="/bill/*" element={<Bill />} />
              <Route path="/delivery" element={<Delivery />} />
              <Route path="/staff" element={<Staff />} />
              <Route path="/customer" element={<Customer />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/banner" element={<Banner />} />
            </Route>
            <Route path="/login" element={<LoginManage />} />

            <Route path="/*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Manage;
