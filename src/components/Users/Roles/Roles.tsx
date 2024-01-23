import React, { useEffect, useState } from "react";
import { PageHeaders } from "../../../Shared/Prism/Prism";
import { Card, CardHeader, CardBody, Table, Col, Row } from "reactstrap";
import { Modalrol } from "./Modal/CreateRol";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoles } from "../../../Redux/Rol/Action/Action";
import { RolState } from "../../../Redux/Rol/Reducer/reducer";

const Roles = () => {
  const [roles, setRoles] = useState([]);

  const dispatch = useDispatch();
  const rolData = useSelector((state: RolState) => state.rol.roles);

  useEffect(() => {
    fetchRoles()(dispatch);
  }, [dispatch]);
  console.log('rolData',rolData);
  // Sort roles by ID in ascending order
  //const sortedRoles = roles.slice().sort((a, b) => a.id - b.id);

  return (
    <div>
      <PageHeaders
        title="Lista de roles"
        home="Home"
        name="Tables"
        fonticonsname="Default Tables"
      />

      <Row>
        <Col md={12} lg={12}>
          <Card>
            <CardHeader>
              <h3 className="card-title">Roles</h3>
              <Modalrol/>
            </CardHeader>
            <CardBody className="p-0">
              <div className="table-responsive">
                <Table className="table table-striped card-table table-vcenter text-nowrap mb-0 table-bordered border-top-0">
                  <thead>
                    <tr>
                      <th className="ps-5">ID</th>
                      <th>Rol</th>
                      <th>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rolData.map((role) => (
                      <tr key={role.id}>
                        <th scope="row" className="ps-5">
                          {role.id}
                        </th>
                        <td>{role.name}</td>
                        <td>
                          <button
                              className="btn btn-primary btn-sm m-2"
                              onClick={() => console.log('ssss')}
                            >
                              Editar
                          </button>  
                          <button
                              className="btn btn-danger btn-sm m-2"
                              onClick={() => console.log('ssss')}
                            >
                              Eliminar
                          </button>  
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Roles;