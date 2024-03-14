import React,{useState, useEffect} from "react";
import { PageHeaders } from "../../../Shared/Prism/Prism";
import { Link,useNavigate } from "react-router-dom";
import { Button, Col,Card,ModalHeader,Modal,Form,ModalFooter, Label, ModalBody, Row,Input } from "reactstrap";

import user7 from "../../../assets/images/users/7.jpg";
import user1 from "../../../assets/images/users/1.jpg";
import user2 from "../../../assets/images/users/2.jpg";
import user3 from "../../../assets/images/users/3.jpg";
import user4 from "../../../assets/images/users/4.jpg";
import user5 from "../../../assets/images/users/5.jpg";
import user6 from "../../../assets/images/users/6.jpg";
import user8 from "../../../assets/images/users/8.jpg";
import user9 from "../../../assets/images/users/9.jpg";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompaniesByUser } from "../../../Redux/Company/Action/Action";
import { selectCompany } from "../../../Redux/Auth/Action/Action";
import { loginWithRoleAndPermissions } from "../../../Redux/Auth/Action/Action";
import { CompanyState } from "../../../Redux/Company/Reducer/reducer";

const SelectedCompany = () => {
  const dispatch = useDispatch();
  const companyData = useSelector((state: { company: CompanyState }) => state.company.companies);
  console.log('companyData',companyData)

  const [modal, setModal] = useState<boolean>(false);
  
  const toggle = () => setModal(!modal);  

  let navigate = useNavigate();

  useEffect(() => {
    fetchCompaniesByUser()(dispatch);
  }, [dispatch]);

  document.querySelector("body")?.classList.add("main-body", "light-mode", "ltr", "page-style1", "error-page");
  document.querySelector("body")?.classList.remove("app", "sidebar-mini",);
  const swichermainright = () => {
    document.querySelector(".demo_changer")?.classList.toggle("active");
    let demo_changer =  document.querySelector(".demo_changer") as HTMLElement
    demo_changer.style.right = "0px";
  };
  const switcherIconReomve = () => {
    document.querySelector(".demo_changer")?.classList.remove("active");
    let demo_changer1 = document.querySelector(".demo_changer") as HTMLElement
    demo_changer1.style.right = "-270px";
  };

  const handleDashboard = (companyId, companyName) => {
    localStorage.setItem("company", companyName);
    
    const companiesData = JSON.parse(localStorage.getItem("companies") || '');
    const selectedCompany = companiesData.find(company => company.id === companyId);

    //console.log('selectedCompany',selectedCompany);
    const rolName = selectedCompany.roles[0].rol_name;
    const permissions = selectedCompany.roles[0].permissions;

    // console.log('Nombre del Rol:', rolName);
    // console.log('Permisos:', permissions);

    localStorage.setItem("rol", rolName);
    localStorage.setItem("permissions", permissions);

    dispatch(loginWithRoleAndPermissions(rolName, permissions));
    // localStorage.setItem("selectedRoles", JSON.stringify(roles));

    //localStorage.setItem("permissions", resp.data.data.permissions);
    //const parsedCompanies = storedCompanies ? JSON.parse(storedCompanies.compcompanyId) : [];

    dispatch(selectCompany(companyName));
   
    navigate(`${import.meta.env.BASE_URL}dashboard/dashboard01/`);
  };
  
  return (
    <div className="p-4">
    <PageHeaders
      title="Seleccionar Empresa"
      home="Home"
      name="Apps"
      fonticonsname="Seleccionar Empresa"
    />
    <Row className="flex-lg-nowrap">
      <Col className="col-12">
        <Row className="flex-lg-nowrap">
        <Card className="text-center">   
          <Col className="col-12 mb-3">
            <div className="">
              <div className="">
                <Row>
                  <Col className="mb-4">
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
                          placeholder="Search Contact"
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                {companyData.map((list, index) => (
                  <Col lg={6} xl={4} key={index}>
                    <Card className="text-center user-contact-list">
                      <div className="p-5">
                        <div>
                          <img
                            src={user7}
                            alt=""
                            className="avatar avatar-xxl brround d-block cover-image mx-auto"
                          />{" "}
                        </div>
                        <div className="wrapper mt-3">
                          <p className="mb-0 mt-1 text-dark font-weight-semibold">
                            {list.name}
                          </p>
                          <small className="text-muted">{list.number}</small>
                        </div>
                        <div className="btn-list mt-5">
                          <Button onClick={() => handleDashboard(list.id, list.name)} color="primary">Ingresar</Button>
                        </div>
                      </div>
                    </Card>
                  </Col>
                  ))}                  
                </Row>
              </div>
            </div>
          </Col>
          </Card>
        </Row>
        {/* <!-- User Form Modal --> */}
      </Col>  
    </Row>
  </div>
  );
};

SelectedCompany.propTypes = {};
SelectedCompany.defaultProps = {};

export default SelectedCompany;
