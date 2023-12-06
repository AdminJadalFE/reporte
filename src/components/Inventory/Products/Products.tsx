import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, CardTitle, Col, Row } from "reactstrap";
import { PageHeaders } from "../../../Shared/Prism/Prism";
import { BasicTable } from "./Basictable";
import { Modaluser } from "./Modal/CreateUser";

const Promotions = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch data from the API endpoint
    fetch("http://127.0.0.1:8001/api/products")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Update the state with the retrieved products
          setProducts(data.message);
        } else {
          console.error("Failed to fetch products");
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <PageHeaders
        title="Productos"
        home="Home"
        name="Tables"
        fonticonsname="Data Tables"
      />
      <Row>
        <Col className="col-12">
          <Card>
            <CardHeader>
              <CardTitle>Productos</CardTitle>
              {/* <h3 className="card-title">Roles</h3> */}
              <Modaluser/>
            </CardHeader>
            <CardBody>
              <div className="table-responsive">
                <BasicTable data={products} />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Promotions;
