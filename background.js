// background.js — simple parallax forest

// Helper: soft vertical sky gradient
function sky(ctx, W, H){
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, "#d7ecff");   // light top
  g.addColorStop(1, "#bfe3ff");   // soft bottom
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
}

// Helper: repeat a simple shape across the width with parallax offset
function repeatAcross(ctx, W, spacing, off, drawOne){
  const start = -spacing + (-(off % spacing));
  for(let x = start; x < W + spacing; x += spacing){
    drawOne(x);
  }
}

// A single pine (triangles) with a sticker-like outline
function pine(ctx, x, baseY, s, ink="#1b2434", fill="#274a2c", edge="#f7efe5"){
  ctx.save();
  ctx.lineJoin = "round"; ctx.lineCap="round";

  const edgeW = Math.max(2, s*0.06);
  const inkW  = Math.max(1.2, s*0.03);

  // stem
  ctx.fillStyle = "#5b3a22";
  ctx.fillRect(x - s*0.08, baseY - s*0.20, s*0.16, s*0.20);

  // tree body path (3 stacked triangles)
  const path = () => {
    ctx.moveTo(x, baseY - s*0.95);
    ctx.lineTo(x - s*0.55, baseY - s*0.55);
    ctx.lineTo(x + s*0.55, baseY - s*0.55);
    ctx.closePath();

    ctx.moveTo(x, baseY - s*0.70);
    ctx.lineTo(x - s*0.65, baseY - s*0.30);
    ctx.lineTo(x + s*0.65, baseY - s*0.30);
    ctx.closePath();

    ctx.moveTo(x, baseY - s*0.43);
    ctx.lineTo(x - s*0.75, baseY - s*0.06);
    ctx.lineTo(x + s*0.75, baseY - s*0.06);
    ctx.closePath();
  };

  // edge
  ctx.strokeStyle = edge; ctx.lineWidth = edgeW; ctx.beginPath(); path(); ctx.stroke();
  // ink
  ctx.strokeStyle = ink;  ctx.lineWidth = inkW;  ctx.beginPath(); path(); ctx.stroke();
  // fill
  ctx.fillStyle = fill; ctx.beginPath(); path(); ctx.fill();

  ctx.restore();
}

// Low shrubs for near layer
function bush(ctx, x, y, w){
  ctx.save();
  ctx.fillStyle = "#2fa45e";
  ctx.beginPath();
  ctx.arc(x - w*0.25, y, w*0.35, Math.PI, 0);
  ctx.arc(x,           y, w*0.42, Math.PI, 0);
  ctx.arc(x + w*0.30,  y, w*0.32, Math.PI, 0);
  ctx.lineTo(x + w*0.60, y + w*0.18);
  ctx.lineTo(x - w*0.60, y + w*0.18);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

export function drawBackground(ctx, W, H, GY, off){
  // 1) Sky
  sky(ctx, W, H);

  // 2) Sun
  ctx.save();
  ctx.fillStyle = "#f7d9a2";
  ctx.beginPath();
  ctx.arc(W*0.14, H*0.22, Math.min(W,H)*0.07, 0, Math.PI*2);
  ctx.fill();
  ctx.restore();

  // 3) Far hills (very light, behind trees)
  ctx.save();
  ctx.fillStyle = "#cfe2f4";
  ctx.beginPath();
  ctx.moveTo(0, GY - 120);
  for(let x=0; x<=W; x+=40){
    const y = GY - 120 - 20*Math.sin((x+off*0.1)/110);
    ctx.lineTo(x, y);
  }
  ctx.lineTo(W, GY); ctx.lineTo(0, GY); ctx.closePath(); ctx.fill();
  ctx.restore();

  // 4) Tree layers (parallax)
  // far pines
  ctx.save();
  repeatAcross(ctx, W, 140, off*0.25, (x)=>{
    pine(ctx, x, GY - 10, 90, "#1b2434", "#2f5738");
  });
  ctx.restore();

  // mid pines
  ctx.save();
  repeatAcross(ctx, W, 170, off*0.45, (x)=>{
    pine(ctx, x+30, GY + 6, 120, "#1b2434", "#2c5034");
  });
  ctx.restore();

  // near shrubs
  ctx.save();
  repeatAcross(ctx, W, 220, off*0.85, (x)=>{
    bush(ctx, x, GY - 6, 120);
  });
  ctx.restore();

  // 5) Ground strip (kept flat so gameplay stays clear)
  ctx.fillStyle = "#3aa655";
  ctx.fillRect(0, GY, W, H - GY);
}
