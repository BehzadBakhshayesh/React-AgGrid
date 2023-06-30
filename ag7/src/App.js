import React, { useEffect, useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/dist/styles/ag-theme-alpine.css"; // Optional theme CSS
import "./App.css";

const App = () => {
  const [rowData, setRowData] = useState([]);
  const gridRef = useRef();
  const columnDefs = [
    { field: "age" ,
    rowSpan: params => params.data.age === 19 ? 2 : 1,
    cellClassRules:{
      'cell-style':"value === 19"
    }
  },
    {
      field: "athlete",
    },
    {
      field: "bronze",
    },
    { field: "country" },
    {
      field: "date",
    },
    { field: "gold" },
    { field: "silver" },
    { field: "sport" },
    { field: "total" },
    { field: "year" },
  ];
  const defaultColDef = {};

  useEffect(() => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

  return (
    <div className="ag-theme-alpine" style={{ width: "100%", height: "500px" }}>
      <AgGridReact
        ref={gridRef}
        columnDefs={columnDefs}
        rowData={rowData}
        defaultColDef={defaultColDef}
        suppressRowTransform={true}
        isFullWidthRow={(paramas)=>{
         
          return paramas?.rowNode?.data?.age === 17
        }}
        fullWidthCellRenderer={(paramas)=>{
          return(
            <div style={{width:'100%', alignItems:"center"}}>age:{paramas?.data?.age}</div>
          )
        }}
      />
    </div>
  );
};

export default App;
