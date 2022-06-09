import React, { useEffect, useState } from "react";
import { useParams,Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import './MovieDetail.css';
import {getMovie} from '../../api/movie'
import Footer from '../Footer/Footer'

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
    <div >
        <h3>{MovieDetails.name}</h3>
        <div className="row">
            <div className="col">
                <img src={MovieDetails.posterUrl} className="card" width={250} height={350}  alt="..."/>
            </div>
            <div className="col">
                <div  className="card" >
                    <ReactPlayer url={MovieDetails.trailerUrl} controls={true}/>
                </div>
            </div>
        </div>
        <div>
            
            CAST: {movieCast.map(name => <li>{name}</li>)}
            DESCRIPTION: <li>{MovieDetails.description}</li>
            <li>{MovieDetails.director}</li>
            <li>{MovieDetails.language}</li>
            <li>{MovieDetails.releaseDate}</li>
            <li>{MovieDetails.releaseStatus}</li>
        </div>
        
        <Link key={selectedMovie} className="movie-items" to={releaseStatus ? `/buytickets/${MovieDetails.name}/${selectedMovie}` : `#`}>{releaseStatus ? "BOOK TICKET":"COMMING SOON"}</Link>
        
       <br />
       <Footer/>
    </div>
)
}



export default MovieDetail;