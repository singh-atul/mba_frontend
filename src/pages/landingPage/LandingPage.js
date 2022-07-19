import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Navbar from "../../components/navbar/Navbar";
import Slider from '../../components/slider/Slider';
import Footer from '../../components/footer/Footer';
import {getAllMovies} from '../../api/movie';

import Loader from '../../assets/load.gif'
import './landingPage.css';
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
      }

      const render = () => {
        return ( 
          <>
            <Navbar movies={movieList.map((movie)=>movie.name)}  onMovieSelect={selectedMovie}/>
            {
              !pageLoading ? (
                <>  
                  <Slider />
                  <div className="container my-4">
                      <p className="fw-bolder">Recomended Movies</p>
                      <div className="row">
                          {
                              movieList.map((movie) =>(
                              <div className="col-lg-3 col-xs-6  my-2" key={movie._id}>
                                <Link key={movie._id} to={`/movie/${movie._id}/details`}>
                                  <div className="d-flex align-items-stretch" style={{height: 25 + 'rem'}}>
                                      <div className="card bg-dark shadow-lg" style={{width: 14 + "rem"}}>
                                          <img src={movie.posterUrl} className="card-img-top" alt="..." style={{height: '100%'}}/>
                                          <i className="bi bi-hand-thumbs-up-fill text-success px-2 ">58k </i>  
                                          <p className="text-white fw-bolder px-2">{movie.name}</p>    
                                      </div>
                                      </div>
                                </Link>
                              </div>
                              
                          ))
                          }
                          
                      </div>
                      
                  </div>
                  <Footer/>
                </>
              ):<div className="d-flex justify-content-center align-items-center vh-100">
                <img src ={Loader} alt="loading.." />
              </div>
              
            }
            
          </>
        )
      }

      return ( 
              render()
        )
    
}

export default LandingPage;