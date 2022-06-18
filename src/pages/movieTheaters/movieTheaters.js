import { getAllTheaters} from '../../api/theater'
import {getMovie} from '../../api/movie'
import Footer from '../../components/footer/footer'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
const MovieTheaters = () => {
    const { movieid: movieId } = useParams();
    const [selectedMovieId, setSelectedMovieId] = useState(movieId);
    const [movieDetail,setMovieDetails] = useState({});
    const [theatersDetail, setTheaterDetails] = useState({});
    const [pageLoaded, setPageLoading] = useState(false);
    


    const init = async () => {

        let response = await getAllTheaters();
            setTheaterDetails(response.data.filter((data)=>{
                return data.movies.includes(selectedMovieId);
            } ) 
        )
        
        response = await getMovie(selectedMovieId);
        setMovieDetails(response.data);
        
        setPageLoading(true);
        
        
    }


    useEffect(() => {
            init();
         },
    []);

return (
    <div>



    SELECT THEATER {movieDetail.name}
    <div>
        {pageLoaded ?  ( 
            theatersDetail.map(
                theater => <li key={theater.name} className="list-group-item">
                    <Link key={theater._id} to={`/movie/${selectedMovieId}/${theater._id}`}>
                        {theater.name}
                    </Link>
                    </li>
                )
            ) : ""
        }
        </div>
    <Footer/>
                    
    </div>
)
}

export default MovieTheaters;
