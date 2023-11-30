import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {useSelector} from "react-redux";
import {useSnackbar} from "notistack";
import CardOrder from "../../components/CardOrder";

import exportInvoiceAPI from "../../../api/exportInvoiceAPI";
import detailExportInvoiceAPI from "../../../api/detailExportInvoiceAPI";

function Orders() {
  const {enqueueSnackbar} = useSnackbar();

  const id_kh = useSelector((state) => state?.user?.current.dataUser[0]?.id_kh);

  const [value, setValue] = useState("1");
  const [allOrder, setAllOrder] = useState([]);
  const [waitOrser, setWaitOrder] = useState([]);
  const [waitDeliverOrser, setwaitDeliverOrser] = useState([]);
  const [deliverOrser, setDeliverOrser] = useState([]);
  const [successOrser, setSuccessOrser] = useState([]);
  const [cancelOrder, setCancelOrder] = useState([]);
  const [refundOrder, setRefundOrder] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    (async () => {
      try {
        const allOrder = await exportInvoiceAPI.getListExportInvoice(id_kh);
        for (let i = 0; i < allOrder.length; i++) {
          const data = await detailExportInvoiceAPI.getDetailExportInvoice(allOrder[i].id_hdx);
          setAllOrder((test) => [...test, {HDX: allOrder[i], CTHDX: data}]);
        }

        const waitOrder = await exportInvoiceAPI.getOrders(id_kh, {
          status: "Đang xử lý",
        });
        for (let i = 0; i < waitOrder.length; i++) {
          const data = await detailExportInvoiceAPI.getDetailExportInvoice(waitOrder[i].id_hdx);
          setWaitOrder((test) => [...test, {HDX: waitOrder[i], CTHDX: data}]);
        }

        const waitShipOrder = await exportInvoiceAPI.getOrders(id_kh, {
          status: "Đã xác nhận",
        });
        for (let i = 0; i < waitShipOrder.length; i++) {
          const data = await detailExportInvoiceAPI.getDetailExportInvoice(waitShipOrder[i].id_hdx);
          setwaitDeliverOrser((test) => [...test, {HDX: waitShipOrder[i], CTHDX: data}]);
        }

        const deliverOrder = await exportInvoiceAPI.getOrders(id_kh, {
          status: "Đang giao hàng",
        });
        for (let i = 0; i < deliverOrder.length; i++) {
          const data = await detailExportInvoiceAPI.getDetailExportInvoice(deliverOrder[i].id_hdx);
          setDeliverOrser((test) => [...test, {HDX: deliverOrder[i], CTHDX: data}]);
        }
        const successOrder = await exportInvoiceAPI.getOrders(id_kh, {
          status: "Đã giao hàng",
        });
        for (let i = 0; i < successOrder.length; i++) {
          const data = await detailExportInvoiceAPI.getDetailExportInvoice(successOrder[i].id_hdx);
          setSuccessOrser((test) => [...test, {HDX: successOrder[i], CTHDX: data}]);
        }

        const cancelOrder = await exportInvoiceAPI.getOrders(id_kh, {
          status: "Hủy",
        });
        for (let i = 0; i < cancelOrder.length; i++) {
          const data = await detailExportInvoiceAPI.getDetailExportInvoice(cancelOrder[i].id_hdx);
          setCancelOrder((test) => [...test, {HDX: cancelOrder[i], CTHDX: data}]);
        }

        const refundOrder = await exportInvoiceAPI.getOrders(id_kh, {
          status: "Hoàn hàng",
        });
        for (let i = 0; i < refundOrder.length; i++) {
          const data = await detailExportInvoiceAPI.getDetailExportInvoice(refundOrder[i].id_hdx);
          setRefundOrder((test) => [...test, {HDX: refundOrder[i], CTHDX: data}]);
        }
      } catch (error) {
        enqueueSnackbar(error.message, {
          variant: "error",
          autoHideDuration: 2000,
        });
      }
    })();
  }, [id_kh]);

  return (
    <div className="mt-6">
      <Box sx={{width: "55%", margin: "auto", typography: "body1"}}>
        <TabContext value={value}>
          <Box sx={{borderBottom: 1, borderColor: "divider"}}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label={`Tất cả (${allOrder.length})`} value="1" />
              <Tab label={`Đang xử lý (${waitOrser.length})`} value="2" />
              <Tab label={`Chờ giao hàng (${waitDeliverOrser.length})`} value="3" />
              <Tab label={`Đang giao hàng (${deliverOrser.length})`} value="4" />
              <Tab label={`Đã giao (${successOrser.length})`} value="5" />
              <Tab label={`Đơn hủy (${cancelOrder.length + refundOrder.length})`} value="6" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <CardOrder data={allOrder} />
          </TabPanel>
          <TabPanel value="2">
            <CardOrder data={waitOrser} />
          </TabPanel>
          <TabPanel value="3">
            <CardOrder data={waitDeliverOrser} />
          </TabPanel>
          <TabPanel value="4">
            <CardOrder data={deliverOrser} />
          </TabPanel>
          <TabPanel value="5">
            <CardOrder data={successOrser} />
          </TabPanel>
          <TabPanel value="6">
            <CardOrder data={refundOrder} />
            <CardOrder data={cancelOrder} />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}

export default Orders;
