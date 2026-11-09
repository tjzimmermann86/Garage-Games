/* Lobby-Logik der Garage Games: Räume, Warteraum, Einladungen, Online-Liste.
   Läuft auf dem Server (api/lobby.js mit Redis) und im Offline-Modus im Browser (localStorage).
   store: { get(key) -> Wert|null, set(key, wert, ttlSekunden), del(key) } – alles asynchron. */
(function(root){
  const CODE_CHARS='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const ROOM_TTL=6*3600, INVITE_TTL=120, ONLINE_MS=25000, LEAVE_MS=45000;
  const GAMES=[
    {id:'scherbenwerk',name:'Scherbenwerk',tag:'Puzzle'},
    {id:'rohrleitung', name:'Rohrleitung', tag:'Logik'},
    {id:'farbfolge',   name:'Farbfolge',   tag:'Gedächtnis'},
    {id:'startampel',  name:'Startampel',  tag:'Reaktion'},
    {id:'turmbau',     name:'Turmbau',     tag:'Geschick'},
    {id:'schubsarena', name:'Schubsarena', tag:'Action'},
  ];
  const GAME_IDS=GAMES.map(g=>g.id);

  const clean=(s,max=24)=>String(s||'').replace(/[<>&"]/g,'').trim().slice(0,max);
  const now=()=>Date.now();
  const err=msg=>({error:msg});

  async function getOnline(s){return (await s.get('online'))||{};}
  async function touch(s,pid,name,room){
    const on=await getOnline(s),t=now();
    for(const k of Object.keys(on))if(t-on[k].ts>ONLINE_MS*4)delete on[k];
    if(pid)on[pid]={name:clean(name)||'Spieler',ts:t,room:room||null};
    await s.set('online',on,3600);
    return on;
  }
  async function getIndex(s){return (await s.get('rooms'))||[];}
  async function setIndex(s,list){await s.set('rooms',[...new Set(list)],ROOM_TTL);}
  async function saveRoom(s,room){room.updated=now();await s.set('room:'+room.code,room,ROOM_TTL);}
  async function deleteRoom(s,code){await s.del('room:'+code);await setIndex(s,(await getIndex(s)).filter(c=>c!==code));}

  /* Spieler, die im Warteraum zu lange nichts von sich hören lassen, fliegen raus.
     Während ein Minispiel läuft, sind alle auf der Spielseite – dann wird niemand entfernt. */
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
    return{code:room.code,title:room.title,host:host?host.name:'?',players:room.players.length,max:room.max,status:room.status,game:room.game,public:room.public};
  }
  async function newCode(s){for(let k=0;k<50;k++){let c='';for(let i=0;i<4;i++)c+=CODE_CHARS[Math.floor(Math.random()*CODE_CHARS.length)];if(!(await s.get('room:'+c)))return c;}throw new Error('Kein freier Code');}
  function sanitizeSettings(req,room){
    if(req.title!==undefined)room.title=clean(req.title,32)||room.title;
    if(req.public!==undefined)room.public=!!req.public;
    if(req.max!==undefined)room.max=Math.max(2,Math.min(16,parseInt(req.max,10)||16));
    if(Array.isArray(req.games)){const g=req.games.filter(id=>GAME_IDS.includes(id));if(g.length)room.games=g;}
  }
  async function getInvites(s,pid){const list=(await s.get('inv:'+pid))||[];const t=now();return list.filter(i=>t-i.ts<INVITE_TTL*1000);}

  async function handle(s,req){
    req=req||{};const{action,pid}=req;const code=clean(req.code,4).toUpperCase();
    if(action==='ping')return{ok:true};
    if(!pid||typeof pid!=='string'||pid.length>40)return err('Spieler-ID fehlt');
    const name=clean(req.name)||'Spieler';

    if(action==='poll'){
      const on=await touch(s,pid,name,code||null);
      const codes=await getIndex(s),rooms=[];let mine=null;
      for(const c of codes){const r=await loadRoom(s,c,on);if(!r)continue;if(c===code)mine=r;if(r.public)rooms.push(summary(r));}
      if(code&&!mine){mine=await loadRoom(s,code,on);}
      if(mine&&!mine.players.some(p=>p.pid===pid))mine={...mine,kicked:true};
      const t=now(),online=Object.entries(on).filter(([k,v])=>k!==pid&&t-v.ts<ONLINE_MS).map(([k,v])=>({pid:k,name:v.name,room:v.room}));
      return{online,rooms,invites:await getInvites(s,pid),room:mine};
    }
    if(action==='create'){
      await touch(s,pid,name,null);
      const room={code:await newCode(s),title:clean(req.title,32)||`Garage von ${name}`,host:pid,public:req.public!==false,max:16,games:GAME_IDS.slice(),
        players:[{pid,name,ready:false,joined:now()}],status:'lobby',game:null,seed:0,round:0,created:now()};
      sanitizeSettings(req,room);
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
        room.players.push({pid,name,ready:false,joined:now()});
      }else me.name=name;
      await saveRoom(s,room);
      await s.set('inv:'+pid,(await getInvites(s,pid)).filter(i=>i.code!==code),INVITE_TTL);
      await touch(s,pid,name,code);
      return{room};
    }
    if(action==='decline'){await s.set('inv:'+pid,(await getInvites(s,pid)).filter(i=>i.code!==code),INVITE_TTL);return{ok:true};}
    if(!me)return err('Du bist nicht in diesem Spiel.');
    if(action==='leave'){
      room.players=room.players.filter(p=>p.pid!==pid);
      if(!room.players.length){await deleteRoom(s,code);return{ok:true};}
      if(isHost)room.host=room.players[0].pid;
      await saveRoom(s,room);await touch(s,pid,name,null);return{ok:true};
    }
    if(action==='ready'){me.ready=!!req.ready;await saveRoom(s,room);return{room};}
    if(action==='invite'){
      const target=clean(req.target,40);if(!target||target===pid)return err('Ungültiger Spieler.');
      const list=(await getInvites(s,target)).filter(i=>i.code!==code);
      list.push({code,title:room.title,from:name,ts:now()});
      await s.set('inv:'+target,list,INVITE_TTL);return{ok:true};
    }
    if(!isHost)return err('Nur der Gastgeber kann das.');
    if(action==='settings'){sanitizeSettings(req,room);await saveRoom(s,room);return{room};}
    if(action==='kick'){room.players=room.players.filter(p=>p.pid!==req.target||p.pid===pid);await saveRoom(s,room);return{room};}
    if(action==='start'){
      const game=GAME_IDS.includes(req.game)?req.game:room.games[0];
      room.status='running';room.game=game;room.seed=Math.floor(Math.random()*4294967295);room.round=(room.round||0)+1;
      room.players.forEach(p=>p.ready=false);await saveRoom(s,room);return{room};
    }
    if(action==='back'){room.status='lobby';await saveRoom(s,room);return{room};}
    return err('Unbekannte Aktion.');
  }

  const api={handle,GAMES,GAME_IDS};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.LobbyCore=api;
})(typeof window!=='undefined'?window:globalThis);
