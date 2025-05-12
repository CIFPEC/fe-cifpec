import React from 'react'
import Main from '../components/Main'


function StudentProject() {


    return (
        <Main>
           
                <div className="col-lg-7 col-md-4 mt-3" style={{backgrounColor:" #eaeaea"}}>
                    <div className="col-lg-4 col-md-6 my-sm-auto ms-sm-auto me-sm-0 mx-auto mt-3 position-absolute start-50 end-50">
                        <nav>
                            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab"
                                    data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home"
                                    aria-selected="true">Kumpulan</button>
                                <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile"
                                    type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Projek</button>
                            </div>
                        </nav>
                        <div className="tab-content" id="nav-tabContent">
                            <div className="tab-pane fade show active shadow" style={{backgrounColor:" #eaeaea"}} id="nav-home"
                                role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0">
                                <div className="d-flex">
                                    {/* <!-- User details --> */}
                                    <div className="p-4">
                                        <form>
                                            <div className="container p-4">
                                                <h5 className="fw-bold">Bina Kumpulan</h5>
                                                <div className="row">
                                                    <div className="col mb-3">
                                                        <input type="text" className="form-control" placeholder="Nama Projek" />
                                                    </div>
                                                    <div className="ms-1">
                                                        <p>Nama Kumpulan</p>
                                                    </div>

                                                    <div className="col-md-6 mb-3">
                                                        <select className="form-select">
                                                            <option selected disabled>Select User</option>
                                                            <option value="kursus1">Choose User</option>
                                                        </select>
                                                    </div>

                                                    <div className="col-md-6 mb-3">
                                                        <select className="form-select">
                                                            <option selected disabled>Select User</option>
                                                            <option value="kursus1">Choose User</option>
                                                        </select>
                                                    </div>

                                                    <div className="col-md-6 mb-3">
                                                        <select className="form-select">
                                                            <option selected disabled>Select User</option>
                                                            <option value="kursus1">Choose User</option>
                                                        </select>
                                                    </div>


                                                    <div className="col-md-12 d-flex justify-content-end gap-3 mt-4">
                                                        <button type="submit" className="btn btn-success px-4">Simpan</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            <div className="tab-pane fade show active shadow" style={{backgrounColor:" #eaeaea"}} id="nav-profile"
                                role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0">
                                <div className="d-flex">
                                    {/* <!-- User details --> */}
                                    <div className="p-4">
                                        <form>
                                            <div className="container p-4">
                                                <h5 className="fw-bold">Maklumat Projek</h5>
                                                <div className="row">
                                                    <div className="col mb-3">
                                                        <input type="text" className="form-control" placeholder="Nama Projek" />
                                                    </div>
                                                    <div className="col-md-6 mb-3">
                                                        <select className="form-select">
                                                            <option selected disabled>Kursus</option>
                                                            <option value="kursus1">Kursus 1</option>
                                                            <option value="kursus2">Kursus 2</option>
                                                        </select>
                                                    </div>

                                                    <div className="col-md-6 mb-3">
                                                        <input type="text" className="form-control" placeholder="Nama Ahli 1" />
                                                    </div>
                                                    <div className="col-md-6 mb-3">
                                                        <select className="form-select">
                                                            <option selected disabled>Bidang</option>
                                                            <option value="bidang1">Bidang 1</option>
                                                            <option value="bidang2">Bidang 2</option>
                                                        </select>
                                                    </div>

                                                    <div className="col-md-6 mb-3">
                                                        <input type="text" className="form-control" placeholder="Nama Ahli 2" />
                                                    </div>
                                                    <div className="col-md-6 mb-3">
                                                        <input type="text" className="form-control" placeholder="Nama Penyelia" />
                                                    </div>

                                                    <div className="col-md-6 mb-3">
                                                        <input type="text" className="form-control" placeholder="Nama Ahli 3" />
                                                    </div>
                                                    <div className="col-md-6 mb-3">
                                                        <label className="form-label fw-bold">Slide</label>
                                                        <div className="input-group">
                                                            <button className="btn btn-secondary" type="button">Upload</button>
                                                            <input type="file" className="form-control" accept=".pdf" />
                                                        </div>
                                                        <small className="text-muted fst-italic">Sila upload slide anda dalam bentuk
                                                            PDF</small>
                                                    </div>

                                                    <div className="col-md-6 offset-md-6 mb-3">
                                                        <label className="form-label fw-bold">Poster</label>
                                                        <div className="input-group">
                                                            <button className="btn btn-secondary" type="button">Upload</button>
                                                            <input type="file" className="form-control" accept=".pdf" />
                                                        </div>
                                                        <small className="text-muted fst-italic">Sila upload poster anda dalam
                                                            bentuk
                                                            PDF</small>
                                                    </div>

                                                    <div className="col-md-12 d-flex justify-content-end gap-3 mt-4">
                                                        <button type="submit" className="btn btn-success px-4">Submit</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            

        </Main>
    )
}

export default StudentProject
