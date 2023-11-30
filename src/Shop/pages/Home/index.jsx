import React, { useEffect, useState } from 'react';
import productAPI from '../../../api/productAPI';
import Banner from '../../../components/Banner';
import Card from '../../../components/Card';
import Footer from '../../../components/Footer';
import anh1 from '../../../assets/danhmuc/danhmuc1.png';
import anh2 from '../../../assets/danhmuc/danhmuc2.png';
import anh3 from '../../../assets/danhmuc/danhmuc3.png';
import anh4 from '../../../assets/danhmuc/danhmuc4.png';
import anh5 from '../../../assets/danhmuc/danhmuc5.png';
import { Link } from 'react-router-dom';
import './index.css';
import ReactPaginate from 'react-paginate';
import filterAPI from '../../../api/filterAPI';
import { addListProduct } from '../../../redux/productSlice';
import { useDispatch } from 'react-redux';
// import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
// import Button from "@mui/material/Button";
const arrItem = [
  { img: anh1, id: 'TH01', name: 'Giống' },
  { img: anh2, id: 'TH02', name: 'Thuốc BVTV' },
  { img: anh3, id: 'TH03', name: 'Phân bón' },
  { img: anh4, id: 'TH04', name: 'Vật tư xử lý môi trường' },
  { img: anh5, id: 'TH05', name: 'Dụng cụ' },
];
function Home() {
  // const [open, setOpen] = useState(false);
  // const [open2, setOpen2] = useState(false);
  const [currentItem, setCurrentItem] = useState([]);
  const [pagecount, setpagecount] = useState(0);
  const [offset, setOffer] = useState(0);

  const [currentItem2, setCurrentItem2] = useState([]);
  const [pagecount2, setpagecount2] = useState(0);
  const [offset2, setOffer2] = useState(0);
  const itempage = 10;
  const itempagedis = 10;
  const dispatch = useDispatch();
  const [newProduct, setNewProduct] = useState([]);
  const [discountProduct, setDiscountProduct] = useState([]);
  useEffect(() => {
    (async () => {
      const resNewProduct = await productAPI.getNewProduct();
      const resDiscountProduct = await productAPI.getDiscountProduct();
      const endoffset = offset + itempage;
      setCurrentItem(resNewProduct.slice(offset, endoffset));
      setpagecount(Math.ceil(resNewProduct.length / itempage));
      const endoffset2 = offset2 + itempagedis;
      setCurrentItem2(resDiscountProduct.slice(offset2, endoffset2));
      setpagecount2(Math.ceil(resDiscountProduct.length / itempagedis));
      setNewProduct(resNewProduct);
      setDiscountProduct(resDiscountProduct);
    })();
  }, [offset, itempage, itempagedis, offset2]);
  // const handdlechangeOpen = () => {
  //   setOpen((pre) => !pre);
  // };
  // const handlechange2 = () => {
  //   setOpen2((pre) => !pre);
  // };
  const handdlechuyen = (e) => {
    const newOffset = (e.selected * itempage) % newProduct.length;
    setOffer(newOffset);
  };
  const handdlechuyen2 = (e) => {
    const newOffset = (e.selected * itempagedis) % discountProduct.length;
    setOffer2(newOffset);
  };
  const fillterBrand = async (id_th) => {
    const dataFilter = await filterAPI.sortBrand(id_th);
    dispatch(addListProduct(dataFilter));
  };
  return (
    <div>
      <Banner />
      <div className="mx-auto w-[80%]">
        <div
          style={{
            color: '#309345',
            fontSize: '28px',
            fontWeight: 600,
            lineHeight: '34px',
            textTransform: 'uppercase',
          }}
        >
          CÁC PHÂN NHÓM SẢN PHẨM
        </div>
        <label
          style={{
            color: '#363636',
            fontSize: '20px',
            fontWeight: 400,
            lineHeight: '24px',
            opacity: 7,
          }}
        >
          Các phân nhóm sản phẩm chi tiết của Trạm Xanh{' '}
        </label>
      </div>
      <div
        className="mx-auto w-[80%]"
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          marginTop: '50px',
        }}
      >
        {arrItem.map((item, index) => {
          return (
            <Link to="/shop/products" key={index}>
              <div
                style={{
                  width: '100px',
                  height: '100px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
                onClick={() => fillterBrand(item.id)}
              >
                <img src={item.img} />
                <div style={{ textAlign: 'center', marginTop: '5px' }}>
                  {item.name}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="w-[80%] mx-auto mt-12">
        {/* <div className="w-[50px]  card translate-x-[-1000px]  "></div> */}
        {/* <Button variant="outlined" onClick={handdlechangeOpen}>
          <ArrowCircleRightIcon />
        </Button> */}
        <div
          style={{
            color: '#309345',
            fontSize: '28px',
            fontWeight: 600,
            lineHeight: '34px',
            textTransform: 'uppercase',
          }}
        >
          Sản phẩm mới
        </div>

        <div className="grid grid-cols-5 gap-10 mt-8">
          {currentItem?.map((data, idx) => (
            <Card key={idx} data={data} />
          ))}
        </div>
        <ReactPaginate
          containerClassName={'btncontainer'}
          breakLabel="..."
          nextLabel="Tiếp"
          onPageChange={handdlechuyen}
          pageRangeDisplayed={3}
          pageCount={pagecount}
          previousLabel="Trước"
          renderOnZeroPageCount={null}
          activeClassName={'paginationActive'}
        />
      </div>
      <div className="mx-auto w-[80%]">
        <div
          style={{
            color: '#309345',
            fontSize: '28px',
            fontWeight: 600,
            lineHeight: '34px',
            textTransform: 'uppercase',
          }}
        >
          CÁC MẶT HÀNG KHUYẾN MÃI
        </div>
      </div>
      <div className=" w-[80%] mx-auto mt-12">
        {/* <div className="w-[50px] h-[30px] card2 translate-x-[-1000px] "></div> */}

        {/* <p className="my-2 text-[24px] text-center text-teal-700 font-bold  uppercase">
                    Sản phẩm khuyến mãi
                </p> */}

        <div className="grid grid-cols-5 gap-10">
          {currentItem2?.map((data, idx) => (
            <Card key={idx} data={data} />
          ))}
        </div>
        <ReactPaginate
          containerClassName={'btncontainer'}
          breakLabel="..."
          nextLabel="Tiếp"
          onPageChange={handdlechuyen2}
          pageRangeDisplayed={3}
          pageCount={pagecount2}
          previousLabel="Trước"
          renderOnZeroPageCount={null}
          activeClassName={'paginationActive'}
        />
      </div>

      <Footer />
    </div>
  );
}

export default Home;
