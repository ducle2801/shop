import React, {useEffect, useState} from "react";
import {AiOutlineClose} from "react-icons/ai";
import brandAPI from "../../../../api/brandAPI";

function Brand() {
  const [count, setCount] = useState(0);
  const [nameBrand, setNameBrand] = useState("");
  const [listBrand, setListBrand] = useState([]);

  useEffect(() => {
    (async () => {
      const resBrand = await brandAPI.getList();
      setListBrand(resBrand);
    })();
  }, [count]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nameBrand) {
      await brandAPI.createBrand({
        thuonghieu: nameBrand,
      });
      setCount((e) => e + 1);
    }
  };

  const deBrand = async (idth) => {
    await brandAPI.deBrand(idth);
    setCount((e) => e + 1);
  };

  const renBrand =
    !!listBrand &&
    listBrand?.map(({id_th, ten_th}, idx) => (
      <div key={idx}>
        <div className="relative py-4 text-[20px] text-center border border-red-500 rounded-lg opacity-80 shadow-lg">
          <p>{ten_th}</p>
          <AiOutlineClose onClick={() => deBrand(id_th)} className="absolute right-1 top-1 cursor-pointer" />
        </div>
      </div>
    ));

  return (
    <div className="px-[20px]">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-6">
            <input
              onChange={(e) => setNameBrand(e.target.value)}
              className="px-4 py-2 border rounded-lg"
              type="text"
              placeholder="Tên thương hiệu"
            />
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-lg">Thêm Thương Hiệu</button>
          </div>
        </form>
      </div>
      <div className="grid grid-cols-6 gap-5 mt-5">{renBrand}</div>
    </div>
  );
}

export default Brand;
