import React from 'react'
import Main from '../components/Main'

function UserRequest() {

    
  return (
   <Main>
    {/* <!-- Tajuk --> */}
      <div className="card p-4 shadow-sm mt-5 ms-3 w-75">
        <h6 className="fw-bold mb-3">Permintaan User</h6>

        <div className="table-responsive">
          <table className="table table-bordered text-center align-middle">
            <thead className="table-light">
              <tr>
                <th>Email</th>
                <th>Status</th>
                <th>Department</th>
                <th>Level</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Ali@gmail.com</td>
                <td>Diterima</td>
                <td>Komputer</td>
                <td>Admin</td>
                <td className="text-success fw-semibold">Selesai</td>
              </tr>
              <tr>
                <td>Siti@gmail.com</td>
                <td>Dalam Proses</td>
                <td>Meka</td>
                <td>Penyelia</td>
                <td>
                  <button className="btn btn-success btn-sm me-1 mt-3">
                    Setuju
                  </button>
                  <button className="btn btn-danger btn-sm mt-3">Tolak</button>
                </td>
              </tr>
              <tr>
                <td>Jamal@gmail.com</td>
                <td>Ditolak</td>
                <td>Automotif</td>
                <td>Penyelaras</td>
                <td className="text-success fw-semibold">Selesai</td>
              </tr>
              <tr>
                <td>Maimun@gmail.com</td>
                <td>Dalam Proses</td>
                <td>Automotif</td>
                <td>Penyelaras</td>
                <td>
                  <button className="btn btn-success btn-sm me-1 mt-3">
                    Setuju
                  </button>
                  <button className="btn btn-danger btn-sm mt-3">Tolak</button>
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

export default UserRequest
