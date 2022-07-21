
import './booking.css'
import React, {useEffect, useState } from 'react'
import clsx from 'clsx'
import Footer from '../../components/footer/Footer'
import Navbar from '../../components/navbar/Navbar'
import { useNavigate,useParams } from 'react-router-dom';
import Payment from '../../components/payment/Payment'
import { getMovie } from '../../api/movie'
import { getTheaterById } from '../../api/theater'

const seats = Array.from({ length: 8 * 8 }, (_, i) => i)

 function Booking() {
  const navigate = useNavigate();
  
  useEffect(() => {
    if(localStorage.getItem('token')===null){
      navigate('/login');
    }
    else{
      init();
    }
}, [])

  const init = async () => {
    const response = await getMovie(selectedMovieId);
    setSelectedMovie(response.data);
    const theaterResponse = await getTheaterById(selectedTheaterId);
    setSelectedTheater(theaterResponse.data);
    setPageLoading(true)
  }

  const { movieid: selectedMovieId } = useParams();
  const { theatreid: selectedTheaterId } = useParams();
  const [pageLoaded, setPageLoading] = useState(false);


  const [selectedMovie, setSelectedMovie] = useState({})
  const [selectedTheater, setSelectedTheater] = useState({})
  
  const [selectedSeats, setSelectedSeats] = useState([])
  const occupiedSeats =  [10, 12, 50, 33, 28, 47]
  const moviePrice  = 150
  
  
  

  



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