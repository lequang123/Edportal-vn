import React, { Component, Fragment } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../homeAction';
import DataGrid from './DataGrid';
import Create from './Create';
import LangHelper from '@jsroot/common/langHelper';

export class AppContainer extends Component {
    static propTypes = {
        createBusinessPopup: PropTypes.shape({ show: PropTypes.bool }).isRequired,
        getAllDataBusiness: PropTypes.func
    };

    static defaultProps = {
        createBusinessPopup: { show: false },
        getAllDataBusiness: function () {
            // nothing
        }
    };

    componentDidMount() {
        this.props.getAllDataBusiness();
    }

    handleCloseCreatePopup = () => {
        this.props.setCreateBusinessPopup({ show: false });
        this.props.setCreateBusinessResult(null);
    };

    handleCreateSuccess = () => {
        this.handleCloseCreatePopup();
        this.props.getAllDataBusiness();
    };
    render() {
        return (
            <Fragment>
               <DataGrid />
                {
                    this.props.createBusinessPopup.show &&
                    <Create
                        onClose={this.handleCloseCreatePopup}
                        onSuccess={this.handleCreateSuccess}
                    />
                }
            </Fragment>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const {
        createBusinessPopup,
        setCreateBusinessResult
    } = state;
    return {
        createBusinessPopup,
        setCreateBusinessResult
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
