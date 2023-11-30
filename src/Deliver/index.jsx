import React from "react";
import {Route, Routes, Navigate} from "react-router-dom";
import CompleteOrder from "./CompleteOrder";
import Menu from "./components/Menu";
import Dashbroad from "./Dashbroad";
import DetailOrder from "./DetailOrder";
import Login from "./Login";
import StaffDeliver from "./StaffDeliver";

function Deliver() {

  return (
    <div>
      <Menu />
      <Routes>
        <Route path="/" element={<Navigate replace to="/deliver/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashbroad" element={<Dashbroad />} />
        <Route path="/staff_deliver" element={<StaffDeliver />} />
        <Route path="/complete_order" element={<CompleteOrder />} />
        <Route path="/:idhdx" element={<DetailOrder />} />
      </Routes>
    </div>
  );
}

export default Deliver;
