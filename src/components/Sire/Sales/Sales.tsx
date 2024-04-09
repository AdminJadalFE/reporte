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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";
import { PageHeaders } from "../../../Shared/Prism/Prism";
import Select from "react-select";
import axios from "axios";

const Sales = () => {
  const [periodsData, setPeriodsData] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [ticketValue, setTicketValue] = useState(null);
  const [estadoProceso, setEstadoProceso] = useState(null);
  const [modal, setModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [ticketsData, setTicketsData] = useState([]);
  const [ticketData, setTicketData] = useState([]);

  const toggle = () => {
    setModal(!modal);
    setSelectedTicket(null);
  };

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

  const periodOptions = periodsData.flatMap((period) =>
    period.lisPeriodos.map((item) => ({
      value: item.perTributario,
      label: item.perTributario ? `${item.perTributario.substring(0, 4)}-${item.perTributario.substring(4)}` : "",
    }))
  );

  const generarTicket = async () => {
    if (selectedPeriod) {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/sire/ticket",
          {
            fecha: selectedPeriod.value,
          }
        );
        console.log("Response from ticket endpoint:", response.data);
        setTicketValue(response.data);
        consultarEstadoProceso(response.data.numTicket);
      } catch (error) {
        console.error("Error fetching ticket data:", error);
      }
    } else {
      console.error("No period selected");
    }
  };

  const consultarEstadoProceso = async (numTicket) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/sire/check/ticket",
        {
          ticket: numTicket,
        }
      );
      console.log("Estado del proceso:", response.data);
      setEstadoProceso(response.data.registros[0].desEstadoProceso);
    } catch (error) {
      console.error("Error fetching ticket status:", error);
    }
  };

  const mostrarData = async () => {
    try {
      const responseSire = await axios.post("http://127.0.0.1:8000/api/sire/compare", {
        ticket: ticketValue ? ticketValue.numTicket : null,
      });
      console.log("Data del ticket SIRE:", responseSire.data);


      // Unir y ordenar la data de SIRE y JADAL por fecha
      const mergedData = [...responseSire.data];
      
      console.log('Merged and sorted data:', mergedData);

      setTicketData(mergedData);
    } catch (error) {
      console.error("Error fetching ticket data:", error);
    }
  };

  const handleTicketSelection = (ticket) => {
    setSelectedTicket(ticket); 
    setTicketValue({ numTicket: ticket.numTicket });
    toggle();
  };

  useEffect(() => {
    fetchTickets();
  }, [selectedPeriod]);

  return (
    <div>
      <PageHeaders
        title="SIRE Ventas"
        home="Home"
        name="Pages"
        fonticonsname="Empty"
      />

      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <CardTitle>Datos de Ventas del SIRE</CardTitle>
            </CardHeader>
            <CardBody>
              <Row>
                <Col lg="12">
                  <div className="mb-3 mt-3">
                    <Label className="form-label">Opciones:</Label>
                  </div>

                  <Row>
                    <Col md="4">
                      <div className="mb-3">
                        <Label className="form-label">
                          Período Tributario <span className="text-red">*</span>
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
                      <div className="d-flex align-items-end mt-3">
                        <Button
                          color=""
                          type="button"
                          className="btn btn-primary btn-svgs btn-svg-white mt-4 mx-2"
                          onClick={generarTicket}
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
                          <span className="btn-svg-text">GENERAR TICKET</span>
                        </Button>

                        <Button
                          color=""
                          className="btn btn-primary"
                          onClick={toggle}
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
                          <span className="btn-svg-text">
                            VER TICKETS DEL PERÍODO
                          </span>
                        </Button>

                        <Modal isOpen={modal} toggle={toggle} size="lg">
                          <ModalHeader toggle={toggle}>
                            Listado de Tickets
                          </ModalHeader>
                          <ModalBody>
                            <h6>Listado de Tickets</h6>
                            <Table>
                              <thead>
                                <tr>
                                  <th>ID</th>
                                  <th>Período Tributario</th>
                                  <th>Número de Ticket</th>
                                  <th>Fecha de Inicio del Proceso</th>
                                  <th>Seleccionar</th>
                                </tr>
                              </thead>
                              <tbody>
                                {ticketsData.map((ticket) => (
                                  <tr key={ticket.id}>
                                    <td>{ticket.id}</td>
                                    <td>{ticket.perTributario}</td>
                                    <td>{ticket.numTicket}</td>
                                    <td>{ticket.fecInicioProceso ? ticket.fecInicioProceso.substring(0, 10) : ''}</td>
                                    <td>
                                      <Button
                                        color="primary"
                                        onClick={() =>
                                          handleTicketSelection(ticket)
                                        }
                                      >
                                        Seleccionar
                                      </Button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                          </ModalBody>
                          <ModalFooter>
                            <Button
                              color=""
                              className="btn btn-light"
                              onClick={toggle}
                            >
                              Cerrar
                            </Button>
                          </ModalFooter>
                        </Modal>
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="3">
                      <div className="mb-3 mt-3">
                        <h4>Valor del Ticket:</h4>
                        <Input
                          type="text"
                          value={ticketValue ? ticketValue.numTicket : ""}
                          onChange={(e) =>
                            setTicketValue({ numTicket: e.target.value })
                          }
                        />
                      </div>
                    </Col>
                    <Col lg="3">
                      <div className="d-flex align-items-end mt-5">
                        <Button
                          color=""
                          type="button"
                          className="btn btn-primary btn-svgs btn-svg-white mt-4 ml-4 mr-4"
                          onClick={() =>
                            consultarEstadoProceso(
                              ticketValue ? ticketValue.numTicket : null
                            )
                          }
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
                          <span className="btn-svg-text">CONSULTAR TICKET</span>
                        </Button>
                      </div>
                    </Col>
                    <Col lg="3">
                      <div className="mb-3 mt-3">
                        <h4>Estado del Ticket:</h4>
                        {estadoProceso ? (
                          <p>{estadoProceso}</p>
                        ) : (
                          <p>No se ha generado ningún ticket aún</p>
                        )}
                      </div>
                    </Col>
                    <Col lg="3">
                      <div className="d-flex align-items-end mt-5">
                        <Button
                          color=""
                          type="button"
                          className="btn btn-primary btn-svgs btn-svg-white mt-4 ml-4 mr-4"
                          onClick={mostrarData}
                        >
                          Mostrar Data
                        </Button>
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    {ticketData.length > 0 && (
                      <div className="mt-4">
                        <h3>Data del Ticket</h3>
                        <Table className="table table-hover table-bordered">
                          <thead>
                            <tr>
                              {Object.keys(ticketData[0]).map((key) => (
                                <th key={key}>{key}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {ticketData.map((row, index) => (
                              <tr key={index}>
                                {Object.values(row).map((value, index) => (
                                  <td key={index}>{value}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    )}
                  </Row>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Sales;
