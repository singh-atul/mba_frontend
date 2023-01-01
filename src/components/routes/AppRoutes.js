
import React, { useEffect, useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieTheaters from "../../pages/movieTheaters/MovieTheaters";
import LandingPage from "../../pages/landingPage/LandingPage";
import MovieDetail from "../../pages/movieDetail/MovieDetail"
import Admin from "../../pages/admin/Admin"
import Client from "../client/Client"
import Auth from "../../pages/auth/Auth";
import Booking from '../../pages/booking/Booking'
import Unauthorized from "../../util/Unauthorized";
import Notfound from "../../util/Notfound";
import RequireAuth from "../../util/RequireAuth"
const ROLES = {
  'CUSTOMER': 'CUSTOMER',
  'ADMIN': 'ADMIN',
  'CLIENT': 'CLIENT'
}

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/login"
          element={<Auth />}
        />

        <Route element={<RequireAuth allowedRoles={[ROLES.CLIENT]} />}>
            <Route path="/client" element={<Client />} />
          </Route>

        <Route
          exact
          path="/"
          element={<LandingPage />}
        />

        <Route 
          element={
            <RequireAuth 
              allowedRoles={[ROLES.ADMIN]
            } />}>
            
            <Route path="/admin" exact element={<Admin />} />
        </Route>

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
          element={<MovieTheaters />}
        />
        
        <Route
          exact
          path="/movie/:movieid/:theatreid"
          element={<Booking />}
        />
        
      <Route path="/*" element={<Notfound />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      
      </Routes>


      


    </Router>
  )
}

export default AppRoutes;