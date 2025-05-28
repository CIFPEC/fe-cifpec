import React, { useState } from 'react';
import Main from '../components/Main';
import { Modal, Button, Form } from 'react-bootstrap';

function Course() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [editProjectIndex, setEditProjectIndex] = useState(null);
  const [projectList, setProjectList] = useState([]);

  const handleOpenCreateModal = () => setShowCreateModal(true);
  const handleCloseCreateModal = () => setShowCreateModal(false);

  const handleOpenEditModal = (index) => {
    setEditProjectIndex(index);
    setProjectName(projectList[index]);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setEditProjectIndex(null);
    setProjectName('');
    setShowEditModal(false);
  };

  const handleAddProject = () => {
    if (projectName.trim() !== '') {
      setProjectList([...projectList, projectName.trim()]);
      setProjectName('');
      handleCloseCreateModal();
    }
  };

  const handleEditProject = () => {
    if (projectName.trim() !== '' && editProjectIndex !== null) {
      const updatedProjects = [...projectList];
      updatedProjects[editProjectIndex] = projectName.trim();
      setProjectList(updatedProjects);
      setProjectName('');
      handleCloseEditModal();
    }
  };

  return (
    <Main>
      <div className="container-fluid py-4">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            <div className="card p-4 shadow-sm">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2 mb-3">
                <h6 className="fw-bold mb-0">Senarai Kursus</h6>
                <button className="btn btn-success" onClick={handleOpenCreateModal}>Cipta Baru</button>
              </div>

              <div className="table-responsive">
                <table className="table table-bordered text-center align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Nama</th>
                      <th>Penyelaras</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projectList.length === 0 ? (
                      <tr>
                        <td colSpan="3">Tiada Kursus Tersedia</td>
                      </tr>
                    ) : (
                      projectList.map((name, index) => (
                        <tr key={index}>
                          <td>{name}</td>
                          <td>Haida</td>
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
            </div>
          </div>
        </div>
      </div>

      {/* Create New Modal */}
      <Modal show={showCreateModal} onHide={handleCloseCreateModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Kursus</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nama Kursus</Form.Label>
              <Form.Control type="text" placeholder="Cipta Nama Kursus" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCreateModal}>Tutup</Button>
          <Button variant="primary" onClick={handleAddProject}>Simpan</Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Project Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Ubah Kursus</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Ubah Nama Kursus</Form.Label>
              <Form.Control type="text" placeholder="Cipta Nama Kursus" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>Tutup</Button>
          <Button variant="primary" onClick={handleEditProject}>Simpan Perubahan</Button>
        </Modal.Footer>
      </Modal>
    </Main>
  );
}

export default Course;
