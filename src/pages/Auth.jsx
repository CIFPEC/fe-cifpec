import React, { useState } from 'react'; 
import "./../assets/css/login.css";
import Logo from "./../assets/img/Cifpec-Logo.png";
import { Form, Button, Image, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';

function Auth() {
  const [tabs, setTabs] = useState({ login: { status: "active", display: "d-block" }, register: { status: "", display: "d-none" } });
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({ email: "", password: "", retypePassword: "", role: "", course: "" });
  const [loginErrors, setLoginErrors] = useState({});
  const [registerErrors, setRegisterErrors] = useState({});
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const navigate = useNavigate();

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

  const onRegister = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!registerForm.email.includes("@")) newErrors.email = "Email tidak sah.";
    if (!registerForm.password) newErrors.password = "Sila isi kata laluan.";
    if (!registerForm.retypePassword) newErrors.retypePassword = "Sila ulang kata laluan.";
    if (registerForm.password !== registerForm.retypePassword) newErrors.retypePassword = "Password tidak sepadan.";
    if (!registerForm.role) newErrors.role = "Sila pilih peranan.";
    if (["Pelajar", "Penyelia", "Penyelaras"].includes(registerForm.role) && !registerForm.course) newErrors.course = "Sila pilih kursus.";
    if (Object.keys(newErrors).length > 0) { setRegisterErrors(newErrors); return; }

    try {
      const roleMap = { "Admin": 1, "Penyelaras": 2, "Penyelia": 3, "Web Maintenance": 4, "Pelajar": 5 };
      const payload = {
        userEmail: registerForm.email,
        userPassword: registerForm.password,
        retypePassword: registerForm.retypePassword,
        roleId: roleMap[registerForm.role],
        ...(registerForm.role === "Pelajar" && { courseId: 1 })
      };

      const res = await axios.post('https://api-cifpec.xtivebiz.com/api/v1/auth/register', payload);
      console.log("res.data dari register:", res.data);
      const verifyToken = res.data?.data?.verifyToken || res.data?.verifyToken;
      console.log("verifyToken sebelum navigate:", verifyToken);
      setVerificationCode("******");
      setShowVerificationModal(true);
      setTimeout(() => navigate('/verifyemail', { state: { email: registerForm.email, token: verifyToken } }), 5000);
    } catch (error) {
      const res = error.response?.data;
      const errorsObj = {};
      if (res?.errors) {
        res.errors.forEach(err => {
          let key = err.field === 'userPassword' ? 'password' : err.field;
          if (key === 'retypePassword') key = 'retypePassword';
          errorsObj[key] = err.message;
        });
      } else if (res?.message) {
        if (res.message.toLowerCase().includes("password")) errorsObj.password = res.message;
        else errorsObj.email = res.message;
      }
      setRegisterErrors(errorsObj);
    }
  };

  const onLogin = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!loginForm.email) newErrors.email = "Sila isi emel anda.";
    if (!loginForm.password) newErrors.password = "Sila isi kata laluan.";
    if (Object.keys(newErrors).length > 0) { setLoginErrors(newErrors); return; }

    try {
      const res = await axios.post('https://api-cifpec.xtivebiz.com/api/v1/auth/login', {
        userEmail: loginForm.email,
        userPassword: loginForm.password
      });
      localStorage.setItem('accessToken', res.data.data.token);
      navigate('/dashboard');
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

  const showCourseDropdown = ["Pelajar", "Penyelia", "Penyelaras"].includes(registerForm.role);

  const renderPasswordInput = (value, onChange, show, toggle, name, placeholder, error) => (
    <div className="position-relative mb-3">
      <Form.Control
        type={show ? 'text' : 'password'}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="form-login pe-5"
        style={error ? { borderColor: 'red' } : {}}
      />
      <span onClick={toggle} style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#aaa' }}>
      {show ? <EyeOff size={18} color="#333" /> : <Eye size={18} color="#333" />}

      </span>
      {error && <div className="error-message">{error}</div>}
    </div>
  );

  return (
    <div className="auth d-flex justify-content-center align-items-center p-3" style={{ backgroundImage: `url('/bg-login.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
      <div className="form-box glass-box w-100" style={{ maxWidth: '500px' }}>
        <div className="auth-logo text-center">
          <Image src={Logo} alt="CIFPEC Logo" className="img-fluid" style={{ maxWidth: '180px' }} />
        </div>

        <div className="d-flex mb-4">
          <Button className={`btn-switch w-50 me-2 ${tabs.login.status}`} onClick={showLogin}>LOGIN</Button>
          <Button className={`btn-switch w-50 ${tabs.register.status}`} onClick={showRegister}>REGISTER</Button>
        </div>

        <Form className={tabs.login.display} onSubmit={onLogin}>
          <div className="mb-3">
            <Form.Control type="email" placeholder="Email or username" name="email" className="form-login" value={loginForm.email} onChange={handleLoginInput} style={loginErrors.email ? { borderColor: 'red' } : {}} />
            {loginErrors.email && <div className="error-message">{loginErrors.email}</div>}
          </div>
          {renderPasswordInput(loginForm.password, handleLoginInput, showPassword, () => setShowPassword(!showPassword), "password", "Password", loginErrors.password)}
          <Button type="submit" className="w-100 py-2 btn-purple">SIGN IN</Button>
        </Form>

        <Form className={tabs.register.display} onSubmit={onRegister}>
          <div className="mb-3">
            <Form.Control type="email" placeholder="Email" name="email" className="form-login" value={registerForm.email} onChange={handleRegisterInput} style={registerErrors.email ? { borderColor: 'red' } : {}} />
            {registerErrors.email && <div className="error-message">{registerErrors.email}</div>}
          </div>
          {renderPasswordInput(registerForm.password, handleRegisterInput, showPassword, () => setShowPassword(!showPassword), "password", "Password", registerErrors.password)}
          {renderPasswordInput(registerForm.retypePassword, handleRegisterInput, showRetypePassword, () => setShowRetypePassword(!showRetypePassword), "retypePassword", "Confirm Password", registerErrors.retypePassword)}
          <div className="mb-3">
            <Form.Select name="role" value={registerForm.role} onChange={handleRegisterInput} className="form-login" style={registerErrors.role ? { borderColor: 'red' } : {}}>
              <option value="">-- Pilih Peranan --</option>
              <option value="Pelajar">Pelajar</option>
              <option value="Penyelia">Penyelia</option>
              <option value="Penyelaras">Penyelaras</option>
              <option value="Admin">Admin</option>
              <option value="Web Maintenance">Web Maintenance</option>
            </Form.Select>
            {registerErrors.role && <div className="error-message">{registerErrors.role}</div>}
          </div>
          {showCourseDropdown && (
            <div className="mb-3">
              <Form.Select name="course" value={registerForm.course} onChange={handleRegisterInput} className="form-login" style={registerErrors.course ? { borderColor: 'red' } : {}}>
                <option value="">-- Pilih Kursus --</option>
                <option value="Komputer">Komputer</option>
                <option value="Telekomunikasi">Telekomunikasi</option>
                <option value="Pembuatan">Pembuatan</option>
                <option value="Mekatronik">Mekatronik</option>
                <option value="Automotif">Automotif</option>
              </Form.Select>
              {registerErrors.course && <div className="error-message">{registerErrors.course}</div>}
            </div>
          )}
          <Button type="submit" className="w-100 py-2 btn-purple">SIGN UP</Button>
        </Form>

        <Modal show={showVerificationModal} onHide={() => setShowVerificationModal(false)} centered>
          <Modal.Header closeButton><Modal.Title>Verify Your Email</Modal.Title></Modal.Header>
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
