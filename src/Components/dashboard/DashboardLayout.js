import React from "react";
import Sidbar from "./Sidbar";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <div className="container" style={{ marginBlock: "80px" }}>
      <div className="row">
        <div className="col-lg-3 col-md-1 col-sm-1">
          <Sidbar />
        </div>
        <div className="col-lg-9 col-md-11 col-sm-11">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
