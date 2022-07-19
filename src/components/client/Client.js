import React, { useEffect, useState } from "react";
import { Modal, Button } from 'react-bootstrap'
import './client.css';
import {addNewTheater,getAllTheaters,updateTheaterDetails,getTheaterById, updateTheaterMovie} from '../../api/theater'
import { cities } from "../../util/Cities";
import {getAllMovies} from '../../api/movie'
import Navbar from "../../components/navbar/Navbar";
import MaterialTable from "@material-table/core";
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import Add from '@material-ui/icons/Add';

import { ExportCsv, ExportPdf } from '@material-table/exporters';


const Client = () => {

const [addTheaterModal, showAddTheaterModal] = useState(false);
const [updateTheaterModal, showUpdateTheaterModal] = useState(false);
const [tempTheaterDetail, setTempTheaterDetail] = useState({});
const [cinemaList, setCinemaList] = useState([]);
const [movieList, setMovieList] = useState([]);
const counterInfo = useState({});

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
    




    useEffect(() => {
        refreshTheaters()
        refreshMovies()
        // eslint-disable-next-line 
      }, [])




    const editTheater = async (cinema) => {
        const result = await getTheaterById(cinema._id)
        showUpdateTheaterModal(true);
        setTempTheaterDetail(result.data)
    }

    
    const newTheater = async (event) => {
        event.preventDefault();
        tempTheaterDetail.userId = "62a38a762f4e41d6b8b8fb48"
        await addNewTheater(tempTheaterDetail);
        refreshTheaters()
        clearState()
       // eslint-disable-next-line react-hooks/exhaustive-deps
    
    }
    const updateTheater = async(e) => {
        e.preventDefault()
        await updateTheaterDetails(tempTheaterDetail)
        refreshTheaters()
        clearState()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }
    


    const updateMovieInTheater = async(movie,insert=false)   => {
        const data = {movieIds:[movie._id],insert:insert }
        await updateTheaterMovie(data,tempTheaterDetail);        
        const result = await getTheaterById(tempTheaterDetail._id)
        setTempTheaterDetail(result.data)
    }




    const updateTempTheaterDetail = (e) =>{
        if(e.target.name==="name")
            tempTheaterDetail.name = e.target.value
        else if(e.target.name==="city")
            tempTheaterDetail.city = e.target.value
        else if(e.target.name==="description")
            tempTheaterDetail.description = e.target.value
        else if(e.target.name==="pinCode")
            tempTheaterDetail.pinCode = e.target.value
        setTempTheaterDetail(Object.assign({}, tempTheaterDetail) )
    }









const clearState=()=>{
    showUpdateTheaterModal(false);
    showAddTheaterModal(false);
    setTempTheaterDetail({});
}



return (
    <>
     <Navbar/>
    <div className="container bg-light my-2">
       
        <h3 className="text-center">Welcome, {localStorage.getItem('name')}!</h3>
            <p className="text-center text-secondary">Take a quick look at your stats below</p>
           <div className="my-2">
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
                          backgroundColor: '#202429',
                          color: '#fff'
                        },
                        rowStyle: {
                          backgroundColor: '#EEE',
                        }
                    }}
                  />
           </div>
       
       
        {   

                <Modal
                    show={addTheaterModal || updateTheaterModal}
                    onHide={clearState}
                    backdrop="static"
                    keyboard={false}
                    centered
                      >
                    <Modal.Header closeButton>
                        <Modal.Title >{updateTheaterModal ? "EDIT THEATERS" : "ADD THEATER" }</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={updateTheaterModal ? updateTheater : newTheater}>
                        <div className="input-group mb-3">
                                <span className="input-group-text"><i className="b bi-pencil"></i></span>
                                <input type="text" name="name" value={tempTheaterDetail.name} placeholder="Theater Name" onChange={updateTempTheaterDetail} required className="form-control"/>
                            </div>
                           
                            <select name="city" value={tempTheaterDetail.city} onChange={updateTempTheaterDetail} required className="form-select form-select-sm">
                                {
                                    cities.map((city)=>(
                                        <option key={city} value={city}>{city}</option>
                                    ))
                                }
                            </select>

                            <div className="input-group my-2">
                            <span className="input-group-text"><i className="bi bi-pencil"></i></span>
                            <textarea type="text" name="description" value={tempTheaterDetail.description} placeholder="Description" onChange={updateTempTheaterDetail} required className="form-control"/>
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
                                    <Button type="submit" variant="dark" >{updateTheaterModal ? "EDIT THEATERS" : "ADD THEATER" }</Button>
                                </div>
                            </div>
                            
                        {
                            updateTheaterModal?(
                                
                               
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
                                            return {
                                                icon:tempTheaterDetail.movies.includes(rowData._id)?Delete:Add,
                                                tooltip: tempTheaterDetail.movies.includes(rowData._id)?"Remove Movie from Theater":"Add movie to theater",
                                                onClick: (event, rowData) => updateMovieInTheater(rowData,!tempTheaterDetail.movies.includes(rowData._id))
                                              
                                          }
                                        }
                                  ]}
                                 
                                  options={{
                                    actionsColumnIndex: -1,
                                    sorting: true,
                                    
                                    headerStyle: {
                                      backgroundColor: '#202429',
                                      color: '#fff'
                                    },
                                    rowStyle: {
                                      backgroundColor: '#EEE',
                                    }
                                }}
                              />

                             
                                // </div>
                            ):("")
                        }
                            
                        </form>
                    </Modal.Body>
                      </Modal>

        }



 {/* -----------  Movies   ------- */}

 <MaterialTable
                        title="MOVIES "
                      data={movieList}
                      columns={[
                        { title: '', field: 'img', render: item => <img src={item.posterUrl} alt="" border="3" height="100" width="100" />},

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
                      
                     
                     
                      options={{
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
                          color: '#fff'
                        },
                        rowStyle: {
                          backgroundColor: 'white',
                        }
                    }}
                  />
    </div>
    </>
    
)
}

export default Client