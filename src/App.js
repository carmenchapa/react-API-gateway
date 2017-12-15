import React, { Component } from 'react';

// import React from 'react';  
import { render } from 'react-dom';  

import { Provider } from 'react-redux';  
import { createStore, applyMiddleware } from "redux";
import ReduxPromise from "redux-promise";
import { Router } from 'react-router';  
import { BrowserRouter, Route } from 'react-router-dom';

import routes from './routes';
import reducers from "./reducers";

import Appp from "./components/appp";

import logo from './logo.svg';
import Categories from './components/Categories';
import './App.css';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
          <Provider store={createStoreWithMiddleware(reducers)}>
          <App />
           {/* <BrowserRouter>
              <div>
                <Route path='/categories' component={Categories} /> 
             
              </div>
            </BrowserRouter>*/}

          </Provider>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Categories/>
      </div>
    );
  }
}

export default App;
