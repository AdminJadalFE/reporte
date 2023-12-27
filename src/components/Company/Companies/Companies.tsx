import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, CardBody, Input } from "reactstrap";
import { PageHeaderstyle } from "./../../../Shared/Prism/Prism";
import { fetchUsers,deleteUser } from "../../../Redux/User/Action/Action";
import axios from 'axios';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanies } from "../../../Redux/Company/Action/Action";
import { Modalcompany } from "../Modal/CreateCompany";

const Companies = () => {
  const dispatch = useDispatch();
  const companyData = useSelector((state) => state.company.companies);

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  return (
    <div>
    <PageHeaderstyle title="Lista de Empresas"home="Home"Pages="Apps"elements="User List"name="User List 02"/>
      <Row className="flex-lg-nowrap">
        <Col className="col-12">
          <Row className="flex-lg-nowrap">
            <Col className="col-12 mb-3">
              <Card className="e-panel ">
                <CardBody>
                  <Row>
                    <Col>
                      <Modalcompany/>
                    </Col>
                    <Col className="col-auto mb-4">
                      <div className="mb-3 w-100">
                        <div className="input-icon">
                          <span className="input-icon-addon">
                            <i className="fe fe-search"></i>
                          </span>
                          <Input
                            type="text"
                            className="form-control"
                            placeholder="Buscar Empresa"
                            onChange={(ele) => handleSearch(ele.target.value)}  // Cambiado de myfunction a handleSearch
                          />
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    {companyData.map((list, index) => (
                      <Col xl={6} key={index}>
                        <div className="d-sm-flex align-items-center border p-3 mb-3 br-7">


                          <div className="wrapper ms-sm-3  mt-4 mt-sm-0">
                            <p className="mb-0 mt-1 text-dark font-weight-semibold">
                              Empresa: {list.name}
                            </p>
                            <small className="text-muted">RUC: {list.number}</small>
                            <br/>
                            
                          </div>
                          <div className="float-sm-end ms-auto mt-4 mt-sm-0">
                            <Link
                              to="#"
                              className="btn btn-primary btn-sm m-2"
                            >
                              Editar
                            </Link>
                            <button
                              className="btn btn-danger btn-sm m-2"
                              onClick={() => handleDelete(list.id)}
                            >
                              Eliminar
                            </button>                        
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Companies;
