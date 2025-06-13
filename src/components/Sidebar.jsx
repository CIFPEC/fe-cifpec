import React, { useState, useEffect } from "react";
import CFImage from "./CFImage";
import DefaultLogo from "./../assets/img/Cifpec-Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../utils/axiosInstance";
import Loading from "./Loading";

function Sidebar({ show }) {
  const [openMenus, setOpenMenus] = useState({});
  const [activeMenu, setActiveMenu] = useState(null);
  const [Site, setSite] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");
  const decoded = token ? jwtDecode(token) : {};
  const roleId = decoded?.roleId;
  const isApproved = decoded?.isApproved;

  useEffect(() => {
    const fetchSite = async () => {
      try {
        const res = await axiosInstance.get("/site/settings");
        setSite(res?.data?.data || {});
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      } catch (err) {
        console.log("ERROR: ", err);
      }
    };
    fetchSite();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (roleId !== 5 && !isApproved) {
    return null;
  }

  const toggleMenu = (menuId) => {
    setOpenMenus((prev) => ({ ...prev, [menuId]: !prev[menuId] }));
    setActiveMenu((prev) => (prev === menuId ? null : menuId));
  };

  const handleLogout = async () => {
    try {
      await axiosInstance.delete("/auth/logout");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      localStorage.removeItem("firstLogin");
      window.location.href = "/login";
    }
  };

  const menuItems = [
    {
      id: "projects",
      label: "Projects",
      show: [1, 3, 4, 5].includes(roleId),
      items: [
        { label: "Project Lists", link: "/dashboard/projectlist" },
        ...(roleId === 1
          ? [
              {
                label: "Project Lists (Admin)",
                link: "/dashboard/projectrequirement",
              },
            ]
          : []),
      ],
    },
    {
      id: "batches",
      label: "Batches",
      show: [1].includes(roleId),
      items: [{ label: "Batch Lists", link: "/dashboard/batch" }],
    },
    {
      id: "users",
      label: "Users",
      show: [1].includes(roleId),
      items: [
        { label: "User Requests", link: "/dashboard/userrequest" },
        { label: "Lecturer Lists", link: "/dashboard/lecturelist" },
      ],
    },
    {
      id: "courses",
      label: "Courses",
      show: [1].includes(roleId),
      items: [{ label: "Course Lists", link: "/dashboard/course" }],
    },
  ];

  return (
    <aside
      className={`sidenav navbar navbar-vertical navbar-expand-xs border-radius-lg fixed-start ms-2 bg-white my-2`}
      id="sidenav-main"
    >
      <div className="sidenav-header">
        <Link to="/dashboard" className="logo cursor-pointer">
          <CFImage
            src={!isLoading && Site?.logo ? Site?.logo : DefaultLogo}
            alt={`${Site.title} Logo`}
            width="100px"
            className="text-center mt-3"
          />
        </Link>
      </div>
      <hr className="horizontal dark mt-0 mb-2" />
      <div
        className="collapse navbar-collapse w-auto"
        id="sidenav-collapse-main"
      >
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link
              to="/dashboard"
              className={`nav-link ${
                activeMenu === "dashboard"
                  ? "active bg-gradient-dark text-white"
                  : "text-dark"
              }`}
              onClick={() => setActiveMenu("dashboard")}
            >
              <i className="material-symbols-rounded opacity-5">dashboard</i>
              <span className="nav-link-text ms-1">Dashboard</span>
            </Link>
          </li>

          {menuItems
            .filter((menu) => menu.show)
            .map((menu) => (
              <li className="nav-item" key={menu.id}>
                <div
                  className={`nav-link d-flex justify-content-between align-items-center ${
                    activeMenu === menu.id
                      ? "active bg-gradient-dark text-white"
                      : "text-dark"
                  }`}
                  onClick={() => toggleMenu(menu.id)}
                  style={{ cursor: "pointer" }}
                >
                  <div>
                    <i className="material-symbols-rounded opacity-5">
                      table_view
                    </i>
                    <span className="nav-link-text ms-1">{menu.label}</span>
                  </div>
                  <i className="material-symbols-rounded">
                    {openMenus[menu.id] ? "expand_less" : "expand_more"}
                  </i>
                </div>

                <ul
                  className={`nav flex-column ms-4 submenu`}
                  style={{ display: openMenus[menu.id] ? "block" : "none" }}
                >
                  {menu.items.map((item, index) => (
                    <li className="nav-item" key={index}>
                      <Link
                        to={item.link}
                        className="nav-link text-dark px-3 py-2 rounded submenu-link"
                        style={{ background: "transparent" }}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}

          {roleId === 2 && (
            <li className="nav-item">
              <Link
                to="/dashboard/web-setting"
                className={`nav-link ${
                  activeMenu === "web-setting"
                    ? "active bg-gradient-dark text-white"
                    : "text-dark"
                }`}
                onClick={() => setActiveMenu("web-setting")}
              >
                <i className="material-symbols-rounded opacity-5">settings</i>
                <span className="nav-link-text ms-1">Web Settings</span>
              </Link>
            </li>
          )}
        </ul>
      </div>

      <div className="sidenav-footer position-absolute w-100 bottom-0 ">
        <div className="mx-3">
          <Link
            to="/dashboard/setting"
            className="btn btn-outline-dark mt-4 w-100"
          >
            User Profile
          </Link>
          <button
            className="btn bg-gradient-dark w-100 mt-2"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
