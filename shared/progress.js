/* Fortschritt und freischaltbare Kopfbedeckungen (pro Rechner im Browser gespeichert). */
(function(root){
  const KEY='gg-progress';
  const GAME_IDS=['scherbenwerk','rohrleitung','farbfolge','startampel','turmbau','schubsarena'];
  // Kopfbedeckung (Nummer wie in avatars.js) und wie man sie bekommt
  const UNLOCKS=[
    {hat:1,text:'Ein Minispiel zu Ende spielen',     need:s=>[s.games,1]},
    {hat:2,text:'5 Minispiele zu Ende spielen',      need:s=>[s.games,5]},
    {hat:3,text:'3 verschiedene Minispiele spielen', need:s=>[Object.keys(s.played).length,3]},
    {hat:4,text:'Alle 6 Minispiele spielen',         need:s=>[Object.keys(s.played).length,6]},
    {hat:5,text:'Ein Turnier bis zur Siegerehrung spielen',need:s=>[s.tournaments,1]},
    {hat:6,text:'15 Minispiele zu Ende spielen',     need:s=>[s.games,15]},
    {hat:7,text:'Im Turnier aufs Siegerpodest kommen',need:s=>[s.podiums,1]},
    {hat:8,text:'Ein Turnier gewinnen',              need:s=>[s.wins,1]},
  ];
  function load(){try{return{games:0,played:{},tournaments:0,podiums:0,wins:0,seen:[],...JSON.parse(localStorage.getItem(KEY)||'{}')};}catch(e){return{games:0,played:{},tournaments:0,podiums:0,wins:0,seen:[]};}}
  function save(s){try{localStorage.setItem(KEY,JSON.stringify(s));}catch(e){}}
  const isOpen=(s,u)=>{const[v,n]=u.need(s);return v>=n;};
  function status(){const s=load();return UNLOCKS.map(u=>{const[v,n]=u.need(s);return{hat:u.hat,text:u.text,have:Math.min(v,n),need:n,open:v>=n};});}
  function unlocked(hat){if(!hat)return true;const u=UNLOCKS.find(x=>x.hat===hat);return !!u&&isOpen(load(),u);}
  // gibt neu freigeschaltete Kopfbedeckungen zurück
  function change(fn){
    const s=load();const before=UNLOCKS.filter(u=>isOpen(s,u)).map(u=>u.hat);fn(s);
    const fresh=UNLOCKS.filter(u=>isOpen(s,u)&&!before.includes(u.hat)).map(u=>u.hat);save(s);return fresh;
  }
  function recordGame(id){return change(s=>{s.games++;if(GAME_IDS.includes(id))s.played[id]=true;});}
  function recordTournament(key,place){
    const done=(()=>{try{return JSON.parse(localStorage.getItem('gg-recorded')||'[]');}catch(e){return[];}})();
    if(done.includes(key))return[];
    try{localStorage.setItem('gg-recorded',JSON.stringify([...done,key].slice(-50)));}catch(e){}
    return change(s=>{s.tournaments++;if(place<=3)s.podiums++;if(place===1)s.wins++;});
  }
  root.GGProgress={status,unlocked,recordGame,recordTournament,stats:load};
})(window);
