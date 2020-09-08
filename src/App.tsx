import React from 'react';
import './App.css';
import { Switch, Route } from "react-router-dom";

import DiscoverMoviesPage from "./pages/DiscoverMoviesPage";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import MoviePage from './pages/MoviePage';

import NavBar from './components/NavBar';

export default function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path="/movie/:imdbID" component={MoviePage} />
        <Route path="/discover" component={DiscoverMoviesPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/" component={HomePage} />
      </Switch>
    </div>
  );
}
