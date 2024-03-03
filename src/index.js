import React from 'react'
import { createRoot } from 'react-dom/client'
import Timeline from './components/Timeline'

const App = () => {
  return (
    <div className="app">
      <h1>Video Editor</h1>
      <Timeline />
    </div>
  );
};

const root = document.getElementById('root')
createRoot(root).render(<App />)