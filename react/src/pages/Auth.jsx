import React from 'react'
import "./../assets/css/login.css"
import Logo from "./../assets/img/Cifpec-Logo.png";
import { Form, Button, Image } from 'react-bootstrap';

function Auth() {
  const [tabs, setTabs] = React.useState({
    login: {
      status:"active",
      display:"d-block"
    },
    register: {
      status:"",
      display:"d-none"
    }
  });
  const [forms, setForms] = React.useState({
    email: "",
    password: ""
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForms({
      ...forms,
      [name]: value
    })
    
  }

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
    })
    setForms({
      email: "",
      password: ""
    })
  }

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
    })
    setForms({
      email: "",
      password: "",
      retypePassword: ""
    })
  }

  const onLogin = (e) => {
    console.log(forms)
  } 
  const onRegister = (e) => {
    console.log(forms)
  } 

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
            <Form.Control type="email" placeholder="Email or username" name="email" className='form-login' value={forms.email} onChange={e => handleInput(e)} />
          </div>
          <div className="mb-3">
            <Form.Control type="password" placeholder="Password" name="password" className='form-login' value={forms.password} onChange={e => handleInput(e)} />
          </div>
          <div className="d-flex justify-content-between  mb-3">
            <div className="input-check">
              <Form.Check type="checkbox" id="rememberMe" label="Remember me" className='ps-0 text-white'/>
            </div>
            <a href="#" className="text-decoration-none text-light">
              Forgot password?
            </a>
          </div>
          <Button className="w-100 py-2 btn-purple" onClick={onLogin}>
            SIGN IN
          </Button>
        </Form>

        {/* Register Form  */}
        <Form className={tabs.register.display}>
          <LogoImage />
          <div className="mb-3">
            <Form.Control type="email" placeholder="Email" name="email" className='form-login' value={forms.email} onChange={e => handleInput(e)} />
          </div>
          <div className="mb-3">
            <Form.Control type="password" placeholder="Password" name="password" className='form-login' value={forms.password} onChange={e => handleInput(e)} />
          </div>
          <div className="mb-3">
            <Form.Control type="password" placeholder="Confirm Password" name="retypePassword" className='form-login' defaultValue={forms.retypePassword} onChange={e => handleInput(e)} />
          </div>
          <Button className="w-100 py-2 btn-purple" onClick={onRegister}>
            SIGN UP
          </Button>
        </Form>
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

export default Auth
