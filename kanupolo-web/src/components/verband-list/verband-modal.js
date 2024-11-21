import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const VerbandModal = ({ show, handleClose, handleSave, formFields, setFormFields }) => {
    const handleChange = (e, field) => {
        const newFormFields = { ...formFields, [field]: e.target.value };
        setFormFields(newFormFields);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Verband</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={formFields.name}
                            onChange={(e) => handleChange(e, 'name')}
                            placeholder="Name eingeben"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default VerbandModal;