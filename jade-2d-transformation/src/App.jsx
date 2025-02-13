import { useEffect, useState, useRef } from 'react';
import './App.scss';
import Canvas from './Canvas';
import Controller from './Controller';

function App() {
  
  return (
    <div className="App">
      <main className="PageContainer">
        <Canvas />
        <Controller />
      </main>
    </div>
  );
}

export default App;
