import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export function Error401() {
  const navigate = useNavigate();
  return (
    <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <h1>401 - Unauthorized</h1>
      <p>Sila login terlebih dahulu untuk akses page ini.</p>
      <Button onClick={() => navigate('/login')}>Pergi ke Login</Button>
    </div>
  );
}

export function Error403() {
  const navigate = useNavigate();
  return (
    <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <h1>403 - Forbidden</h1>
      <p>Anda tidak dibenarkan akses ke page ini.</p>
      <Button onClick={() => {
        // if (window.history.length <= 1) {
        //   navigate('/dashboard');
        // } else {
        //   navigate(-1);
        // }
        navigate('/dashboard');
      }}>Kembali</Button>
    </div>
  );
}

export function Error404() {
  const navigate = useNavigate();
  return (
    <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <h1>404 - Page Not Found</h1>
      <p>Page yang anda cuba akses tidak wujud.</p>
      <Button onClick={() => navigate('/')}>Kembali ke Laman Utama</Button>
    </div>
  );
}

