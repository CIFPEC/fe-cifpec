import React, { useState, useEffect } from 'react'; 
import Main from '../components/Main';
import axiosInstance from '../utils/axiosInstance';
import defaultImage from './../assets/img/pic-icon.png';

function UserRequest() {
  const [userRequests, setUserRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchUserRequests = async () => {
      try {
        const res = await axiosInstance.get(`/users/lecturers?isApproved=false&page=${currentPage}&limit=10`);
        console.log("API Response:", res.data); // ✅ log response
        setUserRequests(res.data?.data || []);
        setTotalPages(res.data?.paginate?.totalPages || 1);
      } catch (err) {
        console.error('Failed to fetch user requests:', err); // ✅ log full error
        if (err.response) {
          console.log("Error Response:", err.response.data); // ✅ log backend error
        }
      }
    };
  
    fetchUserRequests();
  }, [currentPage]);
  

  const handleApproval = async (userId, approve) => {
    try {
      const res = await axiosInstance.patch(`/users/${userId}/lecturers`, {
        isApproved: approve
      });
      alert(res.data.message || 'Action completed successfully.');
      setUserRequests(prev => prev.filter(user => user.userId !== userId));
    } catch (error) {
      console.error('Failed to process request:', error);
      alert('Failed to process request. Please try again.');
    }
  };

  return (
    <Main>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <div className="card p-4 shadow-sm">
              <h6 className="fw-bold mb-3">User Lecturer Requests</h6>

              <div className="table-responsive">
                <table className="table table-bordered text-center align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Course</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userRequests.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="text-muted">No user available</td>
                      </tr>
                    ) : (
                      userRequests.map(user => (
                        <tr key={user.userId}>
                          <td>{user.userEmail}</td>
                          <td>{user.userRole?.roleName || '-'}</td>
                          <td>{user.userCourse?.courseName || '-'}</td>
                          <td>
                            <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-2">
                              <button
                                className="btn btn-success btn-sm"
                                onClick={() => handleApproval(user.userId, true)}
                              >
                                Approve
                              </button>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleApproval(user.userId, false)}
                              >
                                Reject
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <nav className="d-flex justify-content-center mt-3">
                <ul className="pagination pagination-sm mb-0">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>‹</button>
                  </li>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <li className={`page-item ${currentPage === i + 1 ? 'active' : ''}`} key={i}>
                      <button className="page-link" onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>›</button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
}

export default UserRequest;
