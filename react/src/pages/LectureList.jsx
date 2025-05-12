import React from 'react'
import Main from '../components/Main'


function LectureList() {
    return (
        <Main>
            {/* <!-- Tajuk --> */}
            <div className="card p-4 shadow-sm mt-5 ms-3 w-75">
                <h6 className="fw-bold mb-3">Lecturer List</h6>

                <div className="table-responsive">
                    <table className="table table-bordered text-center align-middle">
                        <thead className="table-light">
                            <tr>
                                <th>Name</th>
                                <th>Department</th>
                                <th>Level</th>
                                <th>Details</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td>Komputer</td>
                                <td>Admin</td>
                                <td>
                                    <button className="btn btn-outline-primary btn-sm">view</button>
                                </td>
                                <td>
                                    <div
                                        className="form-check form-switch d-flex justify-content-center"
                                    >
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            role="switch"
                                            checked
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Meka</td>
                                <td>Penyelia</td>
                                <td>
                                    <button className="btn btn-outline-primary btn-sm">view</button>
                                </td>
                                <td>
                                    <div
                                        className="form-check form-switch d-flex justify-content-center"
                                    >
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            role="switch"
                                            checked
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <button className="btn btn-outline-primary btn-sm">view</button>
                                </td>
                                <td>
                                    <div
                                        className="form-check form-switch d-flex justify-content-center"
                                    >
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            role="switch"
                                            checked
                                        />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* <!-- Pagination --> */}
                <nav className="d-flex justify-content-center mt-3">
                    <ul className="pagination pagination-sm mb-0">
                        <li className="page-item"><a className="page-link" href="#">‹</a></li>
                        <li className="page-item active">
                            <a className="page-link" href="#">3</a>
                        </li>
                        <li className="page-item"><a className="page-link" href="#">5</a></li>
                        <li className="page-item"><a className="page-link" href="#">›</a></li>
                    </ul>
                </nav>
            </div>

        </Main>
    )
}

export default LectureList
