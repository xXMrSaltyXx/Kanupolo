import React from 'react';
import UserDataService from "../../services/user.service";
import { useState, useEffect } from 'react';
import UserModal from "./user-modal";
import { Table, Button, Form } from 'react-bootstrap';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);

    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [editFields, setEditFields] = useState({ 
        username: '',
        password: '',
        userId: null,
        roleId: null,
        passId: null
    });

    const retrieveUsers = () => {
        UserDataService.getAllWithRoleAndPass(page, size)
            .then(response => {
                console.log(response.data);
                setUsers(response.data.items);
            })
            .catch(e => {
                console.log(e);
            });
    }

    useEffect(() => {
        retrieveUsers();
    }, [page, size]);

    const handleAddUser = () => {
        setModalType('create');
        setEditFields({ 
            username: '',
            password: '',
            userId: null,
            roleId: null,
            passId: null
        });
        setShowModal(true);
    };

    const handleEditUser = () => {
        if (selectedIndex >= 0) {
            setModalType('edit');
            setEditFields({ 
                username: users[selectedIndex].username,
                password: users[selectedIndex].password,
                userId: users[selectedIndex].id,
                roleId: users[selectedIndex].roleId,
                passId: users[selectedIndex].passId
            });
            setShowModal(true);
        }
    };

    const handleDeleteUser = () => {
        if (selectedIndex >= 0) {
            UserDataService.delete(users[selectedIndex].id)
                .then(response => {
                    retrieveUsers();
                })
                .catch(e => {
                    console.log(e);
                });
        }
    };

    const handleSave = (data) => {
        if (modalType === 'create') {
            UserDataService.create(data)
                .then(response => {
                    retrieveUsers();
                    setShowModal(false);
                })
                .catch(e => {
                    console.log(e);
                });
        } else if (modalType === 'edit') {
            UserDataService.update(users[selectedIndex].id, data)
                .then(response => {
                    retrieveUsers();
                    setShowModal(false);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    };

    return (
        <>
            <h4>Benutzer Liste</h4>

            <div className="form-group" style={{ display: "flex" }}>
                <Button onClick={handleAddUser} variant="primary">Neuer Benutzer</Button>
                <Button onClick={handleEditUser} variant="warning">Bearbeiten</Button>
                <Button onClick={handleDeleteUser} variant="danger">Löschen</Button>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Rolle</th>
                        <th>Pass</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index} onClick={() => selectedIndex === index ? setSelectedIndex(-1) : setSelectedIndex(index)} className={selectedIndex === index ? "table-selected" : ""}>
                            <td>{index + 1}</td>
                            <td>{user.username}</td>
                            <td>{user.password}</td>
                            <td>{user.role?.name ?? 'null'}</td>
                            <td>{user.pass?.passNumber ?? 'null'}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <div className="form-group pagination-settings">
                <Form.Group controlId="formPage">
                    <Form.Label>Seite:</Form.Label>
                    <Form.Control
                        type="number"
                        value={page}
                        onChange={(e) => setPage(Number(e.target.value))}
                        min="0"
                    />
                </Form.Group>
                <Form.Group controlId="formSize">
                    <Form.Label>Größe:</Form.Label>
                    <Form.Control
                        type="number"
                        value={size}
                        onChange={(e) => setSize(Number(e.target.value))}
                        min="1"
                    />
                </Form.Group>
            </div>

            <UserModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                handleSave={handleSave}
                initialData={editFields}
            />
        </>
    );
};

export default UserList;