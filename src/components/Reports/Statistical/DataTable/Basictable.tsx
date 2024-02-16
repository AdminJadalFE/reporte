import React from "react";
import { Button, Input } from "reactstrap";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
  TableState,
} from "react-table";

export const BasicTable = ({ data }: any) => {
  console.log('basicTable data', data);
  const columns: any = React.useMemo(
    () => [
      {
        Header: "Fecha",
        accessor: "fecha",
      },
      {
        Header: "PRODUCTO A",
        accessor: "84 OCT(produc)-Galones",
      },
      {
        Header: "PRODUCTO B",
        accessor: "84 OCT(produc)-Soles",
      },
      {
        Header: "PRODUCTO C",
        accessor: "90 OCT-Galones(produc)",
      },      
      {
        Header: "PRODUCTO D",
        accessor: "90 OCT-Galones(product)",
      },
      {
        Header: "TOTAL",
        accessor: "95 OCT-Galones(produc)",
      },                                    
    ],
    []
  );

  const tableInstance: any = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 } as TableState<object>, // Página inicial
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
    setPageSize,
  } = tableInstance;

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <>
      <div className="d-flex">
        <select
          className=" mb-4 selectpage border me-1"
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[10, 25, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      </div>
      <div className="table-responsive">
        <table
          {...getTableProps()}
          className="table table-bordered table-hover mb-0 table-striped card-table table-vcenter text-nowrap mb-0 table-bordered border-top-0"
          style={{ fontSize: "10px" }} // Reduce el tamaño de la fuente de la tabla
        >
          <thead>
            {headerGroups.map((headerGroup: any) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: any) => (
                  <th
                    className="bg-primary text-white"
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    // className={column.className}
                    //  style={{ padding: "1px", fontSize: "9px"}}
                  >
                    <span className="tabletitle">
                      {column.render("Header")}
                    </span>
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
            {page.map((row: any) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell: any) => {
                    return (
                      <td className="borderrigth" {...cell.getCellProps()} style={{ padding: "4px", fontSize: "12px" }}> {/* Ajusta el tamaño de fuente y el padding de las celdas */}
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
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
            onClick={() => {
              previousPage();
            }}
            disabled={!canPreviousPage}
          >
            {" << "}
          </Button>
          <Button
            color=""
            className="btn-default tablebutton me-2 my-1"
            onClick={() => {
              previousPage();
            }}
            disabled={!canPreviousPage}
          >
            {" < "}
          </Button>
          <Button
            color=""
            className="btn-default tablebutton me-2 my-1"
            onClick={() => {
              nextPage();
            }}
            disabled={!canNextPage}
          >
            {" > "}
          </Button>
          <Button
            color=""
            className="btn-default tablebutton me-2 my-1"
            onClick={() => {
              nextPage();
            }}
            disabled={!canNextPage}
          >
            {" >> "}
          </Button>
          <Button
            color=""
            className="btn-default tablebutton me-2 d-sm-inline d-block my-1"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {" Next "}
          </Button>
        </span>
      </div>
    </>
  );
};

const GlobalFilter = ({ filter, setFilter }: any) => {
  return (
    <span className="d-flex ms-auto">
      <Input
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
        className="form-control mb-4"
        placeholder="Search..."
        style={{ fontSize: "10px" }} // Reduce el tamaño de la fuente del filtro global
      />
    </span>
  );
};
