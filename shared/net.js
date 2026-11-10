/* Verbindung zum Warteraum: Server (Vercel + Redis) oder Offline-Modus (nur dieser Browser).
   Identität pro Tab in sessionStorage, letzter Raum in localStorage (für „Wieder beitreten“). */
(function(root){
  const ss={get(k){try{return sessionStorage.getItem(k);}catch(e){return null;}},set(k,v){try{v==null?sessionStorage.removeItem(k):sessionStorage.setItem(k,v);}catch(e){}}};
  const ls={get(k){try{return localStorage.getItem(k);}catch(e){return null;}},set(k,v){try{v==null?localStorage.removeItem(k):localStorage.setItem(k,v);}catch(e){}}};
  const base=location.pathname.replace(/[^/]*$/,'').replace(/\/(scherbenwerk|rohrleitung|farbfolge|startampel|turmbau|schubsarena|farbschlacht)\/$/,'/');
  const LocalStore={
    async get(k){try{const r=JSON.parse(localStorage.getItem('gglocal:'+k)||'null');if(!r)return null;if(r.exp<Date.now()){localStorage.removeItem('gglocal:'+k);return null;}return r.v;}catch(e){return null;}},
    async set(k,v,ttl){try{localStorage.setItem('gglocal:'+k,JSON.stringify({v,exp:Date.now()+(ttl||3600)*1000}));}catch(e){}},
    async del(k){try{localStorage.removeItem('gglocal:'+k);}catch(e){}},
  };
  const me={
    get pid(){let id=ss.get('gg-pid');if(!id){id='p'+Math.random().toString(36).slice(2,10)+Date.now().toString(36).slice(-4);ss.set('gg-pid',id);}return id;},
    set pid(v){ss.set('gg-pid',v);},
    get name(){return ss.get('gg-name')||'';},set name(v){ss.set('gg-name',v);if(v)ls.set('gg-name',v);},
    get avatar(){const v=ss.get('gg-avatar')??ls.get('gg-avatar');return v==null?null:parseInt(v,10);},set avatar(v){ss.set('gg-avatar',String(v));ls.set('gg-avatar',String(v));},
  };
  let ready=null;
  const Net={mode:null,me,ss,ls,
    init(){if(!ready)ready=(async()=>{
      try{const r=await fetch(base+'api/lobby',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'ping'})});
        if(r.ok){const j=await r.json();if(j.ok){Net.mode='server';return;}}}catch(e){}
      Net.mode='local';})();return ready;},
    async call(req){
      await Net.init();
      const body={pid:me.pid,name:me.name,avatar:me.avatar??0,...req};
      if(Net.mode==='server'){try{const r=await fetch(base+'api/lobby',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});return await r.json();}catch(e){return{error:'Keine Verbindung zum Server.'};}}
      return root.LobbyCore.handle(LocalStore,body);
    },
    /* letzter Raum, damit man nach einem Absturz wieder reinkommt */
    remember(code){if(code)ls.set('gg-last',JSON.stringify({code,pid:me.pid,name:me.name,avatar:me.avatar,ts:Date.now()}));else ls.set('gg-last',null);},
    last(){try{const l=JSON.parse(ls.get('gg-last')||'null');return l&&Date.now()-l.ts<6*3600*1000?l:null;}catch(e){return null;}},
  };
  root.GGNet=Net;
})(window);
