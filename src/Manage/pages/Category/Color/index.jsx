import React, {useEffect, useState} from "react";
import colorAPI from "../../../../api/colorAPI";
import {AiOutlineClose} from "react-icons/ai";

function Color() {
  const [nameColor, setNameColor] = useState("");
  const [listColor, setListColor] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    (async () => {
      const resColor = await colorAPI.getListColor();
      setListColor(resColor);
      console.log(resColor);
    })();
  }, [count]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nameColor) {
      await colorAPI.createColor({
        mausac: nameColor,
      });
      setCount((e) => e + 1);
    }
  };

  const deColor = async (idms) => {
    await colorAPI.deColor(idms);
    setCount((e) => e + 1);
  };

  const renColor =
    !!listColor &&
    listColor?.map(({id_ms, ten_ms}, idx) => (
      <div key={idx}>
        <div className="relative py-4 text-[20px] text-center border border-lime-500 rounded-lg opacity-80 shadow-lg">
          <p>{ten_ms}</p>
          <AiOutlineClose onClick={() => deColor(id_ms)} className="absolute right-1 top-1 cursor-pointer" />
        </div>
      </div>
    ));

  return (
    <div className="px-[20px]">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-6">
            <input
              onChange={(e) => setNameColor(e.target.value)}
              className="px-4 py-2 border rounded-lg"
              type="text"
              placeholder="Tên màu sắc"
            />
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-lg">Thêm Màu Sắc</button>
          </div>
        </form>
      </div>
      <div className="grid grid-cols-6 gap-5 mt-5">{renColor}</div>
    </div>
  );
}

export default Color;
