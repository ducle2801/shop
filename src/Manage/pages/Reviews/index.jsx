import React, { useEffect, useState } from "react";
import reviewAPI from "../../../api/reviewsAPI";
import Rating from "@mui/material/Rating";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import moment from "moment";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function Reviews() {
  const [reviewList, setReviewList] = useState([]);
  const [count, setCount] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [idDg, setidDg] = useState();
  useEffect(() => {
    (async () => {
      const reviewList = await reviewAPI.getListReview();
      setReviewList(reviewList);
    })();
  }, [count]);
  const getIddh = async(iddg) => {
    await setidDg(iddg);
   
  };

  const deleteReview = async () => {
    await reviewAPI.deleteReview(idDg);
    setCount((e) => e + 1);
    Close();
  };

  const updateStatus = async (iddg, status) => {
    await reviewAPI.updateStatus(iddg, status);
    setCount((e) => e + 1);
  };
  const Open = () => {
    setOpenModal(true);
  };
  const Close = () => {
    setOpenModal(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={openModal}
        onClose={Open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Thông báo</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc xóa không!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={Close}>Hủy</Button>
          <Button onClick={deleteReview}>
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
      <div className="grid grid-cols-4 gap-5 mx-4">
        {reviewList?.map(
          (
            { id_dg, ten_sp, so_sao, ngay_dg, noi_dung_dg, trang_thai_dg },
            idx
          ) => (
            <div key={idx} className="px-3 py-3 bg-slate-100 rounded-lg ">
              <p>Ngày đánh giá: {moment(ngay_dg).format("DD-MM-YYYY")}</p>
              <Rating name="read-only" value={so_sao} readOnly />
              <p>Tên sản phẩm: {ten_sp}</p>
              <p>
                Nội dung: <span className="font-medium">{noi_dung_dg}</span>
              </p>
              {trang_thai_dg === 0 ? (
                <button
                  onClick={() => updateStatus(id_dg, 1)}
                  className="block ml-auto mr-0"
                >
                  <AiFillEye size={25} />
                </button>
              ) : (
                <button
                  onClick={() => updateStatus(id_dg, 0)}
                  className="block ml-auto mr-0"
                >
                  <AiFillEyeInvisible size={25} />
                </button>
              )}
              <br></br>
              <button
                onClick={() => {
                  getIddh(id_dg);
                  Open();
                }}
                className="block ml-auto mr-0"
              >
                <BsTrash size={25} />
              </button>
            </div>
          )
        )}
      </div>
    </React.Fragment>
  );
}

export default Reviews;
