import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducer from './reducers'
import App from './containers/App'

const middleware = [ thunk ]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

// const store = createStore(
//   reducer,
//   applyMiddleware(...middleware)
// )

const store = createStore(
  reducer,
  compose(
   applyMiddleware(thunk),
   window.devToolsExtension ? window.devToolsExtension() : f => f
 ))

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
