import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './components/App/App'
import { BrowserRouter } from 'react-router-dom';
import './firebase.js'
import store from '../src/redux/store.js'
import { Provider } from "react-redux";




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>

);

