import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {Line} from "react-chartjs-2";
import moment from "moment";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function CardManage({capital, sales, numberproduct, filter}) {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = async(data) => {

  }

  const date = (day) => {
    return moment().add(day, "days").format("DD-MM-YYYY");
  };
  const date_vn = (day) => {
    return moment().add(day, "days").format("DD-MM-YYYY");
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "THỐNG KÊ",
      },
    },
  };

  const setdata = (day) => {
    if (filter) {
      const data = filter.filter((x) => moment(x.ngay_gh).format("DD-MM-YYYY") === date(day));
      return data[0]?.tong_tien;
    }
  };

  const labels = [date_vn(-6), date_vn(-5), date_vn(-4), date_vn(-3), date_vn(-2), date_vn(-1), date_vn(0)];
  const data_chart_line = [setdata(-6), setdata(-5), setdata(-4), setdata(-3), setdata(-2), setdata(-1), setdata(0)];

  const data = {
    labels,
    datasets: [
      {
        label: "Doanh thu",
        data: data_chart_line,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className="mt-4 my-5">
      <div className="w-[95%] mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input name="dateStart" {...register("dateStart")} className="px-4 py-2 border rounded-lg" type="date" />
          <input name="dateEnd" {...register("dateEnd")} className="px-4 py-2 border rounded-lg" type="date" />
          <button className="px-4 py-2 rounded-lg bg-green-700 text-white">Xem</button>
        </form>
      </div>

      <div className="flex gap-8 justify-between w-[95%] mx-auto mt-3">
        <div className="relative flex-1 h-[140px] p-4 text-[20px] bg-slate-100 rounded-md shadow-md">
          <p className="font-medium">Chi phí</p>
          <p className="absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 text-[26px] text-red-600 font-bold">
            {new Intl.NumberFormat("vi-VN", {style: "currency", currency: "VND"}).format(capital)}
          </p>
        </div>
        <div className="relative flex-1 h-[140px] p-4 text-[20px] bg-slate-100 rounded-md shadow-md">
          <p className="font-medium">Doanh thu</p>
          <p className="absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 text-[26px] text-red-600 font-bold">
            {sales !== null ? (
              <>{new Intl.NumberFormat("vi-VN", {style: "currency", currency: "VND"}).format(sales)}</>
            ) : (
              <>0</>
            )}
          </p>
        </div>
        <div className="relative flex-1 h-[140px] p-4 text-[20px] bg-slate-100 rounded-md shadow-md">
          <p className="font-medium">Lợi nhuận</p>
          <p className="absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 text-[26px] text-red-600 font-bold">
            {sales !== null ? (
              <> {new Intl.NumberFormat("vi-VN", {style: "currency", currency: "VND"}).format(sales - capital)}</>
            ) : (
              <> {new Intl.NumberFormat("vi-VN", {style: "currency", currency: "VND"}).format(0 - capital)}</>
            )}
          </p>
        </div>
        <div className="relative flex-1 h-[140px] p-4 text-[20px] bg-slate-100 rounded-md shadow-md">
          <p className="font-medium">Đã bán</p>
          <p className="absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 text-[26px] text-red-600 font-bold">
            {numberproduct}
          </p>
        </div>
      </div>
      <div className="flex gap-8 w-[95%] mx-auto mt-8">
        <div className="p-4 w-[60%] bg-slate-100 rounded-md shadow-md">
          <Line options={options} data={data} />
        </div>
        <div className="w-[40%] h-[400px] bg-slate-100 rounded-md shadow-md"></div>
      </div>
    </div>
  );
}

export default CardManage;
