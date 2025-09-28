// obstacle.js — cute sticker log
export function drawLog(ctx, x, y, w, h){
  ctx.save();

  // main rounded log
  const edge = '#f7efe5', ink = '#161b27';
  ctx.lineJoin = ctx.lineCap = 'round';

  // cream edge
  ctx.lineWidth = Math.max(3, Math.min(6, w*0.09));
  ctx.strokeStyle = edge;
  ctx.fillStyle = '#8c582c';
  ctx.beginPath();
  roundedRect(ctx, x, y, w, h, Math.min(10, h*0.35));
  ctx.fill(); ctx.stroke();

  // ink line
  ctx.lineWidth = Math.max(2, Math.min(4, w*0.05));
  ctx.strokeStyle = ink;
  ctx.beginPath();
  roundedRect(ctx, x, y, w, h, Math.min(10, h*0.35));
  ctx.stroke();

  // end rings (left/right)
  ctx.fillStyle = '#e1b98c';
  ctx.beginPath(); ctx.arc(x + w*0.18, y + h*0.55, h*0.28, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(x + w*0.82, y + h*0.50, h*0.24, 0, Math.PI*2); ctx.fill();

  // bark lines
  ctx.strokeStyle = 'rgba(0,0,0,.25)';
  ctx.lineWidth = 2;
  const lines = [0.32,0.46,0.61,0.74];
  lines.forEach(u=>{
    ctx.beginPath();
    ctx.moveTo(x + w*0.10, y + h*u);
    ctx.quadraticCurveTo(x + w*0.50, y + h*(u-0.05), x + w*0.90, y + h*u);
    ctx.stroke();
  });

  ctx.restore();
}

// small helper
function roundedRect(ctx, x, y, w, h, r){
  const rr = Math.max(0, Math.min(r, Math.min(w,h)/2));
  ctx.moveTo(x+rr, y);
  ctx.arcTo(x+w, y,   x+w, y+h, rr);
  ctx.arcTo(x+w, y+h, x,   y+h, rr);
  ctx.arcTo(x,   y+h, x,   y,   rr);
  ctx.arcTo(x,   y,   x+w, y,   rr);
  ctx.closePath();
}
