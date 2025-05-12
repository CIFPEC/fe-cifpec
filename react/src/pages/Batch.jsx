import React from 'react'
import Main from '../components/Main'

function Batch(){


  return (
    <Main>
          <div className="container-fluid py-4">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        
                        <div className="card-body px-0 pt-0 pb-2">
                            <div className="tab-content" id="batchTabContent">
                               
                                <div className="tab-pane fade show active" id="batch" role="tabpanel">
                                    <div className="d-flex justify-content-between align-items-center px-3 pt-3">
                                        <h6>Batch Lists</h6>
                                        <button className="btn btn-primary btn-sm">Create New</button>
                                    </div>

                                    <div className="table-responsive p-3">
                                        <table className="table table-bordered align-items-center mb-0">
                                            <thead className="table-dark">
                                                <tr>
                                                    <th>Batch Name</th>
                                                    <th>Course</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Kumpulan A</td>
                                                    <td>IT</td>
                                                    <td><span className="badge bg-success">Complete</span></td>
                                                    <td><button className="btn btn-outline-dark btn-sm">View</button></td>
                                                </tr>
                                                <tr>
                                                    <td>Kumpulan B</td>
                                                    <td>Meka</td>
                                                    <td><span className="badge bg-warning">Pending</span></td>
                                                    <td><button className="btn btn-outline-dark btn-sm">View</button></td>
                                                </tr>
                                                <tr>
                                                    <td>Kumpulan C</td>
                                                    <td>Puan</td>
                                                    <td></td>
                                                    <td><button className="btn btn-outline-dark btn-sm">View</button></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="d-flex justify-content-center p-3">
                                        <nav>
                                            <ul className="pagination pagination-sm mb-0">
                                                <li className="page-item"><a className="page-link" href="#">&lt;</a></li>
                                                <li className="page-item"><a className="page-link" href="#">3</a></li>
                                                <li className="page-item"><a className="page-link" href="#">5</a></li>
                                                <li className="page-item"><a className="page-link" href="#">&gt;</a></li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </Main>
  )
}

export default Batch
