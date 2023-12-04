import React from "react";
import { Card, CardHeader,CardBody, CardTitle, Col, Row } from "reactstrap";
import { PageHeaders } from "../../../Shared/Prism/Prism";
import {BasicTable} from "./Basictable"
import{Fixedheader} from "./Fixedheader"
import { ExportCSV } from './Exportcvs';
import{DataTabless} from "./Deleterows"
import {Savetable} from "./Addrows"

const Services = () => (
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
          </CardHeader>
          <CardBody>
            <div className="table-responsive">
            <BasicTable />
            </div>
          </CardBody>
        </Card>
        {/* <!--/div--> */}
      </Col>
    </Row>
  </div>
);

Services.propTypes = {};

Services.defaultProps = {};

export default Services;
