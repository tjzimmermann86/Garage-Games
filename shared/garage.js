/* Gemeinsame Bausteine der Garage Games: Canvas, Farben, Zufall, Sound, Startkarten. */
window.GG=(()=>{
  const W=1280,H=720;
  const css=getComputedStyle(document.documentElement),C=k=>css.getPropertyValue(k).trim();
  const COL={};
  ['bg','panel','board','lead','ink','muted','amber','rose','sea','water','violet','lime','steel','plate','accent'].forEach(k=>COL[k]=C('--'+k));
  COL.edge=C('--panel-edge');COL.steelDark=C('--steel-dark');
  if(COL.accent.startsWith('var('))COL.accent=C(COL.accent.slice(4,-1))||COL.amber;
  const DISPLAY="'Bricolage Grotesque','Trebuchet MS',sans-serif",MONO="'IBM Plex Mono',Menlo,monospace";
  /* Einstellungen (pro Rechner im Browser gespeichert) */
  const SKEY='gg-settings',DEF={resolution:'auto',master:80,music:50,sfx:80};
  function loadSettings(){try{return{...DEF,...JSON.parse(localStorage.getItem(SKEY)||'{}')};}catch(e){return{...DEF};}}
  const settings=loadSettings();
  function saveSettings(patch){Object.assign(settings,patch);try{localStorage.setItem(SKEY,JSON.stringify(settings));}catch(e){}applyVolume();}
  const vol=kind=>(settings.master/100)*((kind?settings[kind]:100)/100);
  const RES={'720':1,'1080':1.5,'1440':2};
  const DPR=settings.resolution==='auto'?Math.min(2,window.devicePixelRatio||1):(RES[settings.resolution]||1);
  /* Ein Spiel aus dem Warteraum bekommt ?seed=…, damit alle dieselbe Variante spielen */
  const urlSeed=new URLSearchParams(location.search).get('seed');let seedUsed=false;

  function canvas(cv){cv.width=W*DPR;cv.height=H*DPR;return cv.getContext('2d');}
  function clear(ctx){ctx.setTransform(DPR,0,0,DPR,0,0);ctx.fillStyle=COL.bg;ctx.fillRect(0,0,W,H);}
  function local(cv,e){const r=cv.getBoundingClientRect();return{x:(e.clientX-r.left)*W/r.width,y:(e.clientY-r.top)*H/r.height};}
  function rr(ctx,x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath();}
  function panel(ctx,x,y,w,h){rr(ctx,x,y,w,h,12);ctx.fillStyle=COL.panel;ctx.fill();ctx.strokeStyle=COL.edge;ctx.lineWidth=1;ctx.stroke();}
  function label(ctx,t,x,y,align='left',color=COL.muted){ctx.font=`600 12px ${MONO}`;ctx.fillStyle=color;ctx.textAlign=align;ctx.textBaseline='alphabetic';ctx.fillText(t,x,y);}
  function value(ctx,t,x,y,align='left',color=COL.ink,size=30){ctx.font=`600 ${size}px ${MONO}`;ctx.fillStyle=color;ctx.textAlign=align;ctx.textBaseline='alphabetic';ctx.fillText(t,x,y);}
  function text(ctx,t,x,y,{size=15,weight=400,color=COL.ink,align='left',font=DISPLAY}={}){ctx.font=`${weight} ${size}px ${font}`;ctx.fillStyle=color;ctx.textAlign=align;ctx.textBaseline='alphabetic';ctx.fillText(t,x,y);}
  function wrap(ctx,txt,x,y,maxW,lh,opts={}){ctx.font=`${opts.weight||400} ${opts.size||15}px ${DISPLAY}`;ctx.fillStyle=opts.color||COL.ink;ctx.textAlign='left';ctx.textBaseline='alphabetic';
    const words=txt.split(' ');let line='';for(const w of words){const t=line?line+' '+w:w;if(ctx.measureText(t).width>maxW&&line){ctx.fillText(line,x,y);y+=lh;line=w;}else line=t;}if(line){ctx.fillText(line,x,y);y+=lh;}return y;}
  function hr(ctx,x1,x2,y){ctx.strokeStyle=COL.edge;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(x1,y);ctx.lineTo(x2,y);ctx.stroke();}
  const fmt=s=>{s=Math.max(0,Math.floor(s));return`${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;};
  const num=n=>Math.round(n).toLocaleString('de-DE');

  function rng(seed){
    let a=seed>>>0;
    const r=()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};
    r.range=(lo,hi)=>lo+r()*(hi-lo);
    r.int=(lo,hi)=>lo+Math.floor(r()*(hi-lo+1));
    r.pick=arr=>arr[Math.floor(r()*arr.length)];
    r.shuffle=arr=>{for(let i=arr.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];}return arr;};
    return r;
  }
  const newSeed=()=>{if(urlSeed&&!seedUsed){seedUsed=true;return(parseInt(urlSeed,10)>>>0)||1;}seedUsed=true;return Math.floor(Math.random()*4294967295);};

  let ac=null;const GGvol=k=>vol(k);
  function audio(){try{ac=ac||new(window.AudioContext||window.webkitAudioContext)();if(ac.state==='suspended')ac.resume();}catch(e){}return ac;}
  function tone(freq,dur=.2,type='sine',vol=.1,slideTo){
    const a=audio();if(!a)return;
    try{const t=a.currentTime,o=a.createOscillator(),g=a.createGain();o.type=type;o.connect(g);g.connect(a.destination);
      o.frequency.setValueAtTime(freq,t);if(slideTo)o.frequency.exponentialRampToValueAtTime(slideTo,t+dur);
      vol*=GGvol('sfx');if(vol<=0.0005)return;g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(.001,t+dur);o.start(t);o.stop(t+dur+.05);}catch(e){}
  }
  function sfx(type){
    if(type==='tick')tone(420,.05,'square',.025);
    else if(type==='ok')tone(1320,.25,'sine',.1,1980);
    else if(type==='err')tone(220,.28,'triangle',.14,120);
    else if(type==='win'){tone(880,.15,'sine',.1);setTimeout(()=>tone(1320,.15,'sine',.1),110);setTimeout(()=>tone(1760,.3,'sine',.1),220);}
    else if(type==='thud')tone(140,.18,'triangle',.18,60);
    else if(type==='pop')tone(660,.08,'sine',.08,990);
  }

  /* Menümusik: ruhiger Synth-Loop, Lautstärke = Gesamt × Musik */
  let musicGain=null,musicTimer=null,musicStep=0,musicNext=0;
  const PROG=[[57,60,64],[53,57,60],[48,52,55],[55,59,62]];   // Am F C G
  const mtof=n=>440*Math.pow(2,(n-69)/12);
  function note(freq,start,dur,type,v){const a=ac,o=a.createOscillator(),g=a.createGain();o.type=type;o.frequency.value=freq;o.connect(g);g.connect(musicGain);g.gain.setValueAtTime(0,start);g.gain.linearRampToValueAtTime(v,start+.03);g.gain.exponentialRampToValueAtTime(.0005,start+dur);o.start(start);o.stop(start+dur+.05);}
  function musicTick(){
    const a=ac;if(!a||!musicGain)return;
    while(musicNext<a.currentTime+.4){
      const bar=Math.floor(musicStep/8)%PROG.length,ch=PROG[bar],st=musicStep%8,t=musicNext;
      if(st===0){note(mtof(ch[0]-24),t,1.9,'triangle',.22);ch.forEach(n=>note(mtof(n),t,1.9,'sine',.05));}
      if(st===4)note(mtof(ch[0]-24),t,.9,'triangle',.14);
      note(mtof(ch[[0,1,2,1][st%4]]+12),t,.22,'square',.025);
      musicNext+=.25;musicStep++;
    }
  }
  function musicStart(){const a=audio();if(!a||musicTimer)return;musicGain=a.createGain();musicGain.gain.value=vol('music');musicGain.connect(a.destination);musicNext=a.currentTime+.1;musicTimer=setInterval(musicTick,100);musicTick();}
  function musicStop(){clearInterval(musicTimer);musicTimer=null;if(musicGain){try{musicGain.disconnect();}catch(e){}musicGain=null;}}
  function applyVolume(){if(musicGain&&ac)musicGain.gain.setTargetAtTime(vol('music'),ac.currentTime,.05);}

  function overlay(el){
    return{
      show(html,onGo){el.innerHTML=`<div class="card">${html}</div>`;el.hidden=false;const b=el.querySelector('button.go');if(b){b.addEventListener('click',()=>{audio();onGo&&onGo();});b.focus({preventScroll:true});}},
      hide(){el.hidden=true;},
      get open(){return !el.hidden;}
    };
  }
  let toastMsg='',toastT=0,toastCol=null;
  function toast(m,col){toastMsg=m;toastT=2.4;toastCol=col||null;}
  function drawToast(ctx,cx,cy,dt){
    if(toastT<=0)return;toastT-=dt;
    ctx.globalAlpha=Math.min(1,toastT*2);ctx.font=`600 16px ${DISPLAY}`;ctx.textAlign='center';ctx.textBaseline='middle';
    const w=ctx.measureText(toastMsg).width+36;rr(ctx,cx-w/2,cy-18,w,36,18);ctx.fillStyle='rgba(10,16,19,.92)';ctx.fill();ctx.strokeStyle=toastCol||COL.accent;ctx.lineWidth=1;ctx.stroke();
    ctx.fillStyle=COL.ink;ctx.fillText(toastMsg,cx,cy+1);ctx.globalAlpha=1;ctx.textBaseline='alphabetic';
  }
  function loop(fn){let last=performance.now();const f=now=>{const dt=Math.min(.05,(now-last)/1000);last=now;fn(dt,now);requestAnimationFrame(f);};requestAnimationFrame(f);}
  const rowsHtml=pairs=>`<div class="rows">${pairs.map(([a,b,cls])=>`<span${cls?` class="${cls}"`:''}>${a}</span><span${cls?` class="${cls}"`:''}>${b}</span>`).join('')}</div>`;

  return{settings,saveSettings,vol,musicStart,musicStop,W,H,COL,DISPLAY,MONO,DPR,canvas,clear,local,rr,panel,label,value,text,wrap,hr,fmt,num,rng,newSeed,audio,tone,sfx,overlay,toast,drawToast,loop,rowsHtml};
})();
