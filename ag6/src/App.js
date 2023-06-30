import React, { useEffect, useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/dist/styles/ag-theme-alpine.css"; // Optional theme CSS
import "./App.css";

const App = () => {
  
  const gridRef = useRef();
  const columnDefs = [
    { field: "age"},
    {field: "athlete"},
    {field: "bronze"},
  ];

  const lognText ="In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available."
  const rowData = 
  [{
    age:"hello",
    athlete:lognText,
    bronze:"bronze",
  },
  {
    age:lognText,
    athlete:lognText,
    bronze:"hello",
  },
]

  const defaultColDef = {
    sortable:true ,
    autoHeight:true,
    cellClass :"cell-class"
    
  };


  return (
    <div className="ag-theme-alpine" style={{ width: "100%", height: "500px" }}>
      <AgGridReact
        ref={gridRef}
        columnDefs={columnDefs}
        rowData={rowData}
        defaultColDef={defaultColDef}
      />
    </div>
  );
};

export default App;
