import React, { Component } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import AppView from './components/views/app-view';
import UserView from './components/views/user-view';
import VereinView from './components/views/verein-view';
import VerbandView from './components/views/verband-view';
import AdminView from './components/views/admin-view';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/" className="navbar-brand">
            Kanupolo
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User-View
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/verein"} className="nav-link">
                Verein-View
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/verband"} className="nav-link">
                Verband-View
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin-View
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<AppView/>} />
            <Route path="/user" element={<UserView/>} />
            <Route path="/verein" element={<VereinView/>} />
            <Route path="/verband" element={<VerbandView/>} />
            <Route path="/admin" element={<AdminView/>} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;