// fox.js  — sticker-style leaping fox
export function drawFox(ctx, x, y, w, h, vy, onGround, groundY){
  const t = performance.now()/1000;
  const run = onGround ? (Math.sin(t*10)*0.5+0.5) : 0.5;

  // --- SHADOW (flat, not transformed) ---
  ctx.save();
  ctx.globalAlpha = 0.22;
  ctx.fillStyle = '#275d3e';
  const shW = w * (onGround ? 1.05 : 0.85);
  const shH = h * 0.30;
  ctx.beginPath();
  ctx.ellipse(x + w*0.5, groundY + 7, shW, shH, 0, 0, Math.PI*2);
  ctx.fill();
  ctx.restore();

  // --- Pose: gentle tilt & squash/stretch (more “leap” feeling) ---
  const tilt = Math.max(-0.22, Math.min(0.14, -vy/1600)); // nose up when rising
  const stretch = onGround ? 1 - Math.min(0.06, Math.abs(vy)*0.00005)
                           : 1 + Math.min(0.09, Math.abs(vy)*0.00007);
  const squishX = 1 / stretch;

  // local transform
  ctx.save();
  ctx.translate(x + w*0.50, y + h*0.55);
  ctx.rotate(tilt);
  ctx.scale(squishX, stretch);
  ctx.translate(-w*0.50, -h*0.55);

  // Helper for sticker shapes (cream edge + ink line + fill)
  function sticker(path, fill, ink='#161b27', edge='#f7efe5', edgeW=w*0.11, inkW=w*0.035){
    ctx.save();
    ctx.lineJoin = ctx.lineCap = 'round';
    // edge
    ctx.lineWidth = Math.max(2, edgeW);
    ctx.strokeStyle = edge;
    ctx.beginPath(); path(); ctx.stroke();
    // ink
    ctx.lineWidth = Math.max(1.8, inkW);
    ctx.strokeStyle = ink;
    ctx.beginPath(); path(); ctx.stroke();
    // fill
    ctx.fillStyle = fill;
    ctx.beginPath(); path(); ctx.fill();
    ctx.restore();
  }

  // Colors
  const ORANGE = '#c65a23';       // main
  const ORANGE_D = '#9d4319';     // shade (legs)
  const CREAM  = '#f6dfc5';       // belly/face/tail tip
  const INK    = '#191f2d';

  // --- Curvy Tail (with white tip and little wag) ---
  sticker(() => {
    const wag = 0.05*Math.sin(t*7);
    ctx.moveTo(w*0.16, h*0.63);
    ctx.quadraticCurveTo(w*(0.00+wag), h*(0.52+wag), w*0.10, h*0.28);
    ctx.quadraticCurveTo(w*0.36, h*0.30, w*0.46, h*0.58);
    ctx.closePath();
  }, ORANGE, INK);

  // Tail tip (cream patch)
  ctx.save();
  ctx.fillStyle = CREAM;
  ctx.beginPath();
  ctx.moveTo(w*0.11, h*0.32);
  ctx.quadraticCurveTo(w*0.19, h*0.39, w*0.19, h*0.53);
  ctx.quadraticCurveTo(w*0.15, h*0.54, w*0.10, h*0.44);
  ctx.closePath();
  ctx.fill(); ctx.restore();

  // --- Long Body (rounded rectangle)
  sticker(() => {
    const r=w*0.13, bx=w*0.20, by=h*0.28, bw=w*0.56, bh=h*0.46;
    ctx.moveTo(bx+r, by);
    ctx.lineTo(bx+bw-r, by); ctx.quadraticCurveTo(bx+bw, by, bx+bw, by+r);
    ctx.lineTo(bx+bw, by+bh-r); ctx.quadraticCurveTo(bx+bw, by+bh, bx+bw-r, by+bh);
    ctx.lineTo(bx+r, by+bh); ctx.quadraticCurveTo(bx, by+bh, bx, by+bh-r);
    ctx.lineTo(bx, by+r); ctx.quadraticCurveTo(bx, by, bx+r, by);
    ctx.closePath();
  }, ORANGE, INK);

  // Belly stripe (cream)
  ctx.save();
  ctx.fillStyle = CREAM;
  ctx.beginPath();
  ctx.moveTo(w*0.30, h*0.58);
  ctx.quadraticCurveTo(w*0.52, h*0.64, w*0.68, h*0.55);
  ctx.quadraticCurveTo(w*0.52, h*0.61, w*0.30, h*0.58);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // A few short fur marks along the back (ink)
  ctx.save();
  ctx.strokeStyle = INK;
  ctx.lineWidth = Math.max(1.2, w*0.02);
  const marks = [
    [0.38,0.36, 0.44,0.34],
    [0.46,0.33, 0.52,0.31],
    [0.54,0.35, 0.60,0.33]
  ];
  marks.forEach(([ax,ay,bx,by])=>{
    ctx.beginPath();
    ctx.moveTo(w*ax,h*ay); ctx.lineTo(w*bx,h*by); ctx.stroke();
  });
  ctx.restore();

  // --- Head with inner ear & cream cheeks (closed-eye smile)
  sticker(() => {
    const hx=w*0.62, hy=h*0.14, hw=w*0.34, hh=h*0.36;
    const r=w*0.10;
    ctx.moveTo(hx+r, hy);
    ctx.lineTo(hx+hw-r, hy); ctx.quadraticCurveTo(hx+hw, hy, hx+hw, hy+r);
    ctx.lineTo(hx+hw, hy+hh-r); ctx.quadraticCurveTo(hx+hw, hy+hh, hx+hw-r, hy+hh);
    ctx.lineTo(hx+r, hy+hh); ctx.quadraticCurveTo(hx, hy+hh, hx, hy+hh-r);
    ctx.lineTo(hx, hy+r); ctx.quadraticCurveTo(hx, hy, hx+r, hy);
    // ear
    ctx.moveTo(hx+hw*0.50, hy);
    ctx.lineTo(hx+hw*0.80, hy - h*0.12);
    ctx.lineTo(hx+hw*0.72, hy + h*0.08);
    ctx.closePath();
  }, ORANGE, INK);

  // inner ear
  ctx.save();
  ctx.fillStyle = '#f2c7aa';
  ctx.beginPath();
  const hx=w*0.62, hy=h*0.14, hw=w*0.34;
  ctx.moveTo(hx+hw*0.58, hy - h*0.02);
  ctx.lineTo(hx+hw*0.76, hy - h*0.10);
  ctx.lineTo(hx+hw*0.69, hy + h*0.05);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // cream cheek/neck
  ctx.save();
  ctx.fillStyle = CREAM;
  ctx.beginPath();
  ctx.moveTo(w*0.78, h*0.22);
  ctx.quadraticCurveTo(w*0.84, h*0.34, w*0.78, h*0.46);
  ctx.quadraticCurveTo(w*0.70, h*0.40, w*0.72, h*0.28);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // eye (closed curve) + nose + tiny smile
  ctx.save();
  ctx.strokeStyle = INK; ctx.lineWidth = Math.max(1.6, w*0.03);
  ctx.beginPath(); // eye
  ctx.moveTo(w*0.74, h*0.36);
  ctx.quadraticCurveTo(w*0.77, h*0.37, w*0.80, h*0.36);
  ctx.stroke();
  ctx.fillStyle = INK; // nose
  ctx.beginPath(); ctx.arc(w*0.93, h*0.44, Math.max(1.7, w*0.028), 0, Math.PI*2); ctx.fill();
  ctx.strokeStyle = INK; ctx.lineWidth = Math.max(1.2, w*0.02);
  ctx.beginPath(); // smile
  ctx.moveTo(w*0.90, h*0.47);
  ctx.quadraticCurveTo(w*0.92, h*0.50, w*0.94, h*0.48);
  ctx.stroke();
  ctx.restore();

  // --- Leaping legs (rear slightly darker)
  const s = (v)=>h*(0.42+0.08*v); // simple cycle
  const a = s(run), b = s(1-run);

  // rear leg
  ctx.save();
  ctx.fillStyle = ORANGE_D;
  ctx.beginPath();
  ctx.roundRect(w*0.26, h*0.62, w*0.15, a*0.46, 4);
  ctx.fill();
  // paw
  ctx.fillStyle = CREAM;
  ctx.fillRect(w*0.26, h*0.62 + a*0.46 - h*0.05, w*0.15, h*0.05);
  ctx.restore();

  // front leg
  ctx.save();
  ctx.fillStyle = INK;
  ctx.beginPath();
  ctx.roundRect(w*0.50, h*0.60, w*0.15, b*0.46, 4);
  ctx.fill();
  ctx.fillStyle = CREAM;
  ctx.fillRect(w*0.50, h*0.60 + b*0.46 - h*0.05, w*0.15, h*0.05);
  ctx.restore();

  ctx.restore(); // end local transform
}
