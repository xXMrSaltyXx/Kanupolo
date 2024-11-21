import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import Select from 'react-select';
import verbandDataService from '../../services/verband.service';


const VereinModal = ({ show, handleClose, handleSave, initialData }) => {
    const [formFields, setFormFields] = useState({
        name: '',
        vereinCode: '',
        verbandId: null
    });
    const [verbandOptions, setVerbandOptions] = useState([]);

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
        // Fetch or set initial verbandOptions here
        const fetchVerbandOptions = async () => {
            // Replace with your data fetching logic
            const options = (await verbandDataService.getAll()).data.items.map(verband => ({
                value: verband.id,
                label: verband.name
            }));
            setVerbandOptions(options);
        };

        fetchVerbandOptions();
    }, []);

    const handleVerbandChange = (selectedOption) => {
        setFormFields(prevState => ({
            ...prevState,
            verbandId: selectedOption ? selectedOption.value : null
        }));
    };

    const onSave = () => {
        handleSave(formFields);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Verein</Modal.Title>
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
                    <Form.Group controlId="formVereinCode">
                        <Form.Label>Vereins-Code</Form.Label>
                        <Form.Control
                            type="text"
                            value={formFields.vereinCode}
                            onChange={(e) => handleChange(e, 'vereinCode')}
                            placeholder="Vereins-Code eingeben"
                        />
                    </Form.Group>
                    <Form.Group controlId="formVerband">
                        <Form.Label>Verband</Form.Label>
                        <Select
                            value={verbandOptions.find(option => option.value === formFields.verbandId)}
                            options={verbandOptions}
                            onChange={handleVerbandChange}
                            placeholder="Verband auswählen"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={onSave}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default VereinModal;