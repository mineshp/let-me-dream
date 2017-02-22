import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import {loadCourses} from './actions/courseActions';
import {loadAuthors} from './actions/authorActions';

import './styles/styles.css'; // Webpack can import CSS files too!
import './bootstrap/bootstrap.min.js';
import './js/custom.js';
//import './bootstrap/gentelella.custom.min.js';
import './styles/bootstrap.min.css';
import './styles/custom.scss';
import './styles/font-awesome/font-awesome.min.css';
import '../node_modules/toastr/build/toastr.min.css';

const store = configureStore();
store.dispatch(loadCourses());
store.dispatch(loadAuthors());

render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById('app')
);