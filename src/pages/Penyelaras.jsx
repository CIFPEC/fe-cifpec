import React from 'react'
import Main from '../components/Main'

function Penyelaras() {


  return (
    <Main>
      {/* <!-- Tajuk --> */}
      <div className="card p-4 shadow-sm mt-5 ms-3 w-75">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="fw-bold mb-0">Senarai Projek (Komputer)</h6>
          <button className="btn btn-success">Export</button>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered align-middle text-center">
            <thead className="table-light">
              <tr>
                <th>Kumpulan</th>
                <th>Penyelia</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Kumpulan A</td>
                <td>Puan Sabrina</td>
                <td>Selesai</td>
                <td>
                  <button className="btn btn-sm btn-outline-primary mt-3">
                    Lihat
                  </button>
                </td>
              </tr>
              <tr>
                <td>Kumpulan B</td>
                <td>Encik Haikal</td>
                <td>Dalam Proses</td>
                <td>
                  <button className="btn btn-sm btn-outline-primary mt-3">
                    Lihat
                  </button>
                </td>
              </tr>
              <tr>
                <td>Kumpulan C</td>
                <td>Encik Suhaimi</td>
                <td>Dalam Proses</td>
                <td>
                  <button className="btn btn-sm btn-outline-primary mt-3">
                    Lihat
                  </button>
                </td>
              </tr>
              <tr>
                <td>Kumpulan D</td>
                <td>Cik Munirah</td>
                <td>Selesai</td>
                <td>
                  <button className="btn btn-sm btn-outline-primary mt-3">
                    Lihat
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* <!-- Pagination --> */}
        <nav className="d-flex justify-content-center mt-3">
          <ul className="pagination pagination-sm mb-0">
            <li className="page-item disabled">
              <a className="page-link" href="#">‹</a>
            </li>
            <li className="page-item"><a className="page-link" href="#">3</a></li>
            <li className="page-item"><a className="page-link" href="#">4</a></li>
            <li className="page-item"><a className="page-link" href="#">›</a></li>
          </ul>
        </nav>
      </div>

    </Main>
  )
}

export default Penyelaras
