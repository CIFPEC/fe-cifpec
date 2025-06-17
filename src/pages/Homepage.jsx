import React, { useState, useEffect } from "react";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axiosInstance from "../utils/axiosInstance";

const Homepage = () => {
  const [show, setShow] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [batch, setBatch] = useState("All Batches");
  const [courseId, setCourseId] = useState("");
  const [courseLabel, setCourseLabel] = useState("All Courses");
  const [categoryId, setCategoryId] = useState("");
  const [categoryLabel, setCategoryLabel] = useState("All Categories");
  const [searchResults, setSearchResults] = useState([]);
  const [siteSetting, setSiteSetting] = useState({});
  const [projectList, setProjectList] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [batchList, setBatchList] = useState([]);
  const [batchMap, setBatchMap] = useState({});
  const [latestBatchId, setLatestBatchId] = useState(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [courseRes, categoryRes, batchRes] = await Promise.all([axiosInstance.get("/courses?page=1&limit=100"), axiosInstance.get("/categories?page=1&limit=100"), axiosInstance.get("/batches?page=1&limit=100")]);

        setCourseList(courseRes.data?.data || []);
        setCategoryList(categoryRes.data?.data || []);

        const batches = batchRes.data?.data || [];
        setBatchList(batches.map(b => b.batchName));

        const batchMapping = {};
        batches.forEach(b => {
          batchMapping[b.batchName] = b.batchId;
        });
        setBatchMap(batchMapping);

        if (batches.length > 0) {
          const latest = batches[batches.length - 1];
          setLatestBatchId(latest.batchId);
          setBatch(latest.batchName);
        }
      } catch (err) {
        console.error("Failed to fetch initial data", err);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    const fetchProjectsByBatch = async () => {
      const batchId = batchMap[batch] || latestBatchId;
      if (!batchId) return;

      try {
        const queryParams = new URLSearchParams({
          page: "1",
          limit: "10",
          course: courseId,
          category: categoryId,
          name: searchQuery || "",
          supervisor: "",
        });

        const res = await axiosInstance.get(`/batches/${batchId}/projects?${queryParams}`);
        const projects = res.data?.data || [];

        setProjectList(projects);
        setSearchResults(projects);
      } catch (err) {
        console.error("Failed to fetch batch projects", err);
      }
    };

    fetchProjectsByBatch();
  }, [batch, courseId, categoryId, searchQuery]);

  const handleShow = project => {
    setSelectedProject(project);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setSelectedProject(null);
  };

  return (
    <div className="container-fluid px-3 px-md-4">
      <nav className="navbar navbar-expand-lg px-0 shadow-none border-radius-xl mt-2">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <img src={siteSetting.logo ? `${siteSetting.logo}` : "./Cifpec-Logo.png"} alt="CIFPEC Logo" style={{ height: "40px" }} />
          <Link to="/login">
            <Button variant="info" className="text-white">
              Login
            </Button>
          </Link>
        </div>
      </nav>

      <header
        className="page-header min-vh-50 border-radius-xl my-3 d-flex align-items-center justify-content-center position-relative text-center text-white"
        style={{
          backgroundImage: siteSetting.banner ? `url(${siteSetting.banner})` : "url('/src/assets/img/bg-homepage.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
        <div className="z-1">
          <h1 className="fs-3 fs-md-1 text-white">{siteSetting.textHeader || "CIFPEC Project Management System"}</h1>
          <p className="fs-6 fw-normal text-white">{siteSetting.description || "Find the best final year student projects from ADTEC Melaka here."}</p>
        </div>
        <span className="mask bg-gradient-dark opacity-6 position-absolute top-0 start-0 w-100 h-100"></span>
      </header>

      <div className="row g-2 justify-content-start px-2 px-md-3">
        <div className="d-flex flex-wrap align-items-center gap-2">
          <Form.Control
            type="text"
            placeholder="Search Project"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="border border-secondary mb-3"
            style={{ height: "38px", fontSize: "0.9rem", paddingLeft: "12px", borderRadius: "8px", maxWidth: "180px" }}
          />

          <Dropdown onSelect={e => setBatch(e)}>
            <Dropdown.Toggle variant="outline-secondary" style={{ height: "38px", fontSize: "0.9rem", borderRadius: "8px" }}>
              {batch}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="All Batches">All Batches</Dropdown.Item>
              {batchList.map((b, idx) => (
                <Dropdown.Item key={idx} eventKey={b}>
                  {b}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown
            onSelect={e => {
              const selected = courseList.find(c => c.courseName === e);
              setCourseId(selected?.courseId || "");
              setCourseLabel(e);
            }}>
            <Dropdown.Toggle variant="outline-secondary" style={{ height: "38px", fontSize: "0.9rem", borderRadius: "8px" }}>
              {courseLabel}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="All Courses">All Courses</Dropdown.Item>
              {courseList.map(c => (
                <Dropdown.Item key={c.courseId} eventKey={c.courseName}>
                  {c.courseName}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown
            onSelect={e => {
              const selected = categoryList.find(cat => cat.categoryName === e);
              setCategoryId(selected?.categoryId || "");
              setCategoryLabel(e);
            }}>
            <Dropdown.Toggle variant="outline-secondary" style={{ height: "38px", fontSize: "0.9rem", borderRadius: "8px" }}>
              {categoryLabel}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="All Categories">All Categories</Dropdown.Item>
              {categoryList.map(cat => (
                <Dropdown.Item key={cat.categoryId} eventKey={cat.categoryName}>
                  {cat.categoryName}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      <section className="mt-4">
        <h6 className="text-center fs-2 mb-4">Final Year Projects - ADTEC Melaka</h6>
        <div className="row g-4">
          {searchResults.map((project, idx) => (
            <div className="col-12 col-sm-6 col-lg-3" key={idx}>
              <div className="card card-blog card-plain h-100">
                <div className="card-header p-0 m-2 position-relative" style={{ borderRadius: "1rem", overflow: "hidden", height: "200px" }}>
                  <img src={project.projectThumbnail} alt={project.projectName} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div className="card-body p-3 d-flex flex-column justify-content-between">
                  <h5 className="fs-6 fs-md-5">{project.projectName}</h5>
                  <Button variant="outline-primary" size="sm" onClick={() => handleShow(project)}>
                    View Project
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedProject && (
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>{selectedProject.projectName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src={selectedProject.projectThumbnail} alt={selectedProject.projectName} className="img-fluid rounded mb-3" />
            <p>
              <strong>Batch:</strong> {selectedProject.batchName}
            </p>
            <p>
              <strong>Course:</strong> {selectedProject.courseName}
            </p>
            <p>
              <strong>Category:</strong> {selectedProject?.category?.categoryName || "-"}
            </p>
            <p>
              <strong>Booth Number:</strong> {selectedProject.boothNumber || "-"}
            </p>
            <p>
              <strong>Supervisor:</strong> {selectedProject.courseSupervisorName || "-"}
            </p>
            <p>
              <strong>Status:</strong> {selectedProject.isFinal ? "Final" : "In Progress"}
            </p>
            <p>
              <strong>Team Members:</strong>
            </p>
            <ul>
              {selectedProject.projectTeamMembers?.map((member, idx) => (
                <li key={idx}>{member.userName}</li>
              ))}
            </ul>
            {selectedProject.projectRequirements?.map((req, idx) => (
              <p key={idx}>
                <strong>{req.fieldName}:</strong>{" "}
                {req.fieldType === "file" ? (
                  <a href={req.fieldValue} target="_blank" rel="noreferrer">
                    View
                  </a>
                ) : (
                  req.fieldValue
                )}
              </p>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Homepage;
