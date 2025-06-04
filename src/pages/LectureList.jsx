import React, { useState, useEffect } from 'react';
import Main from '../components/Main';
import { Modal, Button } from 'react-bootstrap';
import axiosInstance from '../utils/axiosInstance';

function LectureList() {
  const [lecturers, setLecturers] = useState([]);
  const [selectedLecturer, setSelectedLecturer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchLecturers = async () => {
      try {
        const res = await axiosInstance.get(`/users/lecturers?isApproved=true&page=${currentPage}&limit=10`);
        setLecturers(res.data?.data || []);
        setTotalPages(res.data?.paginate?.totalPages || 1);
      } catch (error) {
        console.error("Failed to fetch approved lecturers:", error);
      }
    };

    fetchLecturers();
  }, [currentPage]);

  const handleView = (userId) => {
    const selected = lecturers.find(user => user.userId === userId);
    setSelectedLecturer(selected);
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
                      <th>Course</th>
                      <th>Role</th>
                      <th>Details</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lecturers.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-muted">
                          No lecturers available
                        </td>
                      </tr>
                    ) : (
                      lecturers.map((lecturer) => (
                        <tr key={lecturer.userId}>
                          <td>{lecturer.userName || '-'}</td>
                          <td>{lecturer.userCourse?.courseName || '-'}</td>
                          <td>{lecturer.userRole?.roleName || '-'}</td>
                          <td>
                            <button
                              className="btn btn-outline-primary btn-sm mt-3"
                              onClick={() => handleView(lecturer.userId)}
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
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>‹</button>
                  </li>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <li className={`page-item ${currentPage === i + 1 ? 'active' : ''}`} key={i}>
                      <button className="page-link" onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>›</button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>

        {/* Modal View */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Lecturer Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedLecturer && (
              <>
                <p><strong>Name:</strong> {selectedLecturer.userName || '-'}</p>
                <p><strong>Email:</strong> {selectedLecturer.userEmail || '-'}</p>
                <p><strong>Phone:</strong> {selectedLecturer.userPhone || '-'}</p>
                <p><strong>Gender:</strong> {selectedLecturer.userGender || '-'}</p>
                <p><strong>Course:</strong> {selectedLecturer.userCourse?.courseName || '-'}</p>
                <p><strong>Role:</strong> {selectedLecturer.userRole?.roleName || '-'}</p>
                <p><strong>Join Date:</strong> {new Date(selectedLecturer.joinDate).toLocaleString()}</p>
                <p><strong>Last Update:</strong> {new Date(selectedLecturer.lastUpdate).toLocaleString()}</p>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Main>
  );
}

export default LectureList;
