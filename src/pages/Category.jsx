// Category.jsx

import React, { useEffect, useState } from "react";
import Main from "../components/Main";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import axiosInstance from "../utils/axiosInstance";

function Category() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [editCategoryIndex, setEditCategoryIndex] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("/category");
      setCategoryList(response.data?.data || []);
    } catch (error) {
      console.error("Gagal ambil kategori:", error);
      setApiError("Gagal ambil kategori");
    }
  };

  const handleOpenCreateModal = () => {
    setCategoryName("");
    setApiError("");
    setShowCreateModal(true);
  };

  const handleCloseCreateModal = () => setShowCreateModal(false);

  const handleOpenEditModal = (index) => {
    setEditCategoryIndex(index);
    setCategoryName(categoryList[index]?.name);
    setApiError("");
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setEditCategoryIndex(null);
    setCategoryName("");
    setApiError("");
    setShowEditModal(false);
  };

  const createCategory = async () => {
    if (!categoryName.trim()) return;

    try {
      await axiosInstance.post("/category", { name: categoryName });
      handleCloseCreateModal();
      fetchCategories();
    } catch (error) {
      console.error(
        "Gagal tambah kategori:",
        error.response?.data || error.message
      );
      setApiError(error.response?.data?.message || "Gagal tambah kategori");
    }
  };

  const updateCategory = async () => {
    if (!categoryName.trim()) return;

    try {
      const categoryId = categoryList[editCategoryIndex]?.id;
      await axiosInstance.patch(`/category/${categoryId}`, {
        name: categoryName,
      });
      handleCloseEditModal();
      fetchCategories();
    } catch (error) {
      console.error(
        "Gagal ubah kategori:",
        error.response?.data || error.message
      );
      setApiError(error.response?.data?.message || "Gagal ubah kategori");
    }
  };

  return (
    <Main>
      <div className="container-fluid py-4">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            <div className="card p-4 shadow-sm">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2 mb-3">
                <h6 className="fw-bold mb-0">Category List</h6>
                <Button variant="primary" onClick={handleOpenCreateModal}>
                  Create New
                </Button>
              </div>

              <div className="table-responsive">
                <table className="table table-bordered text-center align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoryList.length === 0 ? (
                      <tr>
                        <td colSpan="2">No Category Available</td>
                      </tr>
                    ) : (
                      categoryList.map((cat, index) => (
                        <tr key={index}>
                          <td>{cat?.name || "-"}</td>
                          <td>
                            <div className="d-flex justify-content-center gap-2">
                              <button
                                className="btn btn-outline-primary btn-sm"
                                onClick={() => handleOpenEditModal(index)}
                              >
                                Edit
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Tambah */}
        <Modal show={showCreateModal} onHide={handleCloseCreateModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Create Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {apiError && <Alert variant="danger">{apiError}</Alert>}
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Contoh: Automation"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="form-control-lg"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseCreateModal}>
              Close
            </Button>
            <Button variant="primary" onClick={createCategory}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal Ubah */}
        <Modal show={showEditModal} onHide={handleCloseEditModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Edit Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {apiError && <Alert variant="danger">{apiError}</Alert>}
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Contoh: Automation"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="form-control-lg"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEditModal}>
              Close
            </Button>
            <Button variant="primary" onClick={updateCategory}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Main>
  );
}

export default Category;
