import React, {useEffect, useState} from "react";
import {AiOutlineClose} from "react-icons/ai";
import sizeAPI from "../../../../api/sizeAPI";

function Size() {
  const [nameSize, setNameSize] = useState();
  const [count, setCount] = useState(0);
  const [listSize, setListSize] = useState([]);

  useEffect(() => {
    (async () => {
      const resSize = await sizeAPI.getList();
      setListSize(resSize);
    })();
  }, [count]);

  console.log(count);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nameSize && typeof nameSize == "string") {
      await sizeAPI.createSize({
        kichthuoc: nameSize,
      });
      setCount((e) => e + 1);
    } else {
      console.log("ERROR");
    }
  };

  const deSize = async (idkt) => {
    await sizeAPI.deSize(idkt);
    setCount((e) => e + 1);
  };

  const renSize =
    !!listSize &&
    listSize?.map(({id_kt, ten_kt}, idx) => (
      <div key={idx}>
        <div className="relative py-4 text-[20px] text-center border border-emerald-500 rounded-lg opacity-80 shadow-lg">
          <p>{ten_kt}</p>
          <AiOutlineClose onClick={() => deSize(id_kt)} className="absolute right-1 top-1 cursor-pointer" />
        </div>
      </div>
    ));

  return (
    <div className="px-[20px]">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-6">
            <input
              onChange={(e) => setNameSize(e.target.value)}
              className="px-4 py-2 border rounded-lg"
              type="text"
              placeholder="Tên kích thước"
            />
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-lg">Thêm Kích Thước</button>
          </div>
        </form>
      </div>
      <div className="grid grid-cols-6 gap-5 mt-5">{renSize}</div>
    </div>
  );
}

export default Size;
