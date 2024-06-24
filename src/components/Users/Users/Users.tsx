import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, CardBody, Button, Input, Modal } from "reactstrap";
import { PageHeaderstyle } from "./../../../Shared/Prism/Prism";
import { Modaluser } from "./Modal/CreateUser";
import EditUser from "./Modal/EditUser";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser } from "../../../Redux/User/Action/Action";
import axios from "axios";
import Swal from "sweetalert2";
import { UserState } from "../../../Redux/User/Reducer/reducer";
import { User } from "../../../Redux/User/Reducer/reducer";

const UserList02 = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state: UserState) => state.user.users);

  useEffect(() => {
    fetchUsers()(dispatch);
  }, [dispatch]);

  const [alert, setAlert] = useState("Congratulations!");

  const [filteredData, setFilteredData] = useState<User[]>([]);

  const handleSearch = (inputData: string) => {
    const filteredUsers = userData.filter((user) =>
      user.name.toLowerCase().includes(inputData.toLowerCase())
    );
    setFilteredData(filteredUsers);
  };

  const displayData = filteredData.length > 0 ? filteredData : userData;

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
        deleteUser(userId)(dispatch);
        Swal.fire(
          "Eliminado!",
          "El usuario ha sido eliminado.",
          "success"
        );
      }
    });
  };

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const handleEdit = (userId) => {
    setSelectedUserId(userId);
    toggle();
  };
  return (
    <div>
      <PageHeaderstyle
        title="Lista de Usuarios"
        home="Home"
        Pages="Apps"
        elements="User List"
        name="User List 02"
      />
      <Row className="flex-lg-nowrap">
        <Col className="col-12">
          <Row className="flex-lg-nowrap">
            <Col className="col-12 mb-3">
              <Card className="e-panel ">
                <CardBody>
                  <Row>
                    <Col className="mb-4">
                      <Modaluser />
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
                            placeholder="Search User"
                            onChange={(ele) => handleSearch(ele.target.value)} // Cambiado de myfunction a handleSearch
                          />
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    {userData.map((list, index) => (
                      <Col xl={6} key={index}>
                        <div className="d-sm-flex align-items-center border p-3 mb-3 br-7">
                          <img
                            className="avatar avatar-lg brround d-block cover-image"
                            src={list.photo}
                          />

                          <div className="wrapper ms-sm-3  mt-4 mt-sm-0">
                            <p className="mb-0 mt-1 text-dark font-weight-semibold">
                              {list.name}
                            </p>
                            <small className="text-muted">{list.email}</small>
                            <br />
                            <small className="text-muted">
                              {list.roles.map((role) => role.name).join(", ")}
                            </small>
                          </div>
                          <div className="float-sm-end ms-auto mt-4 mt-sm-0">
                            <button
                              className="btn btn-primary btn-sm m-2"
                              onClick={() => handleEdit(list.id)}
                            >
                              Editar
                            </button>

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

      <Modal isOpen={modal} toggle={toggle} size="lg">
        <EditUser userId={selectedUserId || 0} toggle={toggle} onClose={toggle} /> {/* Pasando userId */}
      </Modal>
    </div>
  );
};

export default UserList02;
