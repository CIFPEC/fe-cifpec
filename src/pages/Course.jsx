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
            <div className="card p-4 shadow-sm mt-5 ms-3 w-75">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="fw-bold mb-0">Senarai Projek (Komputer)</h6>
                    <button className="btn btn-success" onClick={handleOpenCreateModal}>Create New</button>
                </div>

                <div className="table-responsive">
                    <table className="table table-bordered text-center align-middle">
                        <thead className="table-light">
                            <tr>
                                <th>Name</th>
                                <th>Penyelaras</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projectList.length === 0 ? (
                                <tr>
                                    <td colSpan="3">No projects available</td>
                                </tr>
                            ) : (
                                projectList.map((name, index) => (
                                    <tr key={index}>
                                        <td>{name}</td>
                                        <td>Haida</td>
                                        <td>
                                            <button className="btn btn-outline-primary btn-sm me-3 mt-3" onClick={() => handleOpenEditModal(index)}>edit</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create New Modal */}
            <Modal show={showCreateModal} onHide={handleCloseCreateModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Project Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter project name" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseCreateModal}>Close</Button>
                    <Button variant="primary" onClick={handleAddProject}>Save</Button>
                </Modal.Footer>
            </Modal>

            {/* Edit Project Modal */}
            <Modal show={showEditModal} onHide={handleCloseEditModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Edit Project Name</Form.Label>
                            <Form.Control type="text" placeholder="Edit project name" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEditModal}>Close</Button>
                    <Button variant="primary" onClick={handleEditProject}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </Main>
    );
}

export default Course;
