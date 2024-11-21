import VerbandDataService from "../../services/verband.service";
import { React, useState, useEffect } from 'react';
import './verband-list.css';
import VerbandModal from "./verband-modal";

import { Table, Button, Collapse, Form } from 'react-bootstrap';

const VerbandList = () => {
    const [verbands, setVerbands] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const [page, setPage] = useState(0); 
    const [size, setSize] = useState(10); 

    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [editFields, setEditFields] = useState({ name: '' });

    const retrieveVerbands = () => {
        VerbandDataService.getAllPagionation(page, size)
            .then(response => {
                setVerbands(response.data.items);
            })
            .catch(e => {
                console.log(e);
            });
    }

    useEffect(() => {
        retrieveVerbands();
    }, [page, size]);

    const handleAddVerband = () => {
        setModalType('create');
        setEditFields({ name: '' });
        setShowModal(true);
    };

    const handleEditVerband = (index) => {
        if (selectedIndex >= 0) {
            setModalType('edit');
            setEditFields({ name: verbands[selectedIndex].name });
            setShowModal(true);
        }
    };

    const handleDeleteVerband = (index) => {
        if (selectedIndex >= 0) {
            VerbandDataService.delete(verbands[selectedIndex].id)
                .then(response => {
                    retrieveVerbands();
                })
                .catch(e => {
                    console.log(e);
                });
        }
    };

    const handleSave = () => {
        if (modalType === 'create') {
            VerbandDataService.create(editFields)
                .then(response => {
                    retrieveVerbands();
                    setShowModal(false);
                })
                .catch(e => {
                    console.log(e);
                });
        } else if (modalType === 'edit') {
            VerbandDataService.update(verbands[selectedIndex].id, editFields)
                .then(response => {
                    retrieveVerbands();
                    setShowModal(false);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    };

    return (
        <>
            <h4>Verbands Liste</h4>

            <div className="form-group" style={{display: "flex"}}> 
                <Button onClick={handleAddVerband} variant="primary">Neuer Verband</Button>
                <Button onClick={handleEditVerband} variant="warning">Bearbeiten</Button>
                <Button onClick={handleDeleteVerband} variant="danger">Löschen</Button>
            </div>

            <Table form-group striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {verbands.map((verband, index) => (
                        <tr key={index} onClick={() => selectedIndex == index ? setSelectedIndex(-1) : setSelectedIndex(index)} className={selectedIndex === index ? "table-selected" : ""}>
                            <td>{index + 1}</td>
                            <td>{verband.name}</td>
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
            
            <VerbandModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                handleSave={handleSave}
                formFields={editFields}
                setFormFields={setEditFields}
            />
        </>
    );
};

export default VerbandList;