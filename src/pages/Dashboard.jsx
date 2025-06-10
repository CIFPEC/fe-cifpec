// DashboardUIEnhanced.jsx
import React, { useEffect, useState } from 'react';
import Main from '../components/Main';
import { Chart } from 'chart.js/auto';
import axiosInstance from '../utils/axiosInstance';
import { jwtDecode } from 'jwt-decode';

function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    pelajar: 0,
    projek: 0,
    slide: 0,
    poster: 0,
    kursus: {},
    students: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get('/dashboard');
        const data = res.data?.data || {};

        const kursus = {};
        data.studentLists?.forEach(stud => {
          const namaKursus = stud.courseName;
          kursus[namaKursus] = (kursus[namaKursus] || 0) + 1;
        });

        setDashboardData({
          pelajar: data.totalStudents || 0,
          projek: data.totalProjects || 0,
          slide: 0,
          poster: 0,
          kursus,
          students: data.studentLists || []
        });
        console.log("Fetched dashboard from /api/v1/dashboard:", data);
      } catch (err) {
        console.error('Failed to fetch unified dashboard data:', err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const ctx = document.getElementById('courseChart');
    let chart;

    if (ctx && Object.keys(dashboardData.kursus).length > 0) {
      const labels = Object.keys(dashboardData.kursus);
      const values = Object.values(dashboardData.kursus);
      const backgroundColor = ['#0a9396', '#94d2bd', '#ee9b00', '#bb3e03'];

      if (labels[0] === 'Web Development') {
        labels.push(labels.shift());
        values.push(values.shift());
        backgroundColor.push(backgroundColor.shift());
      }

      chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [
            {
              data: values,
              backgroundColor,
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'left',
              labels: {
                padding: 20,
                boxWidth: 20,
                color: '#444',
                font: {
                  size: 14,
                  weight: '500'
                }
              }
            },
          },
        },
      });
    }

    return () => {
      if (chart) chart.destroy();
    };
  }, [dashboardData.kursus]);

  const infoCards = [
    { label: 'Total Students Current', value: dashboardData.pelajar, color: 'bg-pink-100 text-pink-800', icon: 'group' },
    { label: 'Total Project Current', value: dashboardData.projek, color: 'bg-green-100 text-green-800', icon: 'assignment' },
    { label: 'Total All Student', value: dashboardData.slide, color: 'bg-yellow-100 text-yellow-800', icon: 'slideshow' },
    { label: 'Total All Project', value: dashboardData.poster, color: 'bg-red-100 text-red-800', icon: 'image' },
  ];

  return (
    <Main>
      <div className="container-fluid py-2">
        <div className="row">
          <div className="col-12">
            <h3 className="mb-3 h4 font-weight-bolder">Dashboard</h3>
          </div>

          {infoCards.map((item, idx) => (
            <div key={idx} className="col-12 col-sm-6 col-xl-3 mb-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-header p-3 d-flex justify-content-between align-items-center">
                  <div>
                    <p className="text-sm text-muted mb-1 fw-semibold text-uppercase">{item.label}</p>
                    <h4 className="mb-0 text-dark fw-bold">{item.value}</h4>
                  </div>
                  <div className={`icon icon-md rounded-circle d-flex align-items-center justify-content-center ${item.color}`} style={{ width: '40px', height: '40px' }}>
                    <span className="material-symbols-rounded">{item.icon}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row mt-4">
          <div className="col-12 col-lg-8 mb-4">
            <div className="bg-white p-4 shadow-sm rounded h-100 border">
              <h5 className="mb-3 fw-semibold">Course Overview</h5>
              <div style={{ height: '300px', position: 'relative' }}>
                <canvas id="courseChart"></canvas>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-4 mb-4">
            <div className="bg-white p-4 shadow-sm rounded h-100 border">
              <h5 className="mb-4 fw-semibold">New Students</h5>
              <div className="d-flex fw-bold border-bottom pb-2 mb-3">
                <div className="w-25">Profile</div>
                <div className="w-75">Name</div>
              </div>
              <ul className="list-unstyled">
                {dashboardData.students.slice(0, 6).map((user, idx) => (
                  <li key={idx} className="d-flex align-items-center mb-3">
                    <div className="w-25">
                      <div className="bg-secondary rounded-circle" style={{ width: 30, height: 30 }}></div>
                    </div>
                    <div className="w-75">{user.userName}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
}

export default Dashboard;
