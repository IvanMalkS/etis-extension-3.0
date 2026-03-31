import 'webextension-polyfill';

import { render } from 'preact';
import { App } from './app.tsx';
import './style.css';

console.log('ЕТИС 3.0 Content Script Initialized!');

const root = document.createElement('div');
root.id = 'etis-3-0-root';
document.body.appendChild(root);

render(<App />, root);

