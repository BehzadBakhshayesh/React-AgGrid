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
    { field: "age",rowDrag:true, checkboxSelection :true},
    {field: "athlete"},
    {field: "bronze"},
    { field: "country"},
    {field: "date"},
    { field: "gold"},
    { field: "silver"},
    { field: "sport"},
    { field: "total"},
    { field: "year"},
  ];

  const defaultColDef = {
    sortable:true ,
    
  };

  useEffect(() => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

  return (
    <div className="ag-theme-alpine" style={{ width: "100%", height: "500px" }}>
      <button onClick={()=>{
        gridRef?.current?.api?.setSuppressRowDrag(true)
      }}>Suppress Row Drag</button>
      <AgGridReact
        ref={gridRef}
        columnDefs={columnDefs}
        rowData={rowData}
        defaultColDef={defaultColDef}
        multiSortKey={"ctrl"}
        rowDragManaged={true}
        animateRows={true}
        // pinnedTopRowData={[rowData[12]]}
        onSelectionChanged={(e)=>{
          const selectedRow = gridRef?.current?.api?.getSelectedRows()
          gridRef?.current?.api?.setPinnedTopRowData(selectedRow)
        }}
        rowSelection="multiple"
        // rowHeight={20}
        getRowHeight={(params)=>{
          console.log("params",params?.node?.id );
          if(params?.node?.id <20){
          return 20}
          return 45
        }}
      />
    </div>
  );
};

export default App;
