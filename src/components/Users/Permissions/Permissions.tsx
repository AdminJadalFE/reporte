import React, { useEffect, useState } from "react";
import { PageHeaders } from "../../../Shared/Prism/Prism";
import { Card, CardHeader, CardBody, Table, Col, Row } from "reactstrap";
import { auth } from "../../../Util/axios";

interface Permission {
  id: number;
  name: string;
  // Add other properties if available
}

const Permissions = () => {
  const [roles, setRoles] = useState<Permission[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await auth.get("api/permissions/");
        setRoles(response.data.message);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const sortedRoles = roles.slice().sort((a, b) => a.id - b.id);

  return (
    <div>
      <PageHeaders
        title="Lista de permisos"
        home="Home"
        name="Tables"
        fonticonsname="Default Tables"
      />

      <Row>
        <Col md={12} lg={12}>
          <Card>
            <CardHeader>
              <h3 className="card-title">Permisos </h3>
            </CardHeader>
            <CardBody className="p-0">
              <div className="table-responsive">
                <Table className="table table-striped card-table table-vcenter text-nowrap mb-0 table-bordered border-top-0">
                  <thead>
                    <tr>
                      <th className="ps-5">ID</th>
                      <th>Permiso</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedRoles.map((role) => (
                      <tr key={role.id}>
                        <th scope="row" className="ps-5">
                          {role.id}
                        </th>
                        <td>{role.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Permissions;
