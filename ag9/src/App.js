import React, { useEffect, useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/dist/styles/ag-theme-alpine.css"; // Optional theme CSS
import "./App.scss";

const App = () => {
  const [rowData, setRowData] = useState([]);
  const gridRef = useRef();
  // console.log("context",gridRef?.current?.api?.gridOptionsWrapper?.gridOptions?.context);
  console.log("context",gridRef?.current?.api?.gridOptionsWrapper.gridOptions);
  const columnDefs = [
    {
      field: "age",
      // checkboxSelection:true,
      // headerCheckboxSelection: true,
      filter:true,
    },
    { field: "athlete",},
    {
      field: "bronze",
    },
    {
      field: "country",
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

  const checboxPosiotion = (params) => {
    const AllDisplayedColumns = params?.columnApi?.getAllDisplayedColumns();
    return AllDisplayedColumns[0] === params.column;
  };
  const defaultColDef = {
    checkboxSelection: checboxPosiotion,
    headerCheckboxSelection: checboxPosiotion,
  };

  useEffect(() => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

  return (
    <div className="ag-theme-alpine" style={{ width: "100%", height: "500px" }}>
      <button
        onClick={() => {
          gridRef?.current?.api?.selectAll();
        }}
      >
        Select All
      </button>
      <button
        onClick={() => {
          gridRef?.current?.api?.deselectAll();
        }}
      >
        deselect All
      </button>
      <button
        onClick={() => {
          gridRef?.current?.api?.selectAllFiltered();
        }}
      >
        Select All Filtered
      </button>
      <button
        onClick={() => {
          gridRef?.current?.api?.deselectAllFiltered();
        }}
      >
        deselect All Filtered
      </button>
      <button
        onClick={() => {
          gridRef.current.api.forEachNode((node)=> {
            node.setSelected(node.data.age === 27);
          })
        }}
      >
        select age 27
      </button>
      <button onClick={()=>{
           gridRef.current.api.clearRangeSelection();
      }}>clear range</button>
       <button onClick={()=>{
           gridRef.current.api.addCellRange({
            rowStartIndex: 3,
            rowEndIndex: 6,
            columnStart: 'age',
            columnEnd: 'athlete',
          })
        
      }}>add range</button>
      <AgGridReact
        ref={gridRef}
        columnDefs={columnDefs}
        rowData={rowData}
        defaultColDef={defaultColDef}
        rowSelection="multiple"
        rowMultiSelectWithClick={true}
        suppressRowClickSelection={true}
        onRowSelected={(event) => {
          console.log("RowSelected", event);
        }}
        onSelectionChanged={(event) => {
          console.log("SelectionChanged", event);
        }}
        enableRangeSelection={true}
        // suppressMultiRangeSelection={true}
        onRangeSelectionChanged={(e)=>{
          // console.log("e :",e);
          console.log("cellRanges :",e?.api?.getCellRanges());
        }}
        enableRangeHandle={true}
        enableFillHandle={true}
        context={{behzad:"behzad"}}
      />
    </div>
  );
};

export default App;
