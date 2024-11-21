import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import UserDataService from '../../services/user.service';

const UserList = () => {

    const [users, setUsers] = useState([]);

    // Similar to componentDidMount and componentDidUpdate: 
    useEffect(() => {
        retrieveUsers();
    }, []);

    const retrieveUsers = () => {
        UserDataService.getAllWithRoleAndPass(0, 10, '')
            .then(response => {
                setUsers(response.data.items);
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
            <h2>User List</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Benutzername</th>
                        <th>Rolle</th>
                        <th>Passnummer</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => {
                        return (
                            <tr key={index}>
                                <td>{user.username}</td>
                                <td>{user.role?.name ?? 'null'}</td>
                                <td>{user.pass?.passNumber ?? 'null'}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
};

export default UserList;