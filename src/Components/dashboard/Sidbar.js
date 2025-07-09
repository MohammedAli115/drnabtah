// import React from "react";
// import { Link } from "react-router-dom";
// import {
//   FiSettings,
//   FaBoxOpen,
//   FaComments,
//   FaShoppingCart,
//   FaChartBar,
//   FaCog,
// } from "react-icons/fa";

// function Sidbar() {
//   return (
//     <div>
//       <div
//         className="list-group py-2 pt-4"
//         style={{
//           backgroundImage:
//             "linear-gradient(135deg,rgb(113, 196, 192),rgb(89, 219, 221))",
//           minHeight: "80vh",
//         }}
//       >
//         <div
//           className="text-center py-2 mb-3"
//           style={{
//             background: "rgb(255, 255, 255)",
//             width: "90%",
//             borderBottomLeftRadius: "30px",
//             borderTopLeftRadius: "30px",
//           }}
//         >
//           <h4 className="fw-bold fs-3 d-flex justify-content-center gap-2 align-items-center">
//             <FaCog className="mx-2 fs-2 " />
//             لوحة التحكم
//           </h4>
//         </div>

//         <Link
//           to="/products"
//           className="list-group-item list-group-item-action d-flex align-items-center gap-2"
//         >
//           <FaBoxOpen />
//           المنتجات
//         </Link>

//         <Link
//           to="/reviews"
//           className="list-group-item list-group-item-action d-flex align-items-center gap-2"
//         >
//           <FaComments />
//           آراء العملاء
//         </Link>

//         <Link
//           to="/orders"
//           className="list-group-item list-group-item-action d-flex align-items-center gap-2"
//         >
//           <FaShoppingCart />
//           الطلبات
//         </Link>

//         <Link
//           to="/statistics"
//           className="list-group-item list-group-item-action d-flex align-items-center gap-2"
//         >
//           <FaChartBar />
//           الإحصائيات
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default Sidbar;
import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaBoxOpen,
  FaComments,
  FaShoppingCart,
  FaChartBar,
  FaCog,
} from "react-icons/fa";
import styles from "./Sidbar.module.css";

function Sidbar() {
  return (
    <div>
      <div
        className="list-group py-2 pt-4"
        style={{
          backgroundImage:
            "linear-gradient(135deg,rgba(125, 215, 208, 0.79),rgb(218, 245, 245))",
          minHeight: "80vh",
          border :"1px solid rgb(53, 179, 174)"
        }}
      >
        <div
          className="text-center py-1 mb-3"
          style={{
            // background: "#ffff",
            width: "90%",
            borderBottomLeftRadius: "30px",
            borderTopLeftRadius: "30px",
          }}
        >
          <h4 className="fw-bold fs-3 d-flex justify-content-center gap-2 align-items-center">
            <FaCog className="mx-2 fs-2" color="" />
            لوحة التحكم
          </h4>
        </div>

        <NavLink
          to="/productsDashboard"
          className={({ isActive }) =>
            `list-group-item list-group-item-action d-flex align-items-center gap-2 ${
              styles.listGroupItem
            } ${isActive ? styles.activeItem : ""}`
          }
        >
          <FaBoxOpen />
          المنتجات
        </NavLink>

        <NavLink
          to="/reviews"
          className={({ isActive }) =>
            `list-group-item list-group-item-action d-flex align-items-center gap-2 ${
              styles.listGroupItem
            } ${isActive ? styles.activeItem : ""}`
          }
        >
          <FaComments />
          آراء العملاء
        </NavLink>

        <NavLink
          to="/ordersDashboard"
          className={({ isActive }) =>
            `list-group-item list-group-item-action d-flex align-items-center gap-2 ${
              styles.listGroupItem
            } ${isActive ? styles.activeItem : ""}`
          }
        >
          <FaShoppingCart />
          الطلبات
        </NavLink>

        <NavLink
          to="/statistics"
          className={({ isActive }) =>
            `list-group-item list-group-item-action d-flex align-items-center gap-2 ${
              styles.listGroupItem
            } ${isActive ? styles.activeItem : ""}`
          }
        >
          <FaChartBar />
          الإحصائيات
        </NavLink>
      </div>
    </div>
  );
}

export default Sidbar;
