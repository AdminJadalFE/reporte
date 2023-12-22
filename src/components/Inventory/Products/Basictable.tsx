import React from "react";
import { Button, Input, } from "reactstrap";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
export const COLUMNS: any = [
  {
    Header: "ID",
    accessor: "id",
    className: "w-5 borderrigth",
  },
  {
    Header: "Name",
    accessor: "name",
    className: "w-20 borderrigth",
  },
  {
    Header: "Description",
    accessor: "description",
    className: "w-25 borderrigth",
  },
  {
    Header: "Product Code",
    accessor: "product_code",
    className: "w-20 borderrigth",
  },
  {
    Header: "Price",
    accessor: "price",
    className: "w-15 borderrigth",
  },
  {
    Header: "Stock",
    accessor: "stock",
    className: "w-20 borderrigth",
  },
  // {
  //   Header: "Created At",
  //   accessor: "created_at",
  //   className: "w-20 borderrigth",
  // },
  // {
  //   Header: "Updated At",
  //   accessor: "updated_at",
  //   className: "w-20 borderrigth",
  // },
];

export const BasicTable = ({ data }: any) => {
  const tableInstance:any = useTable(
    {
      columns: COLUMNS,
      data: data,
      initialState: {
        sortBy: [
          {
            id: 'id', // your accessor key for the ID column
            desc: true, // to sort in descending order
          },
        ],
      },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  

  const {
    getTableProps, // table props from react-table
    headerGroups, // headerGroups, if your table has groupings
    getTableBodyProps, // table body props from react-table
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
    state,
    setGlobalFilter,
    page, // use, page or rows
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
      <table {...getTableProps()} className="table table-bordered table-hover mb-0">
        <thead>
          {headerGroups.map((headerGroup:any) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column:any) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={column.className}
                >
                  <span className="tabletitle ">{column.render("Header")}</span>
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
              <th>
                Accion
              </th>
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
                    <td className="borderrigth" {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
                <td className="text-center">
                  <div className="btn-group" role="group" aria-label="Acciones">
                    <button
                      className="btn btn-primary btn-sm m-1"
                      onClick={() => console.log('Editar', row.original.id)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm m-1"
                      onClick={() => console.log('Eliminar', row.original.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
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
const GlobalFilter = ({ filter, setFilter }:any) => {
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




