import { useEffect, useState, useRef } from 'react';
import './App.scss';
import Canvas from './Canvas';
import Controller from './Controller';

function App() {
  const [size, setSize] = useState({ width: 100, height: 100 });
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [origin, setOrigin] = useState({ x: 0, y: 0 });

  return (
    <div className="App">
      <main className="PageContainer">
        <Canvas size={size} rotation={rotation} position={position} origin={origin} />
        <Controller
          handleMove={setPosition}
          handleRotate={setRotation}
          handleTransformOrigin={setOrigin}
        />
      </main>
    </div>
  );
}

export default App;
