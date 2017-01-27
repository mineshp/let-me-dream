import React, {PropTypes} from 'react';
import Header from './common/Header';
import TopNav from './common/TopNav';
import Sidebar from './common/Sidebar';
import {connect} from 'react-redux';

class App extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <TopNav />
                <div className="col-md-3 left_col">
                    <Sidebar loading={this.props.loading} />
                </div>
                <div className="right_col" role="main">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        loading: state.numAjaxCallsInProgress > 0
    };
}

export default connect(mapStateToProps)(App);