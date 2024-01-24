import React, { useEffect, useState } from "react";
import { Card, CardHeader,CardBody, CardTitle, Col, Row } from "reactstrap";
import { PageHeaders } from "../../../Shared/Prism/Prism";
import {BasicTable} from "./Basictable"
import{Fixedheader} from "./Fixedheader"
import { ExportCSV } from './Exportcvs';
import{DataTabless} from "./Deleterows"
import {Savetable} from "./Addrows"
import { Modaluser } from "./Modal/CreateUser";
import { inventory } from "../../../Util/axios";

const Promotions = () => {
  const [promotions,setPromotions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await inventory.get("api/promotions");
        if (response.data.success) {
          setPromotions(response.data.message);
          console.log('data.message', response.data.message);
        } else {
          console.error("Error al recuperar las promociones");
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
            <CardTitle>Promociones</CardTitle>
            <Modaluser/>
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
