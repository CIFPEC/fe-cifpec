import React from 'react'
import Main from '../components/Main'

function Course() {



  return (
    <Main>
        <div className="card p-4 shadow-sm mt-5 ms-3 w-75">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="fw-bold mb-0">Senarai Projek (Komputer)</h6>
          <button className="btn btn-success">Create New</button>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered text-center align-middle">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Penyelaras</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td>Haida</td>
                <td>
                  <button className="btn btn-outline-primary btn-sm me-3 mt-3">
                    edit
                  </button>
                  <button className="btn btn-outline-primary btn-sm ms-3 mt-3">
                    delete
                  </button>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>Sabrina</td>
                <td>
                  <button className="btn btn-outline-primary btn-sm me-3 mt-3">
                    edit
                  </button>
                  <button className="btn btn-outline-primary btn-sm ms-3 mt-3">
                    delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        </div>
    </Main>
  )
}

export default Course
