import React, {useEffect, useState} from "react";
import moment from "moment";
import {Rating} from "@mui/material";
import imageReviewAPI from "../../../api/imageReviewAPI";

function ReviewsProduct({data}) {
  const [imageReview, setImagereview] = useState([]);

  useEffect(() => {
    (async () => {
      const resImageReview = await imageReviewAPI.getImage(data.id_dg);
 
      setImagereview(resImageReview);
    })();
  }, []);

  return (
    <div className="mt-4 py-2 px-4 bg-slate-50 rounded-lg border">
      <div className="flex justify-between">
        <p className="text-slate-500">
          <i>{moment(data.ngay_dg).format("DD-MM-YYYY")}</i>
        </p>
        <Rating name="my-2 simple-controlled" size="large" value={data.so_sao} readOnly />
      </div>
      <div className="flex gap-5 my-2">
        {imageReview?.map(({hinh_anh_dg}, idx) => (
          <div key={idx}>
            <img
              className="w-[100px] h-[100px] rounded-lg"
              src={hinh_anh_dg.slice(12, hinh_anh_dg.length)}
              alt="hinh anh san pham"
            />
          </div>
        ))}
      </div>
      <p className="my-2 text-slate-700">
        Đánh giá: <span>{data.noi_dung_dg}</span>
      </p>
    </div>
  );
}

export default ReviewsProduct;
