import { React, Component } from 'react';
import { Nav, TabContent } from 'react-bootstrap';
import Select from 'react-select';

import './verband-view.css';
import VerbandDataService from '../../../services/verband.service';
import VerbandInfo from './components/verband-info';
import VereinList from '../../verein-list/verein-list';
import VereinView from '../verein-view/verein-view';

class VerbandView extends Component {
    constructor(props) {
        super(props);
        // OnChange event handler

        this.state = {
            verbands: [],
            currentVerband: null,
            activeTab: 'verband'
        };
    }

    componentDidMount() {
        this.retrieveVerbands();
    }

    retrieveVerbands() {
        VerbandDataService.getAllWithoutPagination()
            .then(response => {
                const verbands = response.data.map(verband => ({
                    value: verband.id,
                    label: verband.name
                }));
                this.setState({ verbands });
            })
            .catch(e => {
                console.log(e);
            });
    }

    handleSelectionChange = async (selectedOption) => {
        const verbandData = (await VerbandDataService.get(selectedOption.value)).data;

        this.setState({ currentVerband: verbandData });
    }

    setActiveTab = (tab) => {
        this.setState({ activeTab: tab });
    }

    render() {
        const { verbands, currentVerband, activeTab } = this.state;

        return (
            <>
                <Select 
                    options={verbands}
                    onChange={this.handleSelectionChange}
                    placeholder="Select Verband"
                />

                {currentVerband && (
                    <div className='verband-view'>
                        <Nav variant="tabs" defaultActiveKey="verband" onSelect={this.setActiveTab}>
                            <Nav.Item>
                                <Nav.Link eventKey={"passes"} >Pässe</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey={"vereins"} >Vereine</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey={"verband"} >Verband Info</Nav.Link>
                            </Nav.Item>
                        </Nav>

                        <TabContent>
                            {activeTab === 'passes' &&  <VereinView verbandId={currentVerband.id} />}
                            {activeTab === 'vereins' && <VereinList verbandId={currentVerband.id}/>}
                            {activeTab === 'verband' && <VerbandInfo id={currentVerband.id} name={currentVerband.name} />}
                        </TabContent>
                    </div>
                )}
            </>
        );
    }
}

export default VerbandView;