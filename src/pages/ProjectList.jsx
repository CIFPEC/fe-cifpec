import React, { useState, useEffect } from "react";
import Main from "../components/Main";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import axiosInstance from "../utils/axiosInstance";
import { jwtDecode } from "jwt-decode";
import { useLocation } from "react-router-dom";
import Loading from "../components/Loading";

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [supervisors, setSupervisors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [viewProject, setViewProject] = useState(null);
  const [projectName, setProjectName] = useState("");
  const [groupMembers, setGroupMembers] = useState([]);
  const [supervisor, setSupervisor] = useState("");
  const [error, setError] = useState("");
  const [boothNumber, setBoothNumber] = useState("");
  const [hasProject, setHasProject] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showBoothModal, setShowBoothModal] = useState(false);
  const [courses, setCourses] = useState(false);
  const [course, setCourse] = useState("");
  const [categories, setCategories] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("accessToken");
  const decoded = token ? jwtDecode(token) : {};
  const courseId = decoded?.courseId;
  const userId = decoded?.userId;
  let batchId = decoded?.batchId;
  const roleId = decoded?.roleId;

  useEffect(() => {
    fetchProject();
  }, [course, categoryId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getUser = await axiosInstance.get("/user/profile");
        setCurrentUser(getUser?.data?.data || {});

        const getCourses = await axiosInstance.get("/courses");
        setCourses(getCourses?.data?.data);

        const getCategory = await axiosInstance.get("/categories");
        setCategories(getCategory?.data?.data);

        if (roleId === 5) {
          const resStudents = await axiosInstance.get(
            `/users/students?course=${courseId}`
          );
          const getStudent = resStudents?.data?.data.filter(
            (user) => user.userId !== userId
          );
          setStudents(getStudent || null);

          const resSupervisors = await axiosInstance.get(
            `/users/lecturers?course=${courseId}`
          );
          const filteredSupervisors = resSupervisors?.data?.data.filter(
            (user) => user.userRole?.roleName?.toLowerCase() === "supervisor"
          );
          setSupervisors(filteredSupervisors || null);
        }
      } catch (err) {
        console.log("ERROR FETCH:", err);
        setError("Failed to fetch data");
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    };

    fetchData();
  }, [location]);

  if (isLoading) return <Loading />;

  async function fetchProject() {
    try {
      let resProjects;
      if (roleId === 5) {
        resProjects = await axiosInstance.get(`/user/projects`);
        setHasProject(resProjects?.data?.data?.length > 0);
      } else if (roleId === 3) {
        resProjects = await axiosInstance.get(
          `/batches/${batchId}/projects?course=${courseId}&page=1&limit=10`
        );
      } else if (roleId === 4) {
        resProjects = await axiosInstance.get(
          `/batches/${batchId}/projects?course=${courseId}&supervisor=${userId}&page=1&limit=10`
        );
      } else if (roleId === 1) {
        const getBatch = await axiosInstance.get("/batches");
        let latestBatch = getBatch?.data?.data;
        if (latestBatch.length > 0) {
          batchId = latestBatch[0].batchId;
          resProjects = await axiosInstance.get(
            `/batches/${batchId}/projects?course=${course}&category=${categoryId}&page=1&limit=10`
          );
        }
      }
      setProjects(resProjects?.data?.data || null);
    } catch (error) {
      console.log("ERROR FETCH PROJECT: ", error);
    }
  }
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleSaveGroup = async () => {
    if (!projectName || !supervisor || groupMembers.includes("")) {
      setError("Please complete all fields.");
      return;
    }

    const hasDuplicate = new Set(groupMembers).size !== groupMembers.length;
    if (hasDuplicate) {
      setError("Group members must be unique.");
      return;
    }

    const selectedStudentIds = groupMembers
      .map((name) => {
        const student = students.find((s) => s.userName === name);
        return student?.userId;
      })
      .filter(Boolean);

    const supervisorObj = supervisors.find((s) => s.userName === supervisor);
    if (!supervisorObj) {
      setError("Invalid supervisor selected.");
      return;
    }

    const data = {
      projectName,
      supervisorId: supervisorObj.userId,
      teams: selectedStudentIds,
    };

    try {
      const response = await axiosInstance.post("/projects", data);
      const newProjectId = response?.data?.data?.projectId;
      navigate(`/dashboard/studentproject?projectId=${newProjectId}`);
    } catch (err) {
      console.error(
        "❌ Create project error:",
        err?.response?.data || err.message
      );
      if (err?.response?.data?.errors?.length > 0) {
        const error = err?.response?.data?.errors[0].message;
        return setError(error);
      }
      setError(
        err.response?.data?.message || "Gagal cipta projek. Sila semak semula."
      );
    }
  };

  const handleViewProject = (project) => {
    setViewProject(project);
  };

  const handleEditProject = (projectId) => {
    navigate(`/dashboard/studentproject?projectId=${projectId}`);
  };

  const handleCloseViewModal = () => setViewProject(null);

  return (
    <Main>
      <div className="container-fluid py-4">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            {roleId === 1 && (
              <div className="row">
                <div className="col-md-2">
                  <h6>Filter By: </h6>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label fw-bold">Course</label>
                  <select
                    className="form-select ps-2"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                  >
                    <option value="">-- All Courses --</option>
                    {courses &&
                      courses.map((opt, idx) => {
                        return (
                          <option key={idx} value={opt.courseId}>
                            {opt.courseName}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label fw-bold">Category</label>
                  <select
                    className="form-select ps-2"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                  >
                    <option value="">-- All Categories --</option>
                    {categories &&
                      categories.map((opt, idx) => {
                        return (
                          <option key={idx} value={opt.categoryId}>
                            {opt.categoryName}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
            )}
            <div className="card p-4 shadow-sm">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
                <h6 className="fw-bold mb-3 mb-md-0">
                  Project List
                  {currentUser?.userCourse?.courseName
                    ? ` ( ${currentUser.userCourse.courseName} )`
                    : ""}
                </h6>
                <div className="d-flex flex-md-row flex-column align-items-md-center gap-2 w-100 w-md-auto mt-3">
                  {roleId === 5 && !hasProject && (
                    <button
                      onClick={handleOpenModal}
                      className="btn btn-info w-100 w-md-auto px-4 py-2"
                    >
                      Create New
                    </button>
                  )}
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
                      <tr>
                        <td colSpan="5">No projects available</td>
                      </tr>
                    ) : (
                      projects.map((proj, index) => (
                        <tr key={index}>
                          <td>{proj.projectName}</td>
                          <td>
                            {proj.penyelaras ||
                              proj.courseCoordinatorName ||
                              "-"}
                          </td>
                          <td>
                            {proj.penyelia ||
                              proj.supervisor ||
                              proj.courseSupervisorName ||
                              "-"}
                          </td>
                          <td>
                            {proj.isFinal === false ? "In Progress" : "Final"}
                          </td>
                          <td>
                            <button
                              className="btn btn-sm btn-outline-primary me-2"
                              onClick={() => handleViewProject(proj)}
                            >
                              View
                            </button>
                            {roleId === 5 && (
                              <button
                                className="btn btn-sm btn-outline-success"
                                onClick={() =>
                                  handleEditProject(proj.projectId)
                                }
                              >
                                Edit
                              </button>
                            )}
                            {/* {roleId === 1 && (
                              <button
                                className="btn btn-sm btn-warning"
                                onClick={() => {
                                  setBoothNumber(proj.boothNumber || "");
                                  setShowBoothModal(true);
                                }}
                              >
                                Edit Booth
                              </button>
                            )} */}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <nav className="d-flex justify-content-center mt-3">
                <ul className="pagination pagination-sm mb-0">
                  <li className="page-item disabled">
                    <a className="page-link" href="#">
                      ‹
                    </a>
                  </li>
                  <li className="page-item active">
                    <a className="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      ›
                    </a>
                  </li>
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
                <Form.Control
                  type="text"
                  placeholder="Enter project name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </Form.Group>
              <Form.Label>Group Members</Form.Label>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Your Name"
                  value={currentUser.userName}
                  readOnly
                />
              </Form.Group>
              {[1, 2].map((i) => (
                <Form.Group className="mb-2" key={i}>
                  <Form.Select
                    value={groupMembers[i]}
                    onChange={(e) => {
                      const updated = [...groupMembers];
                      updated[i] = e.target.value;
                      setGroupMembers(updated);
                    }}
                  >
                    <option value="">--select member--</option>
                    {students.map((student) => (
                      <option key={student.userId} value={student.userName}>
                        {student.userName}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              ))}
              <Form.Group className="mb-3">
                <Form.Label>Supervisor</Form.Label>
                <Form.Select
                  value={supervisor}
                  onChange={(e) => setSupervisor(e.target.value)}
                >
                  <option value="">--select supervisor--</option>
                  {supervisors
                    .filter(
                      (sup) =>
                        sup.userRole?.roleName?.toLowerCase() === "supervisor"
                    )
                    .map((sup) => (
                      <option key={sup.userId} value={sup.userName}>
                        {sup.userName}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3 me-5">
                <Form.Label>No Booth</Form.Label>
                <Form.Control
                  className="border ps-2"
                  type="text"
                  placeholder="Contoh: B12"
                  value={boothNumber}
                  onChange={(e) => setBoothNumber(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveGroup}>
              Save
            </Button>
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
                <p>
                  <strong>Project Thumbnail:</strong>{" "}
                </p>
                {viewProject.projectThumbnail && (
                  <div className="mb-3 text-center">
                    <img
                      src={
                        viewProject.projectThumbnail.startsWith("http")
                          ? viewProject.projectThumbnail
                          : `${import.meta.env.VITE_API_URL}/uploads/${
                              viewProject.projectThumbnail
                            }`
                      }
                      alt="Project Thumbnail"
                      className="img-fluid rounded mb-3"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "300px",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                )}
                <p>
                  <strong>Project Name:</strong> {viewProject.projectName}
                </p>
                <div>
                  <strong>Group Members:</strong>
                  <ul>
                    {viewProject.projectTeamMembers.map((member, idx) => (
                      <li key={idx}>{member.userName}</li>
                    ))}
                  </ul>
                </div>
                <p>
                  <strong>Batch Name:</strong> {viewProject.batchName}
                </p>
                <p>
                  <strong>Booth Number:</strong> {viewProject.boothNumber}
                </p>
                <p>
                  <strong>Category:</strong>{" "}
                  {viewProject?.category?.categoryName}
                </p>
                <p>
                  <strong>Course Name:</strong> {viewProject?.courseName}
                </p>
                <p>
                  <strong>Supervisor:</strong>{" "}
                  {viewProject.courseSupervisorName || "-"}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  {viewProject.isFinal === false ? "in Progress" : "Final"}
                </p>
                {viewProject.projectRequirements.map((req, idx) =>
                  req.fieldType === "file" ? (
                    <p key={idx}>
                      <strong>{req.fieldName}:</strong>{" "}
                      <a href={req.fieldValue} target="_blank" rel="noreferrer">
                        View
                      </a>
                    </p>
                  ) : (
                    <p key={idx}>
                      <strong>{req.fieldName}:</strong> {req.fieldValue}
                    </p>
                  )
                )}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseViewModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal Admin Edit */}
        <Modal
          show={showBoothModal}
          onHide={() => setShowBoothModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit No Booth</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>No Booth</Form.Label>
              <Form.Control
                className="border ps-2"
                type="text"
                value={boothNumber}
                onChange={(e) => setBoothNumber(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowBoothModal(false)}
            >
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setShowBoothModal(false);
              }}
            >
              Save (Dummy)
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Main>
  );
}

export default ProjectList;
