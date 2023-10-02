import React, { useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useAdminLogoutMutation } from "../slices/adminSlices/adminsApiSlice";
import { adminLogout } from "../slices/adminSlices/adminAuthSlice";
import { useNavigate } from "react-router-dom";
// import "./AdminHeader.css"; // Import your custom CSS for styling

function AdminHeader() {
  const { adminInfo } = useSelector((state) => state.adminAuth);
  const [showSidebar, setShowSidebar] = useState(false); // State to toggle sidebar visibility

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApi] = useAdminLogoutMutation();

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutHandler = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(adminLogout());
      navigate("/admin/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`admin-header ${showSidebar ? "active" : ""}`}>
      <div className="sidebar">
        <div className="sidebar-header">
          <h3>Admin</h3>
        </div>
        <ul className="sidebar-nav">
          {adminInfo ? (
            <li className="sidebar-item">
              <button className="sidebar-link" onClick={logoutHandler}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          ) : null}
        </ul>
      </div>
      <div className="content">
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          {/* You can use an icon or text for the toggle button */}
          <span>&#9776;</span>
        </button>
        {/* Your main content goes here */}
      </div>
    </div>
  );
}

export default AdminHeader;
