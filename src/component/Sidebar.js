
import { NavLink } from "react-router-dom";
import "./custom-css/Sidebar.css";

function Sidebar({ title = "Task Management" }) {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: "bi-speedometer2",
    },
    {
      name: "Employee CRUD",
      path: "/employee",
      icon: "bi-people",
    },
    {
      name: "Users Management",
      path: "/users",
      icon: "bi-kanban",
    },
    
    {
      name: "Tasks",
      path: "/tasks",
      icon: "bi-kanban",
    },
    {
      name: "Reports",
      path: "/reports",
      icon: "bi-bar-chart",
    },
    {
      name: "Settings",
      path: "/settings",
      icon: "bi-gear",
    },
  ];

  return (
    <aside className="sidebar d-flex flex-column">
      {/* Brand */}
      <div className="sidebar-brand">
        <div className="brand-icon">
          <i className="bi bi-grid-1x2-fill"></i>
        </div>

        <div>
          <h5 className="mb-0">{title}</h5>
          <small>Task Management System</small>
        </div>
      </div>

    

      <ul className="nav flex-column sidebar-menu">
        {menuItems.map((item) => (
          <li className="nav-item" key={item.path}>
            <NavLink
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `nav-link sidebar-link ${
                  isActive ? "active" : ""
                }`
              }
            >
              <i className={`bi ${item.icon} sidebar-menu-icon`}></i>
              <span>{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      {/* User Profile */}
      <div className="sidebar-footer mt-auto">
        {/* <div className="profile-avatar">AD</div> */}

        <div className="profile-info">
          <h6 className="mb-0">Administrator</h6>
          {/* <small>Administrator</small> */}
        </div>

        <i className="bi bi-three-dots-vertical ms-auto"></i>
      </div>
    </aside>
  );
}

export default Sidebar;
