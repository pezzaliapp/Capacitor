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
  // Normalize key and code
  let k = key;
  let code = '';
  if (k === ' ' || k === 'space') { k = ' '; code = 'Space'; }
  else if (/^enter$/i.test(k)) { k = 'Enter'; code = 'Enter'; }
  else if (/^[wasd]$/i.test(k)) { k = k.toLowerCase(); code = 'Key' + k.toUpperCase(); }
  else if (/^[a-z]$/i.test(k)) { k = k.toLowerCase(); code = 'Key' + k.toUpperCase(); }
  else { code = k; }
  const evt = new KeyboardEvent(type, { key: k, code, bubbles: true, cancelable: true });
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

// START button -> Enter
document.querySelectorAll('#hud .btn').forEach(btn => {
  if (btn.dataset.k === 'enter') {
    btn.addEventListener('touchstart', e => { e.preventDefault(); fire('Enter','keydown'); }, { passive:false });
    btn.addEventListener('touchend',   e => { e.preventDefault(); fire('Enter','keyup');   }, { passive:false });
  }
});

// Sometimes the game needs Enter twice (title -> character, then character -> game).
// On the very first touch, send two Enters spaced out slightly.
addEventListener('touchstart', (() => {
  let done=false;
  return () => {
    if (done) return;
    done = true;
    setTimeout(() => { fire('Enter','keydown'); fire('Enter','keyup'); }, 0);
    setTimeout(() => { fire('Enter','keydown'); fire('Enter','keyup'); }, 150);
  };
})(), { once:true, passive:true });


const startOverlay = document.getElementById('startOverlay');
const btnStart = document.getElementById('btnStart');

function advanceGameFlow(){
  // invia due Enter per: title -> character, character -> game
  fire('Enter','keydown'); fire('Enter','keyup');
  setTimeout(()=>{ fire('Enter','keydown'); fire('Enter','keyup'); }, 150);
}

if (btnStart){
  btnStart.addEventListener('click', (e)=>{
    e.preventDefault();
    advanceGameFlow();
    // nascondi overlay dopo avvio
    if (startOverlay) startOverlay.style.display = 'none';
  });
}

// anche il primo tap ovunque avvia
addEventListener('touchstart', (()=>{
  let done=false;
  return (e)=>{
    if (done) return;
    done = true;
    advanceGameFlow();
    if (startOverlay) startOverlay.style.display = 'none';
  };
})(), { once:true, passive:true });
