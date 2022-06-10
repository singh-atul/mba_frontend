import React, { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import './MovieDetail.css';
import { getMovie } from '../../api/movie'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import './MovieDetail.css'

const MovieDetail = () => {
    const { movieid: id } = useParams();
    const [selectedMovie, setSelectedMovie] = useState(id);
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [MovieDetails, setMovieDetails] = useState({});
    const [releaseStatus, setMovieReleaseStatus] = useState(false);
    const [movieCast, setMovieCast] = useState([]);


    const init = async () => {

        const user = localStorage.getItem('userId');
        if (user) setIsLoggedin(true);
        console.log(id)
        const response = await getMovie(selectedMovie);
        console.log(response.data)
        setMovieDetails(response.data);
        setMovieReleaseStatus(response.data.releaseStatus === "RELEASED")
        setMovieCast(response.data.casts)

    }


    useEffect(() => {
        init();
    },
        //eslint-disable-next-line
        []);


    return (
        <>
            <Navbar />
            <div className="bg-light">

                <div className="box bg-black">
                    <ReactPlayer url={MovieDetails.trailerUrl} controls={true} className="video" width="67%"
                        height="99%" />
                </div>

                <div className="container my-4">
                    <div className="row">
                        <div className="col">
                            <img src={MovieDetails.posterUrl} className="card" width={300} height={450} alt="..." />
                        </div>
                        <div className="col ">
                            <h2 className="fw-bolder">About The Movie</h2>

                            <div className="d-flex">
                            <span class="badge rounded-pill text-bg-danger m-1"> {MovieDetails.description}</span>
                            <span class="dot my-auto"></span>
                                <span class="badge rounded-pill text-bg-secondary m-1">{MovieDetails.language}</span>
                                <span class="dot my-auto"></span>
                                <span class="badge rounded-pill text-bg-secondary m-1">{MovieDetails.releaseStatus}</span>
                              
                              
                                
                            </div>

                            <hr />
                            <h3>{MovieDetails.name}</h3>
                            <h6>{MovieDetails.director}</h6>
                            <h6>{MovieDetails.releaseDate}</h6>

                            <hr />
                            <h5>Cast</h5>
                            {movieCast.map(name => <li className="list-group-item">{name}</li>)}

                            <div className="text-center my-3"><Link key={selectedMovie} className="text-decoration-none btn btn-lg btn-danger text-center" to={releaseStatus ? `/buytickets/${MovieDetails.name}/${selectedMovie}` : `#`}>{releaseStatus ? "BOOK TICKET" : "COMMING SOON"}</Link></div>



                            <br />







                        </div>
                    </div>
                </div>




            </div>
        </>
    )
}



export default MovieDetail;