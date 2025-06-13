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

  const dummyKategori = [
    { id: 1, name: "Smart Vending Machine", course: "Komputer", field: "IoT" },
    { id: 2, name: "Portable Battery Charger", course: "Mekatronik", field: "Automation" },
    { id: 3, name: "Egg Grading Machine", course: "Pembuatan", field: "Mechanical" },
    { id: 4, name: "Meat Floss Fryer", course: "Mekatronik", field: "FoodTech" },
    { id: 5, name: "Lock N Load", course: "Automotif", field: "Security" },
  ];

  const dummySenaraiProjek = [
    {
      name: "Smart Vending Machine",
      penyelaras: "Puan Haida",
      penyelia: "Puan Fairuzana",
      course: "Komputer",
      field: "IoT"
    },
    {
      name: "Egg Grading Machine",
      penyelaras: "Encik Kamal",
      penyelia: "Puan Hana",
      course: "Mekatronik",
      field: "Automation"
    },
    {
      name: "Portable Battery Charger",
      penyelaras: "Puan Laila",
      penyelia: "Encik Azwan",
      course: "Pembuatan",
      field: "Electrical"
    }
  ];

  const bidangStatistik = {
    "Web Development": 8,
    "Mechatronic": 12,
    "Networking": 5,
    "Game Development": 7,
    "Automotive": 4,
    "Manufacturing": 3,
  };

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

  useEffect(() => {
    const ctx = document.getElementById('bidangChart');
    let chart;

    if (ctx && Object.keys(bidangStatistik).length > 0) {
      chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: Object.keys(bidangStatistik),
          datasets: [
            {
              label: 'Jumlah Projek',
              data: Object.values(bidangStatistik),
              backgroundColor: '#3f8efc',
              borderRadius: 6,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1
              }
            }
          },
        },
      });
    }

    return () => {
      if (chart) chart.destroy();
    };
  }, []);

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

        <div className="row mt-4">
          <div className="col-12">
            <div className="bg-white p-4 shadow-sm rounded h-100 border">
              <h5 className="mb-3 fw-semibold">Kategori Projek Penyertaan</h5>
              <div className="table-responsive">
                <table className="table table-bordered align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>No</th>
                      <th>Nama Projek</th>
                      <th>Kursus</th>
                      <th>Bidang</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dummyKategori.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.course}</td>
                        <td>{item.field}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-12">
            <div className="bg-white p-4 shadow-sm rounded h-100 border">
              <h5 className="mb-3 fw-semibold">Statistik Penyertaan Mengikut Bidang</h5>
              <div style={{ height: '300px', position: 'relative' }}>
                <canvas id="bidangChart"></canvas>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-12">
            <div className="bg-white p-4 shadow-sm rounded h-100 border">
              <h5 className="mb-3 fw-semibold">Senarai Projek Pelajar</h5>
              <div className="table-responsive">
                <table className="table table-bordered align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Nama Projek</th>
                      <th>Penyelaras</th>
                      <th>Penyelia</th>
                      <th>Kursus</th>
                      <th>Bidang</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dummySenaraiProjek.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.name}</td>
                        <td>{item.penyelaras}</td>
                        <td>{item.penyelia}</td>
                        <td>{item.course}</td>
                        <td>{item.field}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

      </div>
    </Main>
  );
}

export default Dashboard;
