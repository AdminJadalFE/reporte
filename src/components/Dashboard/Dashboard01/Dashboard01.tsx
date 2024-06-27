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
      <PageHeader title="Dashboard"/>

      <Row>
        <Col xl={9} md={12} lg={12}>
          <Row>
            <Col md={12} lg={4} xl={4}>
              <Card>
                <CardBody>
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
