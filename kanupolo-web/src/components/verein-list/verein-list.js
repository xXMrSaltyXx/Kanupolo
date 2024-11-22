import React from 'react';
import VereinDataService from "../../services/verein.service";
import { useState, useEffect } from 'react';
import VereinModal from "./verein-modal";
import { Table, Button, Form } from 'react-bootstrap';

const VereinList = ({ verbandId }) => {
    const [vereins, setVereins] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);

    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [editFields, setEditFields] = useState({ 
        name: '' ,
        vereinCode: '',
        verbandId: ''
    });

    const retrieveVereins = (verbandId) => {
        if (verbandId) {
            VereinDataService.getByVerbandId(verbandId)
                .then(response => {
                    setVereins(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        } else {
            console.log(verbandId);
            VereinDataService.getAllPagionation(page, size)
                .then(response => {
                    setVereins(response.data.items);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }

    useEffect(() => {
        retrieveVereins(verbandId);
    }, [page, size, verbandId]);

    const handleAddVerein = () => {
        setModalType('create');
        setEditFields({ 
            name: '' ,
            vereinCode: '',
            verbandId: verbandId ?? null
        });
        setShowModal(true);
    };

    const handleEditVerein = () => {
        if (selectedIndex >= 0) {
            setModalType('edit');
            setEditFields({ 
                name: vereins[selectedIndex].name,
                vereinCode: vereins[selectedIndex].vereinCode,
                verbandId: vereins[selectedIndex].verbandId
            });
            setShowModal(true);
        }
    };

    const handleDeleteVerein = () => {
        if (selectedIndex >= 0) {
            VereinDataService.delete(vereins[selectedIndex].id)
                .then(response => {
                    retrieveVereins(verbandId);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    };

    const handleSave = (data) => {
        if (modalType === 'create') {
            VereinDataService.create(data)
                .then(response => {
                    retrieveVereins(verbandId);
                    setShowModal(false);
                })
                .catch(e => {
                    console.log(e);
                });
        } else if (modalType === 'edit') {
            VereinDataService.update(vereins[selectedIndex].id, data)
                .then(response => {
                    retrieveVereins(verbandId);
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
            </div>

            <Table form-group striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Vereins-Code</th>
                        <th>Verband</th>
                    </tr>
                </thead>
                <tbody>
                    {vereins.map((verein, index) => (
                        <tr key={index} onClick={() => selectedIndex == index ? setSelectedIndex(-1) : setSelectedIndex(index)} className={selectedIndex === index ? "table-selected" : ""}>
                            <td>{index + 1}</td>
                            <td>{verein.name}</td>
                            <td>{verein.vereinCode}</td>
                            <td>{verein.verband?.name ?? null}</td>
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
                restricted={verbandId ? true : false}
                show={showModal}
                handleClose={() => setShowModal(false)}
                handleSave={handleSave}
                initialData={editFields}
            />
        </>
    );
};

export default VereinList;