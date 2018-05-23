import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { addValidationRule } from 'formsy-react';

import App from './App';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

addValidationRule('isFrenchPhoneNumber', (_, value) =>
  /^0[0-9]{9}$/.test(value)
);
