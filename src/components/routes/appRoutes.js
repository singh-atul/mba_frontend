
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieTheaters from "../../pages/movieTheaters/movieTheaters";
import LandingPage from "../../pages/landingPage/landingPage";
import MovieDetail from "../../pages/movieDetail/movieDetail"
import Admin from "../../pages/admin/admin"
import Client from "../client/client"
import Auth from "../../pages/auth/auth";
import Booking from '../../pages/booking/booking'

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/login"
          element={<Auth />}
        />
        <Route
          exact
          path="/client"
          element={<Client />}
        />

        <Route
          exact
          path="/"
          element={<LandingPage />}
        />
        <Route
          exact
          path="/admin"
          element={<Admin />}
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
            <MovieTheaters />
          }
        />

  <Route
          exact
          path="/movie/:movieid/:theatreid"
          element={
            <Booking />
          }
        />
        
      </Routes>


      


    </Router>
  )
}

export default AppRoutes;