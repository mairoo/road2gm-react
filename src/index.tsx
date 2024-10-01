import React from 'react';
import {createRoot} from 'react-dom/client';
import './tailwind.css';

const container = document.getElementById('root');

if (container === null) {
    throw new Error('#root element not found');
}

const root = createRoot(container);

root.render(
    <React.StrictMode>
        <h1 className="text-3xl font-bold underline">Road2GM</h1>
    </React.StrictMode>
);