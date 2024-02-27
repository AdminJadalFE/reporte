import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Row,
  CardHeader,
  CardTitle,
  CardBody,
  Label,
  Input,
  Table,
  CardFooter,
} from "reactstrap";
import { PageHeaderstyle } from "./../../Shared/Prism/Prism";

export default function Sales() {
  return (
    <div>
      <PageHeaderstyle
        title="Ventas"
        home="Home"
        Pages="Pages"
        elements="Invoice"
        name="Add Invoice"
      />
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <CardTitle>Ventas</CardTitle>
            </CardHeader>
            <CardBody>
              <Row>
                <Col className="col-12">
                  <Row className="mb-3">
                    <Col md="3">
                      <Label className="form-label">Código</Label>
                      <Input
                        className="form-control"
                        placeholder="Código"
                      />
                    </Col>
                    <Col md="2">
                      <Label className="form-label">Consultar</Label>
                      <Button color="" type="button" className="btn btn-info">
                        <i className="fe fe-search me-2"></i>Consultar
                      </Button>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md="6">
                      <Label className="form-label">Nombres y Apellidos</Label>
                      <Input
                        className="form-control"
                        placeholder="Nombres y Apellidos"
                      />
                    </Col>
                    <Col md="6">
                      <Label className="form-label">Dirección</Label>
                      <Input className="form-control" placeholder="Dirección" />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md="6">
                      <Label className="form-label">Correo Electrónico</Label>
                      <Input className="form-control" placeholder="Correo Electrónico" />
                    </Col>
                    <Col md="6">
                      <Label className="form-label">Orden de Pedido</Label>
                      <Input className="form-control" placeholder="Orden de Pedido" />
                    </Col>                    
                  </Row>
                  <Row className="mb-3">
                    <Col md="6">
                      <Label className="form-label">Placa</Label>
                      <Input
                        className="form-control"
                        placeholder="Placa"
                      />
                    </Col>
                    <Col md="6">
                      <Label className="form-label">Kilometraje</Label>
                      <Input
                        className="form-control"
                        placeholder="Kilometraje"
                      />
                    </Col>                    
                  </Row>
                  <Row className="mb-3">
                    <Col md="6">
                      <Label className="form-label">Conductor</Label>
                      <Input
                        className="form-control"
                        placeholder="Conductor"
                      />
                    </Col>
                    <Col md="6">
                      <Label className="form-label">Tip.DocBunos</Label>
                      <Input
                        className="form-control"
                        placeholder="Tip.DocBunos"
                      />
                    </Col>                    
                  </Row>
                  <Row className="mb-3">
                    <Col md="6">
                      <Label className="form-label">TARJ. BONUS</Label>
                      <Input
                        className="form-control"
                        placeholder="TARJ. BONUS"
                      />
                    </Col>
                  </Row>                                                        
                </Col>
              </Row>
              <div className="table-responsive">
                <Table className="table nowrap text-nowrap border mt-5">
                  <thead>
                    <tr>
                      <th>PRODUCT</th>
                      <th className="w-40">DESCRIPTION</th>
                      <th>QNTY</th>
                      <th>UNIT PRICE</th>
                      <th>AMOUNT</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <Input
                          className="form-control"
                          placeholder=""
                          type="text"
                        />
                      </td>
                      <td>
                        <textarea rows={1} className="form-control"></textarea>
                      </td>
                      <td>
                        <Input
                          className="form-control"
                          placeholder=""
                          type="text"
                        />
                      </td>
                      <td>
                        <Input
                          className="form-control"
                          placeholder=""
                          type="text"
                        />
                      </td>
                      <td>
                        <Input
                          className="form-control"
                          placeholder=""
                          type="text"
                        />
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td>
                        <Link className="btn btn-light" to="#">
                          <i className="fe fe-plus"></i> Add Product
                        </Link>
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tfoot>
                </Table>
              </div>
              <Row>
                <Col md="12">
                  <Label className="form-label">Vat Rate</Label>
                  <Input
                    className="form-control"
                    placeholder="Vat Rate"
                    type="text"
                  />
                </Col>
              </Row>
            </CardBody>
            <CardFooter className="card-footer">
              <Row>
                <Col className="col">
                  <div className="btn-list">
                    <Link className="btn btn-success me-1" to="#">
                      <i className="fe fe-plus"></i> Add New Invoice
                    </Link>
                    <Link className="btn btn-light me-1" to="#">
                      Cancel
                    </Link>
                  </div>
                </Col>
              </Row>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </div>
  );
}