import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import './verein-info.css';

import VerbandDataService from '../../../../services/verband.service';
import VereinDataService from '../../../../services/verein.service';

class VereinInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            verein: null,
            verband: null,
            vereinFields: {
                name: '',
                vereinCode: '',
            },
        };
    }

    retrieveVerband = async (verbandId) => {
        const response = await VerbandDataService.get(verbandId);
        this.setState({ verband: response.data });
    };

    componentDidMount() {
        const { vereinData } = this.props;
        if (vereinData) {
            this.retrieveVerband(vereinData.verbandId);
            this.setState({
                verein: vereinData,
                vereinFields: {
                    name: vereinData.name,
                    vereinCode: vereinData.vereinCode,
                },
            });
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.vereinData.id !== prevProps.vereinData.id) {
            const { vereinData } = this.props;
            this.setState({
                verein: vereinData,
                vereinFields: {
                    name: vereinData.name,
                    vereinCode: vereinData.vereinCode,
                },
            });
            this.retrieveVerband(vereinData.verbandId);
        }
    }

    handleSave = () => {
        const { vereinFields } = this.state;
        const { vereinData } = this.props;
        const updatedVerein = {
            ...vereinData,
            name: vereinFields.name,
        };

        VereinDataService.update(vereinData.id, updatedVerein)
            .then(() => {
                alert('Verein-Name updated successfully');
            })
            .catch(e => {
                console.log(e);
            });
    }

    handleNameChange = (e) => {
        const { vereinFields } = this.state;
        this.setState({
            vereinFields: {
                ...vereinFields,
                name: e.target.value,
            },
        });
    };

    render() {
        const { verein, vereinFields, verband } = this.state;

        return (
            <div className='verein-info'>
                <h3>{vereinFields.name}</h3>
                <Form>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={vereinFields.name} 
                            onChange={this.handleNameChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formCode">
                        <Form.Label>Vereins-Code</Form.Label>
                        <Form.Control 
                            disabled
                            readOnly
                            type="text" 
                            value={vereinFields.vereinCode} 
                        />
                    </Form.Group>
                    <Form.Group controlId="formVerband">
                        <Form.Label>Verband</Form.Label>
                        <Form.Control 
                            disabled
                            readOnly
                            type="text" 
                            value={verband ? verband.name : ''}
                        />
                    </Form.Group>
                    <Button disabled={vereinFields.name == (verein ? verein.name : '')} variant="primary" onClick={this.handleSave} >Speichern</Button>
                </Form>
            </div>
        );
    }
}

export default VereinInfo;