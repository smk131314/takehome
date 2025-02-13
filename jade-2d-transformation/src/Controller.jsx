import { useEffect, useState, useRef } from 'react';
import './App.scss';

function Controller({ size, position, rotation, origin, handleMove, handleRotate, handleTransformOrigin }) {
  const [corners, setCorners] = useState([{ x:0, y:0 }, { x:0, y:0 }, { x:0, y:0 }, { x:0, y:0 }]); // Top-left, Top-right, Bottom-right, Bottom-left

  useEffect(() => {
    setCorners(getTransformedCorners(size, position, rotation, origin))
  }, [rotation, position, origin])
  
  const transformPoint = (x, y, tx, ty, rotation, sx = 1, sy = 1) => {
    const theta = (rotation * Math.PI) / 180; // Convert degrees to radians
    const cosTheta = Math.cos(theta);
    const sinTheta = Math.sin(theta);
  
    // Apply transformation matrix
    const xTransformed = sx * (x * cosTheta - y * sinTheta) + tx;
    const yTransformed = sy * (x * sinTheta + y * cosTheta) + ty;
  
    return { x: xTransformed, y: yTransformed };
  };
  
  const getTransformedCorners = (size, position, rotation, origin) => {
    const { width, height } = size;
    const { x: tx, y: ty } = position;
  
    // Original corners (centered at origin)
    const corners = [
      { x: origin.x, y: origin.y + height }, // Top-left
      { x: origin.x + width, y: origin.y + height },  // Top-right
      { x: origin.x + width, y: origin.y },   // Bottom-right
      { x: origin.x, y: origin.y },  // Bottom-left
    ];
  
    // Transform each corner
    return corners.map(({ x, y }) => transformPoint(x, y, tx, ty, rotation));
  };

  return (
    <aside className="Controller">
      <h1>Controller</h1>
      <section>
        <h2>Position(coords)</h2>
        <ol className='TextContainer'>
          <li>left, top : <span>{corners[0].x.toFixed(2)} , {corners[0].y.toFixed(2)}</span></li>
          <li>right, top : <span>{corners[1].x.toFixed(2)} , {corners[1].y.toFixed(2)}</span></li>
          <li>right, bottom : <span>{corners[2].x.toFixed(2)} , {corners[2].y.toFixed(2)}</span></li>
          <li>left, bottom : <span>{corners[3].x.toFixed(2)} , {corners[3].y.toFixed(2)}</span></li>
        </ol>
      </section>
      <section>
        <h2>Move(coords)</h2>
        <div className='InputsContainer TextContainer'>
          <label>
            x :
            <input type="number" name="moveX" step="1" value={position.x} onChange={e => {handleMove('x', e.target.value)}} />
          </label>
          <label>
            y :
            <input type="number" name="moveY" step="1" value={position.y} onChange={e => {handleMove('y', e.target.value)}} />
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