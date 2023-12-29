import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalFooter, Button, Row, Col, ModalBody } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { showUserById } from '../../../../Redux/User/Action/Action';

const EditUser = ({ userId, toggle, onClose, ...props }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userDetail);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        dispatch(showUserById({ userId }));
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      }
    };

    fetchUser();
  }, [dispatch, userId]);

  // Mueve el `useSelector` fuera de la función asíncrona
  const userFromState = useSelector((state) => state.user.userDetail);
  
  console.log('userDetail', userFromState);

  return (
    <Modal isOpen={true} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Editar Usuario {userId}</ModalHeader>
      <ModalBody>
        {user ? (
          <>
            <p>Usuario ID: {userId}</p>
            {/* Mostrar información del usuario, por ejemplo: */}
            <p>Nombre: {user.name}</p>
            <p>Email: {user.email}</p>
            {/* Agrega más campos según la estructura de datos del usuario */}
          </>
        ) : (
          <p>Cargando información del usuario...</p>
        )}
      </ModalBody>
      <ModalFooter>
        <Row>
          <Col className="d-flex justify-content-end">
            <Button color="secondary" onClick={onClose}>
              Cerrar
            </Button>
            <Button color="primary" className="ml-2">
              Guardar
            </Button>
          </Col>
        </Row>
      </ModalFooter>
    </Modal>
  );
};

export default EditUser;
