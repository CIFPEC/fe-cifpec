import React from 'react';
import { Nav, Navbar, NavbarCollapse, Container } from "react-bootstrap";
import "./../assets/css/material-dashboard.css";
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';

function Main({ children }) {
  const [sidebarVisible, setSidebarVisible] = React.useState(false);
  const navigate = useNavigate(); // ← Tambah ini untuk redirect

  React.useEffect(() => {
    if (sidebarVisible) {
      document.body.classList.add("g-sidenav-pinned");
    } else {
      document.body.classList.remove("g-sidenav-pinned");
    }
  }, [sidebarVisible]);

  return (
    <>
      <Sidebar show={sidebarVisible} />
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
        <Navbar expand="lg" className="navbar navbar-main navbar-expand-lg px-0 mx-3 shadow-none border-radius-xl" id="navbarBlur" data-scroll="true">
          <Container fluid className="container-fluid py-1 px-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                <li className="breadcrumb-item text-sm"><a className="opacity-5 text-dark" href="#">Pages</a></li>
                <li className="breadcrumb-item text-sm text-dark active" aria-current="page">Dashboard</li>
              </ol>
            </nav>
            <Navbar.Collapse className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
              <div className="ms-md-auto pe-md-3 d-flex align-items-center"></div>
              <ul className="navbar-nav d-flex align-items-center justify-content-end">
                <li className="nav-item d-xl-none ps-3 d-flex align-items-center">
                  <a onClick={() => setSidebarVisible(!sidebarVisible)} className="nav-link text-body p-0 cursor-pointer" id="iconNavbarSidenav">
                    <div className="sidenav-toggler-inner">
                      <i className="sidenav-toggler-line"></i>
                      <i className="sidenav-toggler-line"></i>
                      <i className="sidenav-toggler-line"></i>
                    </div>
                  </a>
                </li>
                <li className="nav-item d-flex align-items-center">
                  <a onClick={() => navigate('/dashboard/setting')} className="nav-link text-body font-weight-bold px-0" style={{ cursor: 'pointer' }}>
                    <i className="material-symbols-rounded">account_circle</i>
                  </a>
                </li>
              </ul>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <div className="container-fluid px-3 px-md-4 py-3" style={{ minHeight: '100vh', overflowX: 'hidden' }}>
          {children}
        </div>
      </main>
    </>
  );
}

export default Main;
