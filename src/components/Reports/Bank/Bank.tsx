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
import DatePicker from "react-multi-date-picker";
import Select from "react-select";
import axios from "axios";
import { report } from "../../../Util/axios";
import { BasicTable } from "./DataTable/Basictable";
import { es } from "date-fns/locale";
import { format } from "date-fns";

const Bank = () => {
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
      
      const response = await report.get("api/report/bank/table");

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
        title="Reporte de Bancos"
        home="Home"
        name="Pages"
        fonticonsname="Empty"
      />

      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <CardTitle>Listado de Bancos</CardTitle>
            </CardHeader>
            <CardBody>
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
                          <span className="btn-svg-text">CONSULTAR</span>
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

Bank.propTypes = {};

Bank.defaultProps = {};

export default Bank;
