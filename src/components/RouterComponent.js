import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeRoute } from '../actions/pageActions';
import MotherComponent from './MotherComponent';
import LoginComponent from './LoginComponent';
import ViewerComponent from './ViewerComponent';

let LOGIN = 'login';
let EDITOR = 'editor';
let VIEWER = 'viewer';

class RouterComponent extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const BASE_URL = 'http://localhost:3000/';
        let route = window.location.href.replace(BASE_URL, '');
        console.log('loading route => ' + route);
        this.props.changeRoute(route);
    }

    render() {
        let component = <ViewerComponent renderableElements={this.props.renderableElements} />
        switch (this.props.routeName) {
            case LOGIN:
                component = <LoginComponent />
                break;
            case EDITOR:
                component = <MotherComponent />
                break;
            case VIEWER:
                component = <ViewerComponent renderableElements={this.props.renderableElements} />
                break;
        }
        return (
            <div>
            {component}
            </div>
        );
    }

}

const mapStateToProps = state => ({
    routeName: state.app.routeName,
    renderableElements: state.app.renderableElements
});

const mapDispatchToProps = dispatch => {
    return {
        changeRoute: (route) => {
            dispatch(changeRoute(route))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RouterComponent);
