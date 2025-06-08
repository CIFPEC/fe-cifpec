import React, { useEffect, useState } from 'react';
import Main from '../components/Main';
import { useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axiosInstance from '../utils/axiosInstance';

function StudentProject() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const projectId = queryParams.get('projectId');

  const [projectName, setProjectName] = useState('');
  const [courseName, setCourseName] = useState('');
  const [groupMembers, setGroupMembers] = useState(['', '', '']);
  const [supervisor, setSupervisor] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [batchRequirements, setBatchRequirements] = useState([]);
  const [requirementValues, setRequirementValues] = useState({});
  const [oldRequirements, setOldRequirements] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);

  const token = localStorage.getItem('accessToken');
  const decoded = token ? jwtDecode(token) : {};
  const courseId = decoded?.courseId;
  const batchId = decoded?.batchId;

  useEffect(() => {
    const courseList = {
      1: 'Web Development',
      2: 'Networking',
      3: 'Game Development',
      4: 'Automotive',
      5: 'Mechatronic',
      6: 'Manufacturing'
    };
    setCourseName(courseList[courseId] || '');

    if (projectId) {
      setIsEditMode(true);
      const getProject = async () => {
        try {
          const res = await axiosInstance.get('/user/projects');
          const allProjects = res?.data?.data || [];
          const project = allProjects.find(p => String(p.projectId) === String(projectId));
  
          if (project) {
            setProjectName(project.projectName);
            setGroupMembers(project.projectTeamMembers.map(m => m.userName || ''));
            setSupervisor(project.courseSupervisorName || '');
            setOldRequirements(project?.projectRequirements || []);
            // console.log("PROJECTS: ",project.projectRequirements)
          }
        } catch (error) {
          console.error('Error fetching user projects:', err);
        }
      }
      getProject();
    }

    const batch = async () => {
      const res = await axiosInstance.get(`/batches/${batchId}`);
      // console.log("BATCH: ",res?.data?.data?.projectRequirements)
      setBatchRequirements(res?.data?.data?.projectRequirements)
    }
    batch();
  }, [courseId, projectId]);

  const handleRequirementChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      // Jika input type adalah file, simpan file tersebut
      setRequirementValues(formData => ({
        ...formData,
        [name]: files[0], // Ambil file pertama yang dipilih
      }));
    } else {
      // Jika bukan file, simpan value seperti biasa
      setRequirementValues(formData => ({
        ...formData,
        [name]: value === '' ? "" : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create FormData object untuk simpan data
    const formDataToSend = new FormData();

    // Loop untuk masuk semua data ke dalam FormData
    Object.keys(requirementValues).forEach((key) => {
      const value = requirementValues[key];
      if (value) {
        formDataToSend.append(`requirements[${key}]`, value);
      }
    });
    try {
      await axiosInstance.patch(`/user/projects/${projectId}`, formDataToSend);
      setIsSubmitted(true);
      navigate('/dashboard/projectlist');
    } catch (err) {
      console.error('Error updating project:', err);
    }
  };

  return (
    <Main>
      <div className="container-fluid py-4">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <div className="tab-pane fade show active shadow p-4 rounded bg-white">
              <h5 className="fw-bold">Update Projek</h5>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nama Projek"
                      value={projectName}
                      // onChange={(e) => setProjectName(e.target.value)}
                      readOnly
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      value={courseName}
                      readOnly
                    />
                  </div>
                  {groupMembers.map((member, index) => (
                    <div className="col-md-6 mb-3" key={index}>
                      <input
                        type="text"
                        className="form-control"
                        placeholder={`Nama Ahli ${index + 1}`}
                        value={member}
                        readOnly
                      />
                    </div>
                  ))}
                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nama Penyelia"
                      value={supervisor}
                      readOnly
                    />
                  </div>
                </div>

                {batchRequirements.length > 0 && (
                  <div className="mt-4">
                    <h6 className="fw-bold">Maklumat Tambahan</h6>
                    {batchRequirements.map((req, index) => (
                      <div className="mb-3" key={index}>
                        <label className="form-label fw-bold">{req.label}</label>
                        {req.type === 'text' ? (
                          <input
                            type="text"
                            className="form-control"
                            placeholder={`Isi ${req.label}`}
                            value={requirementValues[req.tag] || 
                              oldRequirements.find(field => field.fieldName === req.label)?.fieldValue || ''}
                            name={req.tag}
                            onChange={(e) => handleRequirementChange(e)}
                            // readOnly={!isEditMode && isSubmitted}
                          />
                        ) : (
                          <input
                            type="file"
                            className="form-control"
                            accept=".pdf"
                            name={req.tag}
                            onChange={(e) => handleRequirementChange(e)}
                            disabled={!isEditMode && isSubmitted}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <div className="d-flex justify-content-between">
                  <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/dashboard/projectlist')}>
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
