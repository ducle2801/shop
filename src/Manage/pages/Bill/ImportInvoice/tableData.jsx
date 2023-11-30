import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useSelector } from "react-redux";

const columns = [
  { id: "idsp", label: "Tên Sản Phẩm", minWidth: 170, align: "center" },
  { id: "mausac", label: "Thương Hiệu", minWidth: 100, align: "center" },
  {
    id: "kichthuoc",
    label: "Loại Thương Hiệu",
    minWidth: 100,
    align: "center",
  },
  {
    id: "gianhap",
    label: "Giá Nhập",
    minWidth: 100,
    align: "center",
  },
  {
    id: "soluong",
    label: "Số Lượng",
    minWidth: 100,
    align: "center",
  },

];

export default function TableData({ rows, datashoe, deletetrow }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // const color = useSelector((state) => state?.color?.colorlist);
  // const size = useSelector((state) => state?.size?.sizelist);
  const brandlist = useSelector((state) => state?.brand?.brandlist);
  const typeProductlist = useSelector((state) => state?.typeProduct?.typeProductlist);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const deleteRow = (id) => {
    deletetrow(id);
  };
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      {/* <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, idx) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={idx}>
                      {columns.map((column) => {
                    
                        const value = row[column.id];
                      
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer> */}

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {columns.map((item, index) => {
                return (
                  <TableCell key={index} sx={{ textAlign: "center" }}>
                    {item.label}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ textAlign: "center" }}
                  >
                    {
                      datashoe.filter((item) => item.id_sp === row.idsp)[0]
                        .ten_sp
                    }
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ textAlign: "center" }}
                  >
                    {
                      brandlist.filter((item) => item.id_th === row.mausac)[0]
                        .ten_th
                    }
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ textAlign: "center" }}
                  >
                    {
                      typeProductlist.filter((item) => item.id_lsp === row.kichthuoc)[0]
                        .ten_lsp
                    }
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ textAlign: "center" }}
                  >
                    {row.gianhap}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ textAlign: "center" }}
                  >
                    {row.soluong}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ textAlign: "center" ,cursor:"pointer" ,":hover":{color:"red"}}}
                    onClick={() => deleteRow(index)}
                  >
                    x
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
