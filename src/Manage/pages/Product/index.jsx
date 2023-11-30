import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import ListProducts from './ListProducts';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import { color } from '../../../redux/colorSlice';
import { brand } from '../../../redux/brandSlice';
import { size } from '../../../redux/sizeSlice';
import { typeProduct } from '../../../redux/typeProductSlice';

function Product() {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        unwrapResult(dispatch(await color()));
        unwrapResult(dispatch(await brand()));
        unwrapResult(dispatch(await size()));
        unwrapResult(dispatch(await typeProduct()));
      } catch (error) {
        console.log(error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Routes>
        <Route path="/add" element={<AddProduct />} />
        <Route path="/listproducts" element={<ListProducts />} />
        <Route path="/edit/:idsp" element={<EditProduct />} />
      </Routes>
    </div>
  );
}

export default Product;
