import React from "react";
import {Route, Routes} from "react-router-dom";
import ExportInvoice from "./ExportInvoice";
import ImportInvoice from "./ImportInvoice";

function Bill() {
  return (
    <div>
      <Routes>
        <Route path="/import_invoice" element={<ImportInvoice />} />
        <Route path="/export_invoice" element={<ExportInvoice />} />
      </Routes>
    </div>
  );
}

export default Bill;
