// Updated Auth.jsx with red text error messages only
import React, { useState, useEffect } from 'react';
import "./../assets/css/login.css";
import DefaultLogo from "./../assets/img/Cifpec-Logo.png";
import { Form, Button, Image, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { jwtDecode } from 'jwt-decode';
import { Eye, EyeOff } from 'lucide-react';
import Loading from '../components/Loading';

function Auth() {
  const [tabs, setTabs] = useState({ login: { status: "active", display: "d-block" }, register: { status: "", display: "d-none" } });
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({ email: "", password: "", retypePassword: "", role: "", course: "" });
  const [courseList, setCourseList] = useState([]);
  const [loginErrors, setLoginErrors] = useState({});
  const [registerErrors, setRegisterErrors] = useState({});
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const [Site, setSite] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token && token.split('.').length === 3) {
      const decoded = jwtDecode(token);
      const userHasProfile = decoded?.userName || decoded?.fullName || decoded?.userPhone;
      if (userHasProfile) {
        navigate('/dashboard');
      } else {
        navigate('/dashboard/setting');
      }
    }
    const fetchSite = async () => {
      try {
        const res = await axiosInstance.get("/site/settings");
        setSite(res?.data?.data || {});
        setIsLoading(false);
      } catch (err) {
        console.log("ERROR: ",err);
      }
    };
    fetchSite();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axiosInstance.get("/courses?page=1&limit=100");
        setCourseList(res.data?.data || []);
      } catch (err) {
        alert("Failed to fetch course list. Please try again later.");
      }
    };
    fetchCourses();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  const handleLoginInput = (e) => setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  const handleRegisterInput = (e) => setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });

  const showLogin = () => {
    setTabs({ login: { status: "active", display: "d-block" }, register: { status: "", display: "d-none" } });
    setLoginForm({ email: "", password: "" });
    setLoginErrors({});
    setRegisterErrors({});
  };

  const showRegister = () => {
    setTabs({ login: { status: "", display: "d-none" }, register: { status: "active", display: "d-block" } });
    setRegisterForm({ email: "", password: "", retypePassword: "", role: "", course: "" });
    setLoginErrors({});
    setRegisterErrors({});
  };

  const onLogin = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!loginForm.email) newErrors.email = "Please enter your email.";
    if (!loginForm.password) newErrors.password = "Please enter your password.";
    if (Object.keys(newErrors).length > 0) { setLoginErrors(newErrors); return; }

    try {
      const res = await axiosInstance.post('/auth/login', {
        userEmail: loginForm.email,
        userPassword: loginForm.password
      });
      const token = res.data.data.token;
      if (token && token.split('.').length === 3) {
        localStorage.setItem('accessToken', token);
        const decoded = jwtDecode(token);
        localStorage.setItem('user', JSON.stringify(decoded));
        const userHasProfile = decoded?.userName || decoded?.fullName || decoded?.userPhone;
        navigate(userHasProfile ? '/dashboard' : '/dashboard/setting');
      } else {
        setLoginErrors({ email: 'Invalid token. Please login again.' });
      }
    } catch (error) {
      const res = error.response?.data;
      const errorsObj = {};
      if (res?.errors) {
        res.errors.forEach(err => {
          let key = err.field === 'userPassword' ? 'password' : err.field;
          errorsObj[key] = err.message;
        });
      } else if (res?.message) {
        if (res.message.toLowerCase().includes("password")) errorsObj.password = res.message;
        else errorsObj.email = res.message;
      }
      setLoginErrors(errorsObj);
    }
  };

  const onRegister = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!registerForm.email.includes("@")) newErrors.email = "Invalid email format.";
    if (!registerForm.password) newErrors.password = "Please enter a password.";
    if (!registerForm.retypePassword) newErrors.retypePassword = "Please confirm your password.";
    if (registerForm.password !== registerForm.retypePassword) newErrors.retypePassword = "Passwords do not match.";
    if (!registerForm.role) newErrors.role = "Please select a role.";
    if (["Student", "Supervisor", "Coordinator"].includes(registerForm.role) && !registerForm.course) newErrors.course = "Please select a course.";
    if (Object.keys(newErrors).length > 0) { setRegisterErrors(newErrors); return; }

    try {
      const roleMap = { "Admin": 1, "Web Maintenance": 2, "Coordinator": 3, "Supervisor": 4, "Student": 5 };
      const payload = {
        userEmail: registerForm.email,
        userPassword: registerForm.password,
        retypePassword: registerForm.retypePassword,
        roleId: roleMap[registerForm.role],
        ...(registerForm.course && { courseId: parseInt(registerForm.course) })
      };
      const res = await axiosInstance.post('/auth/register', payload);
      const verifyToken = res.data?.data?.verifyToken || res.data?.verifyToken;
      setVerificationCode("******");
      setShowVerificationModal(true);
      setTimeout(() => navigate('/verifyemail', { state: { email: registerForm.email, token: verifyToken } }), 5000);
    } catch (error) {
      const res = error.response?.data;
      const errorsObj = {};
      if (res?.errors) {
        res.errors.forEach(err => {
          let key = err.field === 'userPassword' ? 'password' : err.field;
          errorsObj[key] = err.message;
        });
      } else if (res?.message) {
        if (res.message.toLowerCase().includes("password")) errorsObj.password = res.message;
        else errorsObj.email = res.message;
      }
      setRegisterErrors(errorsObj);
    }
  };

  const showCourseDropdown = ["Student", "Supervisor", "Coordinator"].includes(registerForm.role);

  const renderPasswordInput = (value, onChange, show, toggle, name, placeholder, error) => (
    <div className="mb-3 position-relative">
      <div className="d-flex align-items-center position-relative">
        <Form.Control
          type={show ? 'text' : 'password'}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="form-login pe-5"
          style={error ? { borderColor: 'red' } : {}}
        />
        <span
          onClick={toggle}
          className="position-absolute"
          style={{ right: '15px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', zIndex: 2 }}
        >
          {show ? <EyeOff size={18} color="#333" /> : <Eye size={18} color="#333" />}
        </span>
      </div>
      {error && <div style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}>{error}</div>}
    </div>
  );

  return (
    <div className="auth d-flex justify-content-center align-items-center p-3" style={{ backgroundImage: `url('/bg-login.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
      <div className="form-box glass-box w-100" style={{ maxWidth: '500px' }}>
        <div className="auth-logo text-center">
          <Image src={Site.logo ? Site.logo : DefaultLogo} alt={`${Site.title} Logo`} className="img-fluid" style={{ maxWidth: '180px' }} />
        </div>

        <div className="d-flex mb-4">
          <Button className={`btn-switch w-50 me-2 ${tabs.login.status}`} onClick={showLogin}>LOGIN</Button>
          <Button className={`btn-switch w-50 ${tabs.register.status}`} onClick={showRegister}>REGISTER</Button>
        </div>

        <Form className={tabs.login.display} onSubmit={onLogin}>
          <div className="mb-3">
            <Form.Control type="email" placeholder="Email or Username" name="email" className="form-login" value={loginForm.email} onChange={handleLoginInput} style={loginErrors.email ? { borderColor: 'red' } : {}} />
            {loginErrors.email && <div style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}>{loginErrors.email}</div>}
          </div>
          {renderPasswordInput(loginForm.password, handleLoginInput, showPassword, () => setShowPassword(!showPassword), "password", "Password", loginErrors.password)}
          <Button type="submit" className="w-100 py-2 btn-purple">SIGN IN</Button>
        </Form>

        <Form className={tabs.register.display} onSubmit={onRegister}>
          <div className="mb-3">
            <Form.Control type="email" placeholder="Email" name="email" className="form-login" value={registerForm.email} onChange={handleRegisterInput} style={registerErrors.email ? { borderColor: 'red' } : {}} />
            {registerErrors.email && <div style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}>{registerErrors.email}</div>}
          </div>
          {renderPasswordInput(registerForm.password, handleRegisterInput, showPassword, () => setShowPassword(!showPassword), "password", "Password", registerErrors.password)}
          {renderPasswordInput(registerForm.retypePassword, handleRegisterInput, showRetypePassword, () => setShowRetypePassword(!showRetypePassword), "retypePassword", "Confirm Password", registerErrors.retypePassword)}
          <div className="mb-3">
            <Form.Select name="role" value={registerForm.role} onChange={handleRegisterInput} className="form-login" style={registerErrors.role ? { borderColor: 'red' } : {}}>
              <option value="">-- Select Role --</option>
              <option value="Student">Student</option>
              <option value="Supervisor">Supervisor</option>
              <option value="Coordinator">Coordinator</option>
              <option value="Admin">Admin</option>
              <option value="Web Maintenance">Web Maintenance</option>
            </Form.Select>
            {registerErrors.role && <div style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}>{registerErrors.role}</div>}
          </div>
          {showCourseDropdown && (
            <div className="mb-3">
              <Form.Select name="course" value={registerForm.course} onChange={handleRegisterInput} className="form-login" style={registerErrors.course ? { borderColor: 'red' } : {}}>
                <option value="">-- Select Course --</option>
                {courseList.length === 0 ? (
                  <option disabled>No courses available</option>
                ) : (
                  courseList.map((c, i) => (
                    <option key={i} value={c.courseId}>{c.courseName}</option>
                  ))
                )}
              </Form.Select>
              {registerErrors.course && <div style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}>{registerErrors.course}</div>}
            </div>
          )}
          <Button type="submit" className="w-100 py-2 btn-purple">SIGN UP</Button>
        </Form>

        <Modal show={showVerificationModal} onHide={() => setShowVerificationModal(false)} centered>
          <Modal.Header closeButton><Modal.Title>Email Verification</Modal.Title></Modal.Header>
          <Modal.Body>
            <p>Please check your email for the verification code.</p>
            <h5 className="text-center">Code: {verificationCode}</h5>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowVerificationModal(false)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Auth;
