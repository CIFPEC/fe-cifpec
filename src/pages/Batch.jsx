import React, { useState, useEffect } from 'react';
import Main from '../components/Main';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import axiosInstance from '../utils/axiosInstance';
import Select from 'react-select';

function Batch() {
  const navigate = useNavigate();

  const [batches, setBatches] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editBatchName, setEditBatchName] = useState('');
  const [editCourses, setEditCourses] = useState([]);
  const [editStatus, setEditStatus] = useState('');
  const [editRequirements, setEditRequirements] = useState([]);
  const [courseOptions, setCourseOptions] = useState([]);

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewBatch, setViewBatch] = useState(null);

  useEffect(() => {
    fetchBatches(currentPage);
    fetchCourses();
  }, [currentPage]);

  const fetchBatches = async (page) => {
    try {
      const res = await axiosInstance.get(`/batches?page=${page}&limit=5`);
      setBatches(res.data.data);
      setTotalPages(res.data.paginate.totalPages);
    } catch (err) {
      console.error('Failed to fetch batch data:', err);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await axiosInstance.get('/courses?page=1&limit=100');
      const options = response.data?.data.map(course => ({
        value: course.courseId,
        label: course.courseName
      })) || [];
      setCourseOptions(options);
    } catch (error) {
      console.error('Failed to fetch course list:', error);
    }
  };

  const handleOpenEditModal = (index) => {
    const batch = batches[index];
    setEditIndex(index);
    setEditBatchName(batch.batchName);
    setEditCourses(
      batch.batchCourses?.map(c => ({ value: c.courseId, label: c.courseName })) || []
    );
    setEditRequirements(batch.projectRequirements.map(req => ({
      label: req.label,
      type: req.type,
      required: req.required,
      tag: req.tag,
      fieldId: req.fieldId
    })) || []);
    setEditStatus('');
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setEditIndex(null);
    setEditBatchName('');
    setEditCourses([]);
    setEditRequirements([]);
    setEditStatus('');
  };

  const handleAddRequirement = () => {
    setEditRequirements([
      ...editRequirements,
      { label: '', type: 'text', required: false, tag: '',fieldId: undefined }
    ]);
  };

  const handleRemoveRequirement = (index) => {
    const updated = [...editRequirements];
    updated.splice(index, 1);
    setEditRequirements(updated);
  };

  const handleRequirementChange = (index, field, value) => {
    const updated = [...editRequirements];
    updated[index][field] = value;
    if (field === 'label') {
      updated[index]['tag'] = value.replace(/\s+/g, '').toLowerCase();
    }
    setEditRequirements(updated);
  };

  const handleSaveEdit = async () => {
    try {
      const preparedRequirements = editRequirements.map(req => {
        if (req.fieldId) {
          // Kalau ada `fieldId`, itu adalah requirement sedia ada, jadi hantar bersama `fieldId`
          return {
            ...req,
            tag: req.tag || req.label.replace(/\s+/g, '').toLowerCase(),
          };
        } else {
          // Kalau tiada `fieldId`, ini adalah requirement baru, jadi kita boleh kosongkan `fieldId`
          return {
            ...req,
            fieldId: undefined,  // Pastikan `fieldId` kosong untuk requirement baru
            tag: req.tag || req.label.replace(/\s+/g, '').toLowerCase(),
          };
        }
      });
  
      const payload = {
        batchName: editBatchName,
        courses: editCourses.map(c => c.value),
        projectRequirements: preparedRequirements
      };
  
      const batchId = batches[editIndex]?.batchId;
      await axiosInstance.patch(`/batches/${batchId}`, payload);
      fetchBatches(currentPage);
      handleCloseEditModal();
    } catch (error) {
      console.error('Failed to update batch:', error);
    }
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
                      <h6>Batch List</h6>
                      <button className="btn btn-primary btn-sm" onClick={() => navigate('/dashboard/batch/new')}>Create New</button>
                    </div>

                    <div className="table-responsive p-3">
                      <table className="table table-bordered align-items-center mb-0">
                        <thead className="table-dark">
                          <tr>
                            <th>Batch Name</th>
                            <th>Course</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {batches.length === 0 ? (
                            <tr>
                              <td colSpan="4" className="text-center">No Batch Available</td>
                            </tr>
                          ) : (
                            batches.map((batch, index) => (
                              <tr key={index}>
                                <td>{batch.batchName}</td>
                                <td>{batch.batchCourses?.map(c => c.courseName).join(', ')}</td>
                                <td>
                                  <span className="badge bg-secondary">Undetermined</span>
                                </td>
                                <td>
                                  <div className="d-flex flex-column flex-sm-row gap-1">
                                    <button className="btn btn-outline-dark btn-sm" onClick={() => handleOpenViewModal(batch)}>View</button>
                                    <button className="btn btn-outline-primary btn-sm" onClick={() => handleOpenEditModal(index)}>Edit</button>
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

      <Modal show={editModalOpen} onHide={handleCloseEditModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Batch</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Batch Name</Form.Label>
            <Form.Control type="text" value={editBatchName} onChange={(e) => setEditBatchName(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Course</Form.Label>
            <Select isMulti options={courseOptions} value={editCourses} onChange={setEditCourses} />
          </Form.Group>

          <div className="mb-3">
            <label className="form-label fw-bold fs-5">Advance Settings</label>
            <div className="rounded">
              {editRequirements.length === 0 ? (
                <div className="text-center">
                  <p className="text-muted">No requirement fields added</p>
                  <button className="btn btn-outline-primary btn-sm" onClick={handleAddRequirement}>＋ Add Requirement</button>
                </div>
              ) : (
                editRequirements.map((req, index) => (
                  <div key={index} className="row mb-2 align-items-center">
                    <div className="col-md-4">
                      <input
                        type="text"
                        className="form-control border border-dark shadow-sm text-dark bg-white"
                        style={{ padding: '8px', fontSize: '14px' }}
                        placeholder="Requirement name"
                        value={req.label}
                        onChange={(e) => handleRequirementChange(index, 'label', e.target.value)}
                      />
                    </div>
                    <div className="col-md-3">
                      <select
                        className="form-select border border-dark shadow-sm text-dark bg-white"
                        value={req.type}
                        onChange={(e) => handleRequirementChange(index, 'type', e.target.value)}
                      >
                        <option value="text">Text</option>
                        <option value="file">File</option>
                      </select>
                    </div>
                    <div className="col-md-3">
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`requiredToggle-${index}`}
                          checked={req.required}
                          onChange={(e) => handleRequirementChange(index, 'required', e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor={`requiredToggle-${index}`}>
                          {req.required ? 'Required' : 'Optional'}
                        </label>
                      </div>
                    </div>
                    <div className="col-md-2 d-flex gap-2">
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleRemoveRequirement(index)}
                      >−</button>
                      {index === editRequirements.length - 1 && (
                        <button
                          type="button"
                          className="btn btn-outline-primary btn-sm"
                          onClick={handleAddRequirement}
                        >＋</button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
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
              <p><strong>Batch Name:</strong> {viewBatch.batchName}</p>
              <p><strong>Course:</strong> {viewBatch.batchCourses?.map(c => c.courseName).join(', ')}</p>
              <p><strong>Status:</strong> Undetermined</p>
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