import React, { useEffect, useState } from 'react';
import { Nav, Navbar, NavbarCollapse, Container } from "react-bootstrap";
import "./../assets/css/material-dashboard.css";
import Sidebar from './Sidebar';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { jwtDecode } from 'jwt-decode';
import defaultProfile from "./../assets/img/pic-icon.png";

function Main({ children }) {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (sidebarVisible) {
      document.body.classList.add("g-sidenav-pinned");
    } else {
      document.body.classList.remove("g-sidenav-pinned");
    }
  }, [sidebarVisible]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get('/user/profile');
        const data = res?.data?.data;
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, []);

  const token = localStorage.getItem('accessToken');
  const decoded = token ? jwtDecode(token) : {};
  const shouldShowSidebar = decoded?.roleId === 5 || decoded?.isApproved === true;

  const handleLogout = async () => {
    try {
      await axiosInstance.delete('/auth/logout');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      localStorage.removeItem('firstLogin');
      window.location.href = '/login';
    }
  };

  const handleHeaderDropdown = (params=null) => {
    if (params?.target?.title === "menu"){
      return setShowDropdown(!showDropdown);
    }
    if(typeof params === 'boolean') {
      return setShowDropdown(params);
    }
  };

  const currentPath = location.pathname.split('/')[2] || 'dashboard';
  const capitalizedPath = currentPath.charAt(0).toUpperCase() + currentPath.slice(1);

  return (
    <>
      {shouldShowSidebar && <Sidebar show={sidebarVisible} />}
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
        <Navbar expand="lg" className="navbar navbar-main navbar-expand-lg px-0 mx-3 shadow-none border-radius-xl" id="navbarBlur" data-scroll="true">
          <Container fluid className="container-fluid py-1 px-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                <li className="breadcrumb-item text-sm"><a className="opacity-5 text-dark" href="#">Dashboard</a></li>
                <li className="breadcrumb-item text-sm text-dark active" aria-current="page">{capitalizedPath}</li>
              </ol>
            </nav>
            <Navbar.Collapse className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
              <div className="ms-md-auto pe-md-3 d-flex align-items-center"></div>
              <ul className="navbar-nav d-flex align-items-center justify-content-end">
                <li className="nav-item d-xl-none ps-3 d-flex align-items-center mb-1 me-3">
                  <a onClick={() => setSidebarVisible(!sidebarVisible)} className="nav-link text-body p-0 cursor-pointer" id="iconNavbarSidenav">
                    <div className="sidenav-toggler-inner">
                      <i className="sidenav-toggler-line"></i>
                      <i className="sidenav-toggler-line"></i>
                      <i className="sidenav-toggler-line"></i>
                    </div>
                  </a>
                </li>
                <li className="nav-item d-flex align-items-center position-relative" >
                  <div className="d-flex align-items-center cursor-pointer">
                    <span className="avatar avatar-sm rounded-circle me-2 border" style={{ backgroundImage: `url(${user?.userProfileImage ? user?.userProfileImage : defaultProfile})`, width: '30px', height: '30px', borderRadius: '50%', backgroundSize: 'cover' }} title='menu' onClick={(e) => handleHeaderDropdown(e)}></span>
                  </div>
                  {showDropdown && (
                    <div className="position-absolute bg-white shadow-sm border rounded px-3 py-2 w-50" style={{ top: '100%', right: 0, zIndex: 1000, minWidth: '200px'}}>
                     <button className="btn btn-sm btn-outline-dark w-100 mb-2" onClick={() => navigate('/dashboard/setting')}>
                        Settings
                      </button>
                      <button className="btn btn-sm btn-dark w-100" onClick={handleLogout}>
                        Logout
                      </button>
                    </div>
                  )}
                </li>
              </ul>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <div className="container-fluid px-3 px-md-4 py-3" style={{ minHeight: '100vh', overflowX: 'hidden' }} onClick={() => handleHeaderDropdown(false)}>
          {children}
        </div>
      </main>
    </>
  );
}

export default Main;
