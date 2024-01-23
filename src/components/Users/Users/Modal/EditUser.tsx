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

import { updateUser } from "../../../../Redux/User/Action/Action"; 
import { RolState } from "../../../../Redux/Rol/Reducer/reducer";
import { CompanyState }  from "../../../../Redux/Company/Reducer/reducer";
import { UserState } from "../../../../Redux/User/Reducer/reducer";

const EditUser = ({ userId, toggle, onClose, ...props }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const user = useSelector((state: UserState) => state.user.userDetail[0]);
  const companyData = useSelector((state: CompanyState) => state.company.companies);
  const rolData = useSelector((state: RolState) => state.rol.roles);

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
        await showUserById({ userId })(dispatch);
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
    rolesAndCompanies: [{ role: null, company: null }],
  });

  useEffect(() => {
    if (!loading) {

      const rolesAndCompaniesData = user?.companies?.map((company) => ({
        //role: company?.roles?.[0]?.rol_id || null,
        role: company || null,
        //company: company?.roles?.[0]?.company_id || null,
        company: company || null,
      })) || [];
      console.log('company?.roles?.[0]?.id ')
      console.log('rolesAndCompaniesData',rolesAndCompaniesData);
      setFormData((prevFormData) => ({
        ...prevFormData,
        name: user?.name || "",
        email: user?.email || "",
        //company: user?.companies?.[0]?.id || null,
        //role: user?.companies?.[0]?.roles?.[0]?.id || null,
        rolesAndCompanies: rolesAndCompaniesData,
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

  const handleUpdate = async () => {
    const { name, email, password, rolesAndCompanies } = formData;

    const updatedUser = {
      id: userId,
      name,
      email,
      password,
      rolesAndCompanies,
    };

    // Dispatch the update action
    try {
      await updateUser(userId,updatedUser)(dispatch);
      // Optionally, you can handle success, close the modal, or show a notification
      onClose(); // Close the modal after successful update
    } catch (error) {
      console.error("Error updating user:", error);
      // Optionally, you can handle errors, show a notification, etc.
    }
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
          </Form>
        </div>
      </ModalBody>
      <ModalFooter>
        <Row>
          <Col className="d-flex justify-content-end">
            <Button color="secondary" onClick={onClose}>
              Cerrar
            </Button>
            <Button color="primary" className="ml-2" onClick={handleUpdate}>
              Guardar
            </Button>
          </Col>
        </Row>
      </ModalFooter>
    </Modal>
  );
};

export default EditUser;
