import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Navbar from "../Navbar/Navbar"
import './LandingPage.css';
import {getAllMovies} from '../../api/movie'
import Cinemas from "../Cinemas/Cinemas";
const LandingPage = () => {
    const [movieList, setMovieList] = useState([]);
    const [pageLoading, setPageLoading] = useState(true);

    const init = async () => {

        const result = await getAllMovies();
        setMovieList(result.data);
        setPageLoading(false);
    
    }

    useEffect(() => {
        init();
      }, [])

    
      const selectedMovie = (movieName) => {
          movieList.findIndex(function(movie) {
            return movie.name.toUpperCase() === movieName.toUpperCase()
          });



        //   getMovie
      }

      return (
        !pageLoading ? ( <>
           <Navbar movies={movieList.map((movie)=>movie.name)}  onMovieSelect={selectedMovie}/>
           <Cinemas/>
           <div className="container mx-5 my-2">
               <p className="fw-bolder">Recomended Movies</p>
               <div className="row">
                   {
                       movieList.map((movie) =>(
                        <Link key={movie._id} className="movies" to={`/movie/${movie._id}/details`}>
                        <div className="col d-flex h-200" key={movie.name}>
                            <div className="card " style={{height: 20 + "rem", width: 15 + "rem"}}>
                                <img src={movie.posterUrl} className="card-img-top" alt="..."/>
                                <div className="bg-dark text-white py-2 top">
                                <i className="bi bi-hand-thumbs-up-fill p-2 text-success">58k </i>
                                {movie.name}
                                
                                </div>
                            </div>
                        </div>
                        </Link>
                    ))
                   }
                   
               </div>
               
           </div>
        </>
      ):
      <div>Fetching Movies from backend...</div>
      )
    
}

export default LandingPage;