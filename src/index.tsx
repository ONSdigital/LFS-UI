import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { CookiesProvider } from 'react-cookie';

const baseUrl = undefined;
const rootElement = document.getElementById('root');

ReactDOM.render(
    <CookiesProvider>
        <BrowserRouter basename={baseUrl}>
            <App/>
        </BrowserRouter>
    </CookiesProvider>,
  rootElement);

registerServiceWorker();
