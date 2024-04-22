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
import axios from "axios";
import Select, { ActionMeta } from "react-select";
import { ChangeEvent } from "react";
import { sire } from "../../../Util/axios";
import{BasicTable} from "../Component/Basictable"
import Swal from 'sweetalert2';

interface Period {
  value: string;
  label: string;
  lisPeriodos: any[];
}

const Sales = () => {
  const [periodsData, setPeriodsData] = useState<Period[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<Period | null>(null);
  const [ticketValue, setTicketValue] = useState<Ticket | null>(null);
  const [estadoProceso, setEstadoProceso] = useState<string | null>(null);
  const [modal, setModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [ticketsData, setTicketsData] = useState<Ticket[]>([]);
  const [ticketData, setTicketData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false); 

  interface Ticket {
    id: number;
    numTicket: string;
    perTributario: string;
    fecInicioProceso: string;
    // Otros campos de la interfaz Ticket, si los hay
  }

  const toggle = () => {
    setModal(!modal);
    setSelectedTicket(null);
  };

  useEffect(() => {
    const fetchPeriodsData = async () => {
      try {
        const response = await sire.get("/periods");
        setPeriodsData(response.data);
      } catch (error) {
        console.error("Error fetching periods data:", error);
      }
    };

    fetchPeriodsData();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await sire.get("/tickets");
      const filteredTickets = selectedPeriod
        ? response.data.filter(
            (ticket: Ticket) => ticket.perTributario === selectedPeriod.value
          )
        : response.data;
      setTicketsData(filteredTickets);
    } catch (error) {
      console.error("Error fetching tickets data:", error);
    }
  };

  const periodOptions: Period[] = periodsData.flatMap((period) =>
    period.lisPeriodos.map((item: any) => ({
      value: item.perTributario,
      label: item.perTributario
        ? `${item.perTributario.substring(0, 4)}-${item.perTributario.substring(
            4
          )}`
        : "",
      lisPeriodos: period.lisPeriodos,
    }))
  );

  const generarTicket = async () => {
    if (selectedPeriod) {
      try {
        const response = await sire.post("/ticket", {
          fecha: selectedPeriod.value,
        });
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

  const consultarEstadoProceso = async (numTicket: string) => {
    try {
      const response = await sire.post("/check/ticket", {
        ticket: numTicket,
      });
      console.log("Estado del proceso:", response.data);
      setEstadoProceso(response.data.registros[0].desEstadoProceso);
    } catch (error) {
      console.error("Error fetching ticket status:", error);
    }
  };

  const mostrarData = async () => {
    try {

    // Verificar si se ha seleccionado un período
    if (!selectedPeriod) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes seleccionar un período antes de mostrar los datos',
      });
      return;
    }

    // Verificar si el estado del ticket está Terminado
    if (estadoProceso !== 'Terminado') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El estado del ticket debe estar Terminado para mostrar los datos',
      });
      return;
    }

    setLoading(true);

      const responseSire = await sire.post("/compare", {
        ticket: ticketValue ? ticketValue.numTicket : null,
        fecha_jadal: selectedPeriod ? selectedPeriod.value : null,
      });
      console.log("Data del ticket SIRE:", responseSire.data);

      const mergedData = [...responseSire.data];
      console.log("Merged and sorted data:", mergedData);

      setTicketData(mergedData);
      
      // Detener el estado de carga
      setLoading(false);
    } catch (error) {
      console.error("Error fetching ticket data:", error);
    }
  };
  const getColor = (indicador: string) => {
    switch (indicador) {
      case "1":
        return "#5dc460";
      case "2":
        return "#c8ca66";
      case "3":
        return "#6a9eda";
      default:
        return "#ff6961";
    }
  };

  const handleTicketSelection = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setTicketValue({
      numTicket: ticket.numTicket,
      id: ticket.id ?? "",
      perTributario: ticket.perTributario ?? "",
      fecInicioProceso: ticket.fecInicioProceso ?? "",
    });
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
                          onChange={(newValue, actionMeta) => {
                            if (newValue !== null) {
                              const selectedOption = newValue as Period;
                              setSelectedPeriod(selectedOption);
                            } else {
                              setSelectedPeriod(null);
                            }
                          }}
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
                                    <td>
                                      {ticket.fecInicioProceso
                                        ? ticket.fecInicioProceso.substring(
                                            0,
                                            10
                                          )
                                        : ""}
                                    </td>
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
                            setTicketValue({
                              ...ticketValue!,
                              numTicket: e.target.value,
                            })
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
                              ticketValue ? ticketValue.numTicket || "" : ""
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
                      className={`btn btn-primary ${loading ? 'btn-loading' : ''}`}
                      disabled={loading}
                      onClick={mostrarData}
                    >
                      {loading ? 'Cargando...' : 'Mostrar Data'}
                    </Button>
                    
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <div className="mt-4">
                  <h3>Leyenda</h3>
                  <Button style={{ backgroundColor: "#ff6961" }}>0</Button>{" "}
                  <span>Si el documento solo está en SIRE o JADAL.</span>
                  <Button style={{ backgroundColor: "#5dc460" }}>1</Button>{" "}
                  <span>Si el documento está en SIRE y JADAL.</span>
                  <Button style={{ backgroundColor: "#c8ca66" }}>2</Button>{" "}
                  <span>Si el documento está con fecha distinta.</span>
                  <Button style={{ backgroundColor: "#6a9eda" }}>3</Button>{" "}
                  <span>Si el documento está con montos distintos.</span>
                </div>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <CardTitle>Data SIRE JADAL</CardTitle>
            </CardHeader>
            <CardBody>
              <Row>
                <Col lg="12">
                  <BasicTable ticketData={ticketData} />
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