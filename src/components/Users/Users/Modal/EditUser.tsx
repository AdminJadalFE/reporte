import React from "react";
import { Breadcrumb, BreadcrumbItem, Input, Modal, Button, ModalHeader, Label, ModalBody, Form, Row, Col, ModalFooter, Dropdown, DropdownMenu, DropdownItem, UncontrolledDropdown, DropdownToggle } from "reactstrap";

const EditUser = ({ userId, toggle, ...props }) => {
  return (
    <div>
      <ModalHeader toggle={toggle}>Crear Usuario</ModalHeader>
      <ModalFooter>
      <Row>
        <Col className="d-flex justify-content-end">
          <Button color="" className="btn btn-primary">
            Guardar
          </Button>
        </Col>
      </Row>
    </ModalFooter>
    </div>
  );
};

export default EditUser;
