import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditModal = ({ show, handleClose, handleSave, formFields, setFormFields }) => {
    const handleChange = (e, field) => {
        const newFormFields = { ...formFields, [field]: e.target.value };
        setFormFields(newFormFields);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {Object.keys(formFields).map((field, index) => (
                        <Form.Group controlId={`form${field}`} key={index}>
                            <Form.Label>{field}</Form.Label>
                            <Form.Control
                                type="text"
                                value={formFields[field]}
                                onChange={(e) => handleChange(e, field)}
                                placeholder={`Enter ${field}`}
                            />
                        </Form.Group>
                    ))}
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

export default EditModal;