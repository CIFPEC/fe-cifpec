import React, { useEffect, useState } from 'react';
import Main from '../components/Main';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

function Course() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [editProjectIndex, setEditProjectIndex] = useState(null);
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('https://api-cifpec.xtivebiz.com/api/v1/courses?page=1&limit=100');
      setProjectList(response.data.data); // andaikan `data.data` adalah array kursus
    } catch (error) {
      console.error('Gagal ambil kursus:', error);
    }
  };

  const handleOpenCreateModal = () => setShowCreateModal(true);
  const handleCloseCreateModal = () => setShowCreateModal(false);

  const handleOpenEditModal = (index) => {
    setEditProjectIndex(index);
    setProjectName(projectList[index]?.courseName);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setEditProjectIndex(null);
    setProjectName('');
    setShowEditModal(false);
  };

  return (
    <Main>
      <div className="container-fluid py-4">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            <div className="card p-4 shadow-sm">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2 mb-3">
                <h6 className="fw-bold mb-0">Senarai Kursus</h6>
              </div>

              <div className="table-responsive">
                <table className="table table-bordered text-center align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Nama</th>
                      <th>Penyelaras</th>
                      <th>Tindakan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projectList.length === 0 ? (
                      <tr>
                        <td colSpan="3">Tiada Kursus Tersedia</td>
                      </tr>
                    ) : (
                      projectList.map((course, index) => (
                        <tr key={index}>
                          <td>{course.courseName}</td>
                          <td>{course?.Coordinator?.userName || 'Tiada'}</td>
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
    </Main>
  );
}

export default Course;
