import React from "react";
import User from "../../components/admin/dashboard/User";
import Challenges from "../../components/admin/dashboard/Challenges";
import { Col, Row } from "react-bootstrap";

const AdminDashboard = () => {
  return (
    <>
      <Row>
        <Col className="text-center" md={12}>
          <User />
          <Challenges />
        </Col>
      </Row>
    </>
  );
};

export default AdminDashboard;
