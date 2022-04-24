import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { createRoot } from 'react-dom/client'
import App from './App';
import configureStore from './store/configureStore'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const store = configureStore()


console.log(store.getState())

store.subscribe(() => {
  console.log('State Updates', store.getState())
})

const rootElement = document.getElementById('root');
const root = createRoot(rootElement)

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)



