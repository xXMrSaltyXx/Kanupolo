import React, { Component } from 'react';
import UserDataService from '../../../services/user.service';
import PassDataService from '../../../services/pass.service';
import Select from 'react-select';
import { Form, Button, Row, Col } from 'react-bootstrap';
import './user-view.css';

class UserView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            currentUser: null,
            userFields: {
                username: '',
                password: ''
            },
            passFields: {
                firstname: '',
                lastname: '',
                birthdate: '',
                passNumber: '',
                approvalDate: '',
                vereinId: null,
                joinDate: ''
            },
            vereinName: '',
            verbandName: ''
        };
    }

    componentDidMount() {
        this.retrieveUsers();
    }

    retrieveUsers = () => {
        UserDataService.getAllWithoutPagination()
            .then(response => {
                const users = response.data.map(user => ({
                    value: user.id,
                    label: user.username,
                }));
                this.setState({ users });
            })
            .catch(e => {
                console.log(e);
            });
    }

    handleSave = () => {
        const { currentUser, userFields, passFields } = this.state;
        const pass = currentUser.pass;

        pass.firstname = passFields.firstname;
        pass.lastname = passFields.lastname;
        pass.birthdate = passFields.birthdate;
        pass.vereinId = passFields.vereinId;

        userFields.password = userFields.password.trim() === '' ? currentUser.password : userFields.password;

        UserDataService.update(currentUser.id, userFields)
            .then(() => {
                PassDataService.update(pass.id, pass)
                    .then(() => {
                        alert('User updated successfully');
                    })
                    .catch(e => {
                        console.log(e);
                    });
            })
            .catch(e => {
                console.log(e);
            });
    }

    handleUserChange = (e, field) => {
        const { userFields } = this.state;
        userFields[field] = e.target.value;
        this.setState({ userFields });
    };

    handlePassChange = (e, field) => {
        const { passFields } = this.state;
        passFields[field] = e.target.value;
        this.setState({ passFields });
    };

    handleSelectionChange = async (selectedUser) => {
        const userData = (await UserDataService.getUserData(selectedUser.value)).data;
        const pass = userData.pass;
        const verein = userData.pass.verein;
        const verband = userData.pass.verein.verband;
        
        this.setState({ 
            currentUser: userData,
            userFields: {
                username: userData.username,
                password: ''
            },
            passFields: {
                firstname: pass.firstname,
                lastname: pass.lastname,
                birthdate: pass.birthdate,
                passNumber: pass.passNumber,
                approvalDate: pass.approvalDate,
                vereinId: pass.vereinId,
                joinDate: pass.joinDate
            },
            vereinName: verein.name,
            verbandName: verband.name
        });
    }

    render() {
        const { users, currentUser, userFields, passFields, vereinName, verbandName } = this.state;

        return (
            <div>
                <Select
                    options={users}
                    onChange={this.handleSelectionChange}
                    placeholder="Select a user"
                />
                {currentUser && (
                    <div className='user-data'>
                        <h3>{currentUser.username}</h3>
                        <Form>
                            <Form.Group as={Row} controlId="formUsername">
                                <Form.Label column sm="2">Username</Form.Label>
                                <Col sm="10">
                                    <Form.Control
                                        type="text"
                                        value={userFields.username}
                                        onChange={(e) => this.handleUserChange(e, 'username')}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formPassword">
                                <Form.Label column sm="2">Password</Form.Label>
                                <Col sm="10">
                                    <Form.Control
                                        type="password"
                                        value={userFields.password}
                                        onChange={(e) => this.handleUserChange(e, 'password')}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formFirstname">
                                <Form.Label column sm="2">Firstname</Form.Label>
                                <Col sm="10">
                                    <Form.Control
                                        type="text"
                                        value={passFields.firstname}
                                        onChange={(e) => this.handlePassChange(e, 'firstname')}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formLastname">
                                <Form.Label column sm="2">Lastname</Form.Label>
                                <Col sm="10">
                                    <Form.Control
                                        type="text"
                                        value={passFields.lastname}
                                        onChange={(e) => this.handlePassChange(e, 'lastname')}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formBirthdate">
                                <Form.Label column sm="2">Birthdate</Form.Label>
                                <Col sm="10">
                                    <Form.Control
                                        type="date"
                                        value={passFields.birthdate}
                                        onChange={(e) => this.handlePassChange(e, 'birthdate')}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formPassNumber">
                                <Form.Label column sm="2">Pass Number</Form.Label>
                                <Col sm="10">
                                    <Form.Control
                                        disabled
                                        readOnly
                                        type="text"
                                        value={passFields.passNumber}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formApprovalDate">
                                <Form.Label column sm="2">Approval Date</Form.Label>
                                <Col sm="10">
                                    <Form.Control
                                        disabled
                                        readOnly
                                        type="date"
                                        value={passFields.approvalDate}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formJoinDate">
                                <Form.Label column sm="2">Join Date</Form.Label>
                                <Col sm="10">
                                    <Form.Control
                                        disabled
                                        readOnly
                                        type="date"
                                        value={passFields.joinDate}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formVereinName">
                                <Form.Label column sm="2">Verein Name</Form.Label>
                                <Col sm="10">
                                    <Form.Control
                                        disabled
                                        readOnly
                                        type="text"
                                        value={vereinName}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formVerbandName">
                                <Form.Label column sm="2">Verband Name</Form.Label>
                                <Col sm="10">
                                    <Form.Control
                                        disabled
                                        readOnly
                                        type="text"
                                        value={verbandName}
                                    />
                                </Col>
                            </Form.Group>
                            <Button variant="primary" onClick={this.handleSave}>Save</Button>
                        </Form>
                    </div>
                )}
            </div>
        );
    }
}

export default UserView;