import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import './verband-info.css';
import VerbandDataService from '../../../../services/verband.service';

class VerbandInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            name: '',
        };
    }

    componentDidMount() {
        const { id,name } = this.props;
        if (id) {
            this.setState({
                id: id,
                name: name,
            });
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id) {
            const { id,name } = this.props;
            this.setState({
                id: id,
                name: name,
            });
        }
    }

    handleSave = () => {
        const { name } = this.state;
        const { id } = this.props;
        const updatedVerband = {
            name: name,
        };

        VerbandDataService.update(id, updatedVerband)
            .then(() => {
                alert('Verband-Name updated successfully');
            })
            .catch(e => {
                console.log(e);
            });
    }

    handleNameChange = (e) => {
        const { name } = this.state;
        this.setState({
            name: e.target.value
        });
    };

    render() {
        const { name } = this.state;

        return (
            <div className='verband-view'>
                <h3>{name}</h3>
                <Form>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={name} 
                            onChange={this.handleNameChange}
                        />
                    </Form.Group>
                    <Button disabled={name == this.props.name} variant="primary" onClick={this.handleSave} >Speichern</Button>
                </Form>
            </div>
        );
    }
}

export default VerbandInfo;