import React, { useState } from 'react';
import "./../assets/css/login.css";
import Logo from "./../assets/img/Cifpec-Logo.png";
import { Form, Button, Image, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Auth() {
  const [tabs, setTabs] = useState({
    login: { status: "active", display: "d-block" },
    register: { status: "", display: "d-none" }
  });

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({ email: "", password: "", retypePassword: "", role: "", course: "" });
  const [loginErrors, setLoginErrors] = useState({});
  const [registerErrors, setRegisterErrors] = useState({});
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const navigate = useNavigate();

  const handleLoginInput = (e) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const handleRegisterInput = (e) => {
    const { name, value } = e.target;
    setRegisterForm({ ...registerForm, [name]: value });
  };

  const showLogin = () => {
    setTabs({ login: { status: "active", display: "d-block" }, register: { status: "", display: "d-none" } });
    setLoginForm({ email: "", password: "" });
    setRegisterErrors({});
    setLoginErrors({});
  };

  const showRegister = () => {
    setTabs({ login: { status: "", display: "d-none" }, register: { status: "active", display: "d-block" } });
    setRegisterForm({ email: "", password: "", retypePassword: "", role: "", course: "" });
    setRegisterErrors({});
    setLoginErrors({});
  };

  const generateVerificationCode = () => Math.floor(100000 + Math.random() * 900000).toString();

  const onRegister = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!registerForm.email.includes("@")) newErrors.email = "Email tidak sah.";
    if (registerForm.password.length < 6) newErrors.password = "Password mesti sekurang-kurangnya 6 aksara.";
    if (registerForm.password !== registerForm.retypePassword) newErrors.retypePassword = "Password tidak sepadan.";
    if (!registerForm.role) newErrors.role = "Sila pilih peranan.";
    if (["Pelajar", "Penyelia", "Penyelaras"].includes(registerForm.role) && !registerForm.course) newErrors.course = "Sila pilih kursus.";
    if (Object.keys(newErrors).length > 0) { setRegisterErrors(newErrors); return; }
    setRegisterErrors({});
    const code = generateVerificationCode();
    setVerificationCode(code);
    setShowVerificationModal(true);
    setTimeout(() => { navigate('/verifyemail', { state: { email: registerForm.email, code: code } }); }, 10000);
  };

  const onLogin = (e) => {
    e.preventDefault();
    const newLoginErrors = {};
    if (!loginForm.email) newLoginErrors.email = "Sila isi emel anda.";
    if (!loginForm.password) newLoginErrors.password = "Sila isi kata laluan.";
    if (Object.keys(newLoginErrors).length > 0) { setLoginErrors(newLoginErrors); return; }
    setLoginErrors({});
    console.log("Login berjaya (simulasi):", loginForm);
  };

  const showCourseDropdown = ["Pelajar", "Penyelia", "Penyelaras"].includes(registerForm.role);

  return (
    <div className="auth d-flex justify-content-center align-items-center p-3">
      <div className="form-box glass-box w-100" style={{ maxWidth: '500px' }}>
        <div className="auth-logo text-center">
          <Image src={Logo} alt="CIFPEC Logo" className="img-fluid" style={{ maxWidth: '180px' }} />
        </div>

        <div className="d-flex mb-4">
          <Button className={`btn-switch w-50 me-2 ${tabs.login.status}`} onClick={showLogin}>LOGIN</Button>
          <Button className={`btn-switch w-50 ${tabs.register.status}`} onClick={showRegister}>REGISTER</Button>
        </div>

        {/* Login Form */}
        <Form className={tabs.login.display} onSubmit={onLogin}>
          <div className="mb-3">
            <Form.Control type="email" placeholder="Email or username" name="email" className="form-login" value={loginForm.email} onChange={handleLoginInput} style={loginErrors.email ? { borderColor: 'red' } : {}} />
            {loginErrors.email && <div className="error-message">{loginErrors.email}</div>}
          </div>
          <div className="mb-3">
            <Form.Control type="password" placeholder="Password" name="password" className="form-login" value={loginForm.password} onChange={handleLoginInput} style={loginErrors.password ? { borderColor: 'red' } : {}} />
            {loginErrors.password && <div className="error-message">{loginErrors.password}</div>}
          </div>
          <Button type="submit" className="w-100 py-2 btn-purple">SIGN IN</Button>
        </Form>

        {/* Register Form */}
        <Form className={tabs.register.display} onSubmit={onRegister}>
          <div className="mb-3">
            <Form.Control type="email" placeholder="Email" name="email" className="form-login" value={registerForm.email} onChange={handleRegisterInput} style={registerErrors.email ? { borderColor: 'red' } : {}} />
            {registerErrors.email && <div className="error-message">{registerErrors.email}</div>}
          </div>
          <div className="mb-3">
            <Form.Control type="password" placeholder="Password" name="password" className="form-login" value={registerForm.password} onChange={handleRegisterInput} style={registerErrors.password ? { borderColor: 'red' } : {}} />
            {registerErrors.password && <div className="error-message">{registerErrors.password}</div>}
          </div>
          <div className="mb-3">
            <Form.Control type="password" placeholder="Confirm Password" name="retypePassword" className="form-login" value={registerForm.retypePassword} onChange={handleRegisterInput} style={registerErrors.retypePassword ? { borderColor: 'red' } : {}} />
            {registerErrors.retypePassword && <div className="error-message">{registerErrors.retypePassword}</div>}
          </div>
          <div className="mb-3">
            <Form.Select name="role" value={registerForm.role} onChange={handleRegisterInput} className="form-login" required style={registerErrors.role ? { borderColor: 'red' } : {}}>
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
              <Form.Select name="course" value={registerForm.course} onChange={handleRegisterInput} className="form-login" required style={registerErrors.course ? { borderColor: 'red' } : {}}>
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

        {/* Modal */}
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
