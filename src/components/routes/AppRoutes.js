
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Booking from "../Booking/Booking";
import LandingPage from "../LandingPage/LandingPage";
import MovieDetail from "../MovieDetail/MovieDetail"
import Admin from "../Admin/Admin"

import Client from "../Client/Client"
import Auth from "../Auth/Auth";

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