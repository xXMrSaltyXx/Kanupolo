import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import RoleDataService from '../../services/role.service';
import PassDataService from '../../services/pass.service';
import UserDataService from '../../services/user.service';
import Select from 'react-select';

const UserModal = ({ show, handleClose, handleSave, initialData }) => {
    const [formFields, setFormFields] = useState({
        username: '',
        password: '',
        roleId: null,
        passId: null
    });
    const [roleOptions, setRoleOptions] = useState([]);
    const [passOptions, setPassOptions] = useState([]);

    const handleChange = (e, field) => {
        const { value } = e.target;
        setFormFields(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    useEffect(() => {
        if (initialData) {
            setFormFields(initialData);
        }
    }, [initialData]);

    useEffect(() => {
        const fetchRoleOptions = async () => {
            const options = (await RoleDataService.getAllWithoutPagination()).data.map(role => ({
                value: role.id,
                label: role.name
            }));
            setRoleOptions(options);
        };

        const fetchPassOptions = async () => {
            const result = await PassDataService.getAllWithoutUser();
            const options = result.data.map(pass => ({
                value: pass.id,
                label: pass.firstname + ' ' + pass.lastname[0] + '. - ' + pass.passNumber
            }));

            setPassOptions(options);
        };

        fetchRoleOptions();
        fetchPassOptions();
    }, []);

    const handleRoleChange = (selectedOption) => {
        setFormFields(prevState => ({
            ...prevState,
            roleId: selectedOption ? selectedOption.value : null
        }));
    };

    const handlePassChange = (selectedOption) => {
        setFormFields(prevState => ({
            ...prevState,
            passId: selectedOption ? selectedOption.value : null
        }));
    };

    const onSave = () => {
        handleSave(formFields);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Benutzer</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Benutzername</Form.Label>
                        <Form.Control
                            type="text"
                            value={formFields.username}
                            onChange={(e) => handleChange(e, 'username')}
                            placeholder="Benutzername eingeben"
                        />
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label>Passwort</Form.Label>
                        <Form.Control
                            type="password"
                            value={formFields.password}
                            onChange={(e) => handleChange(e, 'password')}
                            placeholder="Passwort eingeben"
                        />
                    </Form.Group>
                    <Form.Group controlId="formRole">
                        <Form.Label>Rolle</Form.Label>
                        <Select
                            value={roleOptions.find(option => option.value === formFields.roleId)}
                            options={roleOptions}
                            onChange={handleRoleChange}
                            placeholder="Rolle auswählen"
                        />
                    </Form.Group>
                    <Form.Group controlId="formPass">
                        <Form.Label>Pass</Form.Label>
                        <Select
                            value={passOptions.find(option => option.value === formFields.passId)}
                            options={passOptions}
                            onChange={handlePassChange}
                            placeholder="Pass auswählen"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Abbrechen
                </Button>
                <Button variant="primary" onClick={onSave}>
                    Speichern
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UserModal;