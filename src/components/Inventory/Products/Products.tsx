import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, CardTitle, Col, Row } from "reactstrap";
import { PageHeaders } from "../../../Shared/Prism/Prism";
//import { BasicTable } from "./Basictable";
import { Modalproduct } from "./Modal/CreateProduct";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../Redux/Product/Action/Action";
import { ProductState } from "../../../Redux/Product/Reducer/reducer";

const Promotions = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  
  const productsFromState = useSelector((state: ProductState) => state.product.products);

  useEffect(() => {
    setProducts(productsFromState);
  }, [productsFromState]);
  
  useEffect(() => {
    fetchProducts()(dispatch);
  }, [dispatch]);
  
console.log('producsts')
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
              <Modalproduct/>
            </CardHeader>
            <CardBody>
              <div className="table-responsive">
                //BasicTable
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Promotions;
