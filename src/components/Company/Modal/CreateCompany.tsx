import React, { useState,useEffect } from 'react';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Breadcrumb, BreadcrumbItem, Input, Modal, Button, ModalHeader, Label, ModalBody, Form, Row, Col, ModalFooter, Dropdown, DropdownMenu, DropdownItem, UncontrolledDropdown, DropdownToggle } from "reactstrap";
import { addDays } from 'date-fns';
import { DateRangePicker } from 'react-date-range';
import Select from 'react-select';
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../Redux/User/Action/Action";
import { fetchRoles } from "../../../Redux/Rol/Action/Action";
import Swal from "sweetalert2";
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
export function Modalcompany(args: any) {


  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: null,
  });

  const [alert, setAlert] = useState("Congratulations!")

  function registroAlert() {
    Swal.fire({
      title: "Registrado",
      icon: "success",
      allowOutsideClick: false,
      confirmButtonText: "ok",
      cancelButtonColor: "#4454c3",
      text: "Se registro al usuario correctamente.",
    });
  }

  const errorAlert = (errorMessage) => {
    Swal.fire({
      title: 'Error',
      text: errorMessage,
      icon: 'error',
      confirmButtonText: 'OK',
      cancelButtonColor: '#4454c3',
    });
  };

  const [countryOption, setCountryOption] = useState<any>(null);

  const dispatch = useDispatch();
  const rolData = useSelector((state) => state.rol.roles);
  console.log('alldata',rolData);


    
  const Countryoptions = rolData.map((role) => ({
    value: role.id,
    label: role.name,
  }));

  const toggle = () => setModal(!modal);

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRoleChange = (selectedOption) => {
    setCountryOption(selectedOption);
    setFormData({
      ...formData,
      role: selectedOption?.value || null,
    });
  };

  const handleSave = () => {
    if (!formData.role) {
      errorAlert('Por favor selecciona un rol.');
      return;
    }
    if (formData.password.length < 8) {
      errorAlert('La contraseña debe tener al menos 8 caracteres');
      return;
    }
    console.log('Enviando datos al backend:', formData);
    dispatch(registerUser(formData));
    toggle();
    registroAlert();
    setFormData({
      name: '',
      email: '',
      password: '',
      role: null,
    })
  };  

  return (
    <div>
      <Button color="primary" onClick={toggle}>
        <i className="fe fe-plus"></i> Agregar Empresa
      </Button>
      <Modal isOpen={modal} toggle={toggle} {...args} size="lg">
        <ModalHeader toggle={toggle}>Crear Empresa</ModalHeader>
        <ModalBody>
          <div className="py-1">
            <Form className="form" noValidate>
              <Row>
                <Col>
                  <Row>
                    <Col>
                      <div className="mb-3">
                        <Label>Razón Social</Label>
                        <Input
                          className="form-control"
                          type="text"
                          name="name"
                          placeholder="razón social"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="mb-3">
                        <Label>Número de razón social</Label>
                        <Input
                          className="form-control"
                          type="number"
                          name="email"
                          placeholder="número de razón social"
                          value={formData.email}
                          onChange={handleChange}                          
                        />
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col sm={12} className="col-12  mb-3">
                  <Row>
                    <Col>
                      <div className="mb-3">
                        <Label>Nombre comercial</Label>
                        <Input
                          className="form-control"
                          type="text"
                          name="trade_name"
                          placeholder="nombre comercial"
                          value={formData.email}
                          onChange={handleChange}                          
                        />
                      </div>
                    </Col>
                    <Col>
                      <div className="mb-3">
                        <Label>Código de Comercio</Label>
                        <Input
                          className="form-control"
                          type="number"
                          name="trade_name"
                          placeholder="código de comercio"
                          value={formData.email}
                          onChange={handleChange}                          
                        />
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