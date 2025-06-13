// Course.jsx

import React, { useEffect, useState } from 'react';
import Main from '../components/Main';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import axiosInstance from '../utils/axiosInstance';

function Course() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [editProjectIndex, setEditProjectIndex] = useState(null);
  const [projectList, setProjectList] = useState([]);
  const [apiError, setApiError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchCourses(page);
  }, [page]);

  const fetchCourses = async (currentPage) => {
    try {
      const response = await axiosInstance.get(`/courses?page=${currentPage}&limit=5`);
      setProjectList(response.data?.data || []);
      setTotalPages(response.data?.paginate?.totalPages || 1);
    } catch (error) {
      console.error('Gagal ambil kursus:', error);
      setApiError('Gagal ambil kursus');
    }
  };

  const handleOpenCreateModal = () => {
    setProjectName('');
    setApiError('');
    setShowCreateModal(true);
  };

  const handleCloseCreateModal = () => setShowCreateModal(false);

  const handleOpenEditModal = (index) => {
    setEditProjectIndex(index);
    setProjectName(projectList[index]?.courseName);
    setApiError('');
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setEditProjectIndex(null);
    setProjectName('');
    setApiError('');
    setShowEditModal(false);
  };

  const createCourse = async () => {
    if (!projectName.trim()) return;

    try {
      await axiosInstance.post('/courses', { courseName: projectName });
      handleCloseCreateModal();
      fetchCourses(page);
    } catch (error) {
      console.error('Gagal tambah kursus:', error.response?.data || error.message);
      setApiError(error.response?.data?.message || 'Gagal tambah kursus');
    }
  };

  const updateCourse = async () => {
    if (!projectName.trim()) return;

    try {
      const courseId = projectList[editProjectIndex]?.courseId;
      await axiosInstance.patch(`/courses/${courseId}`, { courseName: projectName });
      handleCloseEditModal();
      fetchCourses(page);
    } catch (error) {
      console.error('Gagal ubah kursus:', error.response?.data || error.message);
      setApiError(error.response?.data?.message || 'Gagal ubah kursus');
    }
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <Main>
      <div className="container-fluid py-4">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            <div className="card p-4 shadow-sm">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2 mb-3">
                <h6 className="fw-bold mb-0">Course List</h6>
                <Button variant="primary" onClick={handleOpenCreateModal}>Create New</Button>
              </div>

              <div className="table-responsive">
                <table className="table table-bordered text-center align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Name</th>
                      <th>Supervisor</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projectList.length === 0 ? (
                      <tr>
                        <td colSpan="3">No Course Available</td>
                      </tr>
                    ) : (
                      projectList.map((course, index) => (
                        <tr key={index}>
                          <td>{course?.courseName || '-'}</td>
                          <td>{course?.coordinatorName || 'Tiada'}</td>
                          <td>
                            <div className="d-flex flex-column flex-sm-row justify-content-center gap-2">
                              <button className="btn btn-outline-primary btn-sm" onClick={() => handleOpenEditModal(index)}>Ubah</button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* PAGINATION STYLE BULAT */}
              <div className="d-flex justify-content-center align-items-center mt-4 gap-2 flex-wrap">
                <button
                  className="btn rounded-circle border"
                  onClick={handlePrevPage}
                  disabled={page === 1}
                  style={{ width: 40, height: 40 }}
                >
                  &lt;
                </button>

                {[...Array(totalPages)].map((_, i) => {
                  const pageNum = i + 1;
                  const isActive = page === pageNum;
                  return (
                    <button
                      key={pageNum}
                      className={`btn rounded-circle border ${isActive ? 'btn-primary text-white' : 'btn-outline-secondary'}`}
                      onClick={() => setPage(pageNum)}
                      style={{
                        width: 40,
                        height: 40,
                        fontWeight: 'bold'
                      }}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  className="btn rounded-circle border"
                  onClick={handleNextPage}
                  disabled={page === totalPages}
                  style={{ width: 40, height: 40 }}
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Tambah Kursus */}
        <Modal show={showCreateModal} onHide={handleCloseCreateModal} centered>
          <Modal.Header closeButton><Modal.Title>Create Course</Modal.Title></Modal.Header>
          <Modal.Body>
            {apiError && <Alert variant="danger">{apiError}</Alert>}
            <Form.Group className="mb-3">
              <Form.Label>Course</Form.Label>
              <Form.Control
                type="text"
                placeholder="Information Technology"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="form-control-lg"
                style={{ borderRadius: '10px', border: '2px solid #ced4da', fontSize: '16px', padding: '10px 15px' }}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseCreateModal}>Close</Button>
            <Button variant="primary" onClick={createCourse}>Save</Button>
          </Modal.Footer>
        </Modal>

        {/* Modal Ubah Kursus */}
        <Modal show={showEditModal} onHide={handleCloseEditModal} centered>
          <Modal.Header closeButton><Modal.Title>Edit Course</Modal.Title></Modal.Header>
          <Modal.Body>
            {apiError && <Alert variant="danger">{apiError}</Alert>}
            <Form.Group className="mb-3">
              <Form.Label>Course</Form.Label>
              <Form.Control
                type="text"
                placeholder="Information Technology"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="form-control-lg"
                style={{ borderRadius: '10px', border: '2px solid #ced4da', fontSize: '16px', padding: '10px 15px' }}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEditModal}>Close</Button>
            <Button variant="primary" onClick={updateCourse}>Save</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Main>
  );
}

export default Course;
