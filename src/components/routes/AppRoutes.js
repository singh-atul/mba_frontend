
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Booking from "../Booking/Booking";
import LandingPage from "../LandingPage/LandingPage";
import MovieDetail from "../MovieDetail/MovieDetail"

// import Auth from "../Auth/Auth";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* <Route
          exact
          path="/login"
          element={<Auth />}
        /> */}

        <Route
          exact
          path="/"
          element={<LandingPage />}
        />
        <Route
          exact
          path="/movie/:movieid/details"
          element={
            <MovieDetail />
          }
        />

        <Route
          exact
          path="/buytickets/:moviename/:movieid"
          element={
            <Booking />
          }
        />
        
      </Routes>


      


    </Router>
  )
}

export default AppRoutes;