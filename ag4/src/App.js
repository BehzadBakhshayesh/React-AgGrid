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
    { field: "age", filter: "agNumberColumnFilter" },
    {
      field: "athlete",
      colId:"athlete",
      filter: "agTextColumnFilter",
      filterParams: {
        filterOptions: ["contains", "notContains"],
        caseSensitive: true,
        debounceMs: 0,
      },
    },
    {
      field: "bronze",
      filter: "agNumberColumnFilter",
      filterParams: {
        defaultOption: "inRange",
      },
    },
    { field: "country", filter: "agSetColumnFilter" },
    {
      field: "date",
      filter: "agDateColumnFilter",
      filterParams: {
        comparator: (filterLocalDateAtMidnight, cellValue) => {
          const dateAsString = cellValue;

          if (dateAsString == null) {
            return 0;
          }

          // In the example application, dates are stored as dd/mm/yyyy
          // We create a Date object for comparison against the filter date
          const dateParts = dateAsString.split("/");
          const day = Number(dateParts[0]);
          const month = Number(dateParts[1]) - 1;
          const year = Number(dateParts[2]);
          const cellDate = new Date(year, month, day);
          const searchDate = new Date(year, month, day);

          console.log("day", day);
          console.log("month", month);
          console.log("year", year);

          // Now that both parameters are Date objects, we can compare
          if (cellDate < filterLocalDateAtMidnight) {
            return -1;
          } else if (cellDate > filterLocalDateAtMidnight) {
            return 1;
          }
          return 0;
        },
      },
    },
    { field: "gold", filter: "agSetColumnFilter" },
    { field: "silver" },
    { field: "sport" },
    { field: "total" },
    { field: "year" },
  ];

  const defaultColDef = {
    floatingFilter: true,
  };

  useEffect(() => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

  return (
    <div className="ag-theme-alpine" style={{ width: "100%", height: "500px" }}>
      <input
        type="text"
        placeHolder="Quick Filter"
        onChange={(e) => {
          gridRef?.current?.api?.setQuickFilter(e.target.value);
        }}
      />
      <button
        onClick={() => {
          gridRef?.current?.api?.getFilterInstance("athlete").setModel({
            type: "contains",
            filter: "Mich",
          });
          gridRef?.current?.api?.onFilterChanged();
        }}
      >
        Mo filter
      </button>
      <AgGridReact
        ref={gridRef}
        columnDefs={columnDefs}
        rowData={rowData}
        defaultColDef={defaultColDef}
        floatingFilter={true}
      />
    </div>
  );
};

export default App;
