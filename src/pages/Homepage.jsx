import React, { useState } from "react";
import { Button, Dropdown, Form, InputGroup, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "./../assets/img/Cifpec-Logo.png";
// import "@fortawesome/fontawesome-free/css/all.min.css";

const projekList = [
    {
        tajuk: "Raspberry Pi As Chromecast Alternative (Raspicast)",
        tahun: "2023",
        gambar: "https://tse3.mm.bing.net/th?id=OIP.U0FWQrI2mFWRhD0-2QQ4QwHaJ4&pid=Api",
        kursus: "Komputer",
        deskripsi: "Menggunakan Raspberry Pi untuk menggantikan Chromecast secara wireless."
    },
    {
        tajuk: "PICAXE Raspberry Pi ADC",
        tahun: "2022",
        gambar: "https://tse2.mm.bing.net/th?id=OIP.KKDO_M3GsXzcDTTw6lXWoQHaHa&pid=Api",
        kursus: "Komputer",
        deskripsi: "Sistem pengumpulan data analog menggunakan Raspberry Pi dan PICAXE."
    },
    {
        tajuk: "Bluetooth Robotic Arm",
        tahun: "2023",
        gambar: "https://tse2.mm.bing.net/th?id=OIP.cRYaMoUf_LG9J7TGuSJLBgHaEo&pid=Api",
        kursus: "Mekatronik",
        deskripsi: "Lengan robot yang dikawal sepenuhnya menggunakan Bluetooth."
    },
    {
        tajuk: "Quadruplets Rotary Ratchet",
        tahun: "2023",
        gambar: "https://tse2.mm.bing.net/th?id=OIP.JXvhU0DCEEMwjd2cbSdKFAHaKe&pid=Api",
        kursus: "Automotif",
        deskripsi: "Sistem gear rotary dengan empat arah kawalan mekanikal."
    },
];

const Homepage = () => {
    const [show, setShow] = useState(false);
    const [selectedProjek, setSelectedProjek] = useState(null);
    const [carian, setCarian] = useState("");
    const [sesi, setSesi] = useState("Semua Sesi");
    const [kursus, setKursus] = useState("Semua Kursus");
    const [hasilCari, setHasilCari] = useState(projekList);

    const handleShow = (projek) => {
        setSelectedProjek(projek);
        setShow(true);
    };

    const handleClose = () => {
        setShow(false);
        setSelectedProjek(null);
    };

    const handleSearch = () => {
        const result = projekList.filter((projek) => {
            const matchTajuk = projek.tajuk.toLowerCase().includes(carian.toLowerCase());
            const matchSesi = sesi === "Semua Sesi" || projek.tahun === sesi;
            const matchKursus = kursus === "Semua Kursus" || projek.kursus === kursus;
            return matchTajuk && matchSesi && matchKursus;
        });
        setHasilCari(result);
    };

    return (
        <div className="container-fluid px-2 px-md-4">
            <nav className="navbar navbar-main navbar-expand-lg px-0 mx-3 shadow-none border-radius-xl">
                <div className="container-fluid py-1 px-3 d-flex justify-content-between align-items-center">
                    <img src={Logo} alt="Logo CIFPEC" style={{ height: "40px" }} />
                    <Link to="/login" className="nav-link text-body font-weight-bold px-0">
                        <Button variant="info" className="text-white">Log masuk</Button>
                    </Link>
                </div>
            </nav>

            <div
                className="page-header min-height-300 border-radius-xl mt-4 justify-content-center d-flex align-items-center"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "relative",
                }}
            >
                <h1 className="text-white" style={{ zIndex: 10 }}>
                    Sistem Pengurusan Cifpec
                </h1>
                <span
                    className="mask bg-gradient-dark opacity-6"
                    style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }}
                ></span>
            </div>

            <div className="col-12 col-md-6 mt-4">
                <InputGroup className="mb-3 ">
                    <Form.Control
                        placeholder="Cari Projek"
                        value={carian}
                        onChange={(e) => setCarian(e.target.value)}
                    />
                    <Dropdown onSelect={(e) => setSesi(e)}>
                        <Dropdown.Toggle variant="outline-secondary">{sesi}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="Semua Sesi">Semua Sesi</Dropdown.Item>
                            <Dropdown.Item eventKey="2022">2022</Dropdown.Item>
                            <Dropdown.Item eventKey="2023">2023</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown onSelect={(e) => setKursus(e)}>
                        <Dropdown.Toggle variant="outline-secondary">{kursus}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="Semua Kursus">Semua Kursus</Dropdown.Item>
                            <Dropdown.Item eventKey="Komputer">Komputer</Dropdown.Item>
                            <Dropdown.Item eventKey="Mekatronik">Mekatronik</Dropdown.Item>
                            <Dropdown.Item eventKey="Automotif">Automotif</Dropdown.Item>
                            <Dropdown.Item eventKey="Automotif">Pembuatan</Dropdown.Item>
                            <Dropdown.Item eventKey="Automotif">Telekomunikasi</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Button variant="outline-secondary" onClick={handleSearch}>
                        <i className="bi bi-search"></i> Cari
                    </Button>
                </InputGroup>
            </div>

            <div className="col-12 mt-4">
                <div className="mb-5 ps-3">
                    <h6 className="mb-1 text-center fs-2">
                        Projek Tahun akhir Adtec Melaka
                    </h6>
                </div>
                <div className="row">
                    {hasilCari.map((projek, idx) => (
                        <div className="col-xl-3 col-md-6 mb-xl-0 mb-4" key={idx}>
                            <div className="card card-blog card-plain">
                                <div
                                    className="card-header p-0 m-2 position-relative"
                                    style={{
                                        height: "200px",
                                        backgroundImage: `url(${projek.gambar})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        borderRadius: "1rem",
                                    }}
                                >
                                    <span className="position-absolute top-0 end-0 bg-info text-white px-2 py-1">
                                        {projek.tahun}
                                    </span>
                                </div>
                                <div className="card-body p-3">
                                    <h5>{projek.tajuk}</h5>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <Button variant="outline-primary" size="sm" onClick={() => handleShow(projek)}>
                                            View Project
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedProjek && (
                <Modal show={show} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedProjek.tajuk}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img
                            src={selectedProjek.gambar}
                            alt={selectedProjek.tajuk}
                            className="img-fluid rounded mb-3"
                        />
                        <p><strong>Tahun:</strong> {selectedProjek.tahun}</p>
                        <p><strong>Kursus:</strong> {selectedProjek.kursus}</p>
                        <p><strong>Deskripsi:</strong> {selectedProjek.deskripsi}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Tutup
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

export default Homepage;
