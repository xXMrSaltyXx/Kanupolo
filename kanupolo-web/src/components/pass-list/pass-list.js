import React from 'react';
import PassDataService from "../../services/pass.service";
import { useState, useEffect } from 'react';
import PassModal from "./pass-modal";
import { Table, Button, Form } from 'react-bootstrap';

const PassList = ({ vereinId }) => {
    const [passes, setPasses] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);

    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [editFields, setEditFields] = useState({ 
        firstname: '',
        lastname: '',
        birthdate: '',
        passNumber: '',
        approvalDate: '',
        vereinId: null,
        joinDate: ''
    });

    const retrievePasses = (vereinId) => {
        if (vereinId) {
            PassDataService.getByVereinId(vereinId)
                .then(response => {
                    setPasses(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        } else {
            PassDataService.getAllPagionation(page, size)
                .then(response => {
                    setPasses(response.data.items);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }

    useEffect(() => {
        retrievePasses(vereinId);
    }, [page, size, vereinId]);

    const handleAddPass = () => {
        setModalType('create');
        setEditFields({ 
            firstname: '',
            lastname: '',
            birthdate: '',
            passNumber: '',
            approvalDate: '',
            vereinId: vereinId ?? null,
            joinDate: ''
        });
        setShowModal(true);
    };
    
    const handleEditPass = () => {
        if (selectedIndex >= 0) {
            setModalType('edit');
            setEditFields({ 
                firstname: passes[selectedIndex].firstname,
                lastname: passes[selectedIndex].lastname,
                birthdate: passes[selectedIndex].birthdate,
                passNumber: passes[selectedIndex].passNumber,
                approvalDate: passes[selectedIndex].approvalDate,
                vereinId: passes[selectedIndex].vereinId,
                joinDate: passes[selectedIndex].joinDate
            });
            setShowModal(true);
        }
    };

    const handleDeletePass = () => {
        if (selectedIndex >= 0) {
            PassDataService.delete(passes[selectedIndex].id)
                .then(response => {
                    retrievePasses(vereinId);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    };

    const handleSave = (data) => {
        if (modalType === 'create') {
            PassDataService.create(data)
                .then(response => {
                    retrievePasses(vereinId);
                    setShowModal(false);
                })
                .catch(e => {
                    console.log(e);
                });
        } else if (modalType === 'edit') {
            PassDataService.update(passes[selectedIndex].id, data)
                .then(response => {
                    retrievePasses(vereinId);
                    setShowModal(false);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    };

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('de-DE', options);
    };

    return (
        <>
            <h4>Pass Liste</h4>

            <div className="form-group" style={{display: "flex"}}>
                <Button onClick={handleAddPass} variant="primary">Neuer Pass</Button>
                <Button onClick={handleEditPass} variant="warning">Bearbeiten</Button>
                <Button onClick={handleDeletePass} variant="danger">Löschen</Button>
            </div> 

            <Table form-group striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Vorname</th>
                        <th>Nachname</th>
                        <th>Geburtsdatum</th>
                        <th>Passnummer</th>
                        <th>Genehmigungsdatum</th>
                        <th>Verein</th>
                        <th>Beitrittsdatum</th>
                    </tr>
                </thead>
                <tbody>
                    {passes.map((pass, index) => (
                        <tr key={index} onClick={() => selectedIndex == index ? setSelectedIndex(-1) : setSelectedIndex(index)} className={selectedIndex === index ? "table-selected" : ""}>
                            <td>{index + 1}</td>
                            <td>{pass.firstname}</td>
                            <td>{pass.lastname}</td>
                            <td>{formatDate(pass.birthdate)}</td>
                            <td>{pass.passNumber}</td>
                            <td>{formatDate(pass.approvalDate)}</td>
                            <td>{pass.verein?.name ?? 'null'}</td>
                            <td>{formatDate(pass.joinDate)}</td>
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

            <PassModal
                restricted={vereinId ? true : false}
                show={showModal}
                handleClose={() => setShowModal(false)}
                handleSave={handleSave}
                initialData={editFields}
            />
        </>
    );
};

export default PassList;