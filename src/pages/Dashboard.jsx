import React, { useEffect } from 'react';
import Main from '../components/Main';
import { Chart } from 'chart.js/auto';

function Dashboard() {
  useEffect(() => {
    const ctx = document.getElementById('courseChart');
    let chart;

    if (ctx) {
      chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Komputer', 'Meka', 'Automotif', 'Pembuatan'],
          datasets: [
            {
              data: [40, 20, 25, 15],
              backgroundColor: ['#f39cdb', '#28788e', '#792b2b', '#7fd3a5'],
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
            },
          },
        },
      });
    }

    return () => {
      if (chart) chart.destroy();
    };
  }, []);

  return (
    <Main>
      <div className="container-fluid py-2">
        <div className="row">
          <div className="ms-3">
            <h3 className="mb-0 h4 font-weight-bolder">Dashboard</h3>
          </div>

          {/* Kad Info */}
          {[
            { label: 'Jumlah Pelajar', value: 100, color: 'bg-gradient-pink' },
            { label: 'Jumlah Projek', value: 59, color: 'bg-gradient-success' },
            { label: 'Jumlah Slide', value: 100, color: 'bg-gradient-warning' },
            { label: 'Jumlah Poster', value: 38, color: 'bg-gradient-danger' },
          ].map((item, idx) => (
            <div key={idx} className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
              <div className="card">
                <div className="card-header p-2 ps-3">
                  <div className="d-flex justify-content-between">
                    <div>
                      <p className="text-sm mb-0 text-capitalize">{item.label}</p>
                      <h4 className="mb-0">{item.value}</h4>
                    </div>
                    <div className={`icon icon-md icon-shape ${item.color} shadow-dark shadow text-center border-radius-lg`}>
                      <i className="material-symbols-rounded opacity-10">insert_chart</i>
                    </div>
                  </div>
                </div>
                <hr className="dark horizontal my-0" />
              </div>
            </div>
          ))}
        </div>

        <div className="row">
          {/* Carta */}
          <div className="col-md-8 mt-3">
            <div className="bg-white p-4 shadow-sm rounded h-100 w-100">
              <h5 className="mb-3">Gambaran keseluruhan kursus</h5>
              <div style={{ height: '300px', position: 'relative' }}>
                <canvas id="courseChart"></canvas>
              </div>
            </div>
          </div>

          {/* User Baru */}
          <div className="col-md-4 w-30 mt-3">
            <div className="bg-white p-4 shadow-sm rounded h-100 ms-3">
              <h5 className="mb-4">User Baru</h5>
              <div className="d-flex fw-bold border-bottom pb-2 mb-3">
                <div className="w-25 ms-1">Profil</div>
                <div className="w-75 ms-5">Name</div>
              </div>
              <ul className="list-unstyled">
                {["Sarah Khalisa", "Mohamad Haikal", "Amelia Husna", "Jamaluddin Ahmad"].map((user, idx) => (
                  <li key={idx} className="d-flex align-items-center mb-3">
                    <div className="w-25">
                      <div className="bg-secondary rounded-circle" style={{ width: 30, height: 30 }}></div>
                    </div>
                    <div className="w-75 ms-5">{user}</div>
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