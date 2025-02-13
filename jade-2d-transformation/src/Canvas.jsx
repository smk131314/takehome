import { useRef, useEffect } from "react";
import './App.scss';

function Canvas({ size, rotation, position, origin }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    window.addEventListener('resize', handleResize, false);
    handleResize();

  }, [size, rotation, position, origin]);
  
  const draw = (canvas, ctx, size, rotation, position, origin) => {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Save the current context state
    ctx.save();
    
    // Apply transformations
    ctx.setTransform(
      1, 0, // Horizontal scaling and skewing
      0, 1, // Vertical scaling and skewing
      canvas.width/2 + position.x, canvas.height/2 -size.height - position.y // Translation (position)
    );
    ctx.rotate((rotation * Math.PI) / 180); // Rotate in radians
    // Draw the square
    ctx.fillStyle = '#e5e7eb';
    ctx.fillRect(origin.x, origin.y, size.width, size.height);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.strokeRect(origin.x, origin.y, size.width, size.height);

    // Draw square's origin dot
    ctx.beginPath();
    ctx.arc(origin.x, origin.y + size.height, 4, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();

    // Restore the context state
    ctx.restore();
  }

  const handleResize = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    // To fit screen size
    canvas.width=window.innerWidth
    canvas.height=window.innerHeight

    // Set origin of coords as center of screen
    ctx.translate(canvas.width/2, canvas.height/2);

    // Set Y-axis to increase upward
    ctx.scale(1, -1);

    draw(canvas, ctx, size, rotation, position, origin);

    // Canvas dimensions
    const width = canvas.width;
    const height = canvas.height;
  
    // Origin is at the top-left corner (0, 0)
    const originX = 0;
    const originY = 0;

    // Draw Coords
    drawAxes(ctx, width, height, originX, originY);
    drawGrid(ctx, width, height);
    drawLabels(ctx, width, height);
  }


  // Draw the X and Y axes
  const drawAxes = (ctx, width, height, originX, originY) => {
    // Set line style
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;

    // Draw X-axis
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(width, originY);
    ctx.stroke();

    // Draw Y-axis
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(originX, height);
    ctx.stroke();
  }

  // Draw grid lines
  const drawGrid = (ctx, width, height) => {
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 0.5;

    // Vertical grid lines
    for (let x = 0; x <= width; x += 20) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Horizontal grid lines
    for (let y = 0; y <= height; y += 20) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  }

  // Draw labels for axes
  const drawLabels = (ctx, width, height) => {
    ctx.fillStyle = '#000';
    ctx.font = '12px Arial';

    // X-axis labels
    for (let x = 0; x <= width; x += 50) {
      if (x !== 0) {
        ctx.fillText(x, x - 10, 15);
      }
    }

    // Y-axis labels
    for (let y = 0; y <= height; y += 50) {
      if (y !== 0) {
        ctx.fillText(y, 5, y + 5);
      }
    }

    // Origin label
    ctx.fillText('0', 5, 15);
  }

  return (
    <canvas className="Canvas" ref={canvasRef}></canvas>
  )
}

export default Canvas;