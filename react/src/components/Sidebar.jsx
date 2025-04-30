import React from 'react'
import CFImage from './CFImage';
import Logo from "./../assets/img/Cifpec-Logo.png";
import { Link } from 'react-router';

function Sidebar({show}) {
  return (
    <>
      {/* <!-- Sidebar --> */}
      <aside className={`sidenav navbar navbar-vertical navbar-expand-xs border-radius-lg fixed-start ms-2 ${(show ? "bg-white" : "")}sidenav navbar navbar-vertical navbar-expand-xs border-radius-lg fixed-start ms-2  bg-white my-2`}
        id="sidenav-main">
        <div className="sidenav-header">
          <Link to="/dashboard" className="logo cursor-pointer">
            <CFImage src={Logo} alt="Cifpec Logo" width="100px" className="text-center mt-3" />
          </Link>
        </div>
        <hr className="horizontal dark mt-0 mb-2"/>
          <div className="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link active bg-gradient-dark text-white" href="../pages/dashboard.html">
                  <i className="material-symbols-rounded opacity-5">dashboard</i>
                  <span className="nav-link-text ms-1">Dashboard</span>
                </Link>
              </li>
              <li className="nav-item">
                <i className="material-symbols-rounded opacity-5">table_view</i>
                <span className="nav-link-text ms-4">Users</span>
                <ul>
                  <li>
                    <a className="nav-link text-dark" href="../pages/tables.html">
                      <span className="nav-link-text ms-1">User Request</span>
                    </a>
                  </li>
                </ul>
                <ul>
                  <li>
                    <a className="nav-link text-dark" href="../pages/tables.html">
                      <span className="nav-link-text ms-1">Lecturer List</span>
                    </a>
                  </li>
                </ul>
                <ul>
                  <li>
                    <a className="nav-link text-dark" href="../pages/tables.html">
                      <span className="nav-link-text ms-1">Student</span>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link text-dark" href="../pages/billing.html">
                  <i className="material-symbols-rounded opacity-5">receipt_long</i>
                  <span className="nav-link-text ms-1">Sesi</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-dark" href="../pages/virtual-reality.html">
                  <i className="material-symbols-rounded opacity-5">view_in_ar</i>
                  <span className="nav-link-text ms-1">Pengguna</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-dark" href="../pages/rtl.html">
                  <i className="material-symbols-rounded opacity-5">format_textdirection_r_to_l</i>
                  <span className="nav-link-text ms-1">Kursus</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-dark" href="../pages/notifications.html">
                  <i className="material-symbols-rounded opacity-5">notifications</i>
                  <span className="nav-link-text ms-1">Web Settings</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="sidenav-footer position-absolute w-100 bottom-0 ">
            <div className="mx-3">
              <a className="btn btn-outline-dark mt-4 w-100"
                href="https://www.creative-tim.com/learning-lab/bootstrap/overview/material-dashboard?ref=sidebarfree"
                type="button">Profil Pengguna</a>
              <a className="btn bg-gradient-dark w-100"
                href="https://www.creative-tim.com/product/material-dashboard-pro?ref=sidebarfree" type="button">Log
                Keluar</a>
            </div>
          </div>
      </aside>
    </>
  );
}

export default Sidebar
