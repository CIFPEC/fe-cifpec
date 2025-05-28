import React, { useState, useEffect } from 'react';
import Main from '../components/Main';

function UserRequest() {
  const [userRequests, setUserRequests] = useState([]);

  useEffect(() => {
    // Contoh data
    setUserRequests([
      {
        id: 1,
        email: 'Ali@gmail.com',
        status: 'Dalam Proses',
        department: 'Komputer',
        level: 'Penyelia',
        action: ''
      }
    ]);
  }, []);

  const handleSetuju = (id) => {
    setUserRequests(prev =>
      prev.map(user =>
        user.id === id ? { ...user, action: 'Selesai' } : user
      )
    );
  };

  const handleTolak = (id) => {
    setUserRequests(prev =>
      prev.map(user =>
        user.id === id ? { ...user, action: 'Menolak' } : user
      )
    );
  };

  return (
    <Main>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <div className="card p-4 shadow-sm">
              <h6 className="fw-bold mb-3">Permintaan Pengguna</h6>

              <div className="table-responsive">
                <table className="table table-bordered text-center align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Email</th>
                      <th>Status</th>
                      <th>Jabatan</th>
                      <th>Tahap</th>
                      <th>Tindakan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userRequests.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-muted">Tiada user tersedia</td>
                      </tr>
                    ) : (
                      userRequests.map(user => (
                        <tr key={user.id}>
                          <td>{user.email}</td>
                          <td>{user.status}</td>
                          <td>{user.department}</td>
                          <td>{user.level}</td>
                          <td>
                            {user.action === 'Selesai' || user.action === 'Menolak' ? (
                              <span className={`fw-semibold ${user.action === 'Selesai' ? 'text-success' : 'text-danger'}`}>
                                {user.action}
                              </span>
                            ) : (
                              <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-2">
                                <button
                                  className="btn btn-success btn-sm"
                                  onClick={() => handleSetuju(user.id)}
                                >
                                  Setuju
                                </button>
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() => handleTolak(user.id)}
                                >
                                  Tolak
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <nav className="d-flex justify-content-center mt-3">
                <ul className="pagination pagination-sm mb-0">
                  <li className="page-item disabled"><a className="page-link" href="#">‹</a></li>
                  <li className="page-item"><a className="page-link" href="#">3</a></li>
                  <li className="page-item"><a className="page-link" href="#">4</a></li>
                  <li className="page-item"><a className="page-link" href="#">›</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
}

export default UserRequest;
