// Pencil Script for Unified Current/Next Game — logs 5 autism metrics
// Attached to frame 09 — Unified Game
export default function init(root, inputs) {
  const state = {
    current: {type:'circle', color:'red', need:3, done:0},
    next: {type:'triangle', color:'green', need:2, done:0},
    phase: 'current', // current -> next
    logs: [],
    startT: performance.now(),
    lastPos: null,
    trail: [],
    pressureMax: 0,
  };
  const board = root.findChild(c=>c.name==='board');
  const metrics = root.findChild(c=>c.name==='metrics-overlay');
  const currentPill = root.findChild(c=>c.name==='current-pill');
  const nextPill = root.findChild(c=>c.name==='next-pill');
  const timer = root.findChild(c=>c.name==='time');

  // helpers
  function dist(a,b){ return Math.hypot(a.x-b.x, a.y-b.y); }
  function updatePill(){
    const cur = root.findChild(c=>c.name==='x3');
    const nxt = root.findChild(c=>c.name==='x2');
    if(cur) cur.characters = `X${state.current.need - state.current.done}`;
    if(nxt) nxt.characters = `X${state.next.need - state.next.done}`;
    if(metrics){
      const jerk = metrics.findChild(c=>c.name==='m-j-val');
      const press = metrics.findChild(c=>c.name==='m-p-val');
      const off = metrics.findChild(c=>c.name==='m-a-val');
      const sw = metrics.findChild(c=>c.name==='m-s-val');
      const eff = metrics.findChild(c=>c.name==='m-pa-val');
      // update with live values (placeholder)
    }
  }

  let activeTouch = null; // {id, startX,startY,startT, path:[], pressure:[]}
  let switchErrors = 0;
  let switchTrials = 0;

  function onPointerDown(e){
    const p = {x:e.offsetX, y:e.offsetY, t:performance.now(), pressure:e.pressure||0.5};
    activeTouch = {startX:p.x, startY:p.y, startT:p.t, path:[p], pressures:[p.pressure], target:null};
    state.pressureMax = Math.max(state.pressureMax, p.pressure);
    // hit test shapes
    const shapes = board ? board.children.filter(c=>c.name.startsWith('shape')) : [];
    let hit = null; let bestDist=Infinity;
    for(const s of shapes){
      const cx = s.x + s.width/2; const cy = s.y + s.height/2;
      const d = Math.hypot(p.x - cx, p.y - cy);
      if(d < s.width/2 && d < bestDist){ bestDist=d; hit=s; }
    }
    if(hit){
      activeTouch.target = hit;
      activeTouch.hitDist = bestDist;
      hit.opacity = 0.6;
    }
    state.trail = [p];
    state.lastPos = p;
  }

  function onPointerMove(e){
    if(!activeTouch) return;
    const p = {x:e.offsetX, y:e.offsetY, t:performance.now(), pressure:e.pressure||0.5};
    activeTouch.path.push(p);
    activeTouch.pressures.push(p.pressure);
    state.pressureMax = Math.max(state.pressureMax, p.pressure);
    // compute velocity/acc/jerk live
    const dt = (p.t - state.lastPos.t)/1000;
    if(dt>0){
      const vx = (p.x - state.lastPos.x)/dt;
      const vy = (p.y - state.lastPos.y)/dt;
      const v = Math.hypot(vx,vy);
      // store
      activeTouch.v = v;
    }
    state.lastPos = p;
    // draw trail
    if(board){
      const dot = {type:'ellipse', width:6, height:6, fill:'#0F1B2D', opacity:0.2};
      // would create node, but for pencil script we can just log
    }
  }

  function onPointerUp(e){
    if(!activeTouch) return;
    const p = {x:e.offsetX, y:e.offsetY, t:performance.now(), pressure:e.pressure||0.5};
    const dwell = p.t - activeTouch.startT;
    const pathLen = activeTouch.path.reduce((acc,pt,i)=>{
      if(i===0) return 0;
      return acc + Math.hypot(pt.x - activeTouch.path[i-1].x, pt.y - activeTouch.path[i-1].y);
    },0);
    const straight = Math.hypot(p.x - activeTouch.startX, p.y - activeTouch.startY);
    const eff = straight>0 ? (straight / Math.max(pathLen, straight)) : 1;
    // jerk: 3rd derivative approx
    let jerk = 0;
    if(activeTouch.path.length>3){
      // simple jerk as std of acceleration differences
      let accs=[];
      for(let i=1;i<activeTouch.path.length;i++){
        const dt = (activeTouch.path[i].t - activeTouch.path[i-1].t)/1000;
        if(dt===0) continue;
        const dx = activeTouch.path[i].x - activeTouch.path[i-1].x;
        const dy = activeTouch.path[i].y - activeTouch.path[i-1].y;
        const v = Math.hypot(dx,dy)/dt;
        if(i>1){
          const prevV = accs[accs.length-1]?.v || 0;
          const a = (v - prevV)/dt;
          accs.push({v,a});
        } else accs.push({v,a:0});
      }
      // jerk from acceleration diff
      let jerks=[];
      for(let i=1;i<accs.length;i++){
        const dt = 0.016; // approx 60Hz
        jerks.push(Math.abs(accs[i].a - accs[i-1].a)/dt);
      }
      jerk = jerks.length? jerks.reduce((a,b)=>a+b,0)/jerks.length : 0;
    }
    const isSwipe = pathLen > 40; // threshold
    const off = activeTouch.hitDist || 0;
    const pressure = Math.max(...activeTouch.pressures);
    // log
    const entry = {
      phase: state.phase,
      target: state.phase==='current'? {...state.current}:{...state.next},
      type: isSwipe?'swipe':'tap',
      hit: !!activeTouch.target,
      hitName: activeTouch.target?.name||'miss',
      off: +off.toFixed(1),
      dwell: Math.round(dwell),
      pressure: +pressure.toFixed(2),
      jerk: Math.round(jerk),
      eff: +eff.toFixed(2),
      pathLen: Math.round(pathLen),
      t: Math.round(p.t - state.startT)
    };
    state.logs.push(entry);
    console.log('[GAME]', entry);

    // handle Current/Next logic
    const wanted = state.phase==='current'? state.current : state.next;
    const isCorrectHit = activeTouch.target && (
      (wanted.type==='circle' && activeTouch.target.name.includes('circle')) ||
      (wanted.type==='triangle' && activeTouch.target.name.includes('tri'))
    ) && (
      (wanted.color==='red' && activeTouch.target.fill==='#FF3B30') ||
      (wanted.color==='green' && activeTouch.target.fill==='#2ECC71')
    );
    // for sketch, red circles and green triangles are the targets
    if(isCorrectHit){
      wanted.done++;
      if(activeTouch.target) activeTouch.target.visible = false;
      // haptic
      if(navigator.vibrate) navigator.vibrate(20);
    } else if(activeTouch.target){
      // wrong hit
      if(state.phase==='next' && switchTrials<3){
        switchErrors++;
      }
      activeTouch.target.opacity = 1;
      // shake
    }
    // check phase switch
    if(state.phase==='current' && state.current.done>=state.current.need){
      state.phase='next';
      switchTrials=0;
      // flip pill highlight
      if(currentPill) currentPill.opacity=0.4;
      if(nextPill) nextPill.opacity=1;
      console.log('[SWITCH] now NEXT');
    }
    if(state.phase==='next'){
      switchTrials++;
      if(switchTrials<=3 && !isCorrectHit) {
        // count as switch error already
      }
    }
    if(state.next.done>=state.next.need){
      console.log('[DONE] logs', state.logs);
      // show metrics
      const mJ = metrics?.findChild(c=>c.name==='m-j-val');
      if(mJ) mJ.characters = `${Math.round(jerk)} mm/s³`;
      const mP = metrics?.findChild(c=>c.name==='m-p-val');
      if(mP) mP.characters = `${pressure.toFixed(1)}×`;
      const mO = metrics?.findChild(c=>c.name==='m-a-val');
      if(mO) mO.characters = `${off.toFixed(0)}mm`;
      const mS = metrics?.findChild(c=>c.name==='m-s-val');
      if(mS) mS.characters = `${switchErrors}/3`;
      const mE = metrics?.findChild(c=>c.name==='m-pa-val');
      if(mE) mE.characters = eff.toFixed(2);
      // reset?
    }
    updatePill();
    activeTouch=null;
  }

  // attach
  if(board){
    board.onPointerDown = onPointerDown;
    board.onPointerMove = onPointerMove;
    board.onPointerUp = onPointerUp;
  } else {
    root.onPointerDown = onPointerDown;
    root.onPointerMove = onPointerMove;
    root.onPointerUp = onPointerUp;
  }

  // timer
  let secs=34;
  setInterval(()=>{
    secs--;
    if(secs<0) secs=0;
    if(timer) timer.characters = `0:${String(secs).padStart(2,'0')}`;
  },1000);

  updatePill();
  console.log('[INIT] Unified game ready - Current X3 red circles, Next X2 green triangles');
}
