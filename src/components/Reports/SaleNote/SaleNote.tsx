import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Label,
  Button,
  Input,
  Spinner,
} from "reactstrap";
import { PageHeaders } from "../../../Shared/Prism/Prism";

import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
registerLocale("es", es);
import "react-datepicker/dist/react-datepicker.css";

import Select from "react-select";
import axios from "axios";
import { report } from "../../../Util/axios";
import { BasicTable } from "../Components/DataTable/Basictable";
import { format } from "date-fns";
import useOpenTable from "../../../Hook/Report/useOpenTable";
import useOpenPdf from "../../../Hook/Report/useOpenPdf";
import useOpenExcel from "../../../Hook/Report/useOpenExcel";
import Swal from "sweetalert2";

const SaleNote = () => {
  const [dates, setDates] = useState<any>();
  const [countryOption, setCountryOption] = useState<any>(null);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loadingTable, setLoadingTable] = useState(false);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [loadingExcel, setLoadingExcel] = useState(false);

  const Countryoptions = [
    { value: "Principal", label: "Principal" },
    { value: "Secundario", label: "Secundario" },
    { value: "Tercer", label: "Tercer" },
    { value: "Cuarto", label: "Cuarto" },
  ];

  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const company = localStorage.getItem("company");

  const errorAlert = (errorMessage) => {
    Swal.fire({
      title: "Error",
      text: errorMessage,
      icon: "error",
      confirmButtonText: "OK",
      cancelButtonColor: "#4454c3",
    });
  };

  //const [reportData, setReportData] = useState<any[]>([]);

  const { openTable, reportData, loading, error } = useOpenTable(
    startDate,
    endDate,
    company,
    report,
    "api/report/table/sale/note"
  );

  const handleOpenTable = async () => {
    if (startDate == null || endDate == null) {
      errorAlert("Seleccione las fechas desde y hasta.");
      return;
    }
    setLoadingTable(true);
    await openTable();
    setLoadingTable(false);
  };

  const { openPdf } = useOpenPdf();

  const handleOpenPdf = async () => {
    if (startDate == null || endDate == null) {
      errorAlert("Seleccione las fechas desde y hasta.");
      return;
    }
    setLoadingPdf(true);
    await openPdf(
      startDate,
      endDate,
      company,
      "api/report/pdf/sale/note",
      "reporte-nota-venta"
    );
    setLoadingPdf(false);
  };

  const { openExcel } = useOpenExcel();

  const handleOpenExcel = async () => {
    if (startDate == null || endDate == null) {
      errorAlert("Seleccione las fechas desde y hasta.");
      return;
    }
    setLoadingExcel(true);
    await openExcel(
      startDate,
      endDate,
      company,
      "api/report/excel/sale/note",
      "reporte-nota-venta"
    );
    setLoadingExcel(false);
  };

  console.log("reportData", reportData);
  const columns: any = React.useMemo(
    () => [
      {
        Header: "Fecha",
        accessor: (row: any) => {
          const salesData = JSON.parse(row.sales_per_client);
          return salesData[0]?.date;
        },
      },
      {
        Header: "T/D",
        accessor: "T/D",
      },
      {
        Header: "Nro.Docum.",
        accessor: (row: any) => {
          const salesData = JSON.parse(row.sales_per_client);
          return salesData[0]?.sales[0]?.sale_document;
        },
        Cell: ({ value }: any) => value.toLocaleString(),
      },
      {
        Header: "R.U.C.",
        accessor: "R.U.C.",
        Cell: ({ value }: any) => Number(value).toLocaleString(),
      },
      {
        Header: "Cliente",
        accessor: "client",
      },
      {
        Header: "Valor Venta",
        accessor: (row: any) => {
          const salesData = JSON.parse(row.sales_per_client);
          return salesData[0]?.sales[0]?.total_sale; // Accede a la propiedad 'total_sale' del primer elemento del arreglo 'sales'
        },
        Cell: ({ value }: any) => Number(value).toLocaleString(),
      },
      {
        Header: "Impuesto",
        accessor: "Impuesto",
      },
      {
        Header: "Total",
        accessor: "Total",
      },
    ],
    []
  );

  console.log("dataAcumulateDAyay", reportData);
  return (
    <div>
      <PageHeaders
        title="Reporte Notas de Venta"
        home="Home"
        name="Pages"
        fonticonsname="Empty"
      />

      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <CardTitle>Imprimir desde las fechas</CardTitle>
            </CardHeader>
            <CardBody>
              <Row>
                <Col lg="6">
                  <div className="mb-3">
                    <Label className="form-label">Desde: </Label>
                  </div>
                  <div className="wd-200 mg-b-30">
                    <div className="input-group">
                      <div className="input-group-text">
                        <div className="">
                          <svg
                            className="svg-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            height="18"
                            viewBox="0 0 24 24"
                            width="18"
                          >
                            <path d="M0 0h24v24H0V0z" fill="none" />
                            <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 2v3H4V5h16zM4 21V10h16v11H4z" />
                            <path d="M4 5.01h16V8H4z" opacity=".3" />
                          </svg>
                        </div>
                      </div>
                      <DatePicker
                        locale="es"
                        dateFormat="yyyy/MM/dd"
                        className="form-control"
                        placeholder="Desde"
                        selected={startDate}
                        onChange={(startDate) => {
                          console.log(startDate);
                          setStartDate(startDate);
                        }}
                        numberOfMonths={1}
                      />
                    </div>
                  </div>
                </Col>
                <Col lg="6">
                  <div className="mb-3">
                    <Label className="form-label">Hasta: </Label>
                  </div>
                  <div className="wd-200 mg-b-30">
                    <div className="input-group">
                      <div className="input-group-text">
                        <div className="">
                          <svg
                            className="svg-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            height="18"
                            viewBox="0 0 24 24"
                            width="18"
                          >
                            <path d="M0 0h24v24H0V0z" fill="none" />
                            <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 2v3H4V5h16zM4 21V10h16v11H4z" />
                            <path d="M4 5.01h16V8H4z" opacity=".3" />
                          </svg>
                        </div>
                      </div>
                      <DatePicker
                        locale="es"
                        dateFormat="yyyy/MM/dd"
                        className="form-control"
                        placeholder="Hasta"
                        selected={endDate}
                        onChange={(endDate) => setEndDate(endDate)}
                        numberOfMonths={1}
                      />
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg="4">
                  <div className="mb-3 mt-3">
                    <Label className="form-label">
                      Selecciona un Cliente:{" "}
                    </Label>
                  </div>
                  <div className="wd-200 mg-b-30">
                    <Select
                      defaultValue={countryOption}
                      onChange={setCountryOption}
                      options={Countryoptions}
                      placeholder="Cliente"
                      classNamePrefix="Search"
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg="12">
                  <div className="mb-3 mt-3 d-flex flex-row">
                    <div className="custom-controls-stacked m-3">
                      <Label className="custom-control custom-radio custom-control-md">
                        <Input
                          type="radio"
                          className="custom-control-input"
                          name="example-radios1"
                          value="option5"
                          defaultChecked
                        />
                        <span className="custom-control-label custom-control-label-md">
                          Todos
                        </span>
                      </Label>
                    </div>
                    <div className="custom-controls-stacked m-3">
                      <Label className="custom-control custom-radio custom-control-md">
                        <Input
                          type="radio"
                          className="custom-control-input"
                          name="example-radios1"
                          value="option1"
                          defaultChecked
                        />
                        <span className="custom-control-label custom-control-label-md">
                          Por Facturar
                        </span>
                      </Label>
                    </div>
                    <div className="custom-controls-stacked m-3">
                      <Label className="custom-control custom-radio custom-control-md">
                        <Input
                          type="radio"
                          className="custom-control-input"
                          name="example-radios1"
                          value="option2"
                        />
                        <span className="custom-control-label custom-control-label-md">
                          Vales vs Factura
                        </span>
                      </Label>
                    </div>
                    <div className="custom-controls-stacked m-3">
                      <Label className="custom-control custom-radio custom-control-md">
                        <Input
                          type="radio"
                          className="custom-control-input"
                          name="example-radios1"
                          value="option2"
                        />
                        <span className="custom-control-label custom-control-label-md">
                          Detalle
                        </span>
                      </Label>
                    </div>
                    <div className="custom-controls-stacked m-3">
                      <Label className="custom-control custom-radio custom-control-md">
                        <Input
                          type="radio"
                          className="custom-control-input"
                          name="example-radios1"
                          value="option2"
                        />
                        <span className="custom-control-label custom-control-label-md">
                          Totales x día
                        </span>
                      </Label>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg="12">
                  <div className="mb-3 mt-3">
                    <Label className="form-label">Opciones:</Label>
                  </div>

                  <div className="wd-200 mg-b-30 mb-3 mt-3 d-flex justify-content-between">
                    <Row>
                      <Col lg="12">
                        <Button
                          color=""
                          type="button"
                          className="btn btn-primary btn-svgs btn-svg-white mt-4 ml-4 mr-4"
                          onClick={handleOpenTable}
                          disabled={loadingTable}
                        >
                          {loadingTable ? (
                            <Spinner size="md" />
                          ) : (
                            <>
                              <svg
                                className="svg-icon"
                                xmlns="http://www.w3.org/2000/svg"
                                height="24"
                                viewBox="0 0 24 24"
                                width="24"
                              >
                                <path d="M0 0h24v24H0V0z" fill="none"></path>
                                <path
                                  d="M13 4H6v16h12V9h-5V4zm3 14H8v-2h8v2zm0-6v2H8v-2h8z"
                                  opacity=".3"
                                ></path>
                                <path d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"></path>
                              </svg>
                              <span className="btn-svg-text">FILTRAR</span>
                            </>
                          )}
                        </Button>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg="12">
                        <Button
                          color=""
                          type="button"
                          className="btn btn-primary btn-svgs btn-svg-white mt-4 ml-4 mr-4"
                          onClick={handleOpenPdf}
                          disabled={loadingPdf}
                        >
                          {loadingPdf ? (
                            <Spinner size="md" />
                          ) : (
                            <>
                              <svg
                                className="svg-icon"
                                xmlns="http://www.w3.org/2000/svg"
                                height="24"
                                viewBox="0 0 24 24"
                                width="24"
                              >
                                <path d="M0 0h24v24H0V0z" fill="none"></path>
                                <path
                                  d="M13 4H6v16h12V9h-5V4zm3 14H8v-2h8v2zm0-6v2H8v-2h8z"
                                  opacity=".3"
                                ></path>
                                <path d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"></path>
                              </svg>
                              <span className="btn-svg-text">PDF</span>
                            </>
                          )}
                        </Button>
                        <Button
                          color=""
                          type="button"
                          className="btn btn-primary btn-svgs btn-svg-white mt-4 ml-4 mr-4"
                          onClick={handleOpenExcel}
                          disabled={loadingExcel}
                        >
                          {loadingExcel ? (
                            <Spinner size="md" />
                          ) : (
                            <>
                              <svg
                                className="svg-icon"
                                xmlns="http://www.w3.org/2000/svg"
                                height="24"
                                viewBox="0 0 24 24"
                                width="24"
                              >
                                <path d="M0 0h24v24H0V0z" fill="none"></path>
                                <path
                                  d="M13 4H6v16h12V9h-5V4zm3 14H8v-2h8v2zm0-6v2H8v-2h8z"
                                  opacity=".3"
                                ></path>
                                <path d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"></path>
                              </svg>
                              <span className="btn-svg-text">EXCEL</span>
                            </>
                          )}
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </Col>

                {pdfUrl && (
                  <div className="pdf-viewer">
                    <object
                      data={pdfUrl}
                      type="application/pdf"
                      width="100%"
                      height="600px"
                    >
                      <p>
                        Tu navegador no puede mostrar el PDF. Puedes descargarlo
                        <a href={pdfUrl}>aquí</a>.
                      </p>
                    </object>
                  </div>
                )}
              </Row>
              {reportData && <BasicTable data={reportData} columns={columns} />}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

SaleNote.propTypes = {};

SaleNote.defaultProps = {};

export default SaleNote;
