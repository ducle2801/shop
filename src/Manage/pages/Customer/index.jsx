import React, {useEffect, useState} from "react";
import userAPI from "../../../api/userAPI";
import {BsFillLockFill, BsFillUnlockFill} from "react-icons/bs";

function Customer() {
  const [client, setClient] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    (async () => {
      const res = await userAPI.getListClient();
      setClient(res);
    })();
  }, [count]);

  const lockUser = async (idkh) => {
    const status = 1;
    await userAPI.updateStatusUser(idkh, status);
    setCount((e) => e + 1);
  };

  const unLockUser = async (idkh) => {
    const status = 0;
    await userAPI.updateStatusUser(idkh, status);
    setCount((e) => e + 1);
  };

  const renderClient =
    !!client &&
    client?.map(({id_kh, email_kh, trang_thai_kh}, idx) => (
      <div key={idx} className="p-4 rounded-lg bg-green-100 shadow-md">
        <p>ID: {id_kh}</p>
        <p>Email: {email_kh}</p>
        <p>
          Trạng thái:{" "}
          {trang_thai_kh === 0 ? (
            <span className="text-green-600 font-medium">Hoạt động</span>
          ) : (
            <span className="text-red-600 font-medium">Khóa</span>
          )}
        </p>
        <div>
          {trang_thai_kh === 0 ? (
            <button
              onClick={() => lockUser(id_kh)}
              className="block ml-auto mr-0 px-4 py-2 bg-red-500 text-white rounded-lg"
            >
              <BsFillLockFill size={20} />
            </button>
          ) : (
            <button
              onClick={() => unLockUser(id_kh)}
              className="block ml-auto mr-0 px-4 py-2 bg-red-500 text-white rounded-lg"
            >
              <BsFillUnlockFill size={20} />
            </button>
          )}
        </div>
      </div>
    ));

  return <div className="grid grid-cols-4 mx-4 gap-4 cursor-pointer">{renderClient}</div>;
}

export default Customer;
