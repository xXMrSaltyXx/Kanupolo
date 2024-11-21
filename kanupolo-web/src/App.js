import React, { Component } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import AppView from './components/views/app-view';
import UserView from './components/views/user-view/user-view';
import VereinView from './components/views/verein-view';
import VerbandView from './components/views/verband-view';
import AdminView from './components/views/admin-view';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  render() {
    return (
      <div className="app-container">
        <Nav variant="tabs" defaultActiveKey="/admin">
          <Nav.Item>
            <Nav.Link as={Link} to="/user">User</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/verein">Verein</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/verband">Verband</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/admin">Admin</Nav.Link>
          </Nav.Item>
        </Nav>

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