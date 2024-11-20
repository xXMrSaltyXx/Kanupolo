import React, { Component } from 'react';
import { Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import UserList from '../user-list';
import VereinList from '../verein-list';
import VerbandList from '../verband-list';

class AdminView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 'users'
        };
    }

    handleSelect = (selectedTab) => {
        this.setState({ activeTab: selectedTab });
    };

    render() {
        return (
            <div>
                <Nav variant="tabs" activeKey={this.state.activeTab} onSelect={this.handleSelect}>
                    <Nav.Item>
                        <Nav.Link eventKey="users">Nutzer</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="vereins">Vereine</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="verbands">Verbände</Nav.Link>
                    </Nav.Item>
                </Nav>
                
                <div className="tab-content mt-3">
                    {this.state.activeTab === 'users' && <UserList />}
                    {this.state.activeTab === 'vereins' && <VerbandList />}
                    {this.state.activeTab === 'verbands' && <VereinList />}
                </div>
            </div>  
        );
    }
}

export default AdminView;