import { useRef, useEffect } from "react";
import './App.scss';

function Canvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillRect(0, 0, 100, 100);
    }
  }, [])
  
  return (
    <canvas className="Canvas" ref={canvasRef}></canvas>
  )
}

export default Canvas;