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
} from "reactstrap";
import { PageHeaders } from "../../../Shared/Prism/Prism";
import DatePicker from "react-multi-date-picker";
import Select from "react-select";
import axios from "axios";
import { Fixedheader } from ".//DataTable/Fixedheader";

const Invoice = () => {
  console.log("asdfasdfasdf");
  const [dates, setDates] = useState<any>();
  const [countryOption, setCountryOption] = useState<any>(null);
  const Countryoptions = [
    { value: "Germany", label: "Germany" },
    { value: "Canada", label: "Canada" },
    { value: "Usa", label: "Usa" },
    { value: "Aus", label: "Aus" },
  ];

  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const openPdf = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8003/api/report/sale/pdf/day",
        {
          responseType: "arraybuffer",
        }
      );
      const blob = new Blob([response.data], { type: "application/pdf" });
      const pdfUrl = URL.createObjectURL(blob);
      setPdfUrl(pdfUrl);
    } catch (error) {
      console.error("Error al cargar el PDF", error);
    }
  };

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
                <Col lg="6">
                  <div className="mb-3">
                    <Label className="form-label">Cliente: </Label>
                  </div>
                  <div className="row row-sm">
                    <div className="col-lg">
                      <Input
                        className="form-control mb-4"
                        placeholder="cliente"
                        type="text"
                      />
                    </div>
                  </div>
                </Col>

                <Col lg="6">
                  <div className="mb-3">
                    <Label className="form-label">Número de Documento: </Label>
                  </div>
                  <div className="row row-sm">
                    <div className="col-lg">
                      <Input
                        className="form-control mb-4"
                        placeholder="número de documento"
                        type="text"
                      />
                    </div>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col lg="6">
                  <div className="mb-3">
                    <Label className="form-label">Fecha de Inicio: </Label>
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
                        className="form-control"
                        placeholder="Date Range"
                        value={dates}
                        onChange={setDates}
                        multiple
                        numberOfMonths={1}
                      />
                    </div>
                  </div>
                </Col>
                <Col lg="6">
                  <div className="mb-3">
                    <Label className="form-label">Fecha de Fin: </Label>
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
                        className="form-control"
                        placeholder="Date Range"
                        value={dates}
                        onChange={setDates}
                        multiple
                        numberOfMonths={1}
                      />
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg="6">
                  <div className="mb-3 mt-3">
                    <Label className="form-label">Situación: </Label>
                  </div>
                  <div className="wd-200 mg-b-30">
                    <Select
                      defaultValue={countryOption}
                      onChange={setCountryOption}
                      options={Countryoptions}
                      placeholder="Country"
                      classNamePrefix="Search"
                    />
                  </div>
                </Col>

                <Col lg="6">
                  <div className="mb-3 mt-7">
                    <Button color="" tag="a" className="btn btn-primary">
                      Buscar
                    </Button>
                  </div>
                </Col>
              </Row>

              <div className="table-responsive datatble-filter">
                <Fixedheader />
              </div>

              <Row>
                <Col lg="6">
                  <div className="mb-3 mt-3">
                    <Label className="form-label">Opciones:</Label>
                  </div>

                  <div className="wd-200 mg-b-30 mb-3 mt-3">
                    <Button
                      color=""
                      type="button"
                      className="btn btn-primary btn-svgs btn-svg-white mt-4 ml-4 mr-4"
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
                      <span className="btn-svg-text">VIZUALIZAR PDF</span>
                    </Button>

                    <Button
                      color=""
                      type="button"
                      className="btn btn-primary btn-svgs btn-svg-white mt-4 ml-4 mr-4"
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
                      <span className="btn-svg-text">DESCARGAR EXCEL</span>
                    </Button>

                    <Button
                      color=""
                      type="button"
                      className="btn btn-primary btn-svgs btn-svg-white mt-4 ml-4 mr-4"
                    >
                      <svg
                        className="svg-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <path d="M.2 10a11 11 0 0119.6 0A11 11 0 01.2 10zm9.8 4a4 4 0 100-8 4 4 0 000 8zm0-2a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                      <span className="btn-svg-text">MOSTRAR/OCULTAR</span>
                    </Button>
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
