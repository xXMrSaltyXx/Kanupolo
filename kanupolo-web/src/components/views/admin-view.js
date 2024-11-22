import { React, Component } from 'react';
import { Nav, TabContent } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import UserList from '../user-list/user-list';
import VereinList from '../verein-list/verein-list';
import VerbandList from '../verband-list/verband-list';
import PassList from '../pass-list/pass-list';
import RoleList from '../role-list/role-list';

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
                        <Nav.Link eventKey="roles">Rollen</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="passes">Pässe</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="vereins">Vereine</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="verbands">Verbände</Nav.Link>
                    </Nav.Item>
                </Nav>
                
                <TabContent>
                    {this.state.activeTab === 'users' && <UserList />}
                    {this.state.activeTab === 'roles' && <RoleList />}
                    {this.state.activeTab === 'passes' && <PassList />}
                    {this.state.activeTab === 'vereins' && <VereinList />}
                    {this.state.activeTab === 'verbands' && <VerbandList />}
                </TabContent>
            </div>  
        );
    }
}

export default AdminView;