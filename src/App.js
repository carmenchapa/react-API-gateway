import React, { Component } from 'react';

// import React from 'react';  
import { render } from 'react-dom';  
import configureStore from './store/configureStore';  
import { Provider } from 'react-redux';  
import { Router } from 'react-router';  
import { BrowserRouter, Route } from 'react-router-dom';

import CatsPage from './components/cats/CatsPage';  
import CatPage from './components/cats/CatPage';
import NewCatPage from './components/cats/NewCatPage';

import routes from './routes';

import logo from './logo.svg';
import Categories from './components/Categories';
import './App.css';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
          <Provider store={store}>
            <BrowserRouter>
              <div>
                <Route path='/categories' component={Categories} /> 
                <Route path="/cats" component={CatsPage} />
                <Route path="/cats/new" component={NewCatPage} />
                <Route path="/cats/:id" component={CatPage} />
              </div>
            </BrowserRouter>

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
