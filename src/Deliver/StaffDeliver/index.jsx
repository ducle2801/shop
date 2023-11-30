import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutDeliver } from "../../redux/employeeSlice";

function StaffDeliver() {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const logoutEmployee = () => {
    dispatch(logoutDeliver());
    navigate("/deliver/login", { replace: true });
  };

  return (
    <div className="h-[90vh] relative">
      <button
        onClick={logoutEmployee}
        className="block mx-auto  text-white font-bold bg-slate-400 rounded-lg px-4 py-2 absolute h-[6%] bottom-0 left-[50%] translate-x-[-50%] "
      >
        Đăng xuất
      </button>
    </div>
  );
}

export default StaffDeliver;
