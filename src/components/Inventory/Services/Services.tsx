import React, { useState, useEffect } from "react";
import { Card, CardHeader,CardBody, CardTitle, Col, Row } from "reactstrap";
import { PageHeaders } from "../../../Shared/Prism/Prism";
import {BasicTable} from "./Basictable"
import{Fixedheader} from "./Fixedheader"
import { ExportCSV } from './Exportcvs';
import{DataTabless} from "./Deleterows"
import {Savetable} from "./Addrows"
import { Modaluser } from "./Modal/CreateUser";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8001/api/services")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {        
          // Update the state with the retrieved products
          setServices(data.message);
          console.log('data message', data.message);
        } else {
          console.error("Failed to fetch products");
        }
      })
  }, []);

return (
    <div>
      <PageHeaders
        title="Inventario"
        home="Home"
        name="Tables"
        fonticonsname="Data Tables"
      />
      <Row>
        <Col className="col-12">
          {/* <!--div--> */}
          <Card>
            <CardHeader>
              <CardTitle>Servicios</CardTitle>
              <Modaluser/>
            </CardHeader>
            <CardBody>
              <div className="table-responsive">
              <BasicTable data={services} />
              </div>
            </CardBody>
          </Card>
          {/* <!--/div--> */}
        </Col>
      </Row>
    </div>
  );
};

Services.propTypes = {};

Services.defaultProps = {};

export default Services;
