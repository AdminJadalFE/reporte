import React, { useState, useEffect } from 'react';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Breadcrumb, BreadcrumbItem, Input, Modal, Button, ModalHeader, Label, ModalBody, Form, Row, Col, ModalFooter, Dropdown, DropdownMenu, DropdownItem, UncontrolledDropdown, DropdownToggle } from "reactstrap";
import { addDays } from 'date-fns';
import { DateRangePicker } from 'react-date-range';
import Select from 'react-select';
import { useDispatch, useSelector } from "react-redux";
import { createRol } from "../../../../Redux/Rol/Action/Action";
import Swal from "sweetalert2";
import { fetchPermissions } from "../../../../Redux/Permission/Action/Action";
import { PermissionState } from "../../../../Redux/Permission/Reducer/reducer";

export const PageHeader = (props: any) => {  
  const [dropdownOpen, setDropdownOpen] = useState<any>(false);

  const selectopen = () => setDropdownOpen((prevState: any) => !prevState);
  const [state, setState] = useState<any>([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);
  return (
    <div className="page-header">
      <div className="page-leftheader">
        <h4 className="page-title">{props.title}</h4>
      </div>
      <div className="page-rightheader ms-auto d-lg-flex d-none">
        <div className="ms-5 mb-0">
          <span className="btn btn-white date-range-btn" id="daterange-btn">
            <svg className="header-icon2 me-3" x="1008" y="1248" viewBox="0 0 24 24" height="100%" width="100%" preserveAspectRatio="xMidYMid meet" focusable="false">
              <path d="M5 8h14V6H5z" opacity=".3" /><path d="M7 11h2v2H7zm12-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-4 3h2v2h-2zm-4 0h2v2h-2z" />
            </svg>
            <Dropdown tag="span" isOpen={dropdownOpen} toggle={selectopen}>
              <DropdownToggle tag="span" caret>{props.date}{' '}</DropdownToggle>
              <DropdownMenu className='mt-3'>
              <DateRangePicker
                    className="dashboard-select"
                    onChange={item => setState([item.selection])}
                    moveRangeOnFirstSelection={false}
                    months={1}
                    ranges={state}
                    direction="horizontal"
                  />
              </DropdownMenu>
            </Dropdown>
          </span>
        </div>
      </div>
    </div>
  );
}
export const PageHeaders = (props: any) => {
  return (
    <div className="page-header">
      <div className="page-leftheader">
        <h4 className="page-title">{props.title}</h4>
      </div>
      <div className="page-rightheader ms-auto d-lg-flex d-none">
        <Breadcrumb>
          <BreadcrumbItem className="d-flex">
            <a href="#">
              <svg
                className="svg-icon"
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3zm5 15h-2v-6H9v6H7v-7.81l5-4.5 5 4.5V18z" />
                <path d="M7 10.19V18h2v-6h6v6h2v-7.81l-5-4.5z" opacity=".3" />
              </svg>
              <span className="breadcrumb-icon">{props.home}</span>
            </a>
          </BreadcrumbItem>
          <BreadcrumbItem ><a href="#">{props.name}</a>
          </BreadcrumbItem>
          <BreadcrumbItem active aria-current="page">
            {props.fonticonsname}
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
    </div>
  )
}
export const PageHeaderstyle = (props: any) => {
  return (
    <div className="page-header">
      <div className="page-leftheader">
        <h4 className="page-title">{props.title}</h4>
      </div>
      <div className="page-rightheader ms-auto d-lg-flex d-none">
        <Breadcrumb tag="ol" className="">
          <BreadcrumbItem tag="li" className=""><a href="#" className="d-flex"><svg className="svg-icon" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3zm5 15h-2v-6H9v6H7v-7.81l5-4.5 5 4.5V18z" /><path d="M7 10.19V18h2v-6h6v6h2v-7.81l-5-4.5z" opacity=".3" /></svg><span className="breadcrumb-icon"> {props.home}</span></a></BreadcrumbItem>
          <BreadcrumbItem tag="li" className=""><a href="#">{props.Pages}</a></BreadcrumbItem>
          <BreadcrumbItem tag="li" className=""><a href="#">{props.elements}</a></BreadcrumbItem>
          <BreadcrumbItem tag="li" className=" " active aria-current="page">{props.name}</BreadcrumbItem>
        </Breadcrumb>
      </div>
    </div>
  )
}


export function Modalrol(args: any) {
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const permissionData = useSelector((state: PermissionState) => (state.permission.permissions as { id: number, name: string }[]));

  useEffect(() => {
    fetchPermissions()(dispatch);
  }, [dispatch]);

  const [formData, setFormData] = useState({
    name: '',
    permissions: [] as string[], 
  });

  const toggle = () => setModal(!modal);

  function registroAlert() {
    Swal.fire({
      title: "Registrado",
      icon: "success",
      allowOutsideClick: false,
      confirmButtonText: "ok",
      cancelButtonColor: "#4454c3",
      text: "Se registró al usuario correctamente.",
    });
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleCheckboxChange = (permission: string) => {
    const isChecked = formData.permissions.includes(permission);

    if (isChecked) {
      // Si ya estaba marcado, quítalo
      setFormData({
        ...formData,
        permissions: formData.permissions.filter((p) => p !== permission),
      });
    } else {
      // Si no estaba marcado, agrégalo
      setFormData({
        ...formData,
        permissions: [...formData.permissions, permission],
      });
    }
  };

  const handleSave = () => {
    console.log('Enviando datos al backend:', formData);
    createRol(formData)(dispatch);
    toggle();
    registroAlert();
  };

  return (
    <div>
      <Button color="primary" onClick={toggle}>
        <i className="fe fe-plus"></i> Agregar Rol
      </Button>
      <Modal isOpen={modal} toggle={toggle} {...args} size="lg">
        <ModalHeader toggle={toggle}>Crear Rol</ModalHeader>
        <ModalBody>
          <div className="py-1">
            <Form className="form" noValidate>
              <Row>
                <Col>
                  <Row>
                    <Col>
                      <div className="mb-3">
                        <Label>Nombre del Rol</Label>
                        <Input
                          className="form-control"
                          type="text"
                          name="name"
                          placeholder="rol"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col sm={12} className="col-12 mb-3">
                  <Row>
                    <Col xl="4" className="mt-4 mt-xl-0">
                      <div className="mb-3 m-0">
                        <div className="custom-controls-stacked">
                          {permissionData.map((permission) => (
                            <Label
                              key={permission.id}
                              className="custom-control custom-checkbox custom-control-md"
                            >
                              <Input
                                type="checkbox"
                                className="custom-control-input"
                                name={permission.name}
                                checked={formData.permissions.includes(permission.name)}
                                onChange={() => handleCheckboxChange(permission.name)}
                              />
                              <span className="custom-control-label custom-control-label-md">
                                {permission.name}
                              </span>
                            </Label>
                          ))}
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Form>
          </div>
        </ModalBody>
        <ModalFooter>
          <Row>
            <Col className="d-flex justify-content-end">
              <Button color="" className="btn btn-primary" onClick={handleSave}>
                Guardar
              </Button>
            </Col>
          </Row>
        </ModalFooter>
      </Modal>
    </div>
  );
}