import React, { useEffect, useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/dist/styles/ag-theme-alpine.css"; // Optional theme CSS
import "./App.css";

const App = () => {
  const [rowData, setRowData] = useState([]);
  // const [gridReady, setGridReady] = useState({});
  const gridRef = useRef();
  const columnDefs = [
    {
      headerName: "Make",
      field: "make",
      // checkboxSelection: true,
    },
    {
      headerName: "Model",
      field: "model",
      headerComponent : (e)=> {
          console.log("headerComponent", e);
          return <button onClick={()=> alert("hello rtpro")}>{e.displayName}</button>
      }
    },
    {
      headerName: "Price",
      field: "price",
      cellRendererParams :{
        behzad:123
      },
      cellRenderer: (param) => {
        console.log("param",param);
        return (
          <>
            <span>{param?.value}</span>
            <button>push me</button>
          </>
        );
      },
    },
  ];
  const defaultColDef = {
    sortable: true,
    filter: "agMultiColumnFilter",
    // floatingFilter:true,
    // filter:strue,
    // filterParams:{
    //   debounceMs:500,
    //   buttons:['apply','clear']
    // },
    enableRowGroup: true,
  };
  useEffect(() => {
    fetch("https://www.ag-grid.com/example-assets/row-data.json")
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData));
  }, []);

  return (
    <div
      className="ag-theme-alpine"
      style={{ width: "602px", height: "80vh" }}
    >
      <button
        onClick={() => {
          console.log("gridRef", gridRef?.current?.api?.deselectAll());
        }}
      >
        PUSH ME
      </button>
      <AgGridReact
      noRowsOverlayComponent={(paramssssss)=>{ 
        console.log("paramssssss", paramssssss);
        return "xxxxxxxxxxxxxxxxxxxxxxxxxx"}}
        ref={gridRef}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowData={rowData}
        rowSelection="multiple"
        animateRows={true}
        onCellClicked={(e) => {
          console.log("e", e);
        }}
        rowGroupPanelShow="always"
        popupParent={document.body}
        sideBar={true}
      />
    </div>
  );
};

export default App;
