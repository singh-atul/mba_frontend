import React, { useEffect, useState,useSetState } from "react";
import { Modal, Button } from 'react-bootstrap'
import './admin.css';
import { addNewTheater, getAllTheaters, updateTheaterDetails, deleteTheaterDetail, getTheaterById, updateTheaterMovie } from '../../api/theater'
import { cities } from "../../util/cities";
import { getAllMovies, addNewMovie, removeMovie, updateMovieDetails } from '../../api/movie'
import { getBooking } from "../../api/booking/booking";
import { getAllUsers, updateUserInfo } from "../../api/user";
import MaterialTable from "@material-table/core";
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import Add from '@material-ui/icons/Add';
import { CWidgetStatsC } from '@coreui/react';
import { CIcon } from '@coreui/icons-react';
import { cilChartPie } from '@coreui/icons';
import Navbar from "../../components/navbar/navbar";
import { ExportCsv, ExportPdf } from '@material-table/exporters';


const Admin = () => {

    const [showUserTable,setShowUserTable] = useState(false)
    const [showBookingTable,setShowBookingTable] = useState(false)
    const [showTheaterTable,setShowTheaterTable] = useState(false)
    const [showMovieTable,setShowMovieTable] = useState(true)

    const [addTheaterModal, showAddTheaterModal] = useState(false);
    const [updateTheaterModal, showUpdateTheaterModal] = useState(false);
    const [tempTheaterDetail, setTempTheaterDetail] = useState({});
    const [bookingDetail,setBookingDetails] = useState({});

    const [cinemaList, setCinemaList] = useState([]);

    const [addMovieModal, showAddMovieModal] = useState(false);
    const [updateMovieModal, showUpdateMovieModal] = useState(false);
    const [tempMovieDetail, setTempMovieDetail] = useState({});
    const [movieList, setMovieList] = useState([]);

    const [userList, setUserList] = useState([]);
    const [userModal, setUserModal] = useState(false);
    const [userDetail, setUserDetails] = useState({});

    const [counterInfo, setCounterInfo] = useState({});

    const [errorMessage,setErrorMessage] = useState("");
    const [pageLoaded,setPageLoaded] = useState(false); 
    const refreshTheaters = async () => {
        const result = await getAllTheaters();
        setCinemaList(result.data);
        counterInfo.theater = result.data.length
    }

    const refreshMovies = async () => {
        const movieResult = await getAllMovies();
        setMovieList(movieResult.data);
        counterInfo.movies = movieResult.data.length
    }

    const refreshBookings = async () => {
        const bookingResponse = await getBooking();
        setBookingDetails(bookingResponse.data)
        counterInfo.booking = bookingResponse.data.length
    }
    

    const refreshUsers = async () => {
        const userResult = await getAllUsers();
        console.log(userResult)
        setUserList(userResult.data.filter(user => user.userId != localStorage.getItem('userId')))
        counterInfo.userResult = userResult.data.length
    }




    useEffect(() => {
        refreshTheaters()
        refreshMovies()
        refreshUsers()
        refreshBookings()
        setPageLoaded(true)
    }, [])



    const editUser = (user) => {
        setUserModal(true)
        setUserDetails(Object.assign({}, user))

    }

    const changeUserDetail = (e) => {
        if (e.target.name === "name")
            userDetail.name = e.target.value
        else if (e.target.name === "userStatus")
            userDetail.userStatus = e.target.value
        else if (e.target.name === "userType")
            userDetail.userType = e.target.value
        setUserDetails(Object.assign({}, userDetail))

    }



    const updateUserDetail = async (event) => {
        event.preventDefault();
        console.log(userDetail)
        await updateUserInfo(userDetail)
        refreshUsers();
        clearState();
    }

    const editTheater = async (cinema) => {
        const result = await getTheaterById(cinema._id)
        showUpdateTheaterModal(true);
        setTempTheaterDetail(result.data)
        
        refreshMovies()
    }


    const newTheater = async (event) => {
        event.preventDefault();
        tempTheaterDetail.userId = "62a38a762f4e41d6b8b8fb48"
        const response = await addNewTheater(tempTheaterDetail);
        if(response.status==201)
        {
            refreshTheaters()
            clearState()
        }
        else{
            setErrorMessage(response.data.message)
        }
        
        // eslint-disable-next-line react-hooks/exhaustive-deps

    }
    const updateTheater = async (e) => {
        e.preventDefault()
        console.log(tempTheaterDetail)
        await updateTheaterDetails(tempTheaterDetail)
        refreshTheaters()
        clearState()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }

    const deleteTheater = async (theater) => {
        await deleteTheaterDetail(theater);
        refreshTheaters()
        // await deleteTheater(updatedTheaterDetail)
    }

    const updateMovieInTheater = async (movie, insert = false) => {
        const data = { movieIds: [movie._id], insert: insert }
        await updateTheaterMovie(data, tempTheaterDetail);
        const result = await getTheaterById(tempTheaterDetail._id)
        
        setTempTheaterDetail(result.data);
        
    }




    const addTheater = () => {
        showAddTheaterModal(true);
    }

    const updateTempTheaterDetail = (e) => {
        if (e.target.name === "name")
            tempTheaterDetail.name = e.target.value
        else if (e.target.name === "city")
            tempTheaterDetail.city = e.target.value
        else if (e.target.name === "description")
            tempTheaterDetail.description = e.target.value
        else if (e.target.name === "pinCode")
            tempTheaterDetail.pinCode = e.target.value
        setTempTheaterDetail(Object.assign({}, tempTheaterDetail))
        setErrorMessage("")
    }




    // Functions to add new movie starts ... 

    const addMovie = () => {
        showAddMovieModal(true);

    }
    const updateTempMovieDetail = (e) => {
        if (e.target.name === "name")
            tempMovieDetail.name = e.target.value
        else if (e.target.name === "trailerUrl")
            tempMovieDetail.trailerUrl = e.target.value
        else if (e.target.name === "description")
            tempMovieDetail.description = e.target.value
        else if (e.target.name === "releaseStatus")
            tempMovieDetail.releaseStatus = e.target.value
        else if (e.target.name === "director")
            tempMovieDetail.director = e.target.value
        else if (e.target.name === "releaseDate")
            tempMovieDetail.releaseDate = e.target.value
        else if (e.target.name === "language")
            tempMovieDetail.language = e.target.value
        else if (e.target.name === "posterUrl")
            tempMovieDetail.posterUrl = e.target.value
        setTempMovieDetail(Object.assign({}, tempMovieDetail))
    }


    const newMovie = async (event) => {
        event.preventDefault();
        if(tempMovieDetail.releaseStatus===undefined)
            tempMovieDetail.releaseStatus="RELEASED"
        await addNewMovie(tempMovieDetail);
        refreshMovies()
        clearState()
        // eslint-disable-next-line react-hooks/exhaustive-deps

    }

    // -- Functions to edit movie start---
    const editMovie = (movie) => {
        showUpdateMovieModal(true);
        setTempMovieDetail(Object.assign({}, movie))

    }


    const updateMovie = async (e) => {
        e.preventDefault()
        await updateMovieDetails(tempMovieDetail)
        refreshMovies()
        clearState()

    }

    // Function to delete movie

    const deleteMovie = async (movie) => {
        await removeMovie(movie);
        refreshMovies();
    }

    const clearState = () => {
        showUpdateTheaterModal(false);
        showAddTheaterModal(false);
        showAddMovieModal(false);
        showUpdateMovieModal(false);
        setUserModal(false);
        setTempTheaterDetail({});
        setTempMovieDetail({});
        
    }


    const Cards = () =>{
        return (
        <>
        <p className="text-center text-secondary">Take a quick look at your stats below</p>
                <div className="row">
                    <div className="col">
                        <CWidgetStatsC
                            className="mb-3"
                            icon={<i className="bi bi-people text-danger" />}
                            color={showUserTable? "success":"dark"}
                            inverse
                            progress={{ value: counterInfo.userResult }}
                            text="Number of Users"
                            title="Users"
                            value={counterInfo.userResult ? counterInfo.userResult : "Add Users"}
                            onClick={()=>setShowUserTable(!showUserTable)}
                        />


                    </div>
                    <div className="col">
                        <CWidgetStatsC
                            className="mb-3"
                            icon={<i className="bi bi-building text-danger" />}
                            color={showTheaterTable? "success":"dark"}
                            inverse
                            progress={{ value: counterInfo.theater }}
                            text="Number of Theaters"
                            title="Theaters"
                            value={counterInfo.theater ? counterInfo.theater : "Add theaters"}
                            onClick={()=>setShowTheaterTable(!showTheaterTable)}

                        />
                    </div>
                    <div className="col">
                        <CWidgetStatsC
                            className="mb-3"
                            icon={<i className="bi bi-film text-danger" />}
                            color={showMovieTable? "success":"dark"}
                            inverse
                            progress={{ value: counterInfo.movies }}
                            text="Number of movies"
                            title="Movies"
                            value={counterInfo.movies}
                            onClick={()=>setShowMovieTable(!showMovieTable)}

                        />
                    </div>
                    <div className="col">
                        <CWidgetStatsC
                            className="mb-3"
                            icon={<i className="bi bi-card-list text-danger" />}
                            color={showBookingTable? "success":"dark"}
                            inverse
                            progress={{ value: counterInfo.booking }}
                            text="Number of Booking"
                            title="Bookings"
                            value={counterInfo.booking}
                            onClick={()=>setShowBookingTable(!showBookingTable)}

                        />
                    </div>


                

                </div>
                </>

        )
    }
    return (

        <div className="container bg-light mt-2">
            
            <Navbar/>
            <Cards/>

            <h3 className="text-center">Welcome, Admin!</h3>
            
                
    
            {
                showTheaterTable ? (
                    <>
                    <MaterialTable
                        title="THEATERS "
                        data={cinemaList}
                        columns={[
                            {
                                title: "Theater Name",
                                field: "name",
                            },
                            {
                                title: "City",
                                field: "city",

                            },
                            {
                                title: "DESCRIPTIONS",
                                field: "description",
                                filtering: false
                            },
                            {
                                title: "Pin Code",
                                field: "pinCode",
                            }
                        ]}

                        actions={[
                            {
                                icon: Delete,
                                tooltip: 'Delete Theater',
                                onClick: (event, rowData) => deleteTheater(rowData)
                            },
                            {
                                icon: Edit,
                                tooltip: 'Edit Theater',
                                onClick: (event, rowData) => editTheater(rowData)
                            },


                        ]}

                        options={{
                            actionsColumnIndex: -1,
                            sorting: true,
                            exportMenu: [{
                                label: 'Export PDF',
                                exportFunc: (cols, datas) => ExportPdf(cols, datas, 'TheaterRecords')
                            }, {
                                label: 'Export CSV',
                                exportFunc: (cols, datas) => ExportCsv(cols, datas, 'TheaterRecords')
                            }],

                            headerStyle: {
                                backgroundColor: '#202429',
                                color: 'white'
                            },
                            rowStyle: {
                                backgroundColor: '#d3d3d3',
                            }
                        }}
                    />
                    <div className="text-center">
                        <button className="btn btn-danger m-2" onClick={addTheater}>Add Theater</button>
                    </div>
                    </>
                ):<></>

            }
            
                <Modal
    
                    show={addTheaterModal || updateTheaterModal}
                    onHide={clearState}
                    backdrop="static"
                    keyboard={false}
                    centered
                    size="lg md"

                >
                    <Modal.Header closeButton >
                        <Modal.Title >{updateTheaterModal ? "EDIT THEATERS" : "ADD THEATER"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        
                        <form onSubmit={updateTheaterModal ? updateTheater : newTheater}>

                                    <div className="input-group mb-3">
                                        <span className="input-group-text"><i className="b bi-pencil"></i></span>
                                        <input type="text" name="name" value={tempTheaterDetail.name} placeholder="Theater Name" onChange={updateTempTheaterDetail} required className="form-control" />
                                    </div>
                                    
                                    <select name="city" className="form-select form-select-sm" value={tempTheaterDetail.city}  onChange={updateTempTheaterDetail} required>
                                        <option>Select City</option>
                                        {
                                            cities.map((city) => (
                                                <option key={city} value={city}>{city}</option>
                                            ))
                                        }
                                    </select>
                                    <div className="input-group my-2">
                                    <span className="input-group-text"><i className="bi bi-pencil"></i></span>
                                    <textarea type="text" name="description" value={tempTheaterDetail.description} placeholder="Description" onChange={updateTempTheaterDetail} required className="form-control" />
                                    </div>
                                    <div className="input-group mb-3">
                                    <span className="input-group-text"><i className="bi bi-pencil"></i></span>
                                    <input type="text" name="pinCode" placeholder="PinCode" value={tempTheaterDetail.pinCode} onChange={updateTempTheaterDetail} required className="form-control" />
                                    </div>
                                
                                    <div className="input-group justify-content-center">
                                        <div className="m-1">
                                            <Button variant="danger" onClick={clearState}>Cancel</Button>
                                        </div>
                                        <div className="m-1">
                                            <Button type="submit" variant="dark" >{updateTheaterModal ? "EDIT THEATERS" : "ADD THEATER"}</Button>
                                        </div>
                                    </div>


                                    {
                                        updateTheaterModal ? (


                                            <MaterialTable
                                                title="Movie in Theater "
                                                data={movieList}
                                                columns={[
                                                    {
                                                        title: "Movie Name",
                                                        field: "name",
                                                    },
                                                    {
                                                        title: "Director",
                                                        field: "director",
                                                    },
                                                    {
                                                        title: "Release Date",
                                                        field: "releaseDate",

                                                    },
                                                    {
                                                        title: "Release Status",
                                                        field: "releaseStatus"
                                                    },
                                                ]}

                                                actions={[
                                                    (rowData) => {
                                                        console.log(rowData.name,tempTheaterDetail.movies)

                                                        return {
                                                            icon: tempTheaterDetail.movies.includes(rowData._id) ? Delete : Add,
                                                            tooltip: tempTheaterDetail.movies.includes(rowData._id) ? "Remove Movie from Theater" : "Add movie to theater",
                                                            onClick: (event, rowData) => updateMovieInTheater(rowData, !tempTheaterDetail.movies.includes(rowData._id))

                                                        }
                                                    }
                                                ]}

                                                options={{
                                                    actionsColumnIndex: -1,
                                                    sorting: true,

                                                    headerStyle: {
                                                        backgroundColor: '#202429',
                                                        color: 'white'
                                                    },
                                                    rowStyle: {
                                                        backgroundColor: '#EEE',
                                                    }
                                                }}
                                            />


                                            // </div>
                                        ) : ("")
                                    }
    
                        </form>
                        <div className="auth-error-msg text-danger text-center">{errorMessage}</div>
                    </Modal.Body>
                </Modal>
            



            {/* -----------  Movies   ------- */}
            {
                showMovieTable ? (
                    <>
                    

                    <MaterialTable
                        title="MOVIES "
                        data={movieList}
                        columns={[
                            { title: '', field: 'img', render: item => <img src={item.posterUrl} alt="" border="3" height="100" width="100" /> },

                            {
                                title: "Movie Name",
                                field: "name",
                            },

                            {
                                title: "Director",
                                field: "director",
                            },
                            {
                                title: "Release Date",
                                field: "releaseDate",

                            },
                            {
                                title: "Release Status",
                                field: "releaseStatus"
                            },
                        ]}

                        actions={[
                            {
                                icon: Delete,
                                tooltip: 'Delete Movie',
                                onClick: (event, rowData) => deleteMovie(rowData)
                            },
                            {
                                icon: Edit,
                                tooltip: 'Edit Movie',
                                onClick: (event, rowData) => editMovie(rowData)
                            },


                        ]}

                        options={{
                            actionsColumnIndex: -1,
                            sorting: true,
                            exportMenu: [{
                                label: 'Export PDF',
                                exportFunc: (cols, datas) => ExportPdf(cols, datas, 'MovieRecords')
                            }, {
                                label: 'Export CSV',
                                exportFunc: (cols, datas) => ExportCsv(cols, datas, 'MovieRecords')
                            }],

                            headerStyle: {
                                backgroundColor: '#202429',
                                color: 'white'
                            },
                            rowStyle: {
                                backgroundColor: '#white',
                            }
                        }}
                    />
                    <div className="text-center">
                        <button className="btn btn-danger m-2" onClick={addMovie}>Add Movie</button>
                    </div>
                    </>
                ):<></>

            }        
                <Modal
                    show={addMovieModal || updateMovieModal}
                    onHide={clearState}
                    backdrop="static"
                    keyboard={false}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title >{updateMovieModal ? "EDIT Movie" : "ADD Movie"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={updateMovieModal ? updateMovie : newMovie}>
                        <div className="input-group my-2">
                            <span className="input-group-text"><i className="bi bi-pencil"></i></span>
                            <input type="text" name="name" className="form-control" value={tempMovieDetail.name} placeholder="Movie Name" onChange={updateTempMovieDetail} required />
                             </div>
                             <div className="input-group my-2">
                            <span className="input-group-text"><i className="bi bi-pencil"></i></span> 
                            <textarea type="text" name="description" className="form-control" value={tempMovieDetail.description} placeholder="Description" onChange={updateTempMovieDetail} required />
                            </div>

                            <div className="d-flex ">
                            <div className="input-group me-1">
                            <span className="input-group-text"><i className="b bi-pencil"></i></span>
                            <input type="text" name="director" value={tempMovieDetail.director} placeholder="director" onChange={updateTempMovieDetail} required className="form-control" />
                             </div>

                             <div className="input-group ms-1">
                            <span className="input-group-text"><i className="b bi-pencil"></i></span> 
                            <input type="text" name="language" value={tempMovieDetail.language} placeholder="language" onChange={updateTempMovieDetail} required className="form-control" />
                            </div>
                           

                            </div>

                            <div className="d-flex my-2">
                            <div className="input-group me-1 ">
                            <span className="input-group-text"><i className="b bi-link-45deg"></i></span> 
                            <input type="text" name="posterUrl" value={tempMovieDetail.posterUrl} placeholder="posterUrl" onChange={updateTempMovieDetail} required className="form-control" />
                            </div>

                            <div className="input-group ms-1 ">
                            <span className="input-group-text"><i className="b bi-link-45deg"></i></span> 
                            <input type="text" name="trailerUrl" value={tempMovieDetail.trailerUrl} placeholder="trailerUrl" onChange={updateTempMovieDetail} required className="form-control" /></div>
                           

                            </div>

                           

                           

                            <div className="input-group my-2">
                            <span className="input-group-text"><i className="b bi-pencil"></i></span> 
                            <select name="releaseStatus" value={tempMovieDetail.releaseStatus} onChange={updateTempMovieDetail} defaultValue="RELEASED" required className="form-select form-select-sm">
                                <option value="RELEASED">RELEASED </option>
                                <option value="UNRELEASED">UNRELEASED</option>
                                <option value="BLOCKED">BLOCKED</option>
                            </select>
                            </div>

                            <div className="input-group my-2">
                            <span className="input-group-text"><i className="bi bi-pencil"></i></span> 
                            <input type="text" name="releaseDate" value={tempMovieDetail.releaseDate} placeholder="releaseDate" onChange={updateTempMovieDetail} required className="form-control" />
                            </div>

                            
                           

                           

                           
                          
                           
                            
                            <br />
                            <div className="input-group justify-content-center">
                                <div className="m-1">
                                    <Button variant="danger" onClick={clearState}>Cancel</Button>
                                </div>
                                <div className="m-1">
                                    <Button type="submit" variant="dark" >{updateMovieModal ? "EDIT Movie" : "Add Movie"}</Button>
                                </div>
                            </div>
                        </form>
                        <div className="auth-error-msg text-danger text-center">{errorMessage}</div>
                    </Modal.Body>
                </Modal>
            

                {
                showUserTable ? (
                    <>
    

            <MaterialTable
                onRowClick={(event, rowData) => editUser(rowData)}

                data={userList}
                columns={[
                    {
                        title: "USER ID",
                        field: "userId",
                    },
                    {
                        title: "Name",
                        field: "name",

                    },
                    {
                        title: "EMAIL",
                        field: "email",
                        filtering: false
                    },
                    {
                        title: "ROLE",
                        field: "userType",
                        lookup: {
                            "ADMIN": "ADMIN",
                            "CUSTOMER": "CUSTOMER",
                            "CLIENT": "CLIENT",

                        },
                    },
                    {
                        title: "Status",
                        field: "userStatus",
                        lookup: {
                            "APPROVED": "APPROVED",
                            "PENDING": "PENDING",
                            "REJECTED": "REJECTED",

                        },
                    },
                ]}
                options={{
                    filtering: true,
                    sorting: true,
                    exportMenu: [{
                        label: 'Export PDF',
                        exportFunc: (cols, datas) => ExportPdf(cols, datas, 'UserRecords')
                    }, {
                        label: 'Export CSV',
                        exportFunc: (cols, datas) => ExportCsv(cols, datas, 'userRecords')
                    }],
                    headerStyle: {
                        backgroundColor: '#202429',
                        color: '#FFF'
                    },
                    rowStyle: {
                        backgroundColor: '#EEE',
                    }
                }}
                title="USER RECORDS"
            />
            </>
                ):<></>

            }
            
                <Modal
                    show={userModal}
                    onHide={clearState}
                    backdrop="static"
                    keyboard={false}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title >Edit Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={updateUserDetail} >

                            <div className="p-1">
                                <h5 className="card-subtitle mb-2 text-primary lead">User ID: {userDetail.userId}</h5>
                                <hr />
                                <div className="input-group mb-3">
                                    <label className="label input-group-text label-md ">Name</label>
                                    <input type="text" className="form-control" name="name" value={userDetail.name} onChange={changeUserDetail} />

                                </div>
                                <div className="input-group mb-3">
                                    <label className="label input-group-text label-md ">Email</label>
                                    <input type="text" className="form-control" name="name" value={userDetail.email} onChange={changeUserDetail} disabled />

                                </div>

                                <div className="input-group mb-3">
                                    <label className="label input-group-text label-md ">Type</label>
                                    <select className="form-select" name="userType" value={userDetail.userType} onChange={changeUserDetail}>
                                        <option value="ADMIN">ADMIN</option>
                                        <option value="CUSTOMER">CUSTOMER</option>
                                        <option value="CLIENT">CLIENT</option>
                                    </select>

                                </div>

                                <div className="input-group mb-3">
                                    <label className="label input-group-text label-md ">Status</label>
                                    <select name="userStatus" className="form-select"
                                        value={userDetail.userStatus} onChange={changeUserDetail}>
                                        <option value="APPROVED">APPROVED</option>
                                        <option value="REJECTED">REJECTED</option>
                                        <option value="PENDING">PENDING</option>
                                    </select>

                                </div>

                            </div>
                            <div className="input-group justify-content-center">
                                <div className="m-1">
                                    <Button variant="secondary" onClick={clearState}>
                                        Close
                                    </Button>
                                </div>
                                <div className="m-1">
                                    <Button type="submit" variant="primary" >Update</Button>
                                </div>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>

                <br></br>
            
            
                

            {
                showBookingTable? (

                    <MaterialTable
                    onRowClick={(event, rowData) => editUser(rowData)}

                    data={bookingDetail}
                    columns={[
                        {
                            title: "Booking ID",
                            field: "_id",
                        },
                        {
                            title: "Movie ID",
                            field: "movieId",

                        },
                        {
                            title: "Theater ID",
                            field: "theatreId",
                        },
                        {
                            title: "Number Of Seats",
                            field: "noOfSeats",
                        },
                        {
                            title: "Booking Status",
                            field: "status",
                            
                        },
                    ]}
                    options={{
                        filtering: true,
                        sorting: true,
                        exportMenu: [{
                            label: 'Export PDF',
                            exportFunc: (cols, datas) => ExportPdf(cols, datas, 'UserRecords')
                        }, {
                            label: 'Export CSV',
                            exportFunc: (cols, datas) => ExportCsv(cols, datas, 'userRecords')
                        }],
                        headerStyle: {
                            backgroundColor: '#202429',
                            color: '#FFF'
                        },
                        rowStyle: {
                            backgroundColor: '#EEE',
                        }
                    }}
                    title="BOOKING RECORDS"
                />

                ):<></>
            }

            


        </div>
        
    


    )
}

export default Admin