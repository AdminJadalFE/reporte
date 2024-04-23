import React from "react";
import { Button, Input, Col } from "reactstrap";
import { useTable, useGlobalFilter, useSortBy, usePagination, Column, TableInstance, TableState } from "react-table";

// Define el tipo de los datos de la tabla
interface TicketData {
  Car_sunat: string;
  Fecha_de_emision: string;
  Tipo_CP_Doc: string;
  Serie_del_CDP: string;
  Nro_CP_o_Doc_Nro_Inicial_Rango: string;
  Total_CP: string;
  FUENTE: string;
  INDICADOR: string;
}

export const COLUMNS: Column<TicketData>[] = [
  {
    Header: "CAR_SUNAT",
    accessor: "Car_sunat",
  },
  {
    Header: "FECHA DE EMISIÓN",
    accessor: "Fecha_de_emision",
  },
  {
    Header: "TIPO CP DOC",
    accessor: "Tipo_CP_Doc",
  },
  {
    Header: "SERIE DEL CDP",
    accessor: "Serie_del_CDP",
  },
  {
    Header: "Nro_CP_o_Doc_Nro_Inicial_Rango",
    accessor: "Nro_CP_o_Doc_Nro_Inicial_Rango",
  },
  {
    Header: "TOTAL CP",
    accessor: "Total_CP",
  },
  {
    Header: "FUENTE",
    accessor: "FUENTE",
  },
  {
    Header: "INDICADOR",
    accessor: "INDICADOR",
  },
];

const conditionalRowStyles = [
  {
    when: (row: TicketData) => row.INDICADOR === "0",
    style: {
      backgroundColor: "#ff6961", // rojo
    },
  },
  {
    when: (row: TicketData) => row.INDICADOR === "1",
    style: {
      backgroundColor: "#5dc460", // verde
    },
  },
  {
    when: (row: TicketData) => row.INDICADOR === "2",
    style: {
      backgroundColor: "#c8ca66", // amarillo
    },
  },
  {
    when: (row: TicketData) => row.INDICADOR === "3",
    style: {
      backgroundColor: "#6a9eda", // azul
    },
  },
];

export const BasicTable = ({ ticketData }: { ticketData: TicketData[] }) => {

  // Usa el tipo de datos definido para la instancia de la tabla
  const tableInstance:any = useTable(
    {
      columns: COLUMNS,
      data: ticketData,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  ); // Especifica el tipo de la instancia de la tabla

  const {
    getTableProps,
    headerGroups,
    getTableBodyProps,
    prepareRow,
    state,
    setGlobalFilter,
    page,
    gotoPage,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    pageCount,
    setPageSize,
  } = tableInstance; 

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <Col lg="12">
      <div className="d-flex">
        <select
          className="mb-4 selectpage border me-1"
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[10, 20, 50, 100].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        <GlobalFilter filter={state.globalFilter} setFilter={setGlobalFilter} />
      </div>
      <table {...getTableProps()} className="table table-bordered table-hover mb-0">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={column.className || ""}
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
              <tr
                {...row.getRowProps()}
                style={
                  row.original
                    ? conditionalRowStyles.find((rule) => rule.when(row.original))?.style
                    : {}
                }
              >
                {row.cells.map((cell) => (
                  <td className="borderright" {...cell.getCellProps()}>
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
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            {" Previous "}
          </Button>
          <Button
            color=""
            className="btn-default tablebutton me-2 my-1"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            {" << "}
          </Button>
          <Button
            color=""
            className="btn-default tablebutton me-2 my-1"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            {" >> "}
          </Button>
        </span>
      </div>
    </Col>
  );
};
const GlobalFilter = ({ filter, setFilter }:any) => {
  return (
    <span className="d-flex ms-auto">
      <Input
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
        className="form-control mb-4"
        placeholder="Buscar..."
      />
    </span>
  );
};


