import React from 'react';
import {createRoot} from 'react-dom/client';

const container = document.getElementById('root');

if (container === null) {
    throw new Error('#root element not found');
}

const root = createRoot(container);

root.render(
    <React.StrictMode>
        <h1>Road2GM</h1>
    </React.StrictMode>
);