import React, { useEffect, useState } from "react";
import { Card, CardHeader,CardBody, CardTitle, Col, Row } from "reactstrap";
import { PageHeaders } from "../../../Shared/Prism/Prism";
import {BasicTable} from "./Basictable"
import{Fixedheader} from "./Fixedheader"
import { ExportCSV } from './Exportcvs';
import{DataTabless} from "./Deleterows"
import {Savetable} from "./Addrows"

const Promotions = () => {
  const [promotions,setPromotions] = useState([]);

  useEffect(() => {
    // Fetch data from the API endpoint
    fetch("http://127.0.0.1:8001/api/promotions")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Update the state with the retrieved products
          setPromotions(data.message);
          console.log('data.message',data.message);
        } else {
          console.error("Failed to fetch products");
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
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
            <CardTitle>Promociones</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="table-responsive">
            <BasicTable data={promotions}/>
            </div>
          </CardBody>
        </Card>
        {/* <!--/div--> */}
      </Col>
    </Row>
  </div>
);
};

Promotions.propTypes = {};

Promotions.defaultProps = {};

export default Promotions;
