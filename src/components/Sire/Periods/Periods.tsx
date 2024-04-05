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
  Table,
  Input,
} from "reactstrap";
import { PageHeaders } from "../../../Shared/Prism/Prism";
import Select from "react-select";
import axios from "axios";

const Periods = () => {
  const [periodsData, setPeriodsData] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [ticketsData, setTicketsData] = useState([]);
  const [ticketNumber, setTicketNumber] = useState("");
  const [downloading, setDownloading] = useState(false); // Estado para controlar la visibilidad del spinner

  useEffect(() => {
    const fetchPeriodsData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/sire/periods"
        );
        setPeriodsData(response.data);
      } catch (error) {
        console.error("Error fetching periods data:", error);
      }
    };

    fetchPeriodsData();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/sire/tickets`
      );
      const filteredTickets = selectedPeriod
        ? response.data.filter(
            (ticket) => ticket.perTributario === selectedPeriod.value
          )
        : response.data;
      setTicketsData(filteredTickets);
    } catch (error) {
      console.error("Error fetching tickets data:", error);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  useEffect(() => {
    fetchTickets();
  }, [selectedPeriod]);

  const periodOptions = periodsData.flatMap((period) =>
    period.lisPeriodos.map((item) => ({
      value: item.perTributario,
      label: item.perTributario,
    }))
  );

  const handleTicketNumberChange = (event) => {
    setTicketNumber(event.target.value);
  };

  const handleDownloadTxt = async () => {
    try {
      setDownloading(true); // Mostrar spinner cuando comience la descarga

      const response = await axios.post(
        "http://127.0.0.1:8000/api/sire/download/txt",
        { ticket: ticketNumber },
        { responseType: 'blob' }
      );

      const blob = new Blob([response.data], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `SIRE_${ticketNumber}.txt`;
      link.click();
      
    } catch (error) {
      console.error("Error downloading txt file:", error);
    } finally {
      setDownloading(false); // Ocultar spinner cuando finalice la descarga
    }
  };

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
                            Período Tributario{" "}
                            <span className="text-red">*</span>
                          </Label>
                          <Select
                            value={selectedPeriod}
                            onChange={(selectedOption) =>
                              setSelectedPeriod(selectedOption)
                            }
                            options={periodOptions}
                            placeholder="Selecciona un período"
                            classNamePrefix="Search"
                          />
                        </div>
                      </Col>

                      <Col lg="4">
                        <div className="col-lg">
                          <Label className="form-label">Ingrese el Ticket:</Label>
                          <Input
                            className="form-control mb-4"
                            placeholder="Ticket"
                            type="text"
                            value={ticketNumber}
                            onChange={handleTicketNumberChange}
                          />
                        </div>
                      </Col>
                      <Col lg="2">
                        <Button
                          color=""
                          type="button"
                          className="btn btn-primary btn-svgs btn-svg-white mt-4 ml-4 mr-4"
                          onClick={handleDownloadTxt}
                          disabled={downloading} // Deshabilitar el botón mientras se descarga el archivo
                        >
                          {downloading && ( // Mostrar spinner si está descargando
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                          )}
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
                          <span className="btn-svg-text">DESCARGAR TXT</span>
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg="12">
                  <Table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Período Tributario</th>
                        <th>Número de Ticket</th>
                        <th>Fecha de Inicio del Proceso</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ticketsData.map((ticket) => (
                        <tr key={ticket.id}>
                          <td>{ticket.id}</td>
                          <td>{ticket.perTributario}</td>
                          <td>{ticket.numTicket}</td>
                          <td>{ticket.fecInicioProceso}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Periods;
