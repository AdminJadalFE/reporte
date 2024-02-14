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
} from "reactstrap";
import { PageHeaders } from "../../../Shared/Prism/Prism";

import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
registerLocale("es", es);
import "react-datepicker/dist/react-datepicker.css";


import Select from "react-select";
import axios from "axios";
import { report } from "../../../Util/axios";
import { BasicTable } from "./DataTable/Basictable";
import { format } from "date-fns";

const AccumulatedDay = () => {
  const [dates, setDates] = useState<any>();
  const [countryOption, setCountryOption] = useState<any>(null);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const Countryoptions = [
    { value: "Principal", label: "Principal" },
    { value: "Secundario", label: "Secundario" },
    { value: "Tercer", label: "Tercer" },
    { value: "Cuarto", label: "Cuarto" },
  ];

  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const [reportData, setReportData] = useState<any[]>([]);
  const openTable = async () => {
    try {
      const formattedStartDate = startDate
        ? `${startDate.getDate().toString().padStart(2, "0")}-${(
            startDate.getMonth() + 1
          )
            .toString()
            .padStart(2, "0")}-${startDate.getFullYear()}`
        : null;
      const formattedEndDate = endDate
        ? `${endDate.getDate().toString().padStart(2, "0")}-${(
            endDate.getMonth() + 1
          )
            .toString()
            .padStart(2, "0")}-${endDate.getFullYear()}`
        : null;

      console.log("startDate", startDate, "endDate", endDate);
      
      console.log(
        "formattedStartDate",
        formattedStartDate,
        "formattedEndDate",
        formattedEndDate
      );

      if (!formattedStartDate || !formattedEndDate) {
        console.error("Las fechas no son válidas");
        return;
      }
      
      const response = await report.post("api/report/accumulated/day/table", {
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      });

      console.log(response.data); 
      setReportData(response.data);
    } catch (error) {
      console.error("Error al cargar los datos del informe", error);
    }
  };

  const openPdf = async () => {
    try {
      const formattedStartDate =
        startDate?.day + "-" + startDate?.month.number + "-" + startDate?.year;
      const formattedEndDate =
        endDate?.day + "-" + endDate?.month.number + "-" + endDate?.year;

      console.log(
        "formattedStartDate",
        formattedStartDate,
        "formattedEndDate",
        formattedEndDate
      );

      if (!formattedStartDate || !formattedEndDate) {
        console.error("Las fechas no son válidas");
        return;
      }

      const response = await report.post(
        "api/report/accumulated/day/pdf",
        {
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        },
        {
          responseType: "blob",
        }
      );

      const arrayBuffer = await response.data.arrayBuffer();

      const blob = new Blob([arrayBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      window.open(url, "_blank");
    } catch (error) {
      console.error("Error al cargar los datos del informe", error);
    }
  };

  const openExcel = async () => {
    try {
      const formattedStartDate = `${startDate?.day}-${startDate?.month.number}-${startDate?.year}`;
      const formattedEndDate = `${endDate?.day}-${endDate?.month.number}-${endDate?.year}`;

      console.log(
        "formattedStartDate",
        formattedStartDate,
        "formattedEndDate",
        formattedEndDate
      );

      if (!formattedStartDate || !formattedEndDate) {
        console.error("Las fechas no son válidas");
        return;
      }

      const response = await report.post(
        "api/report/accumulated/day/excel",
        {
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        },
        {
          responseType: "blob", // Especificar que esperamos una respuesta de tipo blob
        }
      );

      const arrayBuffer = await response.data.arrayBuffer();

      const blob = new Blob([arrayBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = URL.createObjectURL(blob);

      window.open(url, "_blank");
    } catch (error) {
      console.error("Error al cargar los datos del informe", error);
    }
  };

  const handleDateChange = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    setStartDate(formattedDate);
  };

  console.log("dataAcumulateDAyay", reportData);
  return (
    <div>
      <PageHeaders
        title="Reporte Acumulado por Día"
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
                        format="DD/MM/YYYY"
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
                        format="DD/MM/YYYY"
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
                    <Label className="form-label">Selecciona un Local: </Label>
                  </div>
                  <div className="wd-200 mg-b-30">
                    <Select
                      defaultValue={countryOption}
                      onChange={setCountryOption}
                      options={Countryoptions}
                      placeholder="Local"
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
                          onClick={() => openTable()}
                        >
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
                        </Button>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg="12">
                        <Button
                          color=""
                          type="button"
                          className="btn btn-primary btn-svgs btn-svg-white mt-4 ml-4 mr-4 "
                          onClick={() => openPdf()}
                        >
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
                        </Button>
                        <Button
                          color=""
                          type="button"
                          className="btn btn-primary btn-svgs btn-svg-white mt-4 ml-4 mr-4 "
                          onClick={() => openExcel()}
                        >
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
              <BasicTable data={reportData} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

AccumulatedDay.propTypes = {};

AccumulatedDay.defaultProps = {};

export default AccumulatedDay;
