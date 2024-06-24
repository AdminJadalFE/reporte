import React, { useEffect, useState } from 'react';
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
  Spinner
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateRol, showRolById } from '../../../../Redux/Rol/Action/Action';
import Swal from 'sweetalert2';
import { fetchPermissions } from '../../../../Redux/Permission/Action/Action';
import { PermissionState } from '../../../../Redux/Permission/Reducer/reducer';

const EditRol = ({ rolId, toggle, onClose, ...props }: { rolId: number, toggle: any, onClose: any }) => {
  const dispatch = useDispatch();
  const permissionData = useSelector((state: PermissionState) => state.permission.permissions as { id: number, name: string }[]);
  const rolDetails = useSelector((state: any) => state.rol.rol);

  const [formData, setFormData] = useState({
    name: '',
    permissions: [] as string[],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRol = async () => {
      try {
        await Promise.all([
          fetchPermissions()(dispatch),
          showRolById(rolId)(dispatch),
        ]);
        setLoading(false);
        console.log("Permisos y detalles del rol obtenidos");
      } catch (error) {
        console.error("Error al obtener el rol y permisos:", error);
      }
    };
    fetchRol();
  }, [dispatch, rolId]);

  useEffect(() => {
    if (rolDetails) {
      console.log('rolDetails:', rolDetails);
      setFormData({
        name: rolDetails.rol.name,
        permissions: rolDetails.permissions.map((perm) => perm.name),
      });
    }
  }, [rolDetails]);

  function registroAlert() {
    Swal.fire({
      title: 'Actualizado',
      icon: 'success',
      allowOutsideClick: false,
      confirmButtonText: 'ok',
      cancelButtonColor: '#4454c3',
      text: 'Se actualizó el rol correctamente.',
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
      setFormData({
        ...formData,
        permissions: formData.permissions.filter((p) => p !== permission),
      });
    } else {
      setFormData({
        ...formData,
        permissions: [...formData.permissions, permission],
      });
    }
  };

  const handleSave = () => {
    console.log('Enviando datos al backend:', formData);
    updateRol(rolId, formData)(dispatch);
    onClose();
    registroAlert();
  };

  return (
    <Modal isOpen={true} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Editar Rol</ModalHeader>
      <ModalBody>
        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: '100px' }}>
            <Spinner color="primary" />
          </div>
        ) : (
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
        )}
      </ModalBody>
      <ModalFooter>
        <Row>
          <Col className="d-flex justify-content-end">
            <Button color="secondary" onClick={onClose}>
              Cerrar
            </Button>
            <Button color="primary" className="ml-2" onClick={handleSave}>
              Guardar
            </Button>
          </Col>
        </Row>
      </ModalFooter>
    </Modal>
  );
};

export default EditRol;
