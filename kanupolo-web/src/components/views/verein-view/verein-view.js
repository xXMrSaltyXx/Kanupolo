import { React, Component } from 'react';
import { Nav, TabContent } from 'react-bootstrap';
import Select from 'react-select';

import VereinDataService from '../../../services/verein.service';
import VereinInfo from './components/verein-info';
import PassList from '../../pass-list/pass-list';
import './verein-view.css';

class VereinView extends Component {
    constructor(props) {
        super(props);
        // OnChange event handler

        this.state = {
            vereins: [],
            currentVerein: null,
            activeTab: 'passes'
        };
    }

    componentDidMount() {
        this.retrieveVereins();
    }

    retrieveVereins() {
        if (this.props.verbandId) {
            VereinDataService.getByVerbandId(this.props.verbandId)
                .then(response => {
                    const vereins = response.data.map(verein => ({
                        value: verein.id,
                        label: verein.name
                    }));
                    this.setState({ vereins });
                })
                .catch(e => {
                    console.log(e);
                });
        } else {
            VereinDataService.getAllWithoutPagination()
                .then(response => {
                    const vereins = response.data.map(verein => ({
                        value: verein.id,
                        label: verein.name
                    }));
                    this.setState({ vereins });
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }

    handleSelectionChange = async (selectedOption) => {
        const vereinData = (await VereinDataService.get(selectedOption.value)).data;

        this.setState({ currentVerein: vereinData });
    }

    setActiveTab = (tab) => {
        this.setState({ activeTab: tab });
    }

    render() {
        const { vereins, currentVerein, activeTab } = this.state;

        return (
            <div>
                <Select 
                    options={vereins}
                    onChange={this.handleSelectionChange}
                    placeholder="Select Verein"
                />

                {currentVerein && !this.props.verbandId && (
                    <div className='verein-view'>
                        <Nav variant="tabs" defaultActiveKey="passes" onSelect={this.setActiveTab}>
                            <Nav.Item>
                                <Nav.Link eventKey={"passes"} >Pässe</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey={"verein"} >Verein Info</Nav.Link>
                            </Nav.Item>
                        </Nav>

                        <TabContent>
                            {activeTab === 'passes' && <PassList vereinId={currentVerein.id} />}
                            {activeTab === 'verein' && <VereinInfo vereinData={currentVerein} />}
                        </TabContent>
                    </div>
                )}
                {currentVerein && this.props.verbandId && (
                    <div className='verein-view'>
                        <PassList vereinId={currentVerein.id} />
                    </div>
                )}
            </div>
        );
    }
}

export default VereinView;