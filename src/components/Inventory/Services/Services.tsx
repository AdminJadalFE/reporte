import React, { useState, useEffect } from "react";
import { Card, CardHeader,CardBody, CardTitle, Col, Row } from "reactstrap";
import { PageHeaders } from "../../../Shared/Prism/Prism";
import {BasicTable} from "./Basictable"
import{Fixedheader} from "./Fixedheader"
import { ExportCSV } from './Exportcvs';
import{DataTabless} from "./Deleterows"
import {Savetable} from "./Addrows"
import { Modaluser } from "./Modal/CreateUser";
import { inventory } from "../../../Util/axios";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await inventory.get("api/services");
        if (response.data.success) {
          setServices(response.data.message);
          console.log('data message', response.data.message);
        } else {
          console.error("Error al recuperar los servicios");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
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
