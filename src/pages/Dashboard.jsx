// Dashboard.jsx
import React, { useEffect, useState } from "react";
import Main from "../components/Main";
import { Chart } from "chart.js/auto";
import axiosInstance from "../utils/axiosInstance";
import { jwtDecode } from "jwt-decode";
import Loading from "../components/Loading";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    students: 0,
    projects: 0,
    participations: 0,
    courseStats: {},
    studentList: [],
  });

  const [studentProjects, setStudentProjects] = useState([]);
  const [batchList, setBatchList] = useState([]);
  const [selectedBatchId, setSelectedBatchId] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [selectedCourse, setSelectedCourse] = useState("");
  const [courses, setCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleExportPDF = () => {
    import("jspdf").then((jsPDF) => {
      import("html2canvas").then((html2canvas) => {
        const input = document.getElementById("projectTable");
        html2canvas.default(input).then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF.default();
          const imgProps = pdf.getImageProperties(imgData);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
          pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
          pdf.save("project-list.pdf");
        });
      });
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const decoded = jwtDecode(token);
      setCurrentUser(decoded);
    }
  }, []);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axiosInstance.get("/dashboard");
        const data = res.data?.data || {};

        const courseStats = {};
        data.studentLists?.forEach((stud) => {
          const courseName = stud.courseName;
          courseStats[courseName] = (courseStats[courseName] || 0) + 1;
        });

        setDashboardData({
          students: data.totalStudents || 0,
          projects: data.totalProjects || 0,
          slide: 0,
          poster: 0,
          courseStats,
          studentList: data.studentLists || [],
          participations: data.totalStudentsWithProjects || 0,
        });
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      }
    };

    const fetchBatchList = async () => {
      try {
        const res = await axiosInstance.get("/batches");
        const list = res.data?.data || [];
        setBatchList(list);
        setSelectedBatchId(list[0]?.batchId || null);
      } catch (err) {
        console.error("Failed to fetch batch list:", err);
      }
    };

    const fetchCourseAndCategory = async () => {
      const getCourse = await axiosInstance.get("/courses");
      setCourses(getCourse?.data?.data || []);

      const getCategory = await axiosInstance.get("/categories");
      setCategories(getCategory?.data?.data || []);
    };

    fetchCourseAndCategory();
    fetchDashboard();
    fetchBatchList();
    setIsLoading(false);
  }, [selectedBatchId]);

  useEffect(() => {
    if (!selectedBatchId) return;

    const fetchStudentProjects = async () => {
      try {
        const res = await axiosInstance.get(
          `/batches/${selectedBatchId}/projects?course=${selectedCourse}&category=${selectedCategory}&page=1&limit=10`
        );
        console.log("Project API result:", res.data);
        setStudentProjects(res.data?.data || []);
      } catch (err) {
        console.error("Failed to fetch student projects:", err);
      }
    };

    fetchStudentProjects();
  }, [selectedBatchId, selectedCourse, selectedCategory]);

  useEffect(() => {
    if (currentUser.role === "admin") {
      let filtered = [...studentProjects];

      if (selectedCourse) {
        filtered = filtered.filter((p) => p.courseName === selectedCourse);
      }

      if (selectedCategory) {
        filtered = filtered.filter(
          (p) => p.category?.categoryName === selectedCategory
        );
      }

      setFilteredProjects(filtered);
    } else {
      setFilteredProjects(studentProjects);
    }
  }, [studentProjects, selectedCourse, selectedCategory, currentUser]);

  useEffect(() => {
    const ctx = document.getElementById("categoryChart");
    let chart;

    if (ctx && studentProjects.length > 0) {
      const categoryStats = {};
      studentProjects.forEach((item) => {
        const category = item.category?.categoryName || "Unknown";
        categoryStats[category] = (categoryStats[category] || 0) + 1;
      });

      const labels = Object.keys(categoryStats);
      const data = Object.values(categoryStats);

      chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels,
          datasets: [
            {
              label: "Number of Projects",
              data,
              backgroundColor: "#3f8efc",
              borderRadius: 6,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1,
              },
            },
          },
        },
      });
    }

    return () => {
      if (chart) chart.destroy();
    };
  }, [studentProjects]);

  useEffect(() => {
    const ctx = document.getElementById("courseChart");
    let chart;

    if (ctx && Object.keys(dashboardData.courseStats).length > 0) {
      const labels = Object.keys(dashboardData.courseStats);
      const values = Object.values(dashboardData.courseStats);
      const backgroundColor = ["#0a9396", "#94d2bd", "#ee9b00", "#bb3e03"];

      chart = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels,
          datasets: [
            {
              data: values,
              backgroundColor,
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "left",
              labels: {
                padding: 20,
                boxWidth: 20,
                color: "#444",
                font: {
                  size: 14,
                  weight: "500",
                },
              },
            },
          },
        },
      });
    }

    setIsLoading(false);

    return () => {
      if (chart) chart.destroy();
    };
  }, [dashboardData.courseStats]);

  const infoCards = [
    {
      label: "Students",
      value: dashboardData.students,
      color: "bg-pink-100 text-pink-800",
      icon: "group",
    },
    {
      label: "Projects",
      value: dashboardData.projects,
      color: "bg-green-100 text-green-800",
      icon: "assignment",
    },
    {
      label: "participations by session",
      value: dashboardData.participations,
      color: "bg-yellow-100 text-yellow-800",
      icon: "slideshow",
    },
  ];

  if (isLoading) return <Loading />;

  return (
    <Main>
      <div className="container-fluid py-2">
        <div className="row">
          <div className="col-12">
            <h3 className="mb-3 h4 font-weight-bolder">Dashboard</h3>
          </div>

          {infoCards.map((item, idx) => (
            <div key={idx} className="col-12 col-sm-6 col-xl-4 mb-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-header p-3 d-flex justify-content-between align-items-center">
                  <div>
                    <p className="text-sm text-muted mb-1 fw-semibold text-uppercase">
                      {item.label}
                    </p>
                    <h4 className="mb-0 text-dark fw-bold">{item.value}</h4>
                  </div>
                  <div
                    className={`icon icon-md rounded-circle d-flex align-items-center justify-content-center ${item.color}`}
                    style={{ width: "40px", height: "40px" }}
                  >
                    <span className="material-symbols-rounded">
                      {item.icon}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row mb-4">
          <div className="col-12 col-md-6">
            <label className="form-label fw-semibold">Select Batch</label>
            <select
              className="form-select ps-2"
              value={selectedBatchId || ""}
              onChange={(e) => setSelectedBatchId(e.target.value)}
            >
              {batchList.map((batch) => (
                <option key={batch.batchId} value={batch.batchId}>
                  {batch.batchName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-12 col-lg-8 mb-4">
            <div className="bg-white p-4 shadow-sm rounded h-100 border">
              <h5 className="mb-3 fw-semibold">Course Overview</h5>
              <div style={{ height: "300px", position: "relative" }}>
                <canvas id="courseChart"></canvas>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-4 mb-4">
            <div className="bg-white p-4 shadow-sm rounded h-100 border">
              <h5 className="mb-4 fw-semibold">Newest Students</h5>
              <div className="d-flex fw-bold border-bottom pb-2 mb-3">
                <div className="w-25">Profile</div>
                <div className="w-75">Name</div>
              </div>
              <ul className="list-unstyled">
                {dashboardData.studentList.slice(0, 6).map((user, idx) => (
                  <li key={idx} className="d-flex align-items-center mb-3">
                    <div className="w-25">
                      <div
                        className="bg-secondary rounded-circle"
                        style={{ width: 30, height: 30 }}
                      ></div>
                    </div>
                    <div className="w-75">{user.userName}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-12">
            <div className="bg-white p-4 shadow-sm rounded h-100 border">
              <h5 className="mb-3 fw-semibold">
                Category Participation Statistics
              </h5>
              <div style={{ height: "300px", position: "relative" }}>
                <canvas id="categoryChart"></canvas>
              </div>
            </div>
          </div>
        </div>
        {currentUser.roleName === "admin" && (
          <div className="row mt-5">
            <div className="col-md-4">
              <label className="form-label fw-semibold">Filter by Course</label>
              <select
                className="form-select ps-2"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                <option value="">All Courses</option>
                {courses &&
                  courses.map((course, i) => (
                    <option key={i} value={course.courseId}>
                      {course.courseName}
                    </option>
                  ))}
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label fw-semibold">
                Filter by Category
              </label>
              <select
                className="form-select ps-2"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories &&
                  categories.map((cat, i) => (
                    <option key={i} value={cat.categoryId}>
                      {cat.categoryName}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        )}
        <div className="row mt-4">
          <div className="col-12">
            <div className="bg-white p-4 shadow-sm rounded h-100 border">
              <div className="d-flex justify-content-between">
                <h5 className="mb-3 fw-semibold">Filtered Project List</h5>
                {currentUser.roleName === "admin" && (
                  <button
                    className="btn btn-sm btn-primary mb-3"
                    onClick={handleExportPDF}
                  >
                    Export to PDF
                  </button>
                )}
              </div>
              <div className="table-responsive">
                <table
                  id="projectTable"
                  className="table table-bordered align-middle"
                >
                  <thead className="table-light">
                    <tr>
                      <th>No</th>
                      <th>Student Project</th>
                      <th>Course</th>
                      <th>Category</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProjects.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="text-center">
                          No project available
                        </td>
                      </tr>
                    ) : (
                      filteredProjects.map((item, idx) => (
                        <tr key={item.projectId}>
                          <td>{idx + 1}</td>
                          <td>{item.projectName}</td>
                          <td>{item.courseName}</td>
                          <td>{item.category?.categoryName || "-"}</td>
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

export default Dashboard;
