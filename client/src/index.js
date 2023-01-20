import {createRoot} from 'react-dom/client'

const container = document.getElementById('root');

if (!container) {
    throw new Error(`root container is not found. Can't mount App.`)
}

const root = createRoot(container);
root.render()
