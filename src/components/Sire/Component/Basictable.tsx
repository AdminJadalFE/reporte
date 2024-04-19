import React, { useState } from "react";
import { Button, Input, Col } from "reactstrap";
import { useTable, useGlobalFilter, useSortBy, usePagination } from "react-table";

export const COLUMNS = [
  {
    Header: "CAR_SUNAT",
    accessor: "Car_sunat",
    className: "w-20 borderrigth",
  },
  {
    Header: "FECHA DE EMISIÓN",
    accessor: "Fecha_de_emision",
    className: "w-25 borderrigth",
  },
  {
    Header: "TIPO CP DOC",
    accessor: "Tipo_CP_Doc",
    className: "w-20 borderrigth",
  },
  {
    Header: "SERIE DEL CDP",
    accessor: "Serie_del_CDP",
    className: "w-20 borderrigth",
  },
  {
    Header: "Nro_CP_o_Doc_Nro_Inicial_Rango",
    accessor: "Nro_CP_o_Doc_Nro_Inicial_Rango",
    className: "w-20 borderrigth",
  },  
  {
    Header: "TOTAL CP",
    accessor: "Total_CP",
    className: "w-20 borderrigth",
  },  
  {
    Header: "FUENTE",
    accessor: "FUENTE",
    className: "w-20 borderrigth",
  },    
  {
    Header: "INDICADOR",
    accessor: "INDICADOR",
    className: "w-20 borderrigth",
  },      
];

const conditionalRowStyles = [
  {
    when: (row) => row.INDICADOR === "0",
    style: {
      backgroundColor: "#ff6961", // rojo
    },
  },
  {
    when: (row) => row.INDICADOR === "1",
    style: {
      backgroundColor: "#5dc460", // verde
    },
  },
  {
    when: (row) => row.INDICADOR === "2",
    style: {
      backgroundColor: "#c8ca66", // amarillo
    },
  },
  {
    when: (row) => row.INDICADOR === "3",
    style: {
      backgroundColor: "#6a9eda", // azul
    },
  },
];

export const BasicTable = ({ ticketData, linksData, fetchDataSales }) => {
  const [pageSize, setPageSize] = useState(100); // Establece el tamaño de la página en 100 por defecto

  console.log('ticketData Basictable', ticketData);
  console.log('ticketData linksData', linksData);
  const tableInstance = useTable(
    {
      columns: COLUMNS,
      data: ticketData,
      initialState: { pageSize }, // Establece el tamaño de la página inicial
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    headerGroups,
    getTableBodyProps,
    prepareRow,
    state,
    setGlobalFilter,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
  } = tableInstance;

  const { globalFilter, pageIndex } = state;

  const fetchData = (data) => {
    console.log('hijooooooooo',data)
    fetchDataSales(data);
  };

  return (
    <Col lg="12">
      <div className="d-flex">
        <select
          className="mb-4 selectpage border me-1"
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[100,500,1000].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      </div>
      <table {...getTableProps()} className="table table-bordered table-hover mb-0">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={column.className}
                >
                  <span className="tabletitle">{column.render("Header")}</span>
                  <span className="d-flex ms-auto">
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <i className="fa fa-angle-down"></i>
                      ) : (
                        <i className="fa fa-angle-up"></i>
                      )
                    ) : (
                      ""
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} style={row.original ? conditionalRowStyles.find((rule) => rule.when(row.original)).style : {}}>
                {row.cells.map((cell) => (
                  <td className="borderrigth" {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="d-block d-sm-flex mt-4 ">
        <span className="">
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span className="ms-sm-auto ">
          <Button
            color=""
            className="btn-default tablebutton me-2 d-sm-inline d-block my-1"
            onClick={() => fetchData(linksData[0].url)}
            disabled={!linksData[0].active}
          >
            {linksData[0].label}
          </Button>
          {linksData.slice(1, -1).map((link, index) => (
            <Button
              key={index}
              color=""
              className="btn-default tablebutton me-2 d-sm-inline d-block my-1"
              onClick={() => fetchData(link.url)}
              disabled={link.active}
            >
              {link.label}
            </Button>
          ))}
          <Button
            color=""
            className="btn-default tablebutton me-2 d-sm-inline d-block my-1"
            onClick={() => fetchData(linksData[linksData.length - 1].url)}
            disabled={!linksData[linksData.length - 1].active}
          >
            {linksData[linksData.length - 1].label}
          </Button>
        </span>
      </div>
    </Col>
  );
};

const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <span className="d-flex ms-auto">
      <Input
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
        className="form-control mb-4"
        placeholder="Search..."
      />
    </span>
  );
};
