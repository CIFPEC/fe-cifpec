import React, { useState, useEffect } from 'react';
import Main from '../components/Main';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [viewProject, setViewProject] = useState(null);
  const [projectName, setProjectName] = useState('');
  const [groupMembers, setGroupMembers] = useState(['', '', '']);
  const [supervisor, setSupervisor] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedProjects = JSON.parse(sessionStorage.getItem('projectList')) || [];
    setProjects(savedProjects);
  }, []);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSaveGroup = () => {
    const kumpulanData = {
      projectName,
      groupMembers,
      supervisor
    };
    sessionStorage.setItem('kumpulanData', JSON.stringify(kumpulanData));
    handleCloseModal();
    navigate('/dashboard/project/newproject');
  };

  const handleViewProject = (project) => {
    setViewProject(project);
  };

  const handleCloseViewModal = () => {
    setViewProject(null);
  };

  return (
    <Main>
      <div className="container-fluid py-4">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            <div className="card p-4 shadow-sm">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
                <h6 className="fw-bold mb-3 mb-md-0">Senarai Projek (semua department)</h6>
                <div className="d-flex flex-md-row flex-column align-items-md-center gap-2 w-100 w-md-auto mt-3">
                  <button onClick={handleOpenModal} className="btn btn-danger w-100 w-md-auto px-4 py-2">
                    Cipta Baru
                  </button>
                  <button className="btn btn-success w-100 w-md-auto px-4 py-2">
                    Export
                  </button>
                </div>


              </div>

              <div className="table-responsive">
                <table className="table table-bordered align-middle text-center">
                  <thead className="table-light">
                    <tr>
                      <th>Nama Projek</th>
                      <th>Penyelaras</th>
                      <th>Penyelia</th>
                      <th>Status</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.length === 0 ? (
                      <tr>
                        <td colSpan="5">No projects available</td>
                      </tr>
                    ) : (
                      projects.map((proj, index) => (
                        <tr key={index}>
                          <td>{proj.projectName}</td>
                          <td>{proj.penyelaras || '-'}</td>
                          <td>{proj.penyelia || proj.supervisor || '-'}</td>
                          <td>{proj.status || 'Dalam Proses'}</td>
                          <td>
                            <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => handleViewProject(proj)}
                            >
                              Lihat
                            </button>
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
                  <li className="page-item active"><a className="page-link" href="#">1</a></li>
                  <li className="page-item"><a className="page-link" href="#">2</a></li>
                  <li className="page-item"><a className="page-link" href="#">›</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>

        {/* Modal Bina Kumpulan */}
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Bina Kumpulan</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nama Projek</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Masukkan nama projek"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </Form.Group>
              <Form.Label>Nama Ahli Kumpulan</Form.Label>
              {[0, 1, 2].map((i) => (
                <Form.Group className="mb-2" key={i}>
                  <Form.Control
                    type="text"
                    placeholder={`Ahli ${i + 1}`}
                    value={groupMembers[i]}
                    onChange={(e) => {
                      const updated = [...groupMembers];
                      updated[i] = e.target.value;
                      setGroupMembers(updated);
                    }}
                  />
                </Form.Group>
              ))}
              <Form.Group className="mb-3">
                <Form.Label>Nama Penyelia</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Masukkan nama penyelia"
                  value={supervisor}
                  onChange={(e) => setSupervisor(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>Tutup</Button>
            <Button variant="primary" onClick={handleSaveGroup}>Simpan</Button>
          </Modal.Footer>
        </Modal>

        {/* Modal Lihat Projek */}
        <Modal show={!!viewProject} onHide={handleCloseViewModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Maklumat Projek</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {viewProject && (
              <div>
                <p><strong>Nama Projek:</strong> {viewProject.projectName}</p>
                <p><strong>Nama Ahli:</strong></p>
                <ul>
                  {viewProject.groupMembers.map((member, idx) => (
                    <li key={idx}>{member}</li>
                  ))}
                </ul>
                <p><strong>Penyelia:</strong> {viewProject.supervisor || '-'}</p>
                <p><strong>Status:</strong> {viewProject.status}</p>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseViewModal}>Tutup</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Main>
  );
}

export default ProjectList;