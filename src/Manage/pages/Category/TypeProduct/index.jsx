import React, { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import typeProductAPI from '../../../../api/typeProductAPI';
import brandAPI from '../../../../api/brandAPI';
import { useSnackbar } from 'notistack';

function TypeProduct() {
  const [count, setCount] = useState(0);
  const [nameTypeProduct, setNameTypeProduct] = useState('');
  const [listTypeProduct, setListTypeProduct] = useState([]);
  const [nameTypeBrand, setNameTypeBrand] = useState('');
  const [listBrand, setListBrand] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    (async () => {
      // const resBrand = await typeProductAPI.getList();
      const resBrandd = await brandAPI.getList();
      setListBrand(resBrandd);
      const resBrand = await typeProductAPI.getListBrand(
        count >= 1 ? nameTypeBrand : resBrandd[0]?.id_th
      );
      setListTypeProduct(resBrand);
      setNameTypeBrand(count >= 1 ? nameTypeBrand : resBrandd[0]?.id_th);
    })();
  }, [count]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nameTypeProduct !== '' && nameTypeBrand !== '') {
      await typeProductAPI.createTypeProduct({
        loaisanpham: nameTypeProduct,
        tenth: nameTypeBrand,
      });
      setNameTypeProduct('');
      setCount((e) => e + 1);
    } else {
      enqueueSnackbar('Vui lòng nhập tên', {
        variant: 'error',
        autoHideDuration: 2000,
      });
    }
  };

  const deTypeProduct = async (idlsp) => {
    await typeProductAPI.deTypeProduct(idlsp);
    setCount((e) => e + 1);
  };
  const onChangeValueBrand = async (e) => {
    const value = e.target.value;

    const resBrand = await typeProductAPI.getListBrand(value);
    setNameTypeBrand(value);
    setListTypeProduct(resBrand);
  };
  const renTypeProduct =
    !!listTypeProduct &&
    listTypeProduct?.map(({ id_lsp, ten_lsp }, idx) => (
      <div key={idx}>
        <div className="relative py-4 text-[20px] text-center border border-orange-500 rounded-lg opacity-80 shadow-lg">
          <p>{ten_lsp}</p>
          <AiOutlineClose
            onClick={() => deTypeProduct(id_lsp)}
            className="absolute right-1 top-1 cursor-pointer"
          />
        </div>
      </div>
    ));

  return (
    <div className="px-[20px]">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-6">
            <input
              onChange={(e) => setNameTypeProduct(e.target.value)}
              className="px-4 py-2 border rounded-lg"
              type="text"
              placeholder="Loại sản phẩm"
              value={nameTypeProduct}
            />
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-lg">
              Thêm Loại Sản Phẩm
            </button>
          </div>
        </form>
        <select
          className="bg-green-600 text-white  rounded-lg h-2 "
          style={{ height: '30px', marginTop: '10px' }}
          onChange={(e) => onChangeValueBrand(e)}
        >
          {listBrand?.map((item, index) => {
            return (
              <option key={index} value={item.id_th}>
                {item.ten_th}
              </option>
            );
          })}
        </select>
      </div>
      <div className="grid grid-cols-6 gap-5 mt-5">{renTypeProduct}</div>
    </div>
  );
}

export default TypeProduct;
