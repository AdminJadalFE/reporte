import React, { useState, useEffect } from "react";
import { PageHeader } from "../../../Shared/Prism/Prism";
import {useTable,useSortBy,useGlobalFilter,usePagination} from "react-table";
import {COLUMNS,DATATABLE,GlobalFilter,ApexChart1,Topproduct, ApexChart3,ApexChart4,RecentCustomers, ApexChart5,usercountry,userdata, columnData, datatable} from "./data"
import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Progress,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ButtonGroup,
  Table,Button,
} from "reactstrap";
import axios from "axios";
import { report } from "../../../Util/axios";
import { Link } from "react-router-dom";
import award from "../../../assets/images/photos/award.png";
import SimpleBar from "simplebar-react";
import { WorldMap } from "../../Apps/Maps/SimpleMaps/data";

const Dashboard01 = () => {

  const tableInstance: any = useTable(
    {
      columns: COLUMNS,
      data: DATATABLE,
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
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
  } = tableInstance;

  interface StartData {
    client_count: number;
    detail_order_sale_count: number;
    document_report_count: number;
    sales_accumulate_count: number;
    sales_report_count: number;
  }

  const { globalFilter, pageIndex, pageSize } = state;
  const [startData, setStartData] = useState<StartData>({
    client_count: 0,
    detail_order_sale_count: 0,
    document_report_count: 0,
    sales_accumulate_count: 0,
    sales_report_count: 0,
  });
  const company = localStorage.getItem("company");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await report.post("api/report/dashboard/dashboard", { company: company });
        setStartData(response.data);
      } catch (error) {
        console.error("Error fetching locales:", error);
      }
    };
  
    fetchData();
  }, [company]);

  return (
    <div>
      <PageHeader title="Sales Dashboard"/>

      <Row>
        <Col xl={9} md={12} lg={12}>
          <Row>
            <Col md={12} lg={4} xl={4}>
              <Card>
                <CardBody>
                  <svg
                    className="card-custom-icon text-success icon-dropshadow-success"
                    x="1008"
                    y="1248"
                    viewBox="0 0 24 24"
                    height="100%"
                    width="100%"
                    preserveAspectRatio="xMidYMid meet"
                    focusable="false"
                  >
                    <path
                      opacity=".0"
                      d="M3.31,11 L5.51,19.01 L18.5,19 L20.7,11 L3.31,11 Z M12,17 C10.9,17 10,16.1 10,15 C10,13.9 10.9,13 12,13 C13.1,13 14,13.9 14,15 C14,16.1 13.1,17 12,17 Z"
                    ></path>
                    <path d="M22,9 L17.21,9 L12.83,2.44 C12.64,2.16 12.32,2.02 12,2.02 C11.68,2.02 11.36,2.16 11.17,2.45 L6.79,9 L2,9 C1.45,9 1,9.45 1,10 C1,10.09 1.01,10.18 1.04,10.27 L3.58,19.54 C3.81,20.38 4.58,21 5.5,21 L18.5,21 C19.42,21 20.19,20.38 20.43,19.54 L22.97,10.27 L23,10 C23,9.45 22.55,9 22,9 Z M12,4.8 L14.8,9 L9.2,9 L12,4.8 Z M18.5,19 L5.51,19.01 L3.31,11 L20.7,11 L18.5,19 Z M12,13 C10.9,13 10,13.9 10,15 C10,16.1 10.9,17 12,17 C13.1,17 14,16.1 14,15 C14,13.9 13.1,13 12,13 Z"></path>
                  </svg>
                  <p className=" mb-1 ">Cantidad de Clientes</p>
                  <h2 className="mb-1 font-weight-bold">{startData.client_count}</h2>
                  <div className="mt-3 ">
                    <Progress
                      className=""
                      style={{
                        height: "10px",
                      }}
                      color=" bg-success"
                      animated
                      value="100"
                    ></Progress>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col md={12} lg={4} xl={4}>
              <Card>
                <CardBody>
                  <svg
                    className="card-custom-icon text-success icon-dropshadow-success"
                    x="1008"
                    y="1248"
                    viewBox="0 0 24 24"
                    height="100%"
                    width="100%"
                    preserveAspectRatio="xMidYMid meet"
                    focusable="false"
                  >
                    <path
                      opacity=".0"
                      d="M3.31,11 L5.51,19.01 L18.5,19 L20.7,11 L3.31,11 Z M12,17 C10.9,17 10,16.1 10,15 C10,13.9 10.9,13 12,13 C13.1,13 14,13.9 14,15 C14,16.1 13.1,17 12,17 Z"
                    ></path>
                    <path d="M22,9 L17.21,9 L12.83,2.44 C12.64,2.16 12.32,2.02 12,2.02 C11.68,2.02 11.36,2.16 11.17,2.45 L6.79,9 L2,9 C1.45,9 1,9.45 1,10 C1,10.09 1.01,10.18 1.04,10.27 L3.58,19.54 C3.81,20.38 4.58,21 5.5,21 L18.5,21 C19.42,21 20.19,20.38 20.43,19.54 L22.97,10.27 L23,10 C23,9.45 22.55,9 22,9 Z M12,4.8 L14.8,9 L9.2,9 L12,4.8 Z M18.5,19 L5.51,19.01 L3.31,11 L20.7,11 L18.5,19 Z M12,13 C10.9,13 10,13.9 10,15 C10,16.1 10.9,17 12,17 C13.1,17 14,16.1 14,15 C14,13.9 13.1,13 12,13 Z"></path>
                  </svg>
                  <p className=" mb-1 ">Cantidad de Orden de Venta</p>
                  <h2 className="mb-1 font-weight-bold">{startData.detail_order_sale_count}</h2>
                  <div className="mt-3 ">
                    <Progress
                      className=""
                      style={{
                        height: "10px",
                      }}
                      color=" bg-success"
                      animated
                      value="100"
                    ></Progress>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col md={12} lg={4} xl={4}>
              <Card>
                <CardBody>
                  <svg
                    className="card-custom-icon text-success icon-dropshadow-success"
                    x="1008"
                    y="1248"
                    viewBox="0 0 24 24"
                    height="100%"
                    width="100%"
                    preserveAspectRatio="xMidYMid meet"
                    focusable="false"
                  >
                    <path
                      opacity=".0"
                      d="M3.31,11 L5.51,19.01 L18.5,19 L20.7,11 L3.31,11 Z M12,17 C10.9,17 10,16.1 10,15 C10,13.9 10.9,13 12,13 C13.1,13 14,13.9 14,15 C14,16.1 13.1,17 12,17 Z"
                    ></path>
                    <path d="M22,9 L17.21,9 L12.83,2.44 C12.64,2.16 12.32,2.02 12,2.02 C11.68,2.02 11.36,2.16 11.17,2.45 L6.79,9 L2,9 C1.45,9 1,9.45 1,10 C1,10.09 1.01,10.18 1.04,10.27 L3.58,19.54 C3.81,20.38 4.58,21 5.5,21 L18.5,21 C19.42,21 20.19,20.38 20.43,19.54 L22.97,10.27 L23,10 C23,9.45 22.55,9 22,9 Z M12,4.8 L14.8,9 L9.2,9 L12,4.8 Z M18.5,19 L5.51,19.01 L3.31,11 L20.7,11 L18.5,19 Z M12,13 C10.9,13 10,13.9 10,15 C10,16.1 10.9,17 12,17 C13.1,17 14,16.1 14,15 C14,13.9 13.1,13 12,13 Z"></path>
                  </svg>
                  <p className=" mb-1 ">Cantidad de Reporte de Documentos</p>
                  <h2 className="mb-1 font-weight-bold">{startData.document_report_count}</h2>
                  <div className="mt-3 ">
                    <Progress
                      className=""
                      style={{
                        height: "10px",
                      }}
                      color=" bg-success"
                      animated
                      value="100"
                    ></Progress>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Col>

        <Col xl={9} md={12} lg={12}>
          <Row>
            <Col md={12} lg={4} xl={4}>
              <Card>
                <CardBody>
                  <svg
                    className="card-custom-icon text-success icon-dropshadow-success"
                    x="1008"
                    y="1248"
                    viewBox="0 0 24 24"
                    height="100%"
                    width="100%"
                    preserveAspectRatio="xMidYMid meet"
                    focusable="false"
                  >
                    <path
                      opacity=".0"
                      d="M3.31,11 L5.51,19.01 L18.5,19 L20.7,11 L3.31,11 Z M12,17 C10.9,17 10,16.1 10,15 C10,13.9 10.9,13 12,13 C13.1,13 14,13.9 14,15 C14,16.1 13.1,17 12,17 Z"
                    ></path>
                    <path d="M22,9 L17.21,9 L12.83,2.44 C12.64,2.16 12.32,2.02 12,2.02 C11.68,2.02 11.36,2.16 11.17,2.45 L6.79,9 L2,9 C1.45,9 1,9.45 1,10 C1,10.09 1.01,10.18 1.04,10.27 L3.58,19.54 C3.81,20.38 4.58,21 5.5,21 L18.5,21 C19.42,21 20.19,20.38 20.43,19.54 L22.97,10.27 L23,10 C23,9.45 22.55,9 22,9 Z M12,4.8 L14.8,9 L9.2,9 L12,4.8 Z M18.5,19 L5.51,19.01 L3.31,11 L20.7,11 L18.5,19 Z M12,13 C10.9,13 10,13.9 10,15 C10,16.1 10.9,17 12,17 C13.1,17 14,16.1 14,15 C14,13.9 13.1,13 12,13 Z"></path>
                  </svg>
                  <p className=" mb-1 ">Cantidad de Ventas Acumuladas</p>
                  <h2 className="mb-1 font-weight-bold">{startData.sales_accumulate_count}</h2>
                  <div className="mt-3 ">
                    <Progress
                      className=""
                      style={{
                        height: "10px",
                      }}
                      color=" bg-success"
                      animated
                      value="100"
                    ></Progress>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col md={12} lg={4} xl={4}>
              <Card>
                <CardBody>
                  <svg
                    className="card-custom-icon text-success icon-dropshadow-success"
                    x="1008"
                    y="1248"
                    viewBox="0 0 24 24"
                    height="100%"
                    width="100%"
                    preserveAspectRatio="xMidYMid meet"
                    focusable="false"
                  >
                    <path
                      opacity=".0"
                      d="M3.31,11 L5.51,19.01 L18.5,19 L20.7,11 L3.31,11 Z M12,17 C10.9,17 10,16.1 10,15 C10,13.9 10.9,13 12,13 C13.1,13 14,13.9 14,15 C14,16.1 13.1,17 12,17 Z"
                    ></path>
                    <path d="M22,9 L17.21,9 L12.83,2.44 C12.64,2.16 12.32,2.02 12,2.02 C11.68,2.02 11.36,2.16 11.17,2.45 L6.79,9 L2,9 C1.45,9 1,9.45 1,10 C1,10.09 1.01,10.18 1.04,10.27 L3.58,19.54 C3.81,20.38 4.58,21 5.5,21 L18.5,21 C19.42,21 20.19,20.38 20.43,19.54 L22.97,10.27 L23,10 C23,9.45 22.55,9 22,9 Z M12,4.8 L14.8,9 L9.2,9 L12,4.8 Z M18.5,19 L5.51,19.01 L3.31,11 L20.7,11 L18.5,19 Z M12,13 C10.9,13 10,13.9 10,15 C10,16.1 10.9,17 12,17 C13.1,17 14,16.1 14,15 C14,13.9 13.1,13 12,13 Z"></path>
                  </svg>
                  <p className=" mb-1 ">Cantidad de Reporte de Ventas</p>
                  <h2 className="mb-1 font-weight-bold">{startData.sales_report_count}</h2>
                  <div className="mt-3 ">
                    <Progress
                      className=""
                      style={{
                        height: "10px",
                      }}
                      color=" bg-success"
                      animated
                      value="100"
                    ></Progress>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Col>

      </Row>
    </div>
  );
};
Dashboard01.propTypes = {};

Dashboard01.defaultProps = {};

export default Dashboard01;
