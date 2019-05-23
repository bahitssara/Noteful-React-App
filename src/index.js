import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import history from '../src/history'
import { Router } from 'react-router-dom'

ReactDOM.render(
<Router history={history}>
    <App />
</Router>,
document.getElementById('root'));


