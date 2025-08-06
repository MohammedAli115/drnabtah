import { Outlet } from "react-router-dom";

const ForgotPasswordLayout = () => (
  <div className="container" style={{ marginTop: "130px" }}>
    <h2 className="text-center">إعادة تعيين كلمة المرور</h2>
    <Outlet />
  </div>
);

export default ForgotPasswordLayout;
