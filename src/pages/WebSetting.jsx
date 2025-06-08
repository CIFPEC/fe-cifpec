import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Row, Col, Image } from 'react-bootstrap';
import Main from '../components/Main';
import axiosInstance from '../utils/axiosInstance';
import Loading from '../components/Loading';
import { useNavigate } from "react-router-dom";


export default function WebSettingComponent() {
  const [websiteTitle, setWebsiteTitle] = useState('');
  const [logoFile, setLogoFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const [Site, setSite] = useState(null);
  const [textHeader, setTextHeader] = useState('');
  const [headerDescription, setHeaderDescription] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  

  const fetchSettings = async () => {
    try {
      const res = await axiosInstance.get('/site/settings');
      const data = res?.data?.data;
      setWebsiteTitle(data.title || '');
      setTextHeader(data.textHeader || '');
      setHeaderDescription(data.description || '');
      updateDocumentMeta(data.title, data.logo);
      setSite(data);
      setIsLoading(false);
    } catch (err) {
      console.error('Failed to load settings:', err);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  if(isLoading) return <Loading />;

  const updateDocumentMeta = (title, logo) => {
    if (title) document.title = title;
    if (logo) {
      const favicon = document.querySelector('link[rel="icon"]') || document.createElement('link');
      favicon.rel = 'icon';
      favicon.href = `https://api-cifpec.xtivebiz.com/site/${logo}`;
      document.head.appendChild(favicon);
    }
  };

  const handleFileChange = (e, setter) => {
    const file = e.target.files[0];
    if (file) setter(file);
  };

  const handleReset = () => {
    setWebsiteTitle('');
    setLogoFile(null);
    setBannerFile(null);
    setTextHeader('');
    setHeaderDescription('');
  };

  const handleSave = async () => {
    try {
      const form = new FormData();
      if (logoFile) form.append('logo', logoFile);
      if (bannerFile) form.append('banner', bannerFile);
      form.append('title', websiteTitle);
      form.append('textHeader', textHeader);
      form.append('description', headerDescription);

      const res = await axiosInstance.patch('/site/settings', form);
      const updated = res.data?.data;
      updateDocumentMeta(updated.title, updated.logo);
      navigate(0);
    } catch (err) {
      console.error('Failed to save settings:', err);
    }
  };

  return (
    <Main>
      <div className="container py-4">
        <Card className="shadow-sm border-0 p-4 mt-4">
          <Card.Body>
            <h4 className="fw-bold mb-4 text-primary">Personalization Settings</h4>
            <Form>
              <Row className="mb-4">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Website Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="CIFPEC Management System"
                      value={websiteTitle}
                      onChange={(e) => setWebsiteTitle(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Upload Logo</Form.Label>
                    <Form.Control type="file" onChange={(e) => handleFileChange(e, setLogoFile)} />
                    {(logoFile || Site?.logo) ? (
                      <div className="d-flex">
                        {logoFile && (
                          <div className="d-flex flex-column align-items-center w-30">
                            <Image
                              src={logoFile && URL.createObjectURL(logoFile)}
                              alt="Logo Preview"
                              className="mt-2"
                              style={{ width: '80px' }}
                              fluid
                            />
                            <span>New Logo</span>
                          </div>
                        )}
                        {Site?.logo && (
                          <span className="d-flex flex-column align-items-center w-30">
                            <Image
                              src={Site?.logo}
                              alt="Logo Preview"
                              className="mt-2 ms-2"
                              style={{ width: '80px' }}
                              fluid
                              />
                            <span className="text-center">Old Logo</span>
                          </span>
                        )}
                      </div>
                    ):null}
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-4">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Upload Banner</Form.Label>
                    <Form.Control type="file" onChange={(e) => handleFileChange(e, setBannerFile)} />
                    {bannerFile && (
                      <Image
                        src={URL.createObjectURL(bannerFile)}
                        alt="Banner Preview"
                        className="mt-2 rounded"
                        style={{ width: '100%', maxHeight: '150px', objectFit: 'cover' }}
                        fluid
                      />
                    )}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Text Header</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Contoh: Sistem Cifpec"
                      value={textHeader}
                      onChange={(e) => setTextHeader(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-4">
                <Form.Label>Header Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Contoh: Sistem ini dibangunkan bagi memudahkan pengurusan pertandingan projek tahun akhir."
                  value={headerDescription}
                  onChange={(e) => setHeaderDescription(e.target.value)}
                />
              </Form.Group>

              <div className="d-flex justify-content-end gap-3">
                <Button variant="secondary" onClick={handleReset}>
                  Reset Default
                </Button>
                <Button variant="primary" onClick={handleSave}>
                  Save Change
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Main>
  );
}
