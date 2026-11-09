/* Lobby-Logik der Garage Games: Räume, Warteraum, Einladungen, Online-Liste, Turnier.
   Läuft auf dem Server (api/lobby.js mit Redis) und im Offline-Modus im Browser (localStorage).
   store: { get(key) -> Wert|null, set(key, wert, ttlSekunden), del(key) } – alles asynchron.

   Ablauf eines Turniers (room.status):
   lobby   → Gastgeber stellt Modus, Anzahl und Wertung ein
   voting  → nur im Abstimmungsmodus: jeder verteilt so viele Stimmen, wie Spiele gespielt werden
   between → Zwischenstand, Gastgeber startet das nächste Spiel
   running → ein Minispiel läuft (room.current), Ergebnisse kommen rein
   final   → Siegerpodest */
(function(root){
  const CODE_CHARS='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const ROOM_TTL=6*3600, INVITE_TTL=120, ONLINE_MS=25000, LEAVE_MS=45000, NAME_MS=30000, LAUNCH_MS=3500;
  const GAMES=[
    {id:'scherbenwerk',name:'Scherbenwerk',tag:'Puzzle'},
    {id:'rohrleitung', name:'Rohrleitung', tag:'Logik'},
    {id:'farbfolge',   name:'Farbfolge',   tag:'Gedächtnis'},
    {id:'startampel',  name:'Startampel',  tag:'Reaktion'},
    {id:'turmbau',     name:'Turmbau',     tag:'Geschick'},
    {id:'schubsarena', name:'Schubsarena', tag:'Action'},
  ];
  const GAME_IDS=GAMES.map(g=>g.id);
  const MODES={vote:'Abstimmung',host:'Gastgeber wählt',random:'Zufall'};
  const SCORING={sum:'Turnier: Punkte addieren',place:'Platzwertung'};
  const PLACE_POINTS=[10,8,6,5,4,3,2,1];

  const clean=(s,max=20)=>String(s||'').replace(/[<>&"]/g,'').replace(/\s+/g,' ').trim().slice(0,max);
  const now=()=>Date.now();
  const err=msg=>({error:msg});
  const avatarOf=a=>Math.max(0,Math.min(99,parseInt(a,10)||0));

  async function getOnline(s){return (await s.get('online'))||{};}
  async function touch(s,pid,name,avatar,room){
    const on=await getOnline(s),t=now();
    for(const k of Object.keys(on))if(t-on[k].ts>ONLINE_MS*4)delete on[k];
    if(pid)on[pid]={name:clean(name)||'Spieler',avatar:avatarOf(avatar),ts:t,room:room||null};
    await s.set('online',on,3600);
    return on;
  }
  async function getIndex(s){return (await s.get('rooms'))||[];}
  async function setIndex(s,list){await s.set('rooms',[...new Set(list)],ROOM_TTL);}
  async function saveRoom(s,room){room.updated=now();await s.set('room:'+room.code,room,ROOM_TTL);}
  async function deleteRoom(s,code){await s.del('room:'+code);await setIndex(s,(await getIndex(s)).filter(c=>c!==code));}

  /* Nur im Warteraum vor dem Turnier fliegen Spieler raus, die sich nicht mehr melden.
     Während des Turniers bleiben alle drin, damit man nach einem Absturz wieder beitreten kann. */
  async function loadRoom(s,code,on){
    const room=await s.get('room:'+code);if(!room)return null;
    if(room.status==='lobby'){
      const t=now(),before=room.players.length;
      room.players=room.players.filter(p=>{const o=on[p.pid];return (o&&t-o.ts<LEAVE_MS)||t-p.joined<LEAVE_MS;});
      if(!room.players.length){await deleteRoom(s,code);return null;}
      if(!room.players.some(p=>p.pid===room.host))room.host=room.players[0].pid;
      if(room.players.length!==before)await saveRoom(s,room);
    }
    return room;
  }
  function summary(room){
    const host=room.players.find(p=>p.pid===room.host);
    return{code:room.code,title:room.title,host:host?host.name:'?',hostAvatar:host?host.avatar:0,players:room.players.length,max:room.max,status:room.status,
      game:room.current?room.current.game:null,mode:room.mode,count:totalGames(room),public:room.public};
  }
  const totalGames=room=>room.mode==='host'?room.games.length:room.count;
  async function newCode(s){for(let k=0;k<50;k++){let c='';for(let i=0;i<4;i++)c+=CODE_CHARS[Math.floor(Math.random()*CODE_CHARS.length)];if(!(await s.get('room:'+c)))return c;}throw new Error('Kein freier Code');}
  function applySettings(req,room){
    if(req.title!==undefined)room.title=clean(req.title,32)||room.title;
    if(req.public!==undefined)room.public=!!req.public;
    if(req.max!==undefined)room.max=Math.max(2,Math.min(16,parseInt(req.max,10)||16));
    if(MODES[req.mode])room.mode=req.mode;
    if(SCORING[req.scoring])room.scoring=req.scoring;
    if(req.count!==undefined)room.count=Math.max(1,Math.min(10,parseInt(req.count,10)||3));
    if(room.mode==='vote')room.count=Math.min(room.count,GAME_IDS.length);
    if(Array.isArray(req.games)){const g=req.games.filter(id=>GAME_IDS.includes(id));if(g.length)room.games=[...new Set(g)];}
  }
  async function getInvites(s,pid){const list=(await s.get('inv:'+pid))||[];const t=now();return list.filter(i=>t-i.ts<INVITE_TTL*1000);}

  /* Namen dürfen nur einmal vorkommen: bei allen, die gerade online sind, und in allen Räumen */
  async function nameTaken(s,name,pid,on){
    const n=clean(name).toLowerCase();if(!n)return false;const t=now();
    for(const [k,v] of Object.entries(on))if(k!==pid&&t-v.ts<NAME_MS&&v.name.toLowerCase()===n)return true;
    for(const c of await getIndex(s)){const r=await s.get('room:'+c);if(r&&r.players.some(p=>p.pid!==pid&&p.name.toLowerCase()===n))return true;}
    return false;
  }

  /* Wertung: Summe aller Punkte oder Platzpunkte je Spiel (10, 8, 6, 5, 4, 3, 2, 1) */
  function standings(room){
    const rows=room.players.map(p=>({pid:p.pid,name:p.name,avatar:p.avatar,per:[],total:0}));
    const byPid=Object.fromEntries(rows.map(r=>[r.pid,r]));
    (room.results||[]).forEach((res,i)=>{
      const scores=Object.entries(res||{});
      let pts={};
      if(room.scoring==='place'){
        const sorted=scores.slice().sort((a,b)=>b[1]-a[1]);
        sorted.forEach(([pid,sc],k)=>{const first=sorted.findIndex(x=>x[1]===sc);pts[pid]=PLACE_POINTS[first]??0;});
      }else scores.forEach(([pid,sc])=>pts[pid]=sc);
      rows.forEach(r=>{const has=res&&res[r.pid]!==undefined;r.per[i]=has?{score:res[r.pid],pts:pts[r.pid]}:null;if(has)r.total+=pts[r.pid];});
      for(const pid of Object.keys(res||{}))if(!byPid[pid]){}   // ausgeschiedene Spieler zählen nicht mehr
    });
    rows.sort((a,b)=>b.total-a.total||a.name.localeCompare(b.name));
    rows.forEach((r,i)=>{r.place=i&&rows[i-1].total===r.total?rows[i-1].place:i+1;});
    return rows;
  }
  function voteResult(room){
    const tally=Object.fromEntries(GAME_IDS.map(id=>[id,0]));
    for(const v of Object.values(room.votes||{}))for(const[id,n]of Object.entries(v))if(tally[id]!==undefined)tally[id]+=n;
    return tally;
  }

  async function handle(s,req){
    req=req||{};const{action,pid}=req;const code=clean(req.code,4).toUpperCase();
    if(action==='ping')return{ok:true};
    if(!pid||typeof pid!=='string'||pid.length>40)return err('Spieler-ID fehlt');
    const name=clean(req.name)||'Spieler',avatar=avatarOf(req.avatar);

    if(action==='checkName'){const on=await getOnline(s);return{taken:await nameTaken(s,req.name,pid,on)};}
    if(action==='claim'){
      const on=await getOnline(s);
      if(!clean(req.name))return err('Bitte gib einen Namen ein.');
      if(await nameTaken(s,req.name,pid,on))return err(`Der Name „${clean(req.name)}“ ist schon vergeben.`);
      await touch(s,pid,name,avatar,null);return{ok:true};
    }
    if(action==='poll'){
      const on=await touch(s,pid,name,avatar,code||null);
      const codes=await getIndex(s),rooms=[];let mine=null;
      for(const c of codes){const r=await loadRoom(s,c,on);if(!r)continue;if(c===code)mine=r;if(r.public)rooms.push(summary(r));}
      if(code&&!mine)mine=await loadRoom(s,code,on);
      if(mine&&!mine.players.some(p=>p.pid===pid))mine={...mine,kicked:true};
      const t=now(),online=Object.entries(on).filter(([k,v])=>k!==pid&&t-v.ts<ONLINE_MS).map(([k,v])=>({pid:k,name:v.name,avatar:v.avatar,room:v.room}));
      return{online,rooms,invites:await getInvites(s,pid),room:mine,now:t};
    }
    if(action==='create'){
      await touch(s,pid,name,avatar,null);
      const room={code:await newCode(s),title:clean(req.title,32)||`Garage von ${name}`,host:pid,public:req.public!==false,max:16,
        mode:'vote',count:3,scoring:'place',games:GAME_IDS.slice(),
        players:[{pid,name,avatar,ready:false,joined:now()}],status:'lobby',votes:{},playlist:[],results:[],current:null,created:now()};
      applySettings(req,room);
      await saveRoom(s,room);await setIndex(s,[...(await getIndex(s)),room.code]);
      return{room};
    }
    const on=await getOnline(s);
    const room=code?await loadRoom(s,code,on):null;
    if(!room)return err(code?`Kein Spiel mit dem Code ${code} gefunden.`:'Code fehlt.');
    const me=room.players.find(p=>p.pid===pid),isHost=room.host===pid;

    if(action==='join'){
      if(!me){
        if(room.players.length>=room.max)return err('Das Spiel ist voll.');
        if(room.players.some(p=>p.name.toLowerCase()===name.toLowerCase()))return err(`Im Spiel gibt es schon jemanden namens „${name}“.`);
        room.players.push({pid,name,avatar,ready:false,joined:now()});
      }else{me.name=name;me.avatar=avatar;}
      await saveRoom(s,room);
      await s.set('inv:'+pid,(await getInvites(s,pid)).filter(i=>i.code!==code),INVITE_TTL);
      await touch(s,pid,name,avatar,code);
      return{room};
    }
    if(action==='decline'){await s.set('inv:'+pid,(await getInvites(s,pid)).filter(i=>i.code!==code),INVITE_TTL);return{ok:true};}
    if(!me)return err('Du bist nicht in diesem Spiel.');
    if(action==='leave'){
      room.players=room.players.filter(p=>p.pid!==pid);
      if(room.votes)delete room.votes[pid];
      if(!room.players.length){await deleteRoom(s,code);return{ok:true};}
      if(isHost)room.host=room.players[0].pid;
      await saveRoom(s,room);await touch(s,pid,name,avatar,null);return{ok:true};
    }
    if(action==='ready'){me.ready=!!req.ready;await saveRoom(s,room);return{room};}
    if(action==='invite'){
      const target=clean(req.target,40);if(!target||target===pid)return err('Ungültiger Spieler.');
      const list=(await getInvites(s,target)).filter(i=>i.code!==code);
      list.push({code,title:room.title,from:name,avatar,ts:now()});
      await s.set('inv:'+target,list,INVITE_TTL);return{ok:true};
    }
    if(action==='vote'){
      if(room.status!=='voting')return err('Gerade läuft keine Abstimmung.');
      const v={};let sum=0;
      for(const[id,n]of Object.entries(req.votes||{})){if(!GAME_IDS.includes(id))continue;const k=Math.max(0,parseInt(n,10)||0);if(k){v[id]=k;sum+=k;}}
      if(sum>room.count)return err(`Du hast nur ${room.count} Stimmen.`);
      room.votes[pid]=v;await saveRoom(s,room);return{room};
    }
    if(action==='result'){
      const i=parseInt(req.idx,10);
      if(!(i>=0&&i<room.results.length))return err('Dieses Spiel gehört nicht zum Turnier.');
      if(room.results[i][pid]===undefined){room.results[i][pid]=Math.max(0,Math.round(Number(req.score)||0));await saveRoom(s,room);}
      return{ok:true};
    }

    if(!isHost)return err('Nur der Gastgeber kann das.');
    if(action==='settings'){if(room.status!=='lobby')return err('Das geht nur vor dem Turnier.');applySettings(req,room);await saveRoom(s,room);return{room};}
    if(action==='kick'){room.players=room.players.filter(p=>p.pid!==req.target||p.pid===pid);if(room.votes)delete room.votes[req.target];await saveRoom(s,room);return{room};}
    if(action==='begin'){
      if(room.status!=='lobby')return err('Das Turnier läuft schon.');
      room.votes={};room.results=[];room.current=null;room.players.forEach(p=>p.ready=false);
      if(room.mode==='vote'){room.status='voting';room.playlist=[];}
      else{room.status='between';room.playlist=room.mode==='host'?room.games.slice():[];}
      await saveRoom(s,room);return{room};
    }
    if(action==='closeVote'){
      if(room.status!=='voting')return err('Gerade läuft keine Abstimmung.');
      const tally=voteResult(room),order=GAME_IDS.map(id=>[id,tally[id],Math.random()]).sort((a,b)=>b[1]-a[1]||a[2]-b[2]);
      room.playlist=order.slice(0,room.count).map(o=>o[0]);room.tally=tally;room.status='between';
      await saveRoom(s,room);return{room};
    }
    if(action==='next'){
      if(!['between','running'].includes(room.status))return err('Gerade kann kein Spiel starten.');
      const idx=room.results.length,total=totalGames(room);
      if(idx>=total)return err('Alle Spiele sind gespielt.');
      let game;
      if(room.mode==='random'){const prev=room.playlist[idx-1];const pool=GAME_IDS.filter(id=>id!==prev);game=pool[Math.floor(Math.random()*pool.length)];room.playlist[idx]=game;}
      else game=room.playlist[idx];
      room.current={game,idx,seed:Math.floor(Math.random()*4294967295),startAt:now()+LAUNCH_MS};
      room.results.push({});room.status='running';
      await saveRoom(s,room);return{room};
    }
    if(action==='pause'){if(room.status!=='running')return err('Es läuft kein Spiel.');room.status='between';await saveRoom(s,room);return{room};}
    if(action==='finish'){room.status='final';room.current=null;await saveRoom(s,room);return{room};}
    if(action==='reset'){Object.assign(room,{status:'lobby',votes:{},playlist:[],results:[],current:null,tally:null});room.players.forEach(p=>p.ready=false);await saveRoom(s,room);return{room};}
    return err('Unbekannte Aktion.');
  }

  const api={handle,standings,voteResult,totalGames,GAMES,GAME_IDS,MODES,SCORING,PLACE_POINTS};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.LobbyCore=api;
})(typeof window!=='undefined'?window:globalThis);
