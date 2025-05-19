import React from 'react'
import Main from '../components/Main'
import { Link } from 'react-router-dom'

function ProjectList() {


    return (
        <Main>
            {/* <!-- Tajuk --> */}
            <div class="tab-pane fade show active w-75 mt-5 ms-3" id="projekTab">
                <div class="card p-4 shadow-sm">
                    {/* <!-- Tab Header --> */}
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h6 class="fw-bold mb-4">Senarai Projek (semua department)</h6>

                        <div className="d-flex justify-content-end mb-2">
                            <Link to={"/dashboard/project/newproject"} className="btn btn-primary me-3">Create New</Link>
                            <button class="btn btn-success">Export</button>
                        </div>
                    </div>

                    {/* <!-- Jadual Projek --> */}
                    <div class="table-responsive">
                        <table class="table table-bordered align-middle text-center">
                            <thead class="table-light">
                                <tr>
                                    <th>Kumpulan</th>
                                    <th>Penyelaras</th>
                                    <th>Penyelia</th>
                                    <th>Status</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Kumpulan A</td>
                                    <td>Puan Sabrina</td>
                                    <td>Puan Sabrina</td>
                                    <td>Selesai</td>
                                    <td>
                                        <button class="btn btn-sm btn-outline-primary">
                                            Lihat
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Kumpulan B</td>
                                    <td>Puan Sabrina</td>
                                    <td>Encik Haikal</td>
                                    <td>Dalam Proses</td>
                                    <td>
                                        <button class="btn btn-sm btn-outline-primary">
                                            Lihat
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Kumpulan C</td>
                                    <td>Puan Sabrina</td>
                                    <td>Encik Suhaimi</td>
                                    <td>Dalam Proses</td>
                                    <td>
                                        <button class="btn btn-sm btn-outline-primary">
                                            Lihat
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Kumpulan D</td>
                                    <td>Puan Sabrina</td>
                                    <td>Cik Munirah</td>
                                    <td>Selesai</td>
                                    <td>
                                        <button class="btn btn-sm btn-outline-primary">
                                            Lihat
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* <!-- Pagination --> */}
                    <nav class="d-flex justify-content-between mt-3">
                        <ul class="pagination pagination-sm mb-0">
                            <li class="page-item disabled">
                                <a class="page-link" href="#">‹</a>
                            </li>
                            <li class="page-item active">
                                <a class="page-link" href="#">3</a>
                            </li>
                            <li class="page-item"><a class="page-link" href="#">4</a></li>
                            <li class="page-item"><a class="page-link" href="#">›</a></li>
                        </ul>
                    </nav>
                </div>
            </div>

        </Main>
    )
}

export default ProjectList
