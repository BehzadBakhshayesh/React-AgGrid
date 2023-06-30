import React, { useEffect, useState, useRef, useCallback } from "react";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/dist/styles/ag-theme-alpine.css"; // Optional theme CSS
import "./App.scss";

const App = () => {
  const [rowData, setRowData] = useState([]);
  const gridRef = useRef();
  const columnDefs = [
    {
      field: "age",
      colKey: "age",
      editable: true,
      cellEditor: "agTextCellEditor",
    },
    {
      field: "athlete",
      editable: (params) => {
        return params?.node?.id < 3;
      },
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: ["a", "b", "c"],
      },
    },
    {
      field: "bronze",
    },
    {
      field: "country",
      editable: true,
      cellEditor: "agLargeTextCellEditor",
      cellEditorPopup: true,
    },
    {
      field: "date",
      editable: true,
      cellEditorPopup: true,
      cellEditor: "agPopupTextCellEditor",
    },
    {
      field: "gold",
      cellEditor: "agRichSelectCellEditor",
      cellEditorPopup: true,
      cellEditorParams: {
        values: ["1", "2", "3"],
      },
    },
    { field: "silver" },
    { field: "sport" },
    { field: "total" },
    {
      field: "year",
      cellEditor:true,
      cellEditorSelector: params => {
        return {
            component:()=>{
              return (
                <input type="text"/>
              )
            },
            params: { values: ['Male', 'Female'] },
            popup: true
        };
    }
    },
  ];

  const defaultColDef = {};

  useEffect(() => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

  // const onBtWhich = useCallback(() => {
  //   var cellDefs = gridRef.current.api.getEditingCells();
  //   console.log("cellDefs", cellDefs);
  //   var cellDef = cellDefs[0];
  //   console.log("row", cellDef.rowIndex);
  //   console.log("col", cellDef.column.getId());
  //   console.log("floating",cellDef.floating);
  // }, []);

  return (
    <div className="ag-theme-alpine" style={{ width: "100%", height: "500px" }}>
      <button
        onClick={() => {
          gridRef?.current?.api?.startEditingCell({
            rowIndex: 2,
            colKey: "age",
          });
        }}
      >
        start editing
      </button>
      <button
        onClick={() => {
          gridRef?.current?.api?.stopEditing();
        }}
      >
        stop editing
      </button>
      <button
        onClick={() => {
          gridRef.current.api.tabToNextCell();
        }}
      >
        next cell
      </button>
      <button
        onClick={() => {
          gridRef.current.api.tabToPreviousCell();
        }}
      >
        Previous cell
      </button>
      <AgGridReact
        ref={gridRef}
        columnDefs={columnDefs}
        rowData={rowData}
        defaultColDef={defaultColDef}
        singleClickEdit={true}
        undoRedoCellEditing={true}
        undoRedoCellEditingLimit={2}
        onCellValueChanged={(e) => {
          // console.log("oldValue",e?.oldValue);
          // console.log("newValue",e?.newValue);
          // console.log("getEditingCells", e?.newValue?.api?.getEditingCells());
        }}
      />
    </div>
  );
};

export default App;
