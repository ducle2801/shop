import React, { useEffect, useState } from 'react';
import Badge from '@mui/material/Badge';
import { useSnackbar } from 'notistack';
import { Link, useNavigate } from 'react-router-dom';
import brandAPI from '../../api/brandAPI';
import { BiUserCircle } from 'react-icons/bi';
import { FiShoppingCart } from 'react-icons/fi';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsFillMicFill } from 'react-icons/bs';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/userSlice';
import { removeAllAddress } from '../../redux/addressSlice';
import { removeAllCart } from '../../redux/cartSlide';
import filterAPI from '../../api/filterAPI';
import { useForm } from 'react-hook-form';
import { addListProduct, product } from '../../redux/productSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import CardItem from '../CardItem';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import './index.css';
import logo from '../../assets/logo.png';
const defaulValue = {
  search: '',
};

function Header() {
  const isLogin = useSelector((state) => state.user.current.dataUser?.length);
  const numerProduct = useSelector((state) => state?.cart?.cartItem);
  const [soluong, setSoluong] = useState(0);
  const [searchData, setSearchData] = useState([]);
  const [band, setBand] = useState([]);
  const [state, setState] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm(defaulValue);
  const { enqueueSnackbar } = useSnackbar();

  const logoutUser = () => {
    dispatch(removeAllCart());
    dispatch(removeAllAddress());
    dispatch(logout());
    navigate('/shop/products', { replace: true });
  };

  useEffect(() => {
    (async () => {
      const brand = await brandAPI.getList();
      setBand(brand);
      try {
        unwrapResult(dispatch(product()));
        let a = 0;
        if (numerProduct?.length !== 0) {
          a = numerProduct.length;
          setSoluong(a);
        } else {
          setSoluong(0);
        }
      } catch (error) {
        enqueueSnackbar(error.message, {
          variant: 'error',
          autoHideDuration: 2000,
        });
      }
      const a = document.querySelector('.boxSearch');
      a.style = 'display: none';
    })();
  }, [numerProduct, dispatch]);

  const search = async (data) => {
    const dataSearch = await filterAPI.search(data.search);
    setSearchData(dataSearch);
    const a = document.querySelector('.boxSearch');
    a.style = 'display: block';
  };

  const startvoice = () => {
    var SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.start();
    enqueueSnackbar('Đang lắng nghe!', {
      variant: 'success',
      autoHideDuration: 2000,
    });
    recognition.onresult = async (event) => {
      enqueueSnackbar('Đã lắng nghe xong!', {
        variant: 'success',
        autoHideDuration: 2000,
      });
      const record = event.results[0][0].transcript;
      const dataRecord = record.replace('.', '');

      if (dataRecord !== '') {
        document.getElementById('search').value = dataRecord;
        const dataSearch = await filterAPI.search(dataRecord);
        setSearchData(dataSearch);
        const a = document.querySelector('.boxSearch');
        a.style = 'display: block';
      } else {
        enqueueSnackbar('Vui lòng thực hiện lại!', {
          variant: 'error',
          autoHideDuration: 2000,
        });
      }
    };
  };

  window.onclick = () => {
    const a = document.querySelector('.boxSearch');
    a.style = 'display: none';
  };
  const fillterBrand = async (id_th) => {
    const dataFilter = await filterAPI.sortBrand(id_th);
    dispatch(addListProduct(dataFilter));
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div
        className="text-[35px] font-[900] h-[100px] bg-text-color bg-clip-text w-[100%]  text-center "
        style={{ marginTop: '10px' }}
      >
        <img className="w-[70%] h-[100%] ml-9" src={logo} alt="logo" />
      </div>

      <List sx={{ mt: 2 }}>
        {band.map((item, index) => (
          <ListItem key={index} disablePadding>
            <div className="w-[100%]">
              <Link to="/shop/products">
                <ListItemButton
                  sx={{
                    '&.MuiListItemButton-root': {
                      borderBottom: '2px solid rgb(127, 127, 127)',
                      ml: 2,
                      mr: 2,
                      pb: '1px',
                    },
                  }}
                  onClick={() => fillterBrand(item.id_th)}
                >
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary={item.ten_th} />
                </ListItemButton>
              </Link>
            </div>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div
      style={{
        position: 'sticky',
        zIndex: '100',
        top: '0',
        background: '#FFFFFF',
      }}
    >
      <div className="flex justify-between items-center w-[80%] font-bold m-auto pt-5">
        <div className=" w-[10%] h-[10%]">
          <span className="text-[35px] font-[900] bg-text-color bg-clip-text">
            <Link to="/">
              <img className="w-[100%] h-[80%]" src={logo} alt="logo"></img>
            </Link>
          </span>
        </div>

        <div className="flex gap-8">
          <div>
            <Button
              sx={{ height: '100%' }}
              onClick={toggleDrawer('left', true)}
            >
              <FormatAlignLeftIcon sx={{ color: 'black' }} />
            </Button>
            <Drawer
              anchor={'left'}
              open={state['left']}
              onClose={toggleDrawer('left', false)}
            >
              {list('left')}
            </Drawer>
          </div>

          <Link to="/shop">
            <div className="btn from-center ">Trang chủ</div>
          </Link>
          <Link to="/shop/products">
            <div className="btn from-center ">Sản phẩm</div>
          </Link>
          <Link to="/shop/sale">
            <div className="btn from-center ">Giảm giá</div>
          </Link>

          {/* <div className="text-[20px] hover:opacity-80">
            <Link to="/shop/contact">Contact</Link>
          </div> */}
        </div>

        <div className="relative">
          <form onSubmit={handleSubmit((data) => search(data))}>
            <div className="relative flex flex-1">
              <input
                {...register('search')}
                id="search"
                name="search"
                className="w-full py-1 pl-4 pr-6 bg-gray-100 outline-none rounded-l-md"
                type="text"
                placeholder="Tìm kiếm sản phẩm"
              />
              <BsFillMicFill
                onClick={() => startvoice()}
                className="absolute right-[50px] top-2/4 -translate-y-2/4 cursor-pointer"
                size={20}
                color="#303030"
              />
              <button className="py-2 px-3 bg-blue-400 outline-none rounded-r-md ">
                <AiOutlineSearch size={20} color="#fff" />
              </button>
            </div>
          </form>
          {searchData.length > 0 ? (
            <div className="boxSearch absolute px-3 w-[500px] bg-slate-50 rounded-md z-50 -left-1/2 border shadow-md h-[420px] overflow-y-auto">
              {searchData?.map((data, idx) => (
                <CardItem key={idx} data={data} />
              ))}
            </div>
          ) : (
            <div className="boxSearch absolute p-4 w-[350px] bg-slate-50 rounded-md z-50 border shadow-md">
              <p> Không có sản phẩm bạn đang tìm</p>
            </div>
          )}
        </div>

        {!!!isLogin ? (
          <div className="flex items-center gap-6">
            <div className="hover:opacity-80 text-[18px]">
              <Link to="/shop/login">Đăng nhập</Link>
            </div>
            <div className="hover:opacity-80 py-3 px-5 text-[18px] text-white bg-slate-500 rounded-full duration-500 cursor-pointer">
              <Link to="/shop/register">Đăng kí</Link>
            </div>
          </div>
        ) : (
          <></>
        )}

        {isLogin === 1 ? (
          <div className="flex items-center gap-8">
            {/* <div className="relative cursor-pointer">
              <AiOutlineBell size={25} />
            </div> */}
            <div className="cursor-pointer">
              <Link to="/shop/cart">
                <Badge badgeContent={soluong} color="primary">
                  <FiShoppingCart size={25} />
                </Badge>
              </Link>
            </div>
            <div className="group relative cursor-pointer">
              <BiUserCircle size={28} />
              <div className="absolute z-10 w-[130px] -left-10 bg-slate-300 rounded-md hidden group-hover:block">
                <Link to="/shop/orders">
                  <p className=" hover:bg-slate-100 py-2 px-4 text-[16px] text-center rounded-t-md">
                    Đơn hàng
                  </p>
                </Link>
                <Link to="/shop/changePass">
                  <p className="hover:bg-slate-100 py-2 px-4 text-[16px] text-center">
                    Đổi mật khẩu
                  </p>
                </Link>
                <Link to="/shop/member">
                  <p className="hover:bg-slate-100 py-2 px-4 text-[16px] text-center">
                    Thành viên
                  </p>
                </Link>
                <p
                  onClick={logoutUser}
                  className="hover:bg-slate-100 py-2 px-4 text-[16px] text-center rounded-b-md"
                >
                  Đăng xuất
                </p>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Header;
