import React from 'react';
import { Form, Button } from 'react-bootstrap';
import './FilterForm.css';

const FilterForm = ({ conditionFields, setConditionFields, onSubmit }) => {
    const handleChange = (e, field) => {
        const newFormFields = { ...conditionFields, [field]: e.target.value };
        setConditionFields(newFormFields);
    };

    const getConditionAsJson = () => {
        return JSON.stringify(conditionFields);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const jsonResult = getConditionAsJson();
        onSubmit(jsonResult);
    };
    
    const handleReset = (e) => {
        e.preventDefault();
        setConditionFields({ name: '' });
        onSubmit('');
    };

    return (
        <Form className='filter-form' onSubmit={handleSubmit} onReset={handleReset}>
            {Object.keys(conditionFields).map((field, index) => (
                <Form.Group controlId={`form${field}`} key={index}>
                    <Form.Control
                        type="text"
                        value={conditionFields[field]}
                        onChange={(e) => handleChange(e, field)}
                        placeholder={`Enter ${field}`}
                    />
                </Form.Group>
            ))}
            <Button variant='warning' type="reset">Reset</Button>
            <Button variant='success' type="submit">Submit</Button>
        </Form>
    );
};

export default FilterForm;