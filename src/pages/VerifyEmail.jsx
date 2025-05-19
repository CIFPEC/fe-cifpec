import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

export default function VerifyEmailPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [inputCode, setInputCode] = useState('');
    const [message, setMessage] = useState('');
    const email = location.state?.email || 'unknown';
    const correctCode = location.state?.code || '';

    const handleVerify = () => {
        if (inputCode === correctCode) {
            setMessage('Verification successful! Your email has been verified.');
            setTimeout(() => location('/'), 2000);
        } else {
            setMessage('Invalid code. Please try again.');
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            <Card className="p-4 shadow-lg" style={{ width: '400px' }}>
                <Card.Body>
                    <h3 className="mb-4 text-center">Verify Your Email</h3>
                    <p className="text-center">Enter the code sent to <strong>{email}</strong></p>
                    <Form.Group className="mb-3">
                        <Form.Control type="text" placeholder="Enter your code" value={inputCode} onChange={(e) => setInputCode(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" className="w-100 mb-3" onClick={handleVerify}>Verify</Button>
                    {message && <Alert variant={message.includes('successful') ? 'success' : 'danger'}>{message}</Alert>}
                </Card.Body>
            </Card>
        </Container>
    );
}
