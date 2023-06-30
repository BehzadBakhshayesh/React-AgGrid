import React, { useEffect, useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/dist/styles/ag-theme-alpine.css"; // Optional theme CSS
import "./App.css";

const App = () => {
  const gridRef = useRef();
  const columnDefs = [
    {
      headerName: "A",
      field: "a",
      colSpan: (params) => {
        if (params?.data?.a === "hello world") {
          return 4;
        }
        if (params?.data?.a === "g1") {
          return 2;
        }
        return 1;
      },
    },
    { headerName: "B", field: "b" },
    {
      headerName: "C",
      field: "c",
      colSpan: (params) => {
        if (params?.data?.c === "g2") {
          return 2;
        }
        return 1;
      },
    },
    { headerName: "D", field: "d" },
  ];
  const rowData = [
    { a: "hello world" },
    { a: "g1", c: "g2" },
    { a: "a", b: "b", c: "c", d: "d" },
    { a: "a", b: "b", c: "c", d: "d" },
  ];

  return (
    <div className="ag-theme-alpine" style={{ width: "100%", height: "500px" }}>
      <button onClick={() => {}}></button>
      <AgGridReact ref={gridRef} columnDefs={columnDefs} rowData={rowData} />
    </div>
  );
};

export default App;
