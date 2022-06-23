
import './booking.css'
import React, {useEffect, useState } from 'react'
import clsx from 'clsx'
import Footer from '../../components/footer/footer'
import Navbar from '../../components/navbar/navbar'
import { useNavigate,useParams } from 'react-router-dom';
import Payment from '../../components/payment/payment'
import { getMovie } from '../../api/movie'
import { getTheaterById } from '../../api/theater'
// const movies = [
//   {
//     name: 'Avenger',
//     price: 10,
//     occupied: [20, 21, 30, 1, 2, 8],
//   },
//   {
//     name: 'Joker',
//     price: 12,
//     occupied: [9, 41, 35, 11, 65, 26],
//   },
//   {
//     name: 'Toy story',
//     price: 8,
//     occupied: [37, 25, 44, 13, 2, 3],
//   },
//   {
//     name: 'the lion king',
//     price: 9,
//     occupied: [10, 12, 50, 33, 28, 47],
//   },
// ]

const seats = Array.from({ length: 8 * 8 }, (_, i) => i)

 function Booking() {
  const { movieid: movieId } = useParams();
  const { theatreid: theatreId } = useParams();
  const [pageLoaded, setPageLoading] = useState(false);

  const [selectedMovieId, setSelectedMovieId] = useState(movieId);
  const [selectedTheaterId, setTheaterMovieId] = useState(theatreId);

  const [selectedMovie, setSelectedMovie] = useState({})
  const [selectedTheater, setSelectedTheater] = useState({})
  
  const [selectedSeats, setSelectedSeats] = useState([])
  const [occupiedSeats, setOccupiedSeats] = useState([10, 12, 50, 33, 28, 47])
  const [moviePrice, setMoviePrice] = useState(150)
  
  
  const navigate = useNavigate();

  const init = async () => {
    const response = await getMovie(selectedMovieId);
    setSelectedMovie(response.data);

    const theaterResponse = await getTheaterById(selectedTheaterId);
    setSelectedTheater(theaterResponse.data);
    console.log("theatreId",selectedTheaterId)
    
    setPageLoading(true)
}
  useEffect(() => {
    console.log(localStorage.getItem('token'));
    if(localStorage.getItem('token')===null){
      navigate('/login');
    }
    else{
      init();
    }
}, [])



  const render = () =>{
      return (
        <>
    
        
    <h2 className="fw-bold text-light">{selectedMovie.name}</h2>
      <ShowCase />
      <Cinema
        movie={selectedMovie}
        selectedSeats={selectedSeats}
        occupiedSeates={occupiedSeats}
        onSelectedSeatsChange={selectedSeats => setSelectedSeats(selectedSeats)}
      />
      <p className="info">
      {
        
        selectedSeats.length>0 ? (
          <>
            You have selected <span className="count">{selectedSeats.length}</span>{' '}
            seats for the price of{' '}
            <span className="total">
              {selectedSeats.length * moviePrice}Rs
            </span>
            </>


        ):"" 
      }
      </p>
      <Payment
        noOfSeats = {selectedSeats.length}
        movie = {selectedMovie}
        theater = {selectedTheater}

      />
     


   
    
    </>
      )
  }

  return (
    <>
    <Navbar />
    <div className="App bg-black backg">


    {
      pageLoaded ? render() : "Loading data . . ." 
    }
    </div>
    <Footer />
    </>
  
    
    
  )
}

// function Movies({ movie, onChange }) {
//   return (
//     <div className="Movies">
//       <label htmlFor="movie">Pick a movie</label>
//       <select
//         id="movie"
//         value={movie.name}
//         onChange={e => {
//           onChange(movies.find(movie => movie.name === e.target.value))
//         }}
//       >
//         {movies.map(movie => (
//           <option key={movie.name} value={movie.name}>
//             {movie.name} (${movie.price})
//           </option>
//         ))}
//       </select>
//     </div>
//   )
// }

function ShowCase() {
  return (
    <ul className="ShowCase">
      <li>
        <span className="seat" /> <small>Available</small>
      </li>
      <li>
        <span className="seat selected" /> <small>Selected</small>
      </li>
      <li>
        <span className="seat occupied" /> <small>Occupied</small>
      </li>
    </ul>
  )
}

function Cinema({ movie, selectedSeats,occupiedSeates, onSelectedSeatsChange }) {
  function handleSelectedState(seat) {
    const isSelected = selectedSeats.includes(seat)
    if (isSelected) {
      onSelectedSeatsChange(
        selectedSeats.filter(selectedSeat => selectedSeat !== seat),
      )
    } else {
      onSelectedSeatsChange([...selectedSeats, seat])
    }
  }

  return (
    <div className="Cinema">
      
      <div className="screen" />

      <div className="seats">
        {seats.map(seat => {
          const isSelected = selectedSeats.includes(seat)
          const isOccupied = occupiedSeates.includes(seat)
          return (
            <span
              tabIndex="0"
              key={seat}
              className={clsx(
                'seat',
                isSelected && 'selected',
                isOccupied && 'occupied',
              )}
              onClick={isOccupied ? null : () => handleSelectedState(seat)}
              onKeyPress={
                isOccupied
                  ? null
                  : e => {
                      if (e.key === 'Enter') {
                        handleSelectedState(seat)
                      }
                    }
              }
            />
          )
        })}
      </div>
    </div>
  )
}

export default Booking;