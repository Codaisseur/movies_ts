import React from 'react';
import './App.css';
import { Switch, Route } from "react-router-dom";

import DiscoverMoviesPage from "./pages/DiscoverMoviesPage";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";

import NavBar from './components/NavBar';

export default function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path="/discover" component={DiscoverMoviesPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/" component={HomePage} />
      </Switch>
    </div>
  );
}
