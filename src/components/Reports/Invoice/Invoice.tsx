import React, { useState, useEffect} from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Label,
  Button,
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
import { LocalConvenienceStoreOutlined } from "@material-ui/icons";
import useOpenTable from "../../../Hook/Report/useOpenTable";
import useOpenPdf from "../../../Hook/Report/useOpenPdf";
import useOpenExcel from "../../../Hook/Report/useOpenExcel";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { ClientState } from "../../../Redux/Client/Reducer/reducer";
import { fetchClients } from "../../../Redux/Client/Action/Action";

const Invoice = () => {
  const dispatch = useDispatch();
  const clientData = useSelector((state: { client: ClientState }) => state.client);

  const [dates, setDates] = useState<any>();
  const [countryOption, setCountryOption] = useState<any>(null);
  const [clientOption, setClientOption] = useState<any>(null);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [loadingTable, setLoadingTable] = useState(false);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [loadingExcel, setLoadingExcel] = useState(false);

  const Countryoptions = [
    { value: "Todos", label: "Todos" },
    { value: "Facturado", label: "Facturado" },
    { value: "No Facturado", label: "No Facturado" },
  ];

  const [documentNumber, setDocumentNumber] = useState<string>("");

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
  const [clientSearchInput, setClientSearchInput] = useState<string>("");

  const { openTable, reportData, loading, error } = useOpenTable(
    startDate,
    endDate,
    company,
    report,
    "api/report/table/invoice",
    clientOption ? clientOption.label : '',
    documentNumber ? documentNumber : '',
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
      "api/report/pdf/invoice",
      "reporte-facturas"
    );
    setLoadingPdf(false);
  };

  const { openExcel } = useOpenExcel();

  const handleDocumentNumberChange = (e) => {
    const input = e.target.value.toUpperCase();
    const formattedInput = input.replace(/[^A-Z0-9-]/g, "");

    if (/^[A-Z0-9]{4}-[0-9]{7}$/.test(formattedInput)) {
      setDocumentNumber(formattedInput);
    } else if (/^[A-Z0-9]{0,4}-?[0-9]{0,7}$/.test(formattedInput)) {
      setDocumentNumber(formattedInput);
    }
  };

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
      "api/report/excel/invoice",
      "reporte-facturas"
    );
    setLoadingExcel(false);
  };

  useEffect(() => {
    fetchClients(company)(dispatch);
  }, [dispatch]);

  const filteredClientOptions = clientData.clients
    .filter(client =>
      client.fist_name_v.toLowerCase().includes(clientSearchInput.toLowerCase())
    )
    .map(client => ({
      value: client.id_client_v,
      label: client.fist_name_v,
    }));

  const columns: any = React.useMemo(
    () => [
      {
        Header: "Tipo doc.",
        accessor: "document_type",
      },
      {
        Header: "N° doc.",
        accessor: "document_number",
      },
      {
        Header: "Cliente",
        accessor: "name_client",
      },
      {
        Header: "Descuento",
        accessor: "discount",
      },
      {
        Header: "Cantidad",
        accessor: "total_amount",
      },
      {
        Header: "fecha de emisión",
        accessor: "broadcast_date",
      },
      {
        Header: "Situación",
        accessor: "situacion",
      },
    ],
    []
  );

  return (
    <div>
      <PageHeaders
        title="Reporte Factura"
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
                <Col lg="8">
                  <div className="mb-3">
                    <label className="form-label">Cliente</label>
                  </div>
                  <div className="wd-200 mg-b-30">
                    <Select
                      value={clientOption}
                      onChange={(option) => {
                        setClientOption(option);
                        setClientSearchInput(option.label);
                      }}
                      options={filteredClientOptions}
                      placeholder="Seleccione un cliente"
                      onInputChange={(inputValue) => setClientSearchInput(inputValue)}
                      filterOption={() => true} 
                     classNamePrefix="Search"
                    />
                  </div>
                </Col>
                <Col lg="4">
                  <div className="mb-3">
                    <label className="form-label">
                      N° Documento (0020000123)
                    </label>
                  </div>
                  <input
                    type="text"
                    className="form-control required mb-3"
                    placeholder="0020000123"
                    value={documentNumber}
                    onChange={handleDocumentNumberChange}
                  />
                </Col>
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
                <Col lg="6">
                  <div className="mb-3 mt-3">
                    <Label className="form-label">Situacion: </Label>
                  </div>
                  <div className="wd-200 mg-b-30">
                    <Select
                      defaultValue={countryOption}
                      onChange={setCountryOption}
                      options={Countryoptions}
                      placeholder="Todos"
                      classNamePrefix="Search"
                    />
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

Invoice.propTypes = {};

Invoice.defaultProps = {};

export default Invoice;
