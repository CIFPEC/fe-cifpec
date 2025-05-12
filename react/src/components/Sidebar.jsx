import React from 'react'
import CFImage from './CFImage';
import Logo from "./../assets/img/Cifpec-Logo.png";
import { Link } from 'react-router';

function Sidebar({show}) {
  const [openMenus, setOpenMenus] = React.useState({});
  const [activeMenu, setActiveMenu] = React.useState(null);

  const toggleMenu = menuId => {
    setOpenMenus(prevState => ({
      [menuId]: !prevState[menuId],
    }));

    setActiveMenu(prevActiveMenu => (prevActiveMenu === menuId ? null : menuId));
  };

  const menuItems = [
    {
      id: "projects",
      label: "Projects",
      items: [
        { label: "Project Lists (Admin)", link: "/dashboard/projectlist" },
        { label: "Project Lists (Coordinator & Supervisor)", link: "/dashboard/projectlist" },
        { label: "Project Lists (Student)", link: "/dashboard/studentproject" },
      ],
    },
    {
      id: "batches",
      label: "Batches",
      items: [{ label: "Batch Lists", link: "/dashboard/batch" }],
    },
    {
      id: "users",
      label: "Users",
      items: [
        { label: "User Requests", link: "/dashboard/userrequest" },
        { label: "Lecturer Lists", link: "/dashboard/lecturelist" },
        { label: "Student Lists", link: "../pages/reports.html" },
      ],
    },
    {
      id: "courses",
      label: "Courses",
      items: [
        { label: "Course Lists", link: "/dashboard/course" },
      ],
    },
  ];

  return (
    <>
      {/* <!-- Sidebar --> */}
      <aside
        className={`sidenav navbar navbar-vertical navbar-expand-xs border-radius-lg fixed-start ms-2 ${show ? "bg-white" : ""}sidenav navbar navbar-vertical navbar-expand-xs border-radius-lg fixed-start ms-2  bg-white my-2`}
        id="sidenav-main">
        <div className="sidenav-header">
          <Link to="/dashboard" className="logo cursor-pointer">
            <CFImage src={Logo} alt="Cifpec Logo" width="100px" className="text-center mt-3" />
          </Link>
        </div>
        <hr className="horizontal dark mt-0 mb-2" />
        <div className="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/dashboard" className={`nav-link ${activeMenu === "dashboard" ? "active bg-gradient-dark text-white" : "text-dark"}`} onClick={() => setActiveMenu("dashboard")}>
                <i className="material-symbols-rounded opacity-5">dashboard</i>
                <span className="nav-link-text ms-1">Dashboard</span>
              </Link>
            </li>

            {menuItems.map(menu => (
              <li className="nav-item" key={menu.id}>
                <div className={`nav-link d-flex justify-content-between align-items-center ${activeMenu === menu.id ? "active bg-gradient-dark text-white" : " text-dark"}`} onClick={() => toggleMenu(menu.id)} style={{ cursor: "pointer" }}>
                  <div>
                    <i className="material-symbols-rounded opacity-5">table_view</i>
                    <span className="nav-link-text ms-1">{menu.label}</span>
                  </div>
                  <i className="material-symbols-rounded">{openMenus[menu.id] ? "expand_less" : "expand_more"}</i>
                </div>

                {openMenus[menu.id] && (
                  <ul className="nav flex-column ms-4">
                    {menu.items.map((item, index) => (
                      <li className="nav-item" key={index}>
                        <Link to={item.link} className="nav-link text-dark">
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}

            <li className="nav-item">
              <Link to={"/web-setting"} className={`nav-link ${activeMenu === "web-setting" ? "active bg-gradient-dark text-white" : "text-dark"}`} onClick={() => setActiveMenu("web-setting")}>
                <i className="material-symbols-rounded opacity-5">notifications</i>
                <span className="nav-link-text ms-1">Web Settings</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="sidenav-footer position-absolute w-100 bottom-0 ">
          <div className="mx-3">
            <Link to={"/dashboard/setting"} className="btn btn-outline-dark mt-4 w-100" type="button">
              Profil Pengguna
            </Link>
            <a className="btn bg-gradient-dark w-100" href="https://www.creative-tim.com/product/material-dashboard-pro?ref=sidebarfree" type="button">
              Log Keluar
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar
