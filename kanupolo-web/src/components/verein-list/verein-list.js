import React from 'react';
import VereinDataService from "../../services/verein.service";
import { useState, useEffect } from 'react';
import './verein-list.css';
import VereinModal from "./verein-modal";
import FilterForm from '../FilterForm/FilterForm';
import { Table, Button, Collapse, Form } from 'react-bootstrap';

const VereinList = () => {
    const [vereins, setVereins] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);

    const [condition, setCondition] = useState("");
    const [conditionOpen, setConditionOpen] = useState(false);
    const [conditionFields, setConditionFields] = useState({ name: '' });

    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [editFields, setEditFields] = useState({ name: '' });

    const retrieveVereins = () => {
        VereinDataService.getAllConditionPagionation(page, size, condition)
            .then(response => {
                setVereins(response.data.items);
            })
            .catch(e => {
                console.log(e);
            });
    }

    useEffect(() => {
        retrieveVereins();
    }, [page, size, condition]);

    const handleAddVerein = () => {
        setModalType('create');
        setEditFields({ name: '' });
        setShowModal(true);
    };

    const handleEditVerein = (index) => {
        if (selectedIndex >= 0) {
            setModalType('edit');
            setEditFields({ name: vereins[selectedIndex].name });
            setShowModal(true);
        }
    };

    const handleDeleteVerein = (index) => {
        if (selectedIndex >= 0) {
            VereinDataService.delete(vereins[selectedIndex].id)
                .then(response => {
                    retrieveVereins();
                })
                .catch(e => {
                    console.log(e);
                });
        }
    };

    const handleSave = () => {
        if (modalType === 'create') {
            VereinDataService.create(editFields)
                .then(response => {
                    retrieveVereins();
                    setShowModal(false);
                })
                .catch(e => {
                    console.log(e);
                });
        } else if (modalType === 'edit') {
            VereinDataService.update(vereins[selectedIndex].id, editFields)
                .then(response => {
                    retrieveVereins();
                    setShowModal(false);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    };

    return (
        <>
            <h4>Vereins Liste</h4>

            <div className="form-group" style={{display: "flex"}}>
                <Button onClick={handleAddVerein} variant="primary">Neuer Verein</Button>
                <Button onClick={handleEditVerein} variant="warning">Bearbeiten</Button>
                <Button onClick={handleDeleteVerein} variant="danger">Löschen</Button>
                <div style={{ flexGrow: 1 }}/>
                <Button
                    onClick={() => setConditionOpen(!conditionOpen)}
                    aria-controls="condition-collapse"
                    aria-expanded={conditionOpen}
                    variant="info"
                > { conditionOpen ? "Filter schließen" : "Filter öffnen" } </Button>
            </div>

            <div className="form-group">
                <Collapse in={conditionOpen}>
                    <div id="condition-collapse" className="form-group">
                        <FilterForm conditionFields={conditionFields} setConditionFields={setConditionFields} onSubmit={(jsonResult) => setCondition(jsonResult)} />
                    </div>
                </Collapse>
            </div>

            <Table form-group striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {vereins.map((verein, index) => (
                        <tr key={index} onClick={() => selectedIndex == index ? setSelectedIndex(-1) : setSelectedIndex(index)} className={selectedIndex === index ? "table-selected" : ""}>
                            <td>{index + 1}</td>
                            <td>{verein.name}</td>
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

            <VereinModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                handleSave={handleSave}
                formFields={editFields}
                setFormFields={setEditFields}
            />
        </>
    );
};

export default VereinList;