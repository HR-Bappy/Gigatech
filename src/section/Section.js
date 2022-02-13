import { Routes, Route, Redirect } from "react-router-dom";
import ProtectedRoute from "../Components/ProtectedRoute";
import Home from "../pages/Home";
import Login from "../pages/Login";
import topRepository from "../pages/topRepository";
import topUserByCountry from "../pages/topUserByCountry";
import itemDetails from '../pages/itemDetails'
import DataVisualization from "../pages/DataVisualization";



export default function Section() {
  return (
    <>
      <Route path="/login" component={Login} />
      <ProtectedRoute exact path = "/" component={Home} />
      <ProtectedRoute exact path = "/top-user-by-country" component={topUserByCountry} />
      <ProtectedRoute exact path = "/top-repositories" component={topRepository} />
      <ProtectedRoute exact path = "/details/:id" component={itemDetails} />
      <ProtectedRoute exact path = "/data-visualization" component={DataVisualization} />
    </>
  );
}