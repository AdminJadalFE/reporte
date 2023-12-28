import React, { useState,useEffect } from 'react';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Breadcrumb, BreadcrumbItem, Input, Modal, Button, ModalHeader, Label, ModalBody, Form, Row, Col, ModalFooter, Dropdown, DropdownMenu, DropdownItem, UncontrolledDropdown, DropdownToggle } from "reactstrap";
import { addDays } from 'date-fns';
import { DateRangePicker } from 'react-date-range';
import Select from 'react-select';
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../../Redux/User/Action/Action";
import { fetchRoles } from "../../../../Redux/Rol/Action/Action";
import { fetchCompanies } from '../../../../Redux/Company/Action/Action'; 
import Swal from "sweetalert2";

export function Modaluser(args: any) {

  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: null,
    company: null,
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

  const [rolOption, setRolOption] = useState<any>(null);
  const [companyOption, setCompanyOption] = useState<any>(null);

  const dispatch = useDispatch();
  const rolData = useSelector((state) => state.rol.roles);
  const companyData = useSelector((state) => state.company.companies);

  console.log('companyData',companyData);

    
  const Roloptions = rolData.map((role) => ({
    value: role.id,
    label: role.name,
  }));

  const Companyoptions = companyData.map((company) => ({
    value: company.id,
    label: company.name,
  }));

  const toggle = () => setModal(!modal);

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  
  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRoleChange = (selectedOption) => {
    setRolOption(selectedOption);
    setFormData({
      ...formData,
      role: selectedOption?.value || null,
    });
  };

  const handleCompanyChange = (selectedOption) => {
    setCompanyOption(selectedOption);
    setFormData({
      ...formData,
      company: selectedOption?.value || null,
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
      company: null,
    })
  };  

  return (
    <div>
      <Button color="primary" onClick={toggle}>
        <i className="fe fe-plus"></i> Agregar Usuario
      </Button>
      <Modal isOpen={modal} toggle={toggle} {...args} size="lg">
        <ModalHeader toggle={toggle}>Crear Usuario</ModalHeader>
        <ModalBody>
          <div className="py-1">
            <Form className="form" noValidate>
              <Row>
                <Col>
                  <Row>
                    <Col>
                      <div className="mb-3">
                        <Label>Nombre de Usuario</Label>
                        <Input
                          className="form-control"
                          type="text"
                          name="name"
                          placeholder="usuario"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="mb-3">
                        <Label>Correo Electrónico</Label>
                        <Input
                          className="form-control"
                          type="text"
                          name="email"
                          placeholder="user@example.com"
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
                        <Label>Contraseña</Label>
                        <Input
                          className="form-control"
                          type="password"
                          name="password"
                          placeholder="••••••"
                          value={formData.password}
                          onChange={handleChange}     
                        />
                      </div>
                    </Col>
                    <Col>
                      <div className="mb-3">
                        <Label>
                          Confirm{" "}
                          <span className="d-none d-xl-inline">
                            Confirmar Contraseña
                          </span>
                        </Label>
                        <Input
                          className="form-control"
                          type="password"
                          placeholder="••••••"
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="5" className="mb-3">
                      <Label className="form-label">Rol</Label>
                      <Select
                      value={Roloptions.find((option) => option.value === formData.role)}
                      onChange={handleRoleChange}
                      options={Roloptions}
                      // placeholder="admin"
                      classNamePrefix="Search"
                    />
                      <div className="invalid-feedback">
                        Please select a valid country.
                      </div>
                    </Col>
                    <Col md="5" className="mb-3">
                      <Label className="form-label">Empresa</Label>
                      <Select
                      value={Companyoptions.find((option) => option.value === formData.company)}
                      onChange={handleCompanyChange}
                      options={Companyoptions}
                      // placeholder="admin"
                      classNamePrefix="Search"
                    />
                      <div className="invalid-feedback">
                        Please select a valid country.
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