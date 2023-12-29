import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalFooter,
  Button,
  Row,
  Col,
  ModalBody,
  Form,
  Label,
  Input,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { showUserById } from "../../../../Redux/User/Action/Action";
import Select from "react-select";

const EditUser = ({ userId, toggle, onClose, ...props }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user.userDetail);
  const companyData = useSelector((state) => state.company.companies);
  const rolData = useSelector((state) => state.rol.roles);

  const [companyOption, setCompanyOption] = useState<any>(null);
  const [rolOption, setRolOption] = useState<any>(null);

  const Roloptions = rolData.map((role) => ({
    value: role.id,
    label: role.name,
  }));
  
  const Companyoptions = companyData.map((company) => ({
    value: company.id,
    label: company.name,
  }));

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await dispatch(showUserById({ userId }));
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
        setLoading(false);
      }
    };

    fetchUser();
  }, [dispatch, userId]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: null,
    company: null,
  });

  useEffect(() => {
    if (!loading) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        name: user?.name || "",
        email: user?.email || "",
        company: user?.companies?.[0]?.id || null,
        role: user?.roles[0] || null,
      }));
    }
  }, [loading, user]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
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

  return (
    <Modal isOpen={true} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Editar Usuario {user?.name} </ModalHeader>
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
                </Row>
              </Col>
            </Row>
            <Row>
              <Col md="5" className="mb-3">
                <Label className="form-label">Empresa</Label>
                <Select
                  value={Companyoptions.find(
                    (option) => option.value === formData.company
                  )}
                  onChange={handleCompanyChange}
                  options={Companyoptions}
                  // placeholder="admin"
                  classNamePrefix="Search"
                />
                <div className="invalid-feedback">
                  Please select a valid country.
                </div>
              </Col>

              <Col md="5" className="mb-3">
                <Label className="form-label">Rol</Label>
                <Select
                  value={Roloptions.find(
                    (option) => option.value === formData.role
                  )}
                  onChange={handleRoleChange}
                  options={Roloptions}
                  // placeholder="admin"
                  classNamePrefix="Search"
                />
                <div className="invalid-feedback">
                  Please select a valid country.
                </div>
              </Col>
            </Row>
          </Form>
        </div>
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
