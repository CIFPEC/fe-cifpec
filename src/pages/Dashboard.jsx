import React from 'react'
import Main from '../components/Main'
import { Container, ListGroup } from 'react-bootstrap';

function Dashboard() {
  return (
    <>
      <Main>
        <div class="container-fluid py-2">
          <div class="row">
            <div class="ms-3">
              <h3 class="mb-0 h4 font-weight-bolder">Dashboard</h3>
            </div>
            <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
              <div class="card">
                <div class="card-header p-2 ps-3">
                  <div class="d-flex justify-content-between">
                    <div>
                      <p class="text-sm mb-0 text-capitalize">Jumlah Pelajar</p>
                      <h4 class="mb-0">100</h4>
                    </div>
                    <div class="icon icon-md icon-shape bg-gradient-dark shadow-dark shadow text-center border-radius-lg">
                      <i class="material-symbols-rounded opacity-10">weekend</i>
                    </div>
                  </div>
                </div>
                <hr class="dark horizontal my-0" />
                <div class="card-footer p-2 ps-3">
                  <p class="mb-0 text-sm">Lihat semua</p>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
              <div class="card">
                <div class="card-header p-2 ps-3">
                  <div class="d-flex justify-content-between">
                    <div>
                      <p class="text-sm mb-0 text-capitalize">Jumlah Projek</p>
                      <h4 class="mb-0">59</h4>
                    </div>
                    <div class="icon icon-md icon-shape bg-gradient-dark shadow-dark shadow text-center border-radius-lg">
                      <i class="material-symbols-rounded opacity-10">person</i>
                    </div>
                  </div>
                </div>
                <hr class="dark horizontal my-0" />
                <div class="card-footer p-2 ps-3">
                  <p class="mb-0 text-sm">Lihat Semua</p>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
              <div class="card">
                <div class="card-header p-2 ps-3">
                  <div class="d-flex justify-content-between">
                    <div>
                      <p class="text-sm mb-0 text-capitalize">Jumlah Projek</p>
                      <h4 class="mb-0">100</h4>
                    </div>
                    <div class="icon icon-md icon-shape bg-gradient-dark shadow-dark shadow text-center border-radius-lg">
                      <i class="material-symbols-rounded opacity-10">leaderboard</i>
                    </div>
                  </div>
                </div>
                <hr class="dark horizontal my-0" />
                <div class="card-footer p-2 ps-3">
                  <p class="mb-0 text-sm">Lihat Semua</p>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-sm-6">
              <div class="card">
                <div class="card-header p-2 ps-3">
                  <div class="d-flex justify-content-between">
                    <div>
                      <p class="text-sm mb-0 text-capitalize">Jumlah Poster</p>
                      <h4 class="mb-0">38</h4>
                    </div>
                    <div class="icon icon-md icon-shape bg-gradient-dark shadow-dark shadow text-center border-radius-lg">
                      <i class="material-symbols-rounded opacity-10">weekend</i>
                    </div>
                  </div>
                </div>
                <hr class="dark horizontal my-0" />
                <div class="card-footer p-2 ps-3">
                  <p class="mb-0 text-sm">Lihat Semua</p>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div class="row">
          {/* <!-- Carta --> */}
          <div class="col-md-8">
            <div class="bg-white p-4 shadow-sm rounded h-100 w-100 ms-3">
              <h5 class="mb-3">Gambaran keseluruhan kursus</h5>
              <canvas id="courseChart" style={{maxHeight: "300px", width: "100%"}}></canvas>
            </div>
          </div>

          {/* <!-- User Baru --> */}
          <div class="col-md-4 w-30">
            <div class="bg-white p-4 shadow-sm rounded h-100 ms-3">
              <h5 class="mb-4">User Baru</h5>

              {/* <!-- Header --> */}
              <div class="d-flex fw-bold border-bottom pb-2 mb-3">
                <div class="w-25 ms-1">Profil</div>
                <div class="w-75 ms-5">Name</div>
              </div>

              {/* <!-- Senarai User --> */}
              <ul class="list-unstyled">
                <li class="d-flex align-items-center mb-3">
                  <div class="w-25">
                    <div class="profile-img me-2"></div>
                  </div>
                  <div class="w-75 ms-5">Sarah Khalisa</div>
                </li>
                <li class="d-flex align-items-center mb-3">
                  <div class="w-25">
                    <div class="profile-img me-2"></div>
                  </div>
                  <div class="w-75 ms-5">Mohamad Haikal</div>
                </li>
                <li class="d-flex align-items-center mb-3">
                  <div class="w-25">
                    <div class="profile-img me-2"></div>
                  </div>
                  <div class="w-75 ms-5">Amelia Husna</div>
                </li>
                <li class="d-flex align-items-center mb-3">
                  <div class="w-25">
                    <div class="profile-img me-2"></div>
                  </div>
                  <div class="w-75 ms-5">Jamaluddin Ahmad</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Main>
    </>
  );
}

export default Dashboard
