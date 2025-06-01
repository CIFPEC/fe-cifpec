import React, { useState, useEffect } from 'react';
import Main from '../components/Main';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import axiosInstance from '../utils/axiosInstance';

function Batch() {
  const navigate = useNavigate();

  const [batches, setBatches] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editBatchName, setEditBatchName] = useState('');
  const [editCourse, setEditCourse] = useState('');
  const [editStatus, setEditStatus] = useState('');

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewBatch, setViewBatch] = useState(null);

  useEffect(() => {
    fetchBatches(currentPage);
  }, [currentPage]);

  const fetchBatches = async (page) => {
    try {
      const res = await axiosInstance.get(`/batches?page=${page}&limit=5`);
      setBatches(res.data.data);
      setTotalPages(res.data.paginate.totalPages);
    } catch (err) {
      console.error('Gagal ambil data batch:', err);
    }
  };

  const handleOpenEditModal = (index) => {
    const batch = batches[index];
    setEditIndex(index);
    setEditBatchName(batch.batchName);
    setEditCourse(batch.batchCourses?.map(c => c.courseName).join(', '));
    setEditStatus(''); // Status placeholder
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
      ...updated[editIndex],
      batchName: editBatchName,
      batchCourses: editCourse.split(', ').map(name => ({ courseName: name }))
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
                      <h6>Senarai Batch</h6>
                      <button className="btn btn-primary btn-sm" onClick={() => navigate('/dashboard/batch/new')}>Create New</button>
                    </div>

                    <div className="table-responsive p-3">
                      <table className="table table-bordered align-items-center mb-0">
                        <thead className="table-dark">
                          <tr>
                            <th>Nama Batch</th>
                            <th>Kursus</th>
                            <th>Status</th>
                            <th>Tindakan</th>
                          </tr>
                        </thead>
                        <tbody>
                          {batches.length === 0 ? (
                            <tr>
                              <td colSpan="4" className="text-center">Tiada Batch Tersedia</td>
                            </tr>
                          ) : (
                            batches.map((batch, index) => (
                              <tr key={index}>
                                <td>{batch.batchName}</td>
                                <td>{batch.batchCourses?.map(c => c.courseName).join(', ')}</td>
                                <td>
                                  <span className="badge bg-secondary">Belum Ditentukan</span>
                                </td>
                                <td>
                                  <div className="d-flex flex-column flex-sm-row gap-1">
                                    <button className="btn btn-outline-dark btn-sm" onClick={() => handleOpenViewModal(batch)}>Lihat</button>
                                    <button className="btn btn-outline-primary btn-sm" onClick={() => handleOpenEditModal(index)}>Ubah</button>
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
                          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}>&lt;</button>
                          </li>
                          {Array.from({ length: totalPages }, (_, i) => (
                            <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                              <button className="page-link" onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                            </li>
                          ))}
                          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}>&gt;</button>
                          </li>
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
          <Modal.Title>Ubah Batch</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nama Batch</Form.Label>
              <Form.Control type="text" value={editBatchName} onChange={(e) => setEditBatchName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Kursus</Form.Label>
              <Form.Control type="text" value={editCourse} onChange={(e) => setEditCourse(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>Tutup</Button>
          <Button variant="primary" onClick={handleSaveEdit}>Simpan Perubahan</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={viewModalOpen} onHide={handleCloseViewModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Butiran Batch</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {viewBatch && (
            <div>
              <p><strong>Nama Batch:</strong> {viewBatch.batchName}</p>
              <p><strong>Kursus:</strong> {viewBatch.batchCourses?.map(c => c.courseName).join(', ')}</p>
              <p><strong>Status:</strong> Belum Ditentukan</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseViewModal}>Tutup</Button>
        </Modal.Footer>
      </Modal>
    </Main>
  );
}

export default Batch;
