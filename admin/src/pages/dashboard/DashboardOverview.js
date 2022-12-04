import { Row } from "@themesberg/react-bootstrap";
import React from "react";
import DashboardBlog from "./DashboardBlog";
import DashboardOrder from "./DashboardOrder";
import DashboardOrderByAmount from "./DashboardOrderByAmount";
import DashboardOrderByRevenue from "./DashboardOrderByRevenue";
import DashboardProduct from "./DashboardProduct";
import DashboardUser from "./DashboardUser";

export default () => {
  return (
    <>
      <Row className="justify-content-md-center">
        <DashboardUser />
        <DashboardProduct />
        <div></div>
        <DashboardOrder />
        <DashboardBlog />
        <DashboardOrderByAmount />
        <DashboardOrderByRevenue />
      </Row>
    </>
  );
};
