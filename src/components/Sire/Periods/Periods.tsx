import React, { useState, useEffect } from "react";
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
import { es } from "date-fns/locale";
import { format } from "date-fns";

const Periods = () => {
    const [periodsData, setPeriodsData] = useState([]);
    const [selectedPeriod, setSelectedPeriod] = useState(null);
    const [pdfUrl, setPdfUrl] = useState(null);

    useEffect(() => {
        // Función para obtener los períodos tributarios desde la API
        const fetchPeriodsData = async () => {
          try {
            const response = await axios.get(
              "http://127.0.0.1:8000/api/sire/periods"
            );
            setPeriodsData(response.data);
            console.log('response.data',response.data);
          } catch (error) {
            console.error("Error fetching periods data:", error);
          }
        };
    
        fetchPeriodsData();
      }, []);
    
      const periodOptions = periodsData.flatMap((period) =>
      period.lisPeriodos.map((item) => ({
        value: item.perTributario,
        label: item.perTributario,
      }))
    );

  return (
    <div>
      <PageHeaders
        title="Períodos disponibles"
        home="Home"
        name="Pages"
        fonticonsname="Empty"
      />

      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <CardTitle>Listado de períodos en SIRE</CardTitle>
            </CardHeader>
            <CardBody>
              <Row>
                <Col lg="12">
                  <div className="mb-3 mt-3">
                    <Label className="form-label">Opciones:</Label>
                  </div>

                  <div className="wd-200 mg-b-30 mb-3 mt-3 d-flex justify-content-between">
                    <Row>
                      <Col md="6">
                        <div className="mb-3">
                        <Label className="form-label">
                            Período Tributario <span className="text-red">*</span>
                        </Label>
                        <Select
                            value={selectedPeriod}
                            onChange={(selectedOption) => setSelectedPeriod(selectedOption)}
                            options={periodOptions}
                            placeholder="Selecciona un período"
                            classNamePrefix="Search"
                        />
                        </div>
                      </Col>
                      <Col lg="6">
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
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

Periods.propTypes = {};

Periods.defaultProps = {};

export default Periods;
