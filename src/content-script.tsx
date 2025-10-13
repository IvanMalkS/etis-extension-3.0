import 'webextension-polyfill';

import { render } from 'preact';
import { App } from './app.tsx';
import './style.css';

console.log('ЕТИС 2.1 Content Script Initialized!');

const root = document.createElement('div');
root.id = 'etis-2-1-root';
document.body.appendChild(root);

render(<App />, root);