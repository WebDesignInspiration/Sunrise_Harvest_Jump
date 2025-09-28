// obstacle.js — multiple cute sticker obstacles
const EDGE = '#f7efe5';
const INK  = '#161b27';

export function drawObstacle(ctx, o){
  // common ground shadow
  ctx.save();
  ctx.globalAlpha = 0.22;
  ctx.fillStyle = '#2a6b46';
  ctx.beginPath();
  ctx.ellipse(o.x + o.w*0.5, o.y + o.h + 6, o.w*0.55, o.h*0.28, 0, 0, Math.PI*2);
  ctx.fill();
  ctx.restore();

  switch(o.type){
    case 'stump': return drawStump(ctx, o.x, o.y, o.w, o.h);
    case 'rock':  return drawRock(ctx,  o.x, o.y, o.w, o.h);
    case 'bush':  return drawBush(ctx,  o.x, o.y, o.w, o.h);
    default:      return drawLog(ctx,   o.x, o.y, o.w, o.h); // 'log'
  }
}

// ========== base helpers ==========
function stickerStart(ctx, edgeW){
  ctx.save();
  ctx.lineJoin = ctx.lineCap = 'round';
  ctx.lineWidth = edgeW;         // cream edge first
  ctx.strokeStyle = EDGE;
}
function stickerInk(ctx, inkW){
  ctx.lineWidth = inkW;          // ink line on top
  ctx.strokeStyle = INK;
}
function roundedRect(ctx, x, y, w, h, r){
  const rr = Math.max(0, Math.min(r, Math.min(w,h)/2));
  ctx.moveTo(x+rr, y);
  ctx.arcTo(x+w, y,   x+w, y+h, rr);
  ctx.arcTo(x+w, y+h, x,   y+h, rr);
  ctx.arcTo(x,   y+h, x,   y,   rr);
  ctx.arcTo(x,   y,   x+w, y,   rr);
  ctx.closePath();
}

// ========== Variants ==========
export function drawLog(ctx, x, y, w, h){
  stickerStart(ctx, Math.max(3, w*0.09));
  ctx.fillStyle = '#8c582c';
  ctx.beginPath(); roundedRect(ctx, x, y, w, h, Math.min(10, h*0.35));
  ctx.fill(); ctx.stroke();
  // ink line
  stickerInk(ctx, Math.max(2, w*0.05));
  ctx.beginPath(); roundedRect(ctx, x, y, w, h, Math.min(10, h*0.35));
  ctx.stroke();

  // end rings
  ctx.fillStyle = '#e1c39b';
  ctx.beginPath(); ctx.arc(x + w*0.20, y + h*0.55, h*0.28, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(x + w*0.82, y + h*0.48, h*0.24, 0, Math.PI*2); ctx.fill();

  // bark lines
  ctx.strokeStyle = 'rgba(0,0,0,.25)';
  ctx.lineWidth = 2;
  [0.34,0.52,0.70].forEach(u=>{
    ctx.beginPath();
    ctx.moveTo(x + w*0.10, y + h*u);
    ctx.quadraticCurveTo(x + w*0.50, y + h*(u-0.06), x + w*0.90, y + h*u);
    ctx.stroke();
  });
  ctx.restore();
}

function drawStump(ctx, x, y, w, h){
  // squat & wider
  stickerStart(ctx, Math.max(3, w*0.09));
  ctx.fillStyle = '#9a6a39';
  ctx.beginPath(); roundedRect(ctx, x, y, w, h, 10);
  ctx.fill(); ctx.stroke();
  stickerInk(ctx, Math.max(2, w*0.05));
  ctx.beginPath(); roundedRect(ctx, x, y, w, h, 10); ctx.stroke();
  // growth top ellipse
  ctx.fillStyle = '#e7c7a0';
  ctx.beginPath(); ctx.ellipse(x+w*0.5, y+h*0.25, w*0.36, h*0.18, 0, 0, Math.PI*2); ctx.fill();
  // little root notches
  ctx.strokeStyle = INK; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(x+w*0.15,y+h-4); ctx.lineTo(x+w*0.10,y+h+2); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x+w*0.85,y+h-4); ctx.lineTo(x+w*0.90,y+h+2); ctx.stroke();
  ctx.restore();
}

function drawRock(ctx, x, y, w, h){
  stickerStart(ctx, Math.max(3, w*0.09));
  ctx.fillStyle = '#7e8a98';
  ctx.beginPath();
  ctx.moveTo(x+w*0.15, y+h*0.30);
  ctx.lineTo(x+w*0.45, y+h*0.18);
  ctx.lineTo(x+w*0.80, y+h*0.32);
  ctx.lineTo(x+w*0.88, y+h*0.68);
  ctx.lineTo(x+w*0.55, y+h*0.82);
  ctx.lineTo(x+w*0.22, y+h*0.72);
  ctx.closePath();
  ctx.fill(); ctx.stroke();
  stickerInk(ctx, Math.max(2, w*0.05));
  ctx.beginPath();
  ctx.moveTo(x+w*0.15, y+h*0.30);
  ctx.lineTo(x+w*0.45, y+h*0.18);
  ctx.lineTo(x+w*0.80, y+h*0.32);
  ctx.lineTo(x+w*0.88, y+h*0.68);
  ctx.lineTo(x+w*0.55, y+h*0.82);
  ctx.lineTo(x+w*0.22, y+h*0.72);
  ctx.closePath();
  ctx.stroke();
  // facets
  ctx.strokeStyle = 'rgba(0,0,0,.20)';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(x+w*0.45,y+h*0.18); ctx.lineTo(x+w*0.48,y+h*0.60); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x+w*0.30,y+h*0.30); ctx.lineTo(x+w*0.26,y+h*0.65); ctx.stroke();
  ctx.restore();
}

function drawBush(ctx, x, y, w, h){
  stickerStart(ctx, Math.max(3, w*0.09));
  ctx.fillStyle = '#2fa45e';
  ctx.beginPath();
  // 3-lobed bush
  const r = h*0.55;
  ctx.arc(x+w*0.30, y+h*0.65, r*0.85, Math.PI, 0);
  ctx.arc(x+w*0.55, y+h*0.55, r,  Math.PI, 0);
  ctx.arc(x+w*0.78, y+h*0.65, r*0.85, Math.PI, 0);
  ctx.lineTo(x+w*0.92, y+h); ctx.lineTo(x+w*0.08, y+h); ctx.closePath();
  ctx.fill(); ctx.stroke();
  stickerInk(ctx, Math.max(2, w*0.05));
  ctx.beginPath();
  ctx.arc(x+w*0.30, y+h*0.65, r*0.85, Math.PI, 0);
  ctx.arc(x+w*0.55, y+h*0.55, r,  Math.PI, 0);
  ctx.arc(x+w*0.78, y+h*0.65, r*0.85, Math.PI, 0);
  ctx.lineTo(x+w*0.92, y+h); ctx.lineTo(x+w*0.08, y+h); ctx.closePath();
  ctx.stroke();
  // leaf lines
  ctx.strokeStyle = 'rgba(0,0,0,.20)'; ctx.lineWidth = 2;
  [0.30,0.55,0.78].forEach(cx=>{
    ctx.beginPath();
    ctx.moveTo(x+w*cx, y+h*0.68);
    ctx.quadraticCurveTo(x+w*cx, y+h*0.58, x+w*cx, y+h*0.50);
    ctx.stroke();
  });
  ctx.restore();
}
