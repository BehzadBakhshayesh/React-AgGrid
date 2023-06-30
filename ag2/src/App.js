import React, { useEffect, useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/dist/styles/ag-theme-alpine.css"; // Optional theme CSS
import "./App.css";

const App = () => {
  const [rowData, setRowData] = useState([]);
  const [toggle, setToggle] = useState(false);
  const gridRef = useRef()
  console.log("gridRef",gridRef);
  const columnDefs = [
    {
      headerName: "group A",
      groupId:'A',
      marryChildren:true,
      children: [
        {
          headerName: "Make",
          field: "make",
          checkboxSelection: true,
          // lockPosition:true,
          // rowGroup:true,
        },
        {
          headerName: "Complete1",
          valueGetter: ({ data }) => {
            return `${data?.make}-${data?.model}-${data?.price}-${data?.make}-${data?.model}-${data?.price}`;
          },
          columnGroupShow: "closed",
        },
        {
          headerName: "Model",
          field: "model",
          columnGroupShow: "closed",
          // pinned:"left",
          // lockPinned:true,
          colId:'modelId'
        },
        {
          headerName: "Complete2",
          valueGetter: ({ data }) => {
            return `${data?.make}-${data?.model}-${data?.price}-${data?.make}-${data?.model}-${data?.price}`;
          },
        },
      ],
    },
    {
      headerName: "group B",
      groupId:'B',
      marryChildren:true,
      children: [
        {
          headerName: "Price",
          field: "price",
          headerTooltip: "some text",
          columnGroupShow: "closed",
          suppressMovable:true
        },
        {
          headerName: "Complete3",
          valueGetter: ({ data }) => {
            return `${data?.make}-${data?.model}-${data?.price}-${data?.make}-${data?.model}-${data?.price}`;
          },
        },
        {
          headerName: "Complete4",
          valueGetter: ({ data }) => {
            return `${data?.make}-${data?.model}-${data?.price}-${data?.make}-${data?.model}-${data?.price}`;
          },
        },
      ],
    },
  ];

  const defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    // flex: 1,
  };

  useEffect(() => {
    fetch("https://www.ag-grid.com/example-assets/row-data.json")
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData));
  }, []);

  return (
    <div className="ag-theme-alpine" style={{ width: "100%", height: "500px" }}>
      <button
      onClick={()=>{

        let groupIds= ["A","B"]
        groupIds.forEach(id =>{
          gridRef?.current?.columnApi?.setColumnGroupOpened(id, toggle)
        })

        setToggle(toggle => !toggle)

      }}
      >
        click to collaps and expand
      </button>
      <button
      onClick={()=>{
          gridRef?.current?.api?.deselectAll()
      }}
      >
        deselect rows
      </button>
      <button
      onClick={()=>{
          gridRef?.current?.columnApi?.setColumnPinned("modelId","left")
      }}
      >
        pin closed column
      </button>
      <button
      onClick={()=>{
          gridRef?.current?.columnApi?.setColumnPinned("modelId",null)
      }}
      >
        unpin closed column
      </button>
      <AgGridReact
        // headerHeight={60}
        ref={gridRef}
        columnDefs={columnDefs}
        rowData={rowData}
        rowSelection="multiple"
        animateRows={true}
        onGridReady={(params) => {
          // params?.api?.sizeColumnsToFit()
          params?.api?.setHeaderHeight(70);

          const allColumnIds = [];
          params.columnApi.getAllColumns().forEach((column) => {
            allColumnIds.push(column.getId());
          });
          params.columnApi.autoSizeColumns(allColumnIds, true);
        }}
        onFirstDataRendered={(params) => {
          // params?.api?.sizeColumnsToFit()

          const allColumnIds = [];
          params.columnApi.getAllColumns().forEach((column) => {
            allColumnIds.push(column.getId());
          });
          params.columnApi.autoSizeColumns(allColumnIds, true);
        }}
        onSelectionChanged={(params) => {
          console.log("onSelectionChanged:", params?.api?.getSelectedRows());
        }}
        defaultColDef={defaultColDef}
      />
    </div>
  );
};

export default App;
