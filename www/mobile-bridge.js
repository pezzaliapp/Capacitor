// Minimal mobile bridge: responsive canvas + on-screen controls -> keyboard events
const canvas = document.getElementById('myCanvas');

function fitCanvas() {
  // Maintain approximate 16:9 while filling screen
  const w = window.innerWidth;
  const h = window.innerHeight;
  canvas.width = w;
  canvas.height = h;
}
addEventListener('resize', fitCanvas, { passive: true });
addEventListener('orientationchange', fitCanvas);
fitCanvas();

// Synthesize keyboard events so game code doesn't change
function fire(key, type='keydown'){
  const code = key === ' ' || key === 'space' ? 'Space' : key.toUpperCase();
  const evt = new KeyboardEvent(type, { key: key === 'space' ? ' ' : key, code, bubbles: true, cancelable: true });
  document.dispatchEvent(evt); window.dispatchEvent(evt);
}

document.querySelectorAll('#hud .btn').forEach(btn => {
  const k = btn.dataset.k;
  btn.addEventListener('touchstart', e => { e.preventDefault(); fire(k==='space'?'space':k,'keydown'); }, { passive:false });
  btn.addEventListener('touchend',   e => { e.preventDefault(); fire(k==='space'?'space':k,'keyup');   }, { passive:false });
});

// First tap acts as "Enter" to pass title screen on mobile
addEventListener('touchstart', (() => {
  let done=false;
  return () => { if (done) return; done=true; const kd=new KeyboardEvent('keydown',{key:'Enter',code:'Enter',bubbles:true}); document.dispatchEvent(kd); };
})(), { once:true, passive:true });