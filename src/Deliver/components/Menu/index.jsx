import React, { useEffect} from "react";
import {Link} from "react-router-dom";
import user from "../../asset/image/user.png";
import waitorder from "../../asset/image/waitorder.png";
import clipboard from "../../asset/image/clipboard.png";

function Menu() {
  useEffect(() => {
    (() => {
      handleMenu(1);
    })();
  }, []);

  const handleMenu = (key) => {
    if (key === 1) {
      const waitorder = document.querySelector("#waitorder");
      const user = document.querySelector("#user");
      const clipboard = document.querySelector("#clipboard");
      waitorder.style = "width: 45px";
      user.style = "width: 30px";
      clipboard.style = "width: 30px";
    }
    if (key === 2) {
      const waitorder = document.querySelector("#waitorder");
      const user = document.querySelector("#user");
      const clipboard = document.querySelector("#clipboard");
      waitorder.style = "width: 30px";
      user.style = "width: 45px";
      clipboard.style = "width: 30px";
    }
    if (key === 3) {
      const waitorder = document.querySelector("#waitorder");
      const user = document.querySelector("#user");
      const clipboard = document.querySelector("#clipboard");
      waitorder.style = "width: 30px";
      user.style = "width: 30px";
      clipboard.style = "width: 45px";
    }
  };
  return (
    <div className="fixed bottom-0 flex justify-around items-center px-4 w-full h-[60px] bg-slate-200 shadow-lg z-10">
      <div className="absolute left-10">
        <Link to={"/deliver/dashbroad"}>
          <img onClick={() => handleMenu(1)} id="waitorder" className=" w-[35px]" src={waitorder} alt="" />
        </Link>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2">
        <Link to={"/deliver/staff_deliver"}>
          <img onClick={() => handleMenu(2)} id="user" className=" w-[35px]" src={user} alt="" />
        </Link>
      </div>

      <div className="absolute right-10">
        <Link to={"/deliver/complete_order"}>
          <img onClick={() => handleMenu(3)} id="clipboard" className=" w-[35px]" src={clipboard} alt="" />
        </Link>
      </div>
    </div>
  );
}

export default Menu;
