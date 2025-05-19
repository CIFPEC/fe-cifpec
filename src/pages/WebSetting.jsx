import React, { useState } from 'react';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import Main from '../components/Main';

export default function WebSettingComponent() {
    const [websiteTitle, setWebsiteTitle] = useState('');
    const [logoFile, setLogoFile] = useState(null);
    const [bannerFile, setBannerFile] = useState(null);
    const [textHeader, setTextHeader] = useState('');
    const [headerDescription, setHeaderDescription] = useState('');

    const handleFileChange = (e, setter) => {
        setter(e.target.files[0]);
    };

    const handleReset = () => {
        setWebsiteTitle('');
        setLogoFile(null);
        setBannerFile(null);
        setTextHeader('');
        setHeaderDescription('');
    };

    const handleSave = () => {
        console.log({ websiteTitle, logoFile, bannerFile, textHeader, headerDescription });
    };

    return (
      <Main>
        <div className='container'>
          <div className="row">
            <div className="col col-9">
              <Card className="shadow-sm border-0 p-4 mt-5">
                  <Card.Body>
                      <h2 className="mb-4">Personalization</h2>
                      <Form>
                          <Row className="mb-3">
                              <Col md={6}>
                                  <Form.Group>
                                      <Form.Label>Website Title</Form.Label>
                                      <Form.Control type="text" placeholder="Website Title" value={websiteTitle} onChange={(e) => setWebsiteTitle(e.target.value)} />
                                  </Form.Group>
                              </Col>
                              <Col md={6}>
                                  <Form.Group>
                                      <Form.Label>Logo (Upload)</Form.Label>
                                      <Form.Control type="file" onChange={(e) => handleFileChange(e, setLogoFile)} />
                                  </Form.Group>
                              </Col>
                          </Row>
                          <Row className="mb-3">
                              <Col md={6}>
                                  <Form.Group>
                                      <Form.Label>Banner (Upload)</Form.Label>
                                      <Form.Control type="file" onChange={(e) => handleFileChange(e, setBannerFile)} />
                                  </Form.Group>
                              </Col>
                              <Col md={6}>
                                  <Form.Group>
                                      <Form.Label>Text Header</Form.Label>
                                      <Form.Control type="text" placeholder="Text Header" value={textHeader} onChange={(e) => setTextHeader(e.target.value)} />
                                  </Form.Group>
                              </Col>
                          </Row>
                          <Form.Group className="mb-3">
                              <Form.Label>Header Description (TextArea)</Form.Label>
                              <Form.Control as="textarea" rows={3} placeholder="Header Description" value={headerDescription} onChange={(e) => setHeaderDescription(e.target.value)} />
                          </Form.Group>
                          <div className="d-flex justify-content-end gap-3">
                              <Button variant="secondary" onClick={handleReset}>Reset Default</Button>
                              <Button variant="primary" onClick={handleSave}>Save Change</Button>
                          </div>
                      </Form>
                  </Card.Body>
              </Card>
            </div>
          </div>
        </div>
        </Main>
    );
}
