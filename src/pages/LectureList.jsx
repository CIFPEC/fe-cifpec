import React, { useState, useEffect } from 'react';
import Main from '../components/Main';
import { Modal, Button } from 'react-bootstrap';

function LectureList() {
  const [lecturers, setLecturers] = useState([]);
  const [selectedLecturer, setSelectedLecturer] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setLecturers([
      {
        id: 1,
        name: 'Fairuzana',
        department: 'Komputer',
        level: 'Admin',
      },
    ]);
  }, []);

  const handleView = (lecturer) => {
    setSelectedLecturer(lecturer);
    setShowModal(true);
  };

  return (
    <Main>
      <div className="container-fluid py-4">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            <div className="card p-4 shadow-sm">
              <h6 className="fw-bold mb-3">Lecturer List</h6>

              <div className="table-responsive">
                <table className="table table-bordered text-center align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Name</th>
                      <th>Department</th>
                      <th>Level</th>
                      <th>Details</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lecturers.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-muted">
                          Tiada pensyarah tersedia
                        </td>
                      </tr>
                    ) : (
                      lecturers.map((lecturer) => (
                        <tr key={lecturer.id}>
                          <td>{lecturer.name}</td>
                          <td>{lecturer.department}</td>
                          <td>{lecturer.level}</td>
                          <td>
                            <button
                              className="btn btn-outline-primary btn-sm"
                              onClick={() => handleView(lecturer)}
                            >
                              View
                            </button>
                          </td>
                          <td>
                            <div className="form-check form-switch d-flex justify-content-center">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                checked
                                readOnly
                              />
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <nav className="d-flex justify-content-center mt-3">
                <ul className="pagination pagination-sm mb-0">
                  <li className="page-item"><a className="page-link" href="#">‹</a></li>
                  <li className="page-item active"><a className="page-link" href="#">1</a></li>
                  <li className="page-item"><a className="page-link" href="#">2</a></li>
                  <li className="page-item"><a className="page-link" href="#">›</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>

        {/* Modal View */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Maklumat Pensyarah</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedLecturer && (
              <>
                <p><strong>Nama:</strong> {selectedLecturer.name}</p>
                <p><strong>Jabatan:</strong> {selectedLecturer.department}</p>
                <p><strong>Level:</strong> {selectedLecturer.level}</p>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Tutup
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Main>
  );
}

export default LectureList;
