import RoleDataService from "../../services/role.service";
import { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import RoleModal from "./role-modal";

const RoleList = () => {
    const [roles, setRoles] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);

    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [editFields, setEditFields] = useState({ name: '' });

    const retrieveRoles = () => {
        RoleDataService.getAllPagionation(page, size)
            .then(response => {
                setRoles(response.data.items);
            })
            .catch(e => {
                console.log(e);
            });
    }

    useEffect(() => {
        retrieveRoles();
    }, [page, size]);

    const handleAddRole = () => {
        setModalType('create');
        setEditFields({ name: '' });
        setShowModal(true);
    };

    const handleEditRole = () => {
        if (selectedIndex >= 0) {
            setModalType('edit');
            setEditFields({ name: roles[selectedIndex].name });
            setShowModal(true);
        }
    };

    const handleDeleteRole = () => {
        if (selectedIndex >= 0) {
            RoleDataService.delete(roles[selectedIndex].id)
                .then(response => {
                    retrieveRoles();
                })
                .catch(e => {
                    console.log(e);
                });
        }
    };

    const handleSave = () => {
        if (modalType === 'create') {
            RoleDataService.create(editFields)
                .then(response => {
                    retrieveRoles();
                    setShowModal(false);
                })
                .catch(e => {
                    console.log(e);
                });
        } else if (modalType === 'edit') {
            RoleDataService.update(roles[selectedIndex].id, editFields)
                .then(response => {
                    retrieveRoles();
                    setShowModal(false);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    };

    return (
        <>
            <h4>Rollen Liste</h4>

            <div className="form-group" style={{ display: "flex" }}>
                <Button onClick={handleAddRole} variant="primary">Neue Rolle</Button>
                <Button onClick={handleEditRole} variant="warning">Bearbeiten</Button>
                <Button onClick={handleDeleteRole} variant="danger">Löschen</Button>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {roles.map((role, index) => (
                        <tr key={index} onClick={() => selectedIndex === index ? setSelectedIndex(-1) : setSelectedIndex(index)} className={selectedIndex === index ? "table-selected" : ""}>
                            <td>{index + 1}</td>
                            <td>{role.name}</td>
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

            <RoleModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                handleSave={handleSave}
                formFields={editFields}
                setFormFields={setEditFields}
            />
        </>
    );
};

export default RoleList;