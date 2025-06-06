import React, { useState, useEffect } from 'react';
import Main from '../components/Main';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import axiosInstance from '../utils/axiosInstance';
import { jwtDecode } from 'jwt-decode';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [supervisors, setSupervisors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [viewProject, setViewProject] = useState(null);
  const [projectName, setProjectName] = useState('');
  const [groupMembers, setGroupMembers] = useState([]);
  const [supervisor, setSupervisor] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('accessToken');
  const decoded = token ? jwtDecode(token) : {};
  const courseId = decoded?.courseId;
  const userId = decoded?.userId;
  const batchId = decoded?.batchId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resProjects = await axiosInstance.get(`/user/projects`);
        setProjects(resProjects?.data?.data || null);

        const resStudents = await axiosInstance.get(`/users/students?course=${courseId}`);
        const getStudent = resStudents?.data?.data.filter(user => user.userId !== userId)
        setStudents(getStudent || null);

        const resSupervisors = await axiosInstance.get(`/users/lecturers?course=${courseId}`);
        setSupervisors(resSupervisors?.data?.data || null);

        const getUser = await axiosInstance.get('/user/profile');
        setCurrentUser(getUser?.data?.data || {});
      } catch (err) {
        console.log("ERROE FETCH:",err)
        setError('Failed to fetch data');
      }
    };

    fetchData();
  }, [courseId, userId]);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleSaveGroup = async () => {
    if (!projectName || !supervisor || groupMembers.includes('')) {
      setError('Please complete all fields.');
      return;
    }
  
    const hasDuplicate = new Set(groupMembers).size !== groupMembers.length;
    if (hasDuplicate) {
      setError('Group members must be unique.');
      return;
    }
  
    const selectedStudentIds = groupMembers.map(name => {
      const student = students.find(s => s.userName === name);
      return student?.userId;
    }).filter(Boolean);

    
    const supervisorObj = supervisors.find(s => s.userName === supervisor);
    if (!supervisorObj) {
      setError('Invalid supervisor selected.');
      return;
    
    }
  
    const data = {
      projectName,
      supervisorId: supervisorObj.userId,
      teams: selectedStudentIds,
    };
  
    try {
      const response = await axiosInstance.post('/projects', data);
      const newProjectId = response?.data?.data?.projectId;
      navigate(`/dashboard/studentproject?projectId=${newProjectId}`);
    } catch (err) {
      console.error('❌ Create project error:', err?.response?.data || err.message);
      if(err?.response?.data?.errors?.length > 0){
        const error = err?.response?.data?.errors[0].message;
        return setError(error);
      }
      setError(err.response?.data?.message || 'Gagal cipta projek. Sila semak semula.');
    }
  };
  

  const handleViewProject = (project) => setViewProject(project);
  const handleCloseViewModal = () => setViewProject(null);

  return (
    <Main>
      <div className="container-fluid py-4">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            <div className="card p-4 shadow-sm">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
                <h6 className="fw-bold mb-3 mb-md-0">Project List (Based on Your Course)</h6>
                <div className="d-flex flex-md-row flex-column align-items-md-center gap-2 w-100 w-md-auto mt-3">
                  <button onClick={handleOpenModal} className="btn btn-danger w-100 w-md-auto px-4 py-2">Create New</button>
                </div>
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
                        <tr key={index}>
                          <td>{proj.projectName}</td>
                          <td>{proj.penyelaras || '-'}</td>
                          <td>{proj.penyelia || proj.supervisor || '-'}</td>
                          <td>{proj.status || 'In Progress'}</td>
                          <td><button className="btn btn-sm btn-outline-primary" onClick={() => handleViewProject(proj)}>View</button></td>
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

        {/* Modal Create Group */}
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Create Group</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Project Name</Form.Label>
                <Form.Control type="text" placeholder="Enter project name" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
              </Form.Group>
              <Form.Label>Group Members</Form.Label>
              <Form.Group className="mb-3">
                <Form.Control type="text" placeholder="Your Name" value={currentUser.userName} readOnly/>
              </Form.Group>
              {[1, 2].map((i) => (
                <Form.Group className="mb-2" key={i}>
                  <Form.Select
                    value={groupMembers[i]}
                    onChange={(e) => {
                      const updated = [...groupMembers];
                      updated[i] = e.target.value;
                      setGroupMembers(updated);
                    }}>
                    <option value="">--select member--</option>
                    {students.map(student => (
                      <option key={student.userId} value={student.userName}>
                        {student.userName}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              ))}
              <Form.Group className="mb-3">
                <Form.Label>Supervisor</Form.Label>
                <Form.Select value={supervisor} onChange={(e) => setSupervisor(e.target.value)}>
                  <option value="">--select supervisor--</option>
                  {supervisors.map(sup => (
                    <option key={sup.userId} value={sup.userName}>{sup.userName}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
            <Button variant="primary" onClick={handleSaveGroup}>Save</Button>
          </Modal.Footer>
        </Modal>

        {/* Modal View Project */}
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
                  {viewProject.groupMembers.map((member, idx) => (
                    <li key={idx}>{member}</li>
                  ))}
                </ul>
                <p><strong>Supervisor:</strong> {viewProject.supervisor || '-'}</p>
                <p><strong>Status:</strong> {viewProject.status}</p>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseViewModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Main>
  );
}

export default ProjectList;