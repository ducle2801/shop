import React, { useEffect, useRef, useState } from 'react';

import brandAPI from '../../../api/brandAPI';
import sizeAPI from '../../../api/sizeAPI';
import filterAPI from '../../../api/filterAPI';

import CardProduct from '../../../components/Card';
import Footer from '../../../components/Footer';
import { addListProductSale, product } from '../../../redux/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import Slider from '@mui/material/Slider';
import productAPI from '../../../api/productAPI';
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
// import { unwrapResult } from "@reduxjs/toolkit";

function Sales() {
  const [brand, setBrand] = useState([]);
  // const [size, setSize] = useState([]);
  const dispatch = useDispatch();
  const [checked, setCheck] = useState([]);
  const [checkedBrand, setCheckBrand] = useState([]);
  const dataProductsale = useSelector(
    (state) => state?.product?.productlistsale
  );
  // const isMout = useRef(true);
  useEffect(() => {
    (async () => {
      // unwrapResult(dispatch(product()));
      const brand = await brandAPI.getList();
      // const size = await sizeAPI.getList();
      // if (isMout.current) {
      brand.forEach((item) => {
        if (item.danh_sach_loai_san_pham) {
          item.danh_sach_loai_san_pham = JSON.parse(
            item.danh_sach_loai_san_pham.replace(/\\/g, '')
          );
        }
      });
      setBrand(brand);
      // setSize(size);
      // setBrand(brand);
      // }
    })();
  }, []);

  const filterSort = async (data) => {
    const dataFilter = await filterAPI.sortBySale(data);
    dispatch(addListProductSale(dataFilter));
  };

  const filterBrand = async (data) => {
    const dataFilter = await filterAPI.sortBrandSale(data);
    dispatch(addListProductSale(dataFilter));
    setCheckBrand(data);
  };

  const [value, setValue] = useState([10000, 500000]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const filterTypeSale = async (id) => {
    const res = await filterAPI.sortTypeSale(id);
    console.log(res);
    dispatch(addListProductSale(res));
  };
  const FilterRangePrice = async () => {
    const res = await filterAPI.rangePriceSale(value);
    dispatch(addListProductSale(res));
  };
  var count = 8;
  const viewAddProduct = async () => {
    count += 8;
    const res = await productAPI.getDiscountProductAddList({
      number: count,
    });
    dispatch(addListProductSale(res));
  };
  const renderNestedItems = (items, isOpen) => {
    return items.map((item, index) => (
      <Collapse
        key={index}
        in={isOpen === 0 ? false : true}
        timeout="auto"
        unmountOnExit
      >
        <List
          onClick={() => {
            filterTypeSale(item.id_loai);
          }}
          component="div"
          disablePadding
        >
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary={item.ten_loai} />
          </ListItemButton>
        </List>
      </Collapse>
    ));
  };
  const handleClick = (index) => {
    setBrand((prevState) => {
      const updatedStates = prevState.map((item, i) => {
        if (i === index) {
          return { ...item, isOpen: Number(!item.isOpen) };
        }
        return item;
      });
      return updatedStates;
    });
  };
  return (
    <div className=" relative w-[100%] min-h-[46vh] ">
      <div className="flex gap-5 w-[80%] mx-auto mt-10">
        <div className="w-[20%]">
          <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Danh mục sản phẩm
              </ListSubheader>
            }
          >
            {brand.map((item, index) => (
              <React.Fragment key={index}>
                <ListItemButton className="w-full py-[6px] px-4 bg-gray-200 outline-none rounded-lg shadow-md">
                  <ListItemIcon></ListItemIcon>
                  <ListItemText
                    onClick={() => {
                      filterBrand(item.id_th);
                    }}
                    primary={item.ten_th}
                  />
                  {item.danh_sach_loai_san_pham ? (
                    item.isOpen ? (
                      <ExpandLess onClick={() => handleClick(index)} />
                    ) : (
                      <ExpandMore onClick={() => handleClick(index)} />
                    )
                  ) : null}
                </ListItemButton>

                {item.danh_sach_loai_san_pham
                  ? renderNestedItems(item.danh_sach_loai_san_pham, item.isOpen)
                  : null}
              </React.Fragment>
            ))}
          </List>
          <div className="mb-5">
            <select
              onChange={(e) => filterSort(e.target.value)}
              className="w-full py-[6px] px-4 bg-gray-200 outline-none rounded-lg shadow-md"
            >
              <option value="">Sắp xếp giá</option>
              <option value="ASC">Từ thấp đến cao</option>
              <option value="DESC">Từ cao đến thấp</option>
            </select>
          </div>
          <div className="mb-5 p-4 bg-slate-100 rounded-md">
            <Slider
              getAriaLabel={() => 'Temperature range'}
              value={value}
              onChange={handleChange}
              max={1000000}
            />
            <div className="flex justify-between">
              <p>
                {' '}
                {new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                }).format(value[0])}
              </p>
              <p>
                {new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                }).format(value[1])}
              </p>
            </div>
            <button
              onClick={FilterRangePrice}
              className="block ml-auto mr-0 py-2 px-4 mt-2 text-white font-medium bg-green-500 rounded-md"
            >
              Lọc
            </button>
          </div>
        </div>
        <div className="w-[80%] min-h-[53vh] mx-auto mt-5">
          <div className="grid grid-cols-4 gap-5">
            {dataProductsale?.map((data, idx) => (
              <CardProduct key={idx} data={data} />
            ))}
          </div>
          <p
            onClick={viewAddProduct}
            className="text-center text-[18px] text-slate-700 mt-5 cursor-pointer"
          >
            Xem thêm
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Sales;
