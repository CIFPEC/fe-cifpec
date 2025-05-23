// src/pages/Auth.jsx 
import React, { useState } from 'react';
import "./../assets/css/login.css";
import Logo from "./../assets/img/Cifpec-Logo.png";
import { Form, Button, Image, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Auth() {
  const [tabs, setTabs] = useState({
    login: {
      status:"active",
      display:"d-block"
    },
    register: {
      status:"",
      display:"d-none"
    }
  });

  const [forms, setForms] = useState({
    email: "",
    password: "",
    retypePassword: "",
    role: "",
    course: ""
  });

  const [verificationCode, setVerificationCode] = useState("");
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForms({
      ...forms,
      [name]: value
    });
  };

  const showLogin = () => {
    setTabs({
      login: {
        status:"active",
        display:"d-block"
      },
      register: {
        status:"",
        display:"d-none"
      }
    });
    setForms({
      email: "",
      password: "",
      retypePassword: "",
      role: "",
      course: ""
    });
  };

  const showRegister = () => {
    setTabs({
      login: {
        status:"",
        display:"d-none"
      },
      register: {
        status:"active",
        display:"d-block"
      }
    });
    setForms({
      email: "",
      password: "",
      retypePassword: "",
      role: "",
      course: ""
    });
  };

  const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const onRegister = (e) => {
    e.preventDefault();
    if (forms.email && forms.password === forms.retypePassword) {
      const code = generateVerificationCode();
      setVerificationCode(code);
      setShowVerificationModal(true);
      console.log(`Verification code sent to ${forms.email}: ${code}`);
      setTimeout(() => {
        navigate('/verifyemail', { state: { email: forms.email, code: code } });
      }, 10000);
    } else {
      alert("Passwords do not match or fields are empty");
    }
  };

  return (
    <div className="auth">
      <div className="form-box glass-box">
        <div className="d-flex mb-4">
          <Button className={`btn-switch w-50 me-3 ${tabs.login.status}`} onClick={showLogin}>
            LOGIN
          </Button>
          <Button className={`btn-switch w-50 ${tabs.register.status}`} onClick={showRegister}>
            REGISTER
          </Button>
        </div>

        {/* Login Form  */}
        <Form className={tabs.login.display}>
          <LogoImage />
          <div className="mb-3">
            <Form.Control type="email" placeholder="Email or username" name="email" className='form-login' value={forms.email} onChange={handleInput} />
          </div>
          <div className="mb-3">
            <Form.Control type="password" placeholder="Password" name="password" className='form-login' value={forms.password} onChange={handleInput} />
          </div>
          <Button className="w-100 py-2 btn-purple" onClick={(e) => console.log(forms)}>
            SIGN IN
          </Button>
        </Form>

        {/* Register Form  */}
        <Form className={tabs.register.display} onSubmit={onRegister}>
          <LogoImage />
          <div className="mb-3">
            <Form.Control type="email" placeholder="Email" name="email" className='form-login' value={forms.email} onChange={handleInput} />
          </div>
          <div className="mb-3">
            <Form.Control type="password" placeholder="Password" name="password" className='form-login' value={forms.password} onChange={handleInput} />
          </div>
          <div className="mb-3">
            <Form.Control type="password" placeholder="Confirm Password" name="retypePassword" className='form-login' value={forms.retypePassword} onChange={handleInput} />
          </div>

          {/* Dropdown untuk Role */}
          <div className="mb-3">
            <Form.Select name="role" value={forms.role} onChange={handleInput} className="form-login" required>
              <option value="">-- Pilih Peranan --</option>
              <option value="Pelajar">Pelajar</option>
              <option value="Penyelia">Penyelia</option>
              <option value="Penyelaras">Penyelaras</option>
            </Form.Select>
          </div>

          {/* Dropdown untuk Course */}
          <div className="mb-3">
            <Form.Select name="course" value={forms.course} onChange={handleInput} className="form-login" required>
              <option value="">-- Pilih Kursus --</option>
              <option value="Komputer">Komputer</option>
              <option value="Telekomunikasi">Telekomunikasi</option>
              <option value="Pembuatan">Pembuatan</option>
              <option value="Mekatronik">Mekatronik</option>
              <option value="Automotif">Automotif</option>
            </Form.Select>
          </div>

          <Button type="submit" className="w-100 py-2 btn-purple">
            SIGN UP
          </Button>
        </Form>

        {/* Verification Code Modal */}
        <Modal show={showVerificationModal} onHide={() => setShowVerificationModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Verify Your Email</Modal.Title>
          </Modal.Header>
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

function LogoImage(){
  return (
    <div className="text-center mb-3 auth-logo">
      <Image src={Logo} />
    </div>
  );
}

export default Auth;
