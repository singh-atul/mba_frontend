
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Booking from "../booking/booking";
import LandingPage from "../landingPage/landingPage";
import MovieDetail from "../movieDetail/movieDetail"
import Admin from "../admin/admin"

import Client from "../client/client"
import Auth from "../auth/auth";

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
            <Booking />
          }
        />
        
      </Routes>


      


    </Router>
  )
}

export default AppRoutes;