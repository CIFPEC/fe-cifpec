import React from 'react'
import Main from '../components/Main'

function ProjectRequirement() {


  return (
    <Main>
        {/* <!-- Tajuk --> */}
    <div className="tab-pane fade show active mt-5 ms-3 w-75 shadow-dark" id="projekTab">
      <div className="card p-4 shadow">
        {/* <!-- Input Nama Batch --> */}
        <div className="mb-3">
          <label className="form-label fw-bold fs-4">Keperluan Projek</label>
          <input type="text" className="form-control ps-2 shadow-dark w-25" placeholder="Nama Sesi / batch"/>
        </div>

        {/* <!-- Jadual --> */}
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

        {/* <!-- Butang Tambah Baris --> */}
        <div className="text-center my-3 fs-3">
          <i className="fa-solid fa-circle-plus text-info"></i>
        </div>

        {/* <!-- Butang Action --> */}
        <div className="d-flex justify-content-between">
          <button className="btn btn-secondary">Reset Default</button>
          <div>
            <button className="btn btn-warning text-white me-2">Preview</button>
            <button className="btn btn-success">save</button>
          </div>
        </div>
      </div>
    </div>

    </Main>
  )
}

export default ProjectRequirement
