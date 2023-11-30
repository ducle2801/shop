import React, { useState, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';
import sha256 from 'js-sha256';
import { ErrorMessage } from '@hookform/error-message';
import employeeAPI from '../../../api/employeeAPI';
import positionAPI from '../../../api/positionAPI';

const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: '#fff',
  borderRadius: 2,
  boxShadow: 5,
  p: 2,
};

const defaultValues = {
  tennv: '',
  emailnv: '',
  matkhaunv: '',
  sdtnv: '',
  ngaysinhnv: '',
  gioitinhnv: '',
  diachinv: '',
  chucvunv: '',
};

function Staff() {
  const [count, setCount] = useState(0);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [idEmployee, setIdEmployee] = useState('');
  const [listEmployee, setListEmployee] = useState([]);
  const [position, setPosition] = useState([]);

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const { register, handleSubmit } = useForm({ defaultValues });
  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    formState: { errors },
    reset: resetEdit,
  } = useForm();
  const enqueueSnackbar = useSnackbar();

  useEffect(() => {
    (async () => {
      try {
        const resListEmployee = await employeeAPI.getListEmployee();
        const resPosition = await positionAPI.getListPosition();
        setPosition(resPosition);
        setListEmployee(resListEmployee);
      } catch (error) {
        enqueueSnackbar(error.message, {
          variant: 'error',
          autoHideDuration: 2000,
        });
      }
    })(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  const viewStaff = (idnv) => {};

  const editStaff = async (idnv) => {
    try {
      const resEmployee = await employeeAPI.getEmployee(idnv);
      resetEdit({
        tennv: resEmployee[0]?.ten_nv,
        emailnv: resEmployee[0]?.email_nv,
        matkhaunv: '',
        sdtnv: resEmployee[0]?.sdt_nv,
        ngaysinhnv: moment(resEmployee[0]?.ngay_sinh_nv).format('yyyy-MM-DD'),
        gioitinhnv: resEmployee[0]?.gioi_tinh_nv,
        diachinv: resEmployee[0]?.dia_chi_nv,
        chucvunv: resEmployee[0]?.id_cv,
      });
      setIdEmployee(idnv);
      handleOpenEdit();
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error',
        autoHideDuration: 2000,
      });
    }
  };

  const deleteStaff = async (idnv) => {
    try {
      await employeeAPI.deleteEmployee(idnv);
      setCount((e) => e + 1);
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error',
        autoHideDuration: 2000,
      });
    }
  };

  const columns = [
    {
      field: 'id_nv',
      headerName: 'ID',
      width: 70,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'ten_nv',
      headerName: 'Tên Nhân Viên',
      width: 180,
      headerAlign: 'center',
    },
    {
      field: 'email_nv',
      headerName: 'Email',
      width: 250,
      headerAlign: 'center',
    },
    {
      field: 'sdt_nv',
      headerName: 'Số Điện Thoại',
      width: 130,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'ngay_sinh_nv',
      headerName: 'Ngày Sinh',
      width: 130,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'ten_cv',
      headerName: 'Chức Vụ',
      headerAlign: 'center',
      align: 'center',
      width: 165,
    },
    {
      field: 'hanh_dong',
      headerName: 'Hành Động',
      headerAlign: 'center',
      width: 250,
      renderCell: (params) => (
        <div className="flex justify-between w-full">
          {/* <div>
            <button
              onClick={() => viewStaff(params.row.id_nv)}
              className="py-2 px-4 text-white font-bold bg-[#00CED1] rounded-lg shadow-lg"
            >
              Xem
            </button>
          </div> */}
          <div>
            <button
              onClick={() => editStaff(params.row.id_nv)}
              className="py-2 px-4 text-white font-bold bg-[#008000] rounded-lg shadow-lg"
            >
              Sửa
            </button>
          </div>
          <div>
            <button
              onClick={() => deleteStaff(params.row.id_nv)}
              className="py-2 px-4 text-white font-bold bg-[#FF0000] rounded-lg shadow-lg"
            >
              Xóa
            </button>
          </div>
        </div>
      ),
    },
  ];

  const rows = listEmployee?.map(
    ({ id_nv, ten_nv, email_nv, sdt_nv, ngay_sinh_nv, ten_cv }, idx) => ({
      id: idx,
      id_nv: id_nv,
      ten_nv: ten_nv,
      email_nv: email_nv,
      sdt_nv: sdt_nv,
      ngay_sinh_nv: moment(ngay_sinh_nv).format('DD-MM-YYYY'),
      ten_cv: ten_cv,
    })
  );

  const dataAdd = (data) => {
    return {
      tennv: data.tennv,
      emailnv: data.emailnv,
      matkhaunv: sha256(data.matkhaunv),
      sdtnv: data.sdtnv,
      ngaysinhnv: data.ngaysinhnv,
      gioitinhnv: data.gioitinhnv,
      diachinv: data.diachinv,
      chucvunv: data.chucvunv,
    };
  };

  const dataEdit = (data) => {
    if (data.matkhaunv.trim() !== '') {
      return {
        tennv: data.tennv,
        emailnv: data.emailnv,
        matkhaunv: sha256(data.matkhaunv),
        sdtnv: data.sdtnv,
        ngaysinhnv: data.ngaysinhnv,
        gioitinhnv: data.gioitinhnv,
        diachinv: data.diachinv,
        chucvunv: data.chucvunv,
      };
    } else {
      enqueueSnackbar('Vui lòng nhập mật khẩu', {
        variant: 'error',
        autoHideDuration: 2000,
      });
    }
  };

  const setDataAdd = async (data) => {
    try {
      await employeeAPI.register(dataAdd(data));
      handleCloseAdd();
      setCount((e) => e + 1);
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error',
        autoHideDuration: 2000,
      });
    }
  };

  const setDataEdit = async (data) => {
    await employeeAPI.updateEmployee(idEmployee, dataEdit(data));
    setCount((e) => e + 1);
    handleCloseEdit();
    try {
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error',
        autoHideDuration: 2000,
      });
    }
  };

  return (
    <div className="px-4">
      <div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 text-white bg-lime-600 rounded-lg shadow-lg"
        >
          Thêm nhân viên
        </button>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openAdd}
          onClose={handleCloseAdd}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openAdd}>
            <Box sx={style}>
              <p className="my-4 text-center text-[25px] font-bold">
                Thêm nhân viên
              </p>
              <form onSubmit={handleSubmit((data) => setDataAdd(data))}>
                <div className="flex justify-center gap-10">
                  <div className="w-[45%]">
                    <div className="mb-2">
                      <p>Tên nhân viên</p>
                      <input
                        name="tennv"
                        className="mt-1 py-1 px-2 w-full px2 border-2 border-slate-500 rounded-lg"
                        type="text"
                        {...register('tennv', { required: true })}
                      />
                    </div>
                    <div className="mb-2">
                      <p>Email</p>
                      <input
                        name="emailnv"
                        className="mt-1 py-1 px-2 w-full px2 border-2 border-slate-500 rounded-lg"
                        type="text"
                        {...register('emailnv', { required: true })}
                      />
                    </div>
                    <div className="mb-2">
                      <p>Mật khẩu</p>
                      <input
                        name="matkhaunv"
                        className="mt-1 py-1 px-2 w-full px2 border-2 border-slate-500 rounded-lg"
                        type="text"
                        {...register('matkhaunv', { required: true })}
                      />
                    </div>
                    <div className="mb-2">
                      <p>Số điện thoại</p>
                      <input
                        name="sdtnv"
                        className="mt-1 py-1 px-2 w-full px2 border-2 border-slate-500 rounded-lg"
                        type="text"
                        {...register('sdtnv', { required: true })}
                      />
                    </div>
                  </div>
                  <div className="w-[45%]">
                    <div className="mb-2">
                      <p>Ngày sinh</p>
                      <input
                        name="ngaysinhnv"
                        className="mt-1 py-1 px-2 w-full px2 border-2 border-slate-500 rounded-lg"
                        type="date"
                        {...register('ngaysinhnv', { required: true })}
                      />
                    </div>
                    <div className="mb-2">
                      <p>Giới tính</p>
                      <select
                        name="gioitinhnv"
                        className="mt-1 py-1 px-2 w-full px2 border-2 border-slate-500 rounded-lg"
                        type="text"
                        {...register('gioitinhnv', { required: true })}
                      >
                        <option value="Nam">Nam</option>
                        <option value="Nu">Nữ</option>
                        <option value="Khac">khác</option>
                      </select>
                    </div>
                    <div className="mb-2">
                      <p>Địa chỉ</p>
                      <input
                        name="diachinv"
                        className="mt-1 py-1 px-2 w-full px2 border-2 border-slate-500 rounded-lg"
                        type="text"
                        {...register('diachinv', { required: true })}
                      />
                    </div>
                    <div className="mb-2">
                      <p>Chức vụ</p>
                      <select
                        name="chucvunv"
                        className="mt-1 py-1 px-2 w-full px2 border-2 border-slate-500 rounded-lg"
                        type="text"
                        {...register('chucvunv', { required: true })}
                      >
                        {position?.map(({ id_cv, ten_cv }, idx) => (
                          <option key={idx} value={id_cv}>
                            {ten_cv}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <button className="mt-4 py-2 px-4 float-right text-white font-bold bg-green-500 rounded-lg">
                  Thêm
                </button>
              </form>
            </Box>
          </Fade>
        </Modal>
      </div>

      <div className="mt-5">
        <div style={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={8}
            rowsPerPageOptions={[8]}
          />
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openEdit}
            onClose={handleCloseEdit}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={openEdit}>
              <Box sx={style}>
                <p className="my-4 text-center text-[25px] font-bold">
                  Sửa nhân viên
                </p>
                <form onSubmit={handleSubmitEdit((data) => setDataEdit(data))}>
                  <div className="flex justify-center gap-10">
                    <div className="w-[45%]">
                      <div className="mb-2">
                        <p>Tên nhân viên</p>
                        <input
                          name="tennv"
                          className="mt-1 py-1 px-2 w-full px2 border-2 border-slate-500 rounded-lg"
                          type="text"
                          {...registerEdit('tennv', { required: true })}
                        />
                      </div>
                      <div className="mb-2">
                        <p>Email</p>
                        <input
                          name="emailnv"
                          className="mt-1 py-1 px-2 w-full px2 border-2 border-slate-500 rounded-lg"
                          type="text"
                          {...registerEdit('emailnv', { required: true })}
                        />
                      </div>
                      <div className="mb-2">
                        <p>Mật khẩu</p>
                        <input
                          name="matkhaunv"
                          className="mt-1 py-1 px-2 w-full px2 border-2 border-slate-500 rounded-lg"
                          type="text"
                          {...registerEdit('matkhaunv', {
                            required: true,
                          })}
                          rules={{
                            required: true,
                          }}
                        />
                        <ErrorMessage
                          errors={errors}
                          name="matkhaunv"
                          render={({ messages }) => (
                            <div className=" text-[14px] text-red-600">
                              Vui lòng nhập mật khẩu!{messages}
                            </div>
                          )}
                        />
                      </div>
                      <div className="mb-2">
                        <p>Số điện thoại</p>
                        <input
                          name="sdtnv"
                          className="mt-1 py-1 px-2 w-full px2 border-2 border-slate-500 rounded-lg"
                          type="text"
                          {...registerEdit('sdtnv', { required: true })}
                        />
                      </div>
                    </div>
                    <div className="w-[45%]">
                      <div className="mb-2">
                        <p>Ngày sinh</p>
                        <input
                          name="ngaysinhnv"
                          className="mt-1 py-1 px-2 w-full px2 border-2 border-slate-500 rounded-lg"
                          type="date"
                          {...registerEdit('ngaysinhnv', { required: true })}
                        />
                      </div>
                      <div className="mb-2">
                        <p>Giới tính</p>
                        <select
                          name="gioitinhnv"
                          className="mt-1 py-1 px-2 w-full px2 border-2 border-slate-500 rounded-lg"
                          type="text"
                          {...registerEdit('gioitinhnv', { required: true })}
                        >
                          <option value="Nam">Nam</option>
                          <option value="Nu">Nữ</option>
                          <option value="Khac">khác</option>
                        </select>
                      </div>
                      <div className="mb-2">
                        <p>Địa chỉ</p>
                        <input
                          name="diachinv"
                          className="mt-1 py-1 px-2 w-full px2 border-2 border-slate-500 rounded-lg"
                          type="text"
                          {...registerEdit('diachinv', { required: true })}
                        />
                      </div>
                      <div className="mb-2">
                        <p>Chức vụ</p>
                        <select
                          name="chucvunv"
                          className="mt-1 py-1 px-2 w-full px2 border-2 border-slate-500 rounded-lg"
                          type="text"
                          {...registerEdit('chucvunv', { required: true })}
                        >
                          {position?.map(({ id_cv, ten_cv }, idx) => (
                            <option key={idx} value={id_cv}>
                              {ten_cv}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <button className="mt-4 py-2 px-4 float-right text-white font-bold bg-green-500 rounded-lg">
                    Sửa
                  </button>
                </form>
              </Box>
            </Fade>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Staff;
