import React, { useEffect, useState } from "react";
import Main from "../components/Main";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../utils/axiosInstance";

function StudentProject() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const projectId = queryParams.get("projectId");

  const [projectName, setProjectName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseList, setCourseList] = useState([]);
  const [groupMembers, setGroupMembers] = useState(["", "", ""]);
  const [supervisor, setSupervisor] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [batchRequirements, setBatchRequirements] = useState([]);
  const [requirementValues, setRequirementValues] = useState({});
  const [oldRequirements, setOldRequirements] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [projectThumbnail, setProjectThumbnail] = useState(null);
  const [fieldName, setFieldName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [categories, setCategories] = useState([]);
  const [boothNumber, setBoothNumber] = useState("");
  const [dataToUpdate, setDataToUpdate] = useState({});

  const token = localStorage.getItem("accessToken");
  const decoded = token ? jwtDecode(token) : {};
  const courseId = decoded?.courseId;
  const batchId = decoded?.batchId;

  useEffect(() => {
    const getCourseList = async () => {
      try {
        const res = await axiosInstance.get("/courses");
        setCourseList(res?.data?.data || []);
        const userCourse = res?.data?.data.find((c) => c.courseId === courseId);
        setCourseName(userCourse?.courseName || "");
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    getCourseList();

    const getCategories = async () => {
      try {
        const res = await axiosInstance.get("/categories");
        setCategories(res?.data?.data || []);
      } catch (error) {
        console.log("Error fetching categories:", error);
      }
    };
    getCategories();

    if (projectId) {
      setIsEditMode(true);
      const getProject = async () => {
        try {
          const res = await axiosInstance.get("/user/projects");
          const allProjects = res?.data?.data || [];
          const project = allProjects.find(
            (p) => String(p.projectId) === String(projectId)
          );

          if (project) {
            setProjectName(project.projectName);
            setGroupMembers(
              project.projectTeamMembers.map((m) => m.userName || "")
            );
            setBoothNumber(project.boothNumber);
            setFieldName(project?.category?.categoryId);
            setSupervisor(project.courseSupervisorName || "");
            setOldRequirements(project?.projectRequirements || []);
          }
        } catch (error) {
          console.error("Error fetching user projects:", error);
        }
      };
      getProject();
    }
    
    const fetchBatch = async () => {
      const res = await axiosInstance.get(`/batches/${batchId}`);
      setBatchRequirements(res?.data?.data?.projectRequirements);
    };
    fetchBatch();
  }, [courseId, projectId]);

  const handleRequirementChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setRequirementValues((formData) => ({
        ...formData,
        name: files[0],
      }));
    } else {
      setRequirementValues((formData) => ({
        ...formData,
        [name]: value === "" ? "" : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!projectThumbnail) {
      setErrorMsg("Please upload a project thumbnail image.");
      return;
    }

    const formDataToSend = new FormData();

    Object.keys(requirementValues).forEach((key) => {
      const value = requirementValues[key];
      if (value) {
        formDataToSend.append(key, value);
      }
    });

    formDataToSend.append("projectThumbnail", projectThumbnail);
    formDataToSend.append("projectName", projectName);
    formDataToSend.append("categoryId", fieldName);

    try {
      await axiosInstance.patch(`/user/projects/${projectId}`, formDataToSend);
      setIsSubmitted(true);
      navigate("/dashboard/projectlist");
    } catch (err) {
      console.error("Error updating project:", err);
    }
  };

  return (
    <Main>
      <div className="container-fluid py-4">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <div className="tab-pane fade show active shadow p-4 rounded bg-white">
              <h5 className="fw-bold">Update Project</h5>
              {errorMsg && setTimeout(() => setErrorMsg(""), 5000) && <div className="alert alert-danger text-white">{errorMsg}</div>}
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Project Name</label>
                    <input type="text" className="form-control" placeholder="Project Name" value={projectName} onChange={e => setProjectName(e.target.value)} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Course Name</label>
                    <input type="text" className="form-control" value={courseName} readOnly />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-bold">Your Name</label>
                    <input type="text" className="form-control" placeholder="Member 1 Name" value={groupMembers[0]} readOnly />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-bold">Member Name 1</label>
                    <input type="text" className="form-control" placeholder="Member 2 Name" value={groupMembers[1]} readOnly />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-bold">Member Name 2</label>
                    <input type="text" className="form-control" placeholder="Member 3 Name" value={groupMembers[2]} readOnly />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Supervisor Name</label>
                    <input type="text" className="form-control" placeholder="Supervisor Name" value={supervisor} readOnly />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Booth Number</label>
                    <input type="text" className="form-control" placeholder="Booth Number" value={boothNumber || "-"} readOnly />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Project Category</label>
                    {fieldName !== "" ? (
                      <input type="text" className="form-control" placeholder="Project Category" value={categories[fieldName].categoryName} readOnly />
                    ):(
                      <select className="form-select" value={fieldName} onChange={e => setFieldName(e.target.value)}>
                        <option value="">-- Choose Category --</option>
                        {categories && categories.map((opt, idx) => {
                          return ( <option key={idx} value={opt.categoryId}>
                            {opt.categoryName}
                          </option>)
                        })}
                      </select>
                    )}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Project Thumbnail</label>
                    <input type="file" className="form-control" accept="image/*" onChange={e => setProjectThumbnail(e.target.files[0])} />
                  </div>
                </div>

                {batchRequirements.length > 0 && (
                  <div className="mt-4">
                    <h6 className="fw-bold">Additional Information</h6>
                    {batchRequirements.map((req, index) => {
                      const fieldValue = requirementValues[req.tag] || oldRequirements.find(field => field.fieldName === req.label)?.fieldValue || "";
                      return (
                        <div className="mb-3" key={index}>
                          <label className="form-label fw-bold">{req.label}</label>
                          {req.type === "text" ? (
                            <input
                              type="text"
                              className="form-control"
                              placeholder={`Enter ${req.label}`}
                              name={`requirements[${req.tag}]`}
                              value={fieldValue}
                              onChange={e => handleRequirementChange(e)}
                              disabled={!isEditMode && isSubmitted}
                            />
                          ) : (
                            <div>
                              {fieldValue && typeof fieldValue === "string" && /\.(jpg|jpeg|png|gif)$/i.test(fieldValue) ? (
                                <img src={fieldValue} alt="Uploaded" style={{ maxWidth: "200px", height: "auto" }} />
                              ) : fieldValue ? (
                                <a href={fieldValue} target="_blank">
                                  View uploaded file
                                </a>
                              ) : null}
                              <input type="file" className="form-control mt-2" accept=".pdf,.jpg,.jpeg,.png" name={req.tag} onChange={e => handleRequirementChange(e)} disabled={!isEditMode && isSubmitted} />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="d-flex justify-content-between">
                  <button type="button" className="btn btn-outline-secondary" onClick={() => navigate("/dashboard/projectlist")}>
                    Back to Project List
                  </button>
                  <button type="submit" className="btn btn-success px-4" disabled={!isEditMode && isSubmitted}>
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
}

export default StudentProject;
