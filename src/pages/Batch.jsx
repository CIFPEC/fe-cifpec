import React, { useState, useEffect } from 'react';
import Main from '../components/Main';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';

function Batch() {
  const navigate = useNavigate();

  const [batches, setBatches] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editBatchName, setEditBatchName] = useState('');
  const [editCourse, setEditCourse] = useState('');
  const [editStatus, setEditStatus] = useState('');

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewBatch, setViewBatch] = useState(null);

  useEffect(() => {
    const batchString = sessionStorage.getItem('newBatch');
    if (batchString) {
      const newBatch = JSON.parse(batchString);
      const isDuplicate = batches.some(
        (b) => b.name === newBatch.name && b.course === newBatch.course && b.status === newBatch.status
      );
      if (!isDuplicate) {
        setBatches((prev) => [...prev, newBatch]);
      }
      sessionStorage.removeItem('newBatch');
    }
  }, [batches]);

  const handleOpenEditModal = (index) => {
    const batch = batches[index];
    setEditIndex(index);
    setEditBatchName(batch.name);
    setEditCourse(batch.course);
    setEditStatus(batch.status);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setEditIndex(null);
    setEditBatchName('');
    setEditCourse('');
    setEditStatus('');
  };

  const handleSaveEdit = () => {
    const updated = [...batches];
    updated[editIndex] = {
      name: editBatchName,
      course: editCourse,
      status: editStatus
    };
    setBatches(updated);
    handleCloseEditModal();
  };

  const handleOpenViewModal = (batch) => {
    setViewBatch(batch);
    setViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setViewModalOpen(false);
    setViewBatch(null);
  };

  return (
    <Main>
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body px-0 pt-0 pb-2">
                <div className="tab-content" id="batchTabContent">
                  <div className="tab-pane fade show active" id="batch" role="tabpanel">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center px-3 pt-3 gap-2">
                      <h6>Batch Lists</h6>
                      <button className="btn btn-primary btn-sm" onClick={() => navigate('/dashboard/batch/new')}>Create New</button>
                    </div>

                    <div className="table-responsive p-3">
                      <table className="table table-bordered align-items-center mb-0">
                        <thead className="table-dark">
                          <tr>
                            <th>Batch Name</th>
                            <th>Course</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {batches.length === 0 ? (
                            <tr>
                              <td colSpan="4" className="text-center">No batch available</td>
                            </tr>
                          ) : (
                            batches.map((batch, index) => (
                              <tr key={index}>
                                <td>{batch.name}</td>
                                <td>{batch.course}</td>
                                <td>
                                  <span className={`badge ${batch.status?.toLowerCase() === 'active' ? 'bg-success' : batch.status?.toLowerCase() === 'pending' ? 'bg-warning' : 'bg-secondary'}`}>
                                    {batch.status || 'N/A'}
                                  </span>
                                </td>
                                <td>
                                  <div className="d-flex flex-column flex-sm-row gap-1">
                                    <button className="btn btn-outline-dark btn-sm" onClick={() => handleOpenViewModal(batch)}>View</button>
                                    {batch.status?.toLowerCase() === 'active' && (
                                      <button className="btn btn-outline-primary btn-sm" onClick={() => handleOpenEditModal(index)}>Edit</button>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>

                    <div className="d-flex justify-content-center p-3">
                      <nav>
                        <ul className="pagination pagination-sm mb-0">
                          <li className="page-item"><a className="page-link" href="#">&lt;</a></li>
                          <li className="page-item"><a className="page-link" href="#">3</a></li>
                          <li className="page-item"><a className="page-link" href="#">5</a></li>
                          <li className="page-item"><a className="page-link" href="#">&gt;</a></li>
                        </ul>
                      </nav>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={editModalOpen} onHide={handleCloseEditModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Batch</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Batch Name</Form.Label>
              <Form.Control type="text" value={editBatchName} onChange={(e) => setEditBatchName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Course</Form.Label>
              <Form.Select value={editCourse} onChange={(e) => setEditCourse(e.target.value)}>
                <option value="">Select course</option>
                <option value="Komputer">Komputer</option>
                <option value="Meka">Meka</option>
                <option value="Pembuatan">Pembuatan</option>
                <option value="Automotif">Automotif</option>
                <option value="Telekomunikasi">Telekomunikasi</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select value={editStatus} onChange={(e) => setEditStatus(e.target.value)}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>Close</Button>
          <Button variant="primary" onClick={handleSaveEdit}>Save Changes</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={viewModalOpen} onHide={handleCloseViewModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Batch Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {viewBatch && (
            <div>
              <p><strong>Batch Name:</strong> {viewBatch.name}</p>
              <p><strong>Course:</strong> {viewBatch.course}</p>
              <p><strong>Status:</strong> {viewBatch.status}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseViewModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Main>
  );
}

export default Batch;
