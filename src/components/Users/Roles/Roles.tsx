import React, { useEffect, useState } from "react";
import { PageHeaders } from "../../../Shared/Prism/Prism";
import { Card, CardHeader, CardBody, Table, Col, Row, Modal } from "reactstrap";
import { Modalrol } from "./Modal/CreateRol";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoles, deleteRol } from "../../../Redux/Rol/Action/Action";
import { RolState } from "../../../Redux/Rol/Reducer/reducer";
import EditRol from "./Modal/EditRol";
import Swal from "sweetalert2";

const Roles = () => {
  const [roles, setRoles] = useState([]);

  const dispatch = useDispatch();
  const rolData = useSelector((state: RolState) => state.rol.roles);

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [selectedRolId, setSelectedRolId] = useState<number | null>(null);

  useEffect(() => {
    fetchRoles()(dispatch);
  }, [dispatch]);
  console.log('rolData',rolData);
  // Sort roles by ID in ascending order
  //const sortedRoles = roles.slice().sort((a, b) => a.id - b.id);

  const handleEdit = (rolId) => {
    setSelectedRolId(rolId);
    toggle();
  }

  const handleDelete = (userId) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRol(userId)(dispatch);
        Swal.fire(
          "Eliminado!",
          "El usuario ha sido eliminado.",
          "success"
        );
      }
    });
  };

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
                              onClick={() => handleEdit(role.id)}
                            >
                              Editar
                          </button>  
                          <button
                              className="btn btn-danger btn-sm m-2"
                              onClick={() => handleDelete(role.id)}
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
      <Modal isOpen={modal} toggle={toggle} size="lg">
        <EditRol rolId={selectedRolId || 0} toggle={toggle} onClose={toggle} /> 
      </Modal>      
    </div>
  );
};

export default Roles;