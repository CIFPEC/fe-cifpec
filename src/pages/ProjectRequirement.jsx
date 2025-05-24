import React from 'react'
import Main from '../components/Main'

function ProjectRequirement() {
  return (
    <Main>
      <div className="container-fluid py-4">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            <div className="card p-4 shadow">
              <div className="mb-3">
                <label className="form-label fw-bold fs-4">Keperluan Projek</label>
                <input type="text" className="form-control ps-2 shadow-dark w-100 w-md-50 w-lg-25" placeholder="Nama Sesi / batch" />
              </div>

              <div className="table-responsive">
                <table className="table table-bordered align-middle text-center">
                  <thead className="table-light">
                    <tr>
                      <th>Nama Label</th>
                      <th>Jenis</th>
                      <th>Auto</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Project Name</td>
                      <td>text</td>
                      <td>input</td>
                      <td><button className="btn btn-sm btn-danger"><i className="bi bi-dash-circle"></i></button></td>
                    </tr>
                    <tr>
                      <td>Slide</td>
                      <td>list</td>
                      <td>Select</td>
                      <td><button className="btn btn-sm btn-danger"><i className="bi bi-dash-circle"></i></button></td>
                    </tr>
                    <tr>
                      <td>Poster</td>
                      <td>number</td>
                      <td>input</td>
                      <td><button className="btn btn-sm btn-danger"><i className="bi bi-dash-circle"></i></button></td>
                    </tr>
                    <tr>
                      <td>Penyelia</td>
                      <td>upload</td>
                      <td>input</td>
                      <td><button className="btn btn-sm btn-danger"><i className="bi bi-dash-circle"></i></button></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="text-center my-3 fs-3">
                <i className="fa-solid fa-circle-plus text-info"></i>
              </div>

              <div className="d-flex flex-column flex-md-row justify-content-between">
                <button className="btn btn-secondary mb-2 mb-md-0">Reset Default</button>
                <div className="text-end">
                  <button className="btn btn-warning text-white me-2">Preview</button>
                  <button className="btn btn-success">save</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Main>
  )
}

export default ProjectRequirement
