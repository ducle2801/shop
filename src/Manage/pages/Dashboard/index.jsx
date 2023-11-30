import React, {useEffect, useState} from "react";
import importInvoiceAPI from "../../../api/importInvoiceAPI";
import exportInvoiceAPI from "../../../api/exportInvoiceAPI";
import detailExportInvoiceAPI from "../../../api/detailExportInvoiceAPI";
import {useForm} from "react-hook-form";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {Pie, Line} from "react-chartjs-2";
import moment from "moment";
import {useSnackbar} from "notistack";
import detailProductAPI from "../../../api/detailProductAPI";

ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Dashboard() {
  const [capital, setcapital] = useState("");
  const [sales, setSales] = useState("");
  const [productsInStock, setProductsInStock] = useState("");
  const [sumNumberProduct, setSumnumberProduct] = useState("");
  const [totalOrderReturn, setTotalOrderReturn] = useState("");

  const [turnover, setTurnover] = useState([]);
  const [dates, setDates] = useState();
  useEffect(() => {
    (async () => {
      var day = [];
      var datas = [];
      const totalCost = await importInvoiceAPI.sumPriceInvoices();
      const res_sales = await exportInvoiceAPI.sumPriceInvoices({});
      const res_numberProduct = await detailExportInvoiceAPI.sumNumberProduct({
        status: "Đã giao hàng",
      });

      const res_orderReturn = await detailExportInvoiceAPI.sumNumberProduct({
        status: "Hoàn hàng",
      });
      console.log(res_orderReturn);
      setTotalOrderReturn(res_orderReturn[0]?.tong_so_luong);
      
      const res_chart = await exportInvoiceAPI.getPriceExportInvoice({
        dateEnd: moment().format("YYYY-MM-DD"),
        dateStart: moment().add(-6, "days").format("YYYY-MM-DD"),
      });

      setSumnumberProduct(res_numberProduct[0]?.tong_so_luong);
      setSales(res_sales[0]?.tong_tien_hdx);
      setcapital(totalCost[0]?.tong_tien_hdn);

      if (res_chart.length > 0) {
        for (let i = 0; i < res_chart.length; i++) {
          day.push(`${moment(res_chart[i]?.ngay_gh).format("DD-MM-YYYY")}`);
          datas.push(`${res_chart[i]?.tong_tien}`);
        }
      }
      setDates(day);
      setTurnover(datas);

      const res_productsInStock = await detailProductAPI.getAllNumber();
      console.log(res_productsInStock);
      setProductsInStock(res_productsInStock[0]?.so_luong_sp);
    })();
  }, []);

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = async (data) => {
    var day = [];
    var datas = [];
    const res_chart = await exportInvoiceAPI.getPriceExportInvoice({
      dateEnd: data.dateEnd,
      dateStart: data.dateStart,
    });
    
    if (res_chart?.length > 0) {
      for (let i = 0; i < res_chart.length; i++) {
        day.push(`${moment(res_chart[i]?.ngay_gh).format("DD-MM-YYYY")}`);
        datas.push(`${res_chart[i]?.tong_tien}`);
      }
    }
    setDates(day);
    setTurnover(datas);


    const res_sales = await exportInvoiceAPI.sumPriceInvoices({
      dateEnd: data.dateEnd,
      dateStart: data.dateStart,
    });
    setSales(res_sales[0]?.tong_tien_hdx);

    const res_numberProduct = await detailExportInvoiceAPI.sumNumberProduct({
      dateEnd: data.dateEnd,
      dateStart: data.dateStart,
      status: "Đã giao hàng",
    });
    setSumnumberProduct(res_numberProduct[0]?.tong_so_luong);

    const res_orderReturn = await detailExportInvoiceAPI.sumNumberProduct({
      dateEnd: data.dateEnd,
      dateStart: data.dateStart,
      status: "Hoàn hàng",
    });
    setTotalOrderReturn(res_orderReturn[0]?.tong_so_luong);
  };
  // console.log(turnover)
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

  const labels = dates;

  const data_line = {
    labels,
    datasets: [
      {
        label: "Doanh thu",
        data: turnover,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const data_doughnut = {
    labels: ["Đơn thành công", "Đơn hoàn"],
    datasets: [
      {
        label: "Số lượng",
        data: [sumNumberProduct * 1, totalOrderReturn * 1],
        backgroundColor: ["rgb(54, 162, 235)", "rgb(255, 205, 86)"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="w-[95%] mx-auto">
      <div className="mt-4 my-5">
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              name="dateStart"
              {...register("dateStart")}
              className="mr-4 px-4 py-2 border rounded-lg"
              type="date"
            />
            <input name="dateEnd" {...register("dateEnd")} className="mr-4 px-4 py-2 border rounded-lg" type="date" />
            <button className="px-4 py-2 rounded-lg bg-green-700 text-white">Xem</button>
          </form>
        </div>

        <div className="flex gap-8 justify-between  mt-3">
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
            <p className="font-medium">Tồn kho</p>
            <p className="absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 text-[26px] text-red-600 font-bold">
              {productsInStock}
            </p>
          </div>
        </div>
        <div className="flex gap-8  mt-8">
          <div className="p-4 w-[60%] bg-slate-100 rounded-md shadow-md">
            <Line options={options} data={data_line} />
          </div>
          <div className="p-4 w-[40%] bg-slate-100 rounded-md shadow-md">
            <Pie className="mx-auto w-[80%]" options={options} data={data_doughnut} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
