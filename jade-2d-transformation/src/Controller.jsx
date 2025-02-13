import { useEffect, useState, useRef } from 'react';
import './App.scss';

function Controller({ handleMove, handleRotate, handleTransformOrigin }) {
  const [position, setPosition] = useState([(0,100),(100,100),(100,0),(0,0)]);

  return (
    <aside className="Controller">
      <h1>Controller</h1>
      <section>
        <h2>Position(coords)</h2>
        <ol className='TextContainer'>
          <li>left, top : <span>{position[0]}</span></li>
          <li>right, top : <span>{position[1]}</span></li>
          <li>right, bottom : <span>{position[2]}</span></li>
          <li>left, bottom : <span>{position[3]}</span></li>
        </ol>
      </section>
      <section>
        <h2>Move(coords)</h2>
        <div className='InputsContainer TextContainer'>
          <label>
            x :
            <input type="number" name="moveX" step="1" value="0" onChange={handleMove} />
          </label>
          <label>
            y :
            <input type="number" name="moveY" step="1" value="0" onChange={handleMove} />
          </label>
        </div>
      </section>
      <section>
        <h2>Rotate(deg)</h2>
        <div className='InputsContainer TextContainer'>
          <label>
            angle: 
            <input type="number" name="rotate" step="1" value="0" onChange={handleRotate} />
          </label>
        </div>
      </section>
      <section>
        <h2>Transform Origin(coords)</h2>
        <div className='InputsContainer TextContainer'>
          <label>
            x :
            <input type="number" name="originX" step="1" value="0" onChange={handleTransformOrigin} />
          </label>
          <label>
            y :
            <input type="number" name="originY" step="1" value="0" onChange={handleTransformOrigin}/>
          </label>
        </div>
      </section>
    </aside>
  )
}

export default Controller;