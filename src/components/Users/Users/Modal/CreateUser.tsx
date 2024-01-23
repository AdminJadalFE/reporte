import React, { useState, useEffect } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import {
  Breadcrumb,
  BreadcrumbItem,
  Input,
  Modal,
  Button,
  ModalHeader,
  Label,
  ModalBody,
  Form,
  Row,
  Col,
  ModalFooter,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
} from "reactstrap";
import { addDays } from "date-fns";
import { DateRangePicker } from "react-date-range";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../../Redux/User/Action/Action";
import { fetchRoles } from "../../../../Redux/Rol/Action/Action";
import { fetchCompanies } from "../../../../Redux/Company/Action/Action";
import Swal from "sweetalert2";
import { RolState } from "../../../../Redux/Rol/Reducer/reducer";
import { CompanyState } from "../../../../Redux/Company/Reducer/reducer";

export function Modaluser(args: any) {
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    password: string;
    role: number | null;
    company: number | null;
    rolesAndCompanies: { role: number | null; company: number | null }[];
  }>({
    name: "",
    email: "",
    password: "",
    role: null as number | null,
    company: null as number | null,
    rolesAndCompanies: [{ role: null, company: null }],
  });
  
  

  const [alert, setAlert] = useState("Congratulations!");

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
      title: "Error",
      text: errorMessage,
      icon: "error",
      confirmButtonText: "OK",
      cancelButtonColor: "#4454c3",
    });
  };

  const [rolOption, setRolOption] = useState<any>(null);
  const [companyOption, setCompanyOption] = useState<any>(null);

  const dispatch = useDispatch();
  const rolData = useSelector((state: RolState) => state.rol.roles);
  const companyData = useSelector((state: CompanyState) => state.company.companies);


  console.log("companyData", companyData);

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
    fetchRoles()(dispatch);
  }, [dispatch]);

  useEffect(() => {
    fetchCompanies()(dispatch);
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRoleChange = (selectedOption, index) => {
    const updatedRolesAndCompanies = [...formData.rolesAndCompanies];
    updatedRolesAndCompanies[index].role = selectedOption?.value || null;

    setFormData({
      ...formData,
      rolesAndCompanies: updatedRolesAndCompanies,
    });
  };

  const handleCompanyChange = (selectedOption, index) => {
    const updatedRolesAndCompanies = [...formData.rolesAndCompanies];
    updatedRolesAndCompanies[index].company = selectedOption?.value || null;

    setFormData({
      ...formData,
      rolesAndCompanies: updatedRolesAndCompanies,
    });
  };

  const handleSave = () => {
    const hasEmptyRoleOrCompany = formData.rolesAndCompanies.some(
      (item) => !item.role || !item.company
    );
  
    if (hasEmptyRoleOrCompany) {
      errorAlert("Por favor selecciona un rol y una empresa para cada conjunto.");
      return;
    }
  
    if (formData.password.length < 8) {
      errorAlert("La contraseña debe tener al menos 8 caracteres");
      return;
    }
  
    console.log("Enviando datos al backend:", formData);
    registerUser(formData)(dispatch);
    toggle();
    registroAlert();
    setFormData((prevFormData) => ({
      ...prevFormData,
      name: "",
      email: "",
      password: "",
      role: null,
      company: null,
      rolesAndCompanies: [{ role: null, company: null }],
    }));
  };
  

  const handleAddMore = () => {
    setFormData({
      ...formData,
      rolesAndCompanies: [
        ...formData.rolesAndCompanies,
        { role: null, company: null },
      ],
    });
  };

  const handleRemove = (index) => {
    const updatedRolesAndCompanies = [...formData.rolesAndCompanies];
    updatedRolesAndCompanies.splice(index, 1);

    setFormData({
      ...formData,
      rolesAndCompanies: updatedRolesAndCompanies,
    });
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
                    {formData.rolesAndCompanies.map((item, index) => (
                      <React.Fragment key={index}>
                        <Col md="5" className="mb-3">
                          <Label className="form-label">Empresa</Label>
                          <Select
                            value={Companyoptions.find(
                              (option) => option.value === item.company
                            )}
                            onChange={(selectedOption) =>
                              handleCompanyChange(selectedOption, index)
                            }
                            options={Companyoptions}
                            classNamePrefix="Search"
                          />
                        </Col>
                        <Col md="5" className="mb-3">
                          <Label className="form-label">Rol</Label>
                          <Select
                            value={Roloptions.find(
                              (option) => option.value === item.role
                            )}
                            onChange={(selectedOption) =>
                              handleRoleChange(selectedOption, index)
                            }
                            options={Roloptions}
                            classNamePrefix="Search"
                          />
                        </Col>
                        <Col md="2" className="mb-3 mt-5">
                          <Button
                            color=""
                            type="button"
                            className="btn btn-danger"
                            onClick={() => handleRemove(index)}
                          >
                            <i className="fe fe-trash"></i>
                          </Button>
                        </Col>
                      </React.Fragment>
                    ))}
                  </Row>
                  <Button
                    color=""
                    type="button"
                    className="btn btn-primary"
                    onClick={handleAddMore}
                  >
                    <i className="fe fe-plus me-2"></i>Agregar
                  </Button>
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
