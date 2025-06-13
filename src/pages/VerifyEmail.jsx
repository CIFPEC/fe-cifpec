import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from './../utils/axiosInstance';

export default function VerifyEmailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [inputCode, setInputCode] = useState('');
  const [message, setMessage] = useState('');
  const [isWaiting, setIsWaiting] = useState(true);
  const [countdown, setCountdown] = useState(60);
  const [verifyToken, setVerifyToken] = useState(location.state?.token || '');

  const email = location.state?.email || '';

  useEffect(() => {
    console.log("Data dari location.state:", location.state);
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsWaiting(false);
    }
  }, [countdown]);

  const handleVerify = async () => {
    try {
      const payload = {
        userEmail: email,
        verifyCode: inputCode
      };
      const res = await axiosInstance.post('/auth/email/verify', payload, {
        headers: { 'Verify-Token': verifyToken }
      });
      localStorage.setItem("accessToken",res?.data?.data?.token)
      setMessage('Verification successful! Your email has been verified.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setMessage('Invalid code or verification failed.');
      console.error("Verify error:", error);
    }
  };

  const requestNewCode = async () => {
    try {
      const res = await axiosInstance.post("/auth/email/verify/request", { userEmail: email });
      const newToken = res.data?.data?.verifyToken || '';
      setVerifyToken(newToken);
      setCountdown(60);
      setIsWaiting(true);
      setMessage('Kod baru telah dihantar ke email anda.');
    } catch (error) {
      setMessage('Gagal menghantar kod baru.');
      console.error("Request code error:", error);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="p-4 shadow-lg" style={{ width: '400px' }}>
        <Card.Body>
          <h3 className="mb-4 text-center">Verify Your Email</h3>
          <p className="text-center">Enter the code sent to <strong>{email}</strong></p>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Enter your code"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" className="w-100 mb-3" onClick={handleVerify}>Verify</Button>
          <Button variant="outline-secondary" className="w-100" onClick={requestNewCode} disabled={isWaiting}>
            {isWaiting ? `Request again in ${countdown}s` : 'Request New Code'}
          </Button>
          {message && <Alert variant={message.includes('successful') ? 'success' : 'danger'} className="mt-3">
            {message}
          </Alert>}
        </Card.Body>
      </Card>
    </Container>
  );
}