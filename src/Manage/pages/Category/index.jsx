import React from "react";
import {Routes, Route} from "react-router-dom";
import Brand from "./Brand";
import Color from "./Color";
import Size from "./Size";
import TypeProduct from "./TypeProduct";

function Category() {
  return (
    <div>
      <Routes>
        {/* <Route path="/size" element={<Size />} /> */}
        {/* <Route path="/color" element={<Color />} /> */}
        <Route path="/brand" element={<Brand />} />
        <Route path="/type_product" element={<TypeProduct />} />
      </Routes>
    </div>
  );
}

export default Category;
