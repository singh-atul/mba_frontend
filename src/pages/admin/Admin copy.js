import React, { useEffect, useState } from "react";
import { Modal, Button } from 'react-bootstrap'
import './Admin.css';
import {addNewTheater,getAllTheaters,updateTheaterDetails,deleteTheaterDetail,getTheaterById} from '../../api/theater'
import { cities } from "../../util/cities";
import {getAllMovies,addNewMovie,removeMovie,updateMovieDetails} from '../../api/movie'

import MaterialTable from "@material-table/core";
import Delete from '@material-ui/icons/Delete';

import Edit from '@material-ui/icons/Edit';


import { ExportCsv, ExportPdf } from '@material-table/exporters';
import { LocalConvenienceStoreOutlined } from "@material-ui/icons";


const Admin = () => {

const [addTheaterModal, showAddTheaterModal] = useState(false);
const [updateTheaterModal, showUpdateTheaterModal] = useState(false);
const [updatedTheaterDetail, setUpdatedTheaterDetail] = useState({});
const [newTheaterDetail, setNewTheaterDetail] = useState({});
const [cinemaList, setCinemaList] = useState([]);


const [addMovieModal, showAddMovieModal] = useState(false);
const [updateMovieModal, showUpdateMovieModal] = useState(false);
const [updatedMovieDetail, setUpdatedMovieDetail] = useState({});

const [ newMovieDetail ,setNewMovieDetail]  = useState({});




const [movieList, setMovieList] = useState([]);
    const init = async () => {

        const result = await getAllTheaters();
        setCinemaList(result.data);
        const movieResult = await getAllMovies();
        setMovieList(movieResult.data);

    
    }

    useEffect(() => {
        init();
        
      }, [])



// -- Functions to Update theater start---
const editTheater = async (cinema) => {
    const result = await getTheaterById(cinema._id)
    showUpdateTheaterModal(true);
    setUpdatedTheaterDetail(result.data);
}

const updateTheater = async(e) => {
    e.preventDefault()
    await updateTheaterDetails(updatedTheaterDetail)
    const result = await getAllTheaters();
    setCinemaList(result.data);
    
    clearState()

}

const editNewTheaterDetail = (e)=>{
    if(e.target.name==="name")
        updatedTheaterDetail.name = e.target.value
    else if(e.target.name==="city")
        updatedTheaterDetail.city = e.target.value
    else if(e.target.name==="description")
        updatedTheaterDetail.description = e.target.value
    else if(e.target.name==="pincode")
        updatedTheaterDetail.pinCode = e.target.value
    setNewTheaterDetail(Object.assign({}, updatedTheaterDetail) )
}

// -- Functions to Update theater end---


// -- Functions to delete theater

const deleteTheater = async(theater) =>{
    await deleteTheaterDetail(theater);
    const result = await getAllTheaters();
    setCinemaList(result.data);
    // await deleteTheater(updatedTheaterDetail)
}

// -- Functions to Add new theater start---
const addTheater = () => {
    showAddTheaterModal(true);
}

const updateNewTheaterDetail = (e)=>{
    if(e.target.name==="name")
        newTheaterDetail.name = e.target.value
    else if(e.target.name==="city")
        newTheaterDetail.city = e.target.value
    else if(e.target.name==="description")
        newTheaterDetail.description = e.target.value
    else if(e.target.name==="pincode")
        newTheaterDetail.pinCode = e.target.value
    setNewTheaterDetail(Object.assign({}, newTheaterDetail) )
}


const newTheater = async (event) => {
    event.preventDefault();
    newTheaterDetail.userId = "62a38a762f4e41d6b8b8fb48"
    const result = await addNewTheater(newTheaterDetail);
    setCinemaList(result.data)
    clearState()
   // eslint-disable-next-line react-hooks/exhaustive-deps

}

// Functions to add new movie starts ... 

const addMovie = () =>{
    showAddMovieModal(true);
}

const updateNewMovieDetail = (e)=>{
    
    console.log(e.target.name,e.target.value)
    if(e.target.name==="name")
        newMovieDetail.name = e.target.value
    else if(e.target.name==="trailerUrl")
        newMovieDetail.trailerUrl = e.target.value
    else if(e.target.name==="description")
        newMovieDetail.description = e.target.value
    else if(e.target.name==="releaseStatus")
        newMovieDetail.releaseStatus = e.target.value
    else if(e.target.name==="director")
        newMovieDetail.director = e.target.value
    else if(e.target.name==="releaseDate")
        newMovieDetail.releaseDate = e.target.value
    else if(e.target.name==="language")
        newMovieDetail.language = e.target.value
    else if(e.target.name==="posterUrl")
        newMovieDetail.posterUrl = e.target.value
    setNewMovieDetail(Object.assign({}, newMovieDetail) )
}


const newMovie = async (event) => {
    event.preventDefault();
    console.log(newMovieDetail)
    await addNewMovie(newMovieDetail);
    const movieResult = await getAllMovies();
    setMovieList(movieResult.data);
    clearState()
   // eslint-disable-next-line react-hooks/exhaustive-deps

}



// -- Functions to edit movie start---
const editMovie = async (cinema) => {
    // const result = await getTheaterById(cinema._id)
    showUpdateMovieModal(true);
    setNewMovieDetail(cinema);
}

const updateMovie = async(e) => {
    e.preventDefault()
    await updateMovieDetails(updatedTheaterDetail)
    const movieResult = await getAllMovies();
    setMovieList(movieResult.data);
    clearState()

}









// Function to delete movie

const deleteMovie = async (movie) => {
    await removeMovie(movie);
    const movieResult = await getAllMovies();
    setMovieList(movieResult.data);
}

const clearState=()=>{
    showUpdateTheaterModal(false);
    showAddTheaterModal(false);
    setUpdatedTheaterDetail({});
    setNewTheaterDetail({});
    showAddMovieModal(false);
    setNewMovieDetail({});
    showUpdateMovieModal(false);
}



return (
    <div>
        <h3>Admin Page</h3>
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
                          icon:Delete,
                          tooltip: 'Delete Theater',
                          onClick: (event, rowData) => deleteTheater(rowData)
                        },
                        {
                            icon:Edit,
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
                          backgroundColor: 'lightgreen',
                          color: '#000'
                        },
                        rowStyle: {
                          backgroundColor: '#EEE',
                        }
                    }}
                  />
        <button className="btn btn-primary" onClick={addTheater}>Add Theater</button>



        {/* {
            cinemaList.map((cinema)=>
                <div key={cinema._id} className="row">
                    <div className="col">{cinema.name}</div>
                    <div className="col">{cinema.city}</div>
                    <div className="col">{cinema.description}</div>
                    <button className="btn btn-primary col" onClick={()=>editTheater(cinema)}>Add Movie</button>
                    <button className="btn btn-primary col" onClick={()=>editTheater(cinema)}>Remove Movie</button>
                    
                    <button className="btn btn-success col" onClick={()=>editTheater(cinema)}>Edit Theater</button>
                    <button className="btn btn-danger col" onClick={()=>deleteTheater(cinema)}>Delete Theater</button>
                    
                    
                </div>
            )
        } */}
        {
            updateTheaterModal?
            (   
                <Modal
                          show={updateTheaterModal}
                          onHide={clearState}
                          backdrop="static"
                          keyboard={false}
                          centered
                      >
                          <Modal.Header closeButton>
                              <Modal.Title >EDIT THEATERS</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <form onSubmit={updateTheater}>
                        <br/>
                        Name : 
                        <input type="text" name="name" placeholder="Theater Name" value={updatedTheaterDetail.name} onChange={editNewTheaterDetail} required/>
                        <br/>
                        City:
                        <select value={updatedTheaterDetail.city} name="city" onChange={editNewTheaterDetail}>
                            {
                                cities.map((city)=>(
                                    <option key={city} value={city}>{city}</option>
                                ))
                            }
                        </select>
                        <br/>
                            Description
                            <input type="text" name="description" placeholder="Description"  value={updatedTheaterDetail.description} onChange={editNewTheaterDetail} required/>
                        <br/>
                            Pin Code
                            <input type="number" name="pincode" placeholder="PinCode"  value={updatedTheaterDetail.pinCode} onChange={editNewTheaterDetail} required/>
                        <br/>
                        Movies:
                        <div className="row">
                            {
                                movieList.map((movie) =>(
                                    updatedTheaterDetail.movies.includes(movie._id) ? 
                                    (<div className="col d-flex h-200" key={movie.name}>
                                        <div className="card " style={{height: 20 + "rem", width: 15 + "rem"}}>
                                            <img src={movie.posterUrl} className="card-img-top" alt="..."/>
                                            <div className="bg-dark text-white py-2 top">
                                            <i className="bi bi-hand-thumbs-up-fill p-2 text-success">58k </i>
                                            {movie.name}
                                            
                                            </div>
                                        </div>
                                    </div>
                                    ):
                                    (
                                        ""
                                    )
                                ))
                            }


                        </div>
                        <div className="input-group justify-content-center">
                            <div className="m-1">
                                <Button variant="secondary" onClick={() => showUpdateTheaterModal(false)}>Cancel</Button>
                            </div>
                            <div className="m-1">
                                <Button type="submit" variant="primary" >Update Theater</Button>
                            </div>
                        </div>                        
                    </form>
                              
                          </Modal.Body>
                      </Modal>


                
            ):
            ( ""
            )
        }
       
        {   
            addTheaterModal? 
            (
                <div>
                    <form onSubmit={newTheater}>
                        <input type="text" name="name" placeholder="Theater Name" onChange={updateNewTheaterDetail} required/>
                        <select name="city" onChange={updateNewTheaterDetail} required>
                            {
                                cities.map((city)=>(
                                    <option key={city} value={city}>{city}</option>
                                ))
                            }
                        </select>
                        
                        <input type="text" name="description" placeholder="Description" onChange={updateNewTheaterDetail} required/>
                        <input type="text" name="pincode" placeholder="PinCode" onChange={updateNewTheaterDetail} required/>
                        <div className="input-group justify-content-center">
                            <div className="m-1">
                                <Button variant="secondary" onClick={() => showAddTheaterModal(false)}>Cancel</Button>
                            </div>
                            <div className="m-1">
                                <Button type="submit" variant="primary" >Add Theater</Button>
                            </div>
                        </div>
                        
                        
                       
                        
                    </form>
                </div>
            ):(
                ""
            )
        }

        <h4>Movies</h4>
        <button className="btn btn-primary" onClick={addMovie}>Add Movie</button>
        {
            movieList.map((movie)=>
                <div key={movie._id} className="row">
                    <div className="col">{movie.name}</div>
                    <div className="col">{movie.description}</div>
                    <button className="btn btn-success col" onClick={()=>editMovie(movie)}>Edit Movie Details</button>
                    <button className="btn btn-danger col" onClick={()=>deleteMovie(movie)}>Delete Movie</button>
                </div>
            )
        }

        {
            addMovieModal? (
                <div>
                    <form onSubmit={newMovie}>
                        <input type="text" name="name" placeholder="Movie Name" onChange={updateNewMovieDetail} required/>
                        <input type="text" name="description" placeholder="Description" onChange={updateNewMovieDetail} required/>
                        <br/>
                        <input type="text" name="director" placeholder="director" onChange={updateNewMovieDetail} required/>
                        <input type="text" name="trailerUrl" placeholder="trailerUrl" onChange={updateNewMovieDetail} required/>
                        <br/>
                        <select  name="releaseStatus" onChange={updateNewMovieDetail} required>
                            <option value="RELEASED" selected>RELEASED </option>
                            <option value="UNRELEASED">UNRELEASED</option>
                            <option value="BLOCKED">BLOCKED</option>
                        </select>
                         | 
                        
                        <input type="text" name="language" placeholder="language" onChange={updateNewMovieDetail} required/>
                        <br/>
                        <input type="text" name="posterUrl" placeholder="posterUrl" onChange={updateNewMovieDetail} required/>
                        <input type="date" name="releaseDate" placeholder="releaseDate" onChange={updateNewMovieDetail} required/>
                        <br/>
                        <div className="input-group justify-content-center">
                            <div className="m-1">
                                <Button variant="secondary" onClick={clearState}>Cancel</Button>
                            </div>
                            <div className="m-1">
                                <Button type="submit" variant="primary" >Add Movie</Button>
                            </div>
                        </div>


                    </form>
            
                </div>
            ):("")
        }

        {
            updateMovieModal? (
                <div>
                    <form onSubmit={updateMovie}>
                        <input type="text" name="name" value = {newMovieDetail.name} placeholder="Movie Name" onChange={updateNewMovieDetail} required/>
                        <input type="text" name="description" value = {newMovieDetail.description} placeholder="Description" onChange={updateNewMovieDetail} required/>
                        <br/>
                        <input type="text" name="director" value = {newMovieDetail.director} placeholder="director" onChange={updateNewMovieDetail} required/>
                        <input type="text" name="trailerUrl" value = {newMovieDetail.trailerUrl} placeholder="trailerUrl" onChange={updateNewMovieDetail} required/>
                        <br/>
                        <select  name="releaseStatus" value = {newMovieDetail.releaseStatus}  onChange={updateNewMovieDetail} required>
                            <option value="RELEASED" selected>RELEASED </option>
                            <option value="UNRELEASED">UNRELEASED</option>
                            <option value="BLOCKED">BLOCKED</option>
                        </select>
                         | 
                        
                        <input type="text" name="language" value = {newMovieDetail.language} placeholder="language" onChange={updateNewMovieDetail} required/>
                        <br/>
                        <input type="text" name="posterUrl" value = {newMovieDetail.posterUrl} placeholder="posterUrl" onChange={updateNewMovieDetail} required/>
                        <input type="date" name="releaseDate" value = {newMovieDetail.releaseDate} placeholder="releaseDate" onChange={updateNewMovieDetail} required/>
                        <br/>
                        <div className="input-group justify-content-center">
                            <div className="m-1">
                                <Button variant="secondary" onClick={clearState}>Cancel</Button>
                            </div>
                            <div className="m-1">
                                <Button type="submit" variant="primary" >Update Movie</Button>
                            </div>
                        </div>


                    </form>
            
                </div>
            ):("")
        }

        
    </div>
    




)
}




export default Admin