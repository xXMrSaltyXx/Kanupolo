import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const PassModal = ({ show, handleClose, handleSave, initialData }) => {
    const [formFields, setFormFields] = useState({
        firstname: '',
        lastname: '',
        birthdate: '',
        passNumber: '',
        approvalDate: '',
        joinDate: ''
    });

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

    const onSave = () => {
        handleSave(formFields);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Pass</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formFirstname">
                        <Form.Label>Vorname</Form.Label>
                        <Form.Control
                            type="text"
                            value={formFields.firstname}
                            onChange={(e) => handleChange(e, 'firstname')}
                            placeholder="Vorname eingeben"
                        />
                    </Form.Group>
                    <Form.Group controlId="formLastname">
                        <Form.Label>Nachname</Form.Label>
                        <Form.Control
                            type="text"
                            value={formFields.lastname}
                            onChange={(e) => handleChange(e, 'lastname')}
                            placeholder="Nachname eingeben"
                        />
                    </Form.Group>
                    <Form.Group controlId="formBirthdate">
                        <Form.Label>Geburtsdatum</Form.Label>
                        <Form.Control
                            type="date"
                            value={formFields.birthdate}
                            onChange={(e) => handleChange(e, 'birthdate')}
                        />
                    </Form.Group>
                    <Form.Group controlId="formPassNumber">
                        <Form.Label>Passnummer</Form.Label>
                        <Form.Control
                            type="text"
                            value={formFields.passNumber}
                            onChange={(e) => handleChange(e, 'passNumber')}
                            placeholder="Passnummer eingeben"
                        />
                    </Form.Group>
                    <Form.Group controlId="formApprovalDate">
                        <Form.Label>Genehmigungsdatum</Form.Label>
                        <Form.Control
                            type="date"
                            value={formFields.approvalDate}
                            onChange={(e) => handleChange(e, 'approvalDate')}
                        />
                    </Form.Group>
                    <Form.Group controlId="formJoinDate">
                        <Form.Label>Beitrittsdatum</Form.Label>
                        <Form.Control
                            type="date"
                            value={formFields.joinDate}
                            onChange={(e) => handleChange(e, 'joinDate')}
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

export default PassModal;