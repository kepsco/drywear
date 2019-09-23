import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './components/App';
import List from './components/List';
import History from './components/History';

import store from './store';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


ReactDOM.render(
  <div>
  <div> NAVIGATION HERE</div>
  <Router>
    <Route path="/" exact component={App} />
    <Route path="/list" component={List} />
    <Route path="/history" component={History} />
  </Router></div>,
document.getElementById('root')
);
