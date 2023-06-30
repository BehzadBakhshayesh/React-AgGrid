import React, { useEffect, useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/dist/styles/ag-theme-alpine.css"; // Optional theme CSS
import "./App.scss";

const App = () => {
  const [rowData, setRowData] = useState([]);
  const gridRef = useRef();
  console.log("gridRef",gridRef);
  const columnDefs = [
    {
      field: "age",
      icons:{
        menu:'<i>menu</i>',
        sortAscending:'<i>sort</i>',
      },
      //  cellStyle:{
      //   background:"rgba(56,155,42,0.4)"
      // },
      // cellStyle:(params) =>{
      //   if(params?.node?.id <5) {
      //     return {
      //       background:"rgba(56,155,42,0.4)"
      //     }
      //   }
      // },
      // cellClass: "ag-red",
    },
    { field: "athlete", 
    // cellClass: ["ag-red", "test"] 
  },
    {
      field: "bronze",
      // cellClass: (params) => {
      //   if (params.data.age < 25) {
      //     return "ag-red";
      //   }
      // },
    },
    { 
      field: "country", 
      // cellClassRules:{
      //   "ag-red":(params)=>{ return params.node.id < 6},
      //   "ag-green":(params)=>{ return params.node.id > 7},
      // }
   },
    {
       field: "date",
      
      
    },
    { field: "gold" },
    { field: "silver" },
    { field: "sport" },
    { field: "total" },
    { 
      field: "year", 
      
  },
  ];
  const defaultColDef = {
    sortable: true 

  };

  useEffect(() => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

  return (
    <div className="ag-theme-custom-react" style={{ width: "100%", height: "500px" }}>
      <AgGridReact
        ref={gridRef}
        columnDefs={columnDefs}
        rowData={rowData}
        defaultColDef={defaultColDef}
        // rowStyle={{
        //   background:"rgba(56,155,42,0.4)",
        //   border:"1px solid blue",
        //   borderRadius:"20px"
        // }}
        // getRowStyle={(params)=>{
        //       if(params?.node?.id < 5){
        //         return {
        //           background:"#fff",
        //         }
        //       }
        // }}
        // rowClass="ag-green"
        // getRowClass={(params)=>{
        //   if(params?.node?.id <2){
        //     return "ag-green"
        //   }else if(params?.node?.id>=2 && params?.node?.id<4){
        //     return "ag-with"
        //   }else{
        //     return "ag-red"
        //   }
        // }}
        // rowClassRules={{
        //   "ag-green": (params) => {
        //     return params?.node?.id < 3;
        //   },
        //   "ag-red": (params) => {
        //     return params?.node?.id >6;
        //   },
        // }}
        // domLayout="autoHeight"
      />
    </div>
  );
};

export default App;
