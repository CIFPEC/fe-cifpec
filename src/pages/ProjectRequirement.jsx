import React, { useEffect, useState } from 'react';
import Main from '../components/Main';
import { jwtDecode } from 'jwt-decode';
import axiosInstance from '../utils/axiosInstance';
import { Button, Modal } from 'react-bootstrap';
import './../assets/css/ProjectRequirement.css';

function ProjectRequirement() {
  const [projects, setProjects] = useState([]);
  const [viewProject, setViewProject] = useState(null);
  const token = localStorage.getItem('accessToken');
  const decoded = token ? jwtDecode(token) : {};
  const batchId = decoded?.batchId;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axiosInstance.get(`/batches/1/projects?page=1&limit=10`); // hardcoded batchId = 1
        setProjects(response.data.data || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);

  const handleApprove = async (projectId) => {
    try {
      await axiosInstance.patch(`/projects/${projectId}/archive`);
    } catch (error) {
      console.error('Error approving project:', error);
    }
  };

  const getFileName = (url) => {
    try {
      return decodeURIComponent(url).split('/').pop();
    } catch {
      return '-';
    }
  };

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
                            <button className="btn btn-sm btn-outline-primary me-2" onClick={() => setViewProject(proj)}>View</button>
                            {!proj.isFinal && (
                              <button className="btn btn-sm btn-outline-success" onClick={() => handleApprove(proj.projectId)}>Approve</button>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <Modal show={!!viewProject} onHide={() => setViewProject(null)} centered>
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
                          <li key={idx}>{member.userName || `User ID: ${member.userId}`}</li>
                        ))}
                      </ul>
                      <p><strong>Supervisor:</strong> {viewProject.courseSupervisorName || '-'}</p>
                      <p><strong>Status:</strong> {viewProject.isFinal ? 'Final' : 'In Progress'}</p>
                      {viewProject.projectRequirements.map((req, idx) => (
                        req.fieldType === "file" ? (
                          <p key={idx}>
                            <strong>{req.fieldName}:</strong> <a href={req.fieldValue} target="_blank" rel="noreferrer">{getFileName(req.fieldValue)}</a>
                          </p>
                        ) : (
                          <p key={idx}><strong>{req.fieldName}:</strong> {req.fieldValue}</p>
                        )
                      ))}
                    </div>
                  )}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setViewProject(null)}>Close</Button>
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
