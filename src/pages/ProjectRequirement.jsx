import React, { useEffect, useState } from 'react';
import Main from '../components/Main';
import { jwtDecode } from 'jwt-decode';
import axiosInstance from '../utils/axiosInstance';
import { Button, Modal, Form } from 'react-bootstrap';
import './../assets/css/ProjectRequirement.css';

function ProjectRequirement() {
  const [projects, setProjects] = useState([]);
  const [viewProject, setViewProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [boothEdit, setBoothEdit] = useState('');
  const [showBoothModal, setShowBoothModal] = useState(false);

  const token = localStorage.getItem('accessToken');
  const decoded = token ? jwtDecode(token) : {};
  const roleId = decoded?.roleId;
  const batchId = decoded?.batchId;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axiosInstance.get(`/batches/1/projects?page=1&limit=10`);
        setProjects(response.data.data || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);

  const handleViewProject = (project) => {
    console.log(project);
    setViewProject(project);
  };

  const handleCloseViewModal = () => setViewProject(null);

  return (
    <Main>
      <div className="container-fluid py-4">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            <div className="card p-4 shadow">
              <div className="mb-3">
                <h5 className="fw-bold">Project List (PPL)</h5>
              </div>

              <div className="table-responsive">
                <table className="table table-bordered align-middle text-center">
                  <thead className="table-light">
                    <tr>
                      <th>Project Name</th>
                      <th>Coordinator</th>
                      <th>Supervisor</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.length === 0 ? (
                      <tr><td colSpan="5">No projects available</td></tr>
                    ) : (
                      projects.map((proj, index) => (
                        <tr key={index} className="mobile-table-row">
                          <td data-label="Project Name">{proj.projectName}</td>
                          <td data-label="Coordinator">{proj.courseCoordinatorName || '-'}</td>
                          <td data-label="Supervisor">{proj.courseSupervisorName || '-'}</td>
                          <td data-label="Status">{proj.isFinal ? 'Final' : 'In Progress'}</td>
                          <td data-label="Action">
                            <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleViewProject(proj)}>View</button>
                            {roleId === 1 && (
                              <button
                                className="btn btn-sm btn-warning"
                                onClick={() => {
                                  setSelectedProject(proj);
                                  setBoothEdit(proj.noBooth || '');
                                  setShowBoothModal(true);
                                }}
                              >
                                Edit Booth
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <Modal show={!!viewProject} onHide={handleCloseViewModal} centered>
                <Modal.Header closeButton>
                  <Modal.Title>Project Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {viewProject && (
                    <div>
                      <p><strong>Project Name:</strong> {viewProject.projectName}</p>
                      <p><strong>Group Members:</strong></p>
                      <ul>
                        {viewProject.projectTeamMembers.map((member, idx) => (
                          <li key={idx}>{member.userName}</li>
                        ))}
                      </ul>
                      <p><strong>Supervisor:</strong> {viewProject.courseSupervisorName || '-'}</p>
                      <p><strong>Status:</strong> {viewProject.isFinal === false ? 'in Progress' : 'Final'}</p>
                      {viewProject.projectRequirements.map((req, idx) => (
                        req.fieldType === "file" ? (
                          <p key={idx}><strong>{req.fieldName}:</strong> <a href={req.fieldValue} target="_blank">View</a></p>
                        ) : (
                          <p key={idx}><strong>{req.fieldName}:</strong> {req.fieldValue}</p>
                        )
                      ))}
                    </div>
                  )}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseViewModal}>Close</Button>
                </Modal.Footer>
              </Modal>

              <Modal show={showBoothModal} onHide={() => setShowBoothModal(false)} centered>
                <Modal.Header closeButton>
                  <Modal.Title>Edit No Booth</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form.Group>
                    <Form.Label>No Booth</Form.Label>
                    <Form.Control className='border ps-2'
                      type="text"
                      value={boothEdit}
                      onChange={(e) => setBoothEdit(e.target.value)}
                    />
                  </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setShowBoothModal(false)}>Close</Button>
                  <Button variant="primary" onClick={() => {
                    console.log(`No Booth untuk projek ${selectedProject.projectName}: ${boothEdit}`);
                    setShowBoothModal(false);
                  }}>
                    Save (Dummy)
                  </Button>
                </Modal.Footer>
              </Modal>

            </div>
          </div>
        </div>
      </div>
    </Main>
  );
}

export default ProjectRequirement;
