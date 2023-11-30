import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import sha256 from 'js-sha256';
import FormLogin from '../../../Manage/components/FormLogin';
import { unwrapResult } from '@reduxjs/toolkit';

import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../redux/employeeSlice';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import employeeAPI from '../../../api/employeeAPI';
const defaultValues = {
  email: '',
  password: '',
};

function LoginManage() {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({ defaultValues });
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.employee?.current[0]);

  let navigate = useNavigate();
  useEffect(() => {
    const routeLogin = () => {
      if (isLogin?.id_cv === 'CV01') {
        navigate('/manage/dashboard', { replace: true });
      }
      if (isLogin?.id_cv === 'CV02') {
        navigate('/manage/bill/export_invoice', { replace: true });
      }
      if (isLogin?.id_cv === 'CV03') {
        navigate('/manage/bill/import_invoice', { replace: true });
      }
    };
    routeLogin(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin]);

  // const dataUser = (data) => {
  //   return {
  //     email: data.email,
  //     password: data.password,
  //   };
  // };
  const dataUser = (data) => {
    return {
      email: data.email,
      password: sha256(data.password),
    };
  };
  const setData = async (data) => {
    try {
      unwrapResult(dispatch(await login(dataUser(data))));
      const auth = await employeeAPI.login(dataUser(data));
      if (
        auth[0].id_cv === 'CV01' ||
        auth[0].id_cv === 'CV03' ||
        auth[0].id_cv === 'CV02'
      ) {
        enqueueSnackbar('Đăng nhập thành công', {
          variant: 'success',
          autoHideDuration: 2000,
        });
      } else {
        enqueueSnackbar('Tài khoản hoặc mật khẩu không đúng', {
          variant: 'error',
          autoHideDuration: 2000,
        });
      }
    } catch (error) {
      enqueueSnackbar('Tài khoản hoặc mật khẩu không đúng', {
        variant: 'error',
        autoHideDuration: 2000,
      });
    }
  };

  return (
    <div className="h-[83vh]">
      <div className="translate-x-[-50%] translate-y-[-50%] w-[400px] p-10 bg-[#F1F5F9] rounded-xl shadow-lg absolute top-[50%] left-[50%] ]">
        <p className="text-[35px] font-bold text-center">Đăng nhập quản lí</p>
        <form onSubmit={handleSubmit((data) => setData(data))}>
          <FormLogin control={control} errors={errors} />
          <button className="w-full opacity-80 text-white font-bold mt-8 py-2 bg-blue-400 rounded-xl hover:opacity-100 duration-300">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginManage;
