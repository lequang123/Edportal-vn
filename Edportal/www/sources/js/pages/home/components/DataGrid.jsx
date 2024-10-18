import React, { PureComponent } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../homeAction';
import Table from 'react-bootstrap/Table'

class DataGrid extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            person: []
        };
    }

    componentDidUpdate = () => {
            this.setState({
                person: this.props.GridData
            });
    }

    handleAdd = () => {
        this.props.setCreateBusinessPopup({show: true});
    }

    handleEdit = () => {

    }

    handleDelete = () => {
        
    }

    render() {
        const {person} = this.state;
        return (
            <div>
                <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>PersonID</th>
                    <th>Last Name</th>
                    <th>First Name</th>
                    </tr>
                </thead>
                <tbody>
                {
                    person.map((info) => 
                    <tr key={`person-${info.personID}`}>
                        <td>
                            {info.personID}
                        </td>
                        <td>
                            {info.lastName}
                        </td>
                        <td>
                            {info.firstName}
                        </td>
                        <td>
                            <span className="mr-3 fa fa-plus" 
                                onClick={() => this.handleAdd()}
                            />
                            <span className="mr-3 fa fa-pencil-square-o"
                            onClick={() => this.handleEdit()}
                            />
                            <span className="fa fa-trash icon-delete"
                                onClick={() => this.handleDelete()}
                            />
                        </td>
                    </tr>
                    )
                }
                </tbody>
                </Table>

            </div>
        )
    }
}


const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { 
        GridData
    } = state;
    return {
        GridData
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);
