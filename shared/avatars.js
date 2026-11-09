/* Avatare der Garage Games: 20 Gesichter (10 Männer, 10 Frauen) als SVG und 8 freischaltbare Kopfbedeckungen.
   Eine Avatar-Nummer enthält beides: Gesicht + 100 × Kopfbedeckung (0 = ohne). */
(function(root){
  const SKIN=['#f2c9a0','#e0a878','#b9784b','#8a5a3a','#ffdcb8'];
  const HAIR=['#2b1d14','#6b4423','#c98b3a','#1b1b1b','#9aa1a6','#c0392b'];
  // Hintergrund, Haut, Frisur, Haarfarbe, Augen, Mund, Extra
  const FACES=[
    ['#ffcf7a',0,'short',0,'dot','smile','none'],
    ['#ffa3ab',1,'curly',0,'happy','grin','none'],
    ['#8fdcc8',2,'buzz',3,'glasses','smile','beard'],
    ['#9fcdf6',4,'side',2,'wink','tongue','freckles'],
    ['#c9b8ff',0,'mohawk',5,'sun','flat','none'],
    ['#cde98e',3,'bald',3,'dot','grin','beard'],
    ['#f7b98a',1,'side',1,'sleepy','o','mustache'],
    ['#b8c2cc',2,'short',4,'happy','smile','mustache'],
    ['#a7e3f0',4,'curly',2,'glasses','grin','freckles'],
    ['#e7c6f5',3,'buzz',0,'dot','smile','none'],
    ['#ffb5c9',0,'long',2,'lash','smile','earring'],
    ['#9fcdf6',1,'ponytail',0,'lashhappy','grin','none'],
    ['#cde98e',3,'afro',3,'lash','smile','earring'],
    ['#c9b8ff',4,'bob',1,'glasses','smile','blush'],
    ['#ffcf7a',2,'braids',3,'lashhappy','tongue','none'],
    ['#8fdcc8',0,'bun',1,'lash','o','freckles'],
    ['#ffa3ab',4,'long',5,'lashwink','grin','none'],
    ['#b8c2cc',1,'bob',3,'sun','smile','earring'],
    ['#f7b98a',3,'ponytail',2,'lash','smile','blush'],
    ['#a7e3f0',2,'bun',0,'glasses','grin','earring'],
  ];
  const HATS=[
    null,
    {name:'Mütze',      color:'#e5626b'},
    {name:'Basecap',    color:'#2f6db5'},
    {name:'Stirnband',  color:'#f0b24a'},
    {name:'Kopfhörer',  color:'#283047'},
    {name:'Bauhelm',    color:'#f2c230'},
    {name:'Partyhut',   color:'#a98bf0'},
    {name:'Zylinder',   color:'#283047'},
    {name:'Krone',      color:'#f2c230'},
  ];
  const D='#1b1b1b',CX=32,CY=34,HR=17;
  // Kappe, die genau der Kopfform folgt: Kreissegment über der Linie y=cut
  function dome(R,cut,fill,extra=''){const w=Math.sqrt(R*R-(CY-cut)**2);return`<path d="M${(CX-w).toFixed(2)} ${cut}A${R} ${R} 0 0 1 ${(CX+w).toFixed(2)} ${cut}Z" fill="${fill}"${extra}/>`;}

  function backHair(style,c){
    if(style==='long')return`<path d="M13 34Q12 13 32 12Q52 13 51 34L53 54Q32 59 11 54Z" fill="${c}"/>`;
    if(style==='bob')return`<path d="M13 34Q12 13 32 12Q52 13 51 34L51 45Q46 48 41 45L23 45Q18 48 13 45Z" fill="${c}"/>`;
    if(style==='afro')return`<circle cx="32" cy="29" r="23" fill="${c}"/>`;
    if(style==='ponytail')return`<path d="M44 22Q60 24 55 46Q52 40 47 36Z" fill="${c}"/>`;
    if(style==='braids')return`<g fill="${c}">${[38,44,50].map(y=>`<circle cx="15" cy="${y}" r="3.6"/><circle cx="49" cy="${y}" r="3.6"/>`).join('')}</g><g fill="#e5626b"><circle cx="15" cy="54.5" r="1.8"/><circle cx="49" cy="54.5" r="1.8"/></g>`;
    return'';
  }
  function frontHair(style,c){
    if(style==='short')return`<path d="M15 31Q16 15 32 15Q48 15 49 31Q44 22 32 22Q20 22 15 31Z" fill="${c}"/>`;
    if(style==='buzz')return dome(17.3,25,c,' opacity=".85"');
    if(style==='curly')return`<g fill="${c}">${[[18,26],[21,20],[27,16.5],[34,16],[40,18.5],[45,23],[47,28]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="5.4"/>`).join('')}</g>`;
    if(style==='side')return`<path d="M15 31Q14 16 31 14.5Q48 14.5 49 29Q41 19 25 22Q18 25 15 31Z" fill="${c}"/>`;
    if(style==='mohawk')return`<path d="M28.5 20L32 5L35.5 20Z" fill="${c}"/>`;
    if(style==='long')return`<path d="M15 32Q15 15 32 15Q49 15 49 32Q47 22 38 21Q31 25 23 22Q17 25 15 32Z" fill="${c}"/>`;
    if(style==='bob')return`<path d="M15 30Q15 15 32 15Q49 15 49 30L49 27Q40 23.5 32 24.5Q24 23.5 15 27Z" fill="${c}"/>`;
    if(style==='ponytail')return`<path d="M15 30Q16 15 32 15Q48 15 49 30Q45 21 32 21Q21 21 15 30Z" fill="${c}"/><rect x="44" y="21" width="5" height="4" rx="1.5" fill="#e5626b" transform="rotate(30 46 23)"/>`;
    if(style==='braids')return`<path d="M15 32Q15 15 32 15Q49 15 49 32Q46 21 32 21Q18 21 15 32Z" fill="${c}"/><path d="M32 15V21" stroke="rgba(0,0,0,.25)" stroke-width="1.2"/>`;
    if(style==='bun')return`<circle cx="32" cy="12.5" r="6.5" fill="${c}"/><path d="M15 30Q16 15 32 15Q48 15 49 30Q45 21 32 21Q21 21 15 30Z" fill="${c}"/>`;
    return'';
  }
  function eyes(t){
    const lash=(x)=>`<path d="M${x-3} 30.5l-1.5-1.8M${x} 30l0-2M${x+3} 30.5l1.5-1.8" stroke="${D}" stroke-width="1.2" stroke-linecap="round"/>`;
    if(t==='happy')return`<path d="M22 34q3-4 6 0M36 34q3-4 6 0" fill="none" stroke="${D}" stroke-width="2.2" stroke-linecap="round"/>`;
    if(t==='lashhappy')return`<path d="M22 34q3-4 6 0M36 34q3-4 6 0" fill="none" stroke="${D}" stroke-width="2.2" stroke-linecap="round"/><path d="M21.5 32.5l-1.6-.8M42.5 32.5l1.6-.8" stroke="${D}" stroke-width="1.2" stroke-linecap="round"/>`;
    if(t==='lash')return`<circle cx="25" cy="33" r="2.4" fill="${D}"/><circle cx="39" cy="33" r="2.4" fill="${D}"/>${lash(25)}${lash(39)}`;
    if(t==='lashwink')return`<circle cx="25" cy="33" r="2.4" fill="${D}"/>${lash(25)}<path d="M36 33q3 2 6 0" fill="none" stroke="${D}" stroke-width="2.2" stroke-linecap="round"/>`;
    if(t==='glasses')return`<g fill="none" stroke="${D}" stroke-width="2"><circle cx="25" cy="33" r="5"/><circle cx="39" cy="33" r="5"/><path d="M30 33h4"/></g><circle cx="25" cy="33" r="1.8" fill="${D}"/><circle cx="39" cy="33" r="1.8" fill="${D}"/>`;
    if(t==='sun')return`<rect x="19" y="29" width="11" height="7" rx="2" fill="${D}"/><rect x="34" y="29" width="11" height="7" rx="2" fill="${D}"/><path d="M30 31h4" stroke="${D}" stroke-width="2"/>`;
    if(t==='wink')return`<circle cx="25" cy="33" r="2.4" fill="${D}"/><path d="M36 33h6" stroke="${D}" stroke-width="2.2" stroke-linecap="round"/>`;
    if(t==='sleepy')return`<path d="M22 33q3 3 6 0M36 33q3 3 6 0" fill="none" stroke="${D}" stroke-width="2.2" stroke-linecap="round"/>`;
    return`<circle cx="25" cy="33" r="2.4" fill="${D}"/><circle cx="39" cy="33" r="2.4" fill="${D}"/>`;
  }
  function mouth(t,fem){
    const lip=fem?'#c94a63':D;
    if(t==='grin')return`<path d="M25 40q7 9 14 0z" fill="#fff" stroke="${lip}" stroke-width="1.8" stroke-linejoin="round"/>`;
    if(t==='o')return`<circle cx="32" cy="42" r="2.6" fill="${lip}"/>`;
    if(t==='flat')return`<path d="M27 42h10" stroke="${lip}" stroke-width="2.2" stroke-linecap="round"/>`;
    if(t==='tongue')return`<path d="M26 40q6 6 12 0" fill="none" stroke="${lip}" stroke-width="2.2" stroke-linecap="round"/><path d="M30 43q2 4 4 0z" fill="#e2587e"/>`;
    return`<path d="M26 40q6 6 12 0" fill="none" stroke="${lip}" stroke-width="2.2" stroke-linecap="round"/>`;
  }
  function extra(t,hair){
    if(t==='beard')return`<path d="M16 35q2 16 16 16t16-16q-4 7-8 6-4-2-8-2t-8 2q-4 1-8-6z" fill="${hair}"/>`;
    if(t==='mustache')return`<path d="M25 39q3-3 7-1 4-2 7 1-4 1-7 0-3 1-7 0z" fill="${hair}"/>`;
    if(t==='freckles')return`<g fill="rgba(120,60,30,.55)"><circle cx="22" cy="38" r="1"/><circle cx="25" cy="39.5" r="1"/><circle cx="39" cy="39.5" r="1"/><circle cx="42" cy="38" r="1"/></g>`;
    if(t==='blush')return`<g fill="rgba(229,98,107,.45)"><circle cx="21" cy="39" r="3"/><circle cx="43" cy="39" r="3"/></g>`;
    if(t==='earring')return`<g fill="#f2c230"><circle cx="15" cy="39" r="1.8"/><circle cx="49" cy="39" r="1.8"/></g>`;
    return'';
  }
  /* Kopfbedeckungen: jede beginnt mit einer Kappe, die den Kopf oberhalb der Krempe ganz abdeckt */
  function hat(h){
    const c=HATS[h].color,dk='rgba(0,0,0,.22)',hi='rgba(255,255,255,.3)';
    if(h===1)return dome(19.5,28,c)+`<rect x="12.5" y="24" width="39" height="7.5" rx="3.6" fill="${c}"/><rect x="12.5" y="24" width="39" height="7.5" rx="3.6" fill="${dk}"/>${[17,22,27,32,37,42,47].map(x=>`<path d="M${x} 25v5.5" stroke="${hi}" stroke-width="1.4"/>`).join('')}<circle cx="32" cy="13" r="4.5" fill="#fff"/>`;
    if(h===2)return dome(18.8,28.5,c)+`<path d="M24 16.5Q32 14.5 33 28.5" stroke="${hi}" stroke-width="1.4" fill="none"/><path d="M29 27Q47 23 58 29Q49 31.5 29 30.5Z" fill="${c}"/><path d="M29 27Q47 23 58 29Q49 31.5 29 30.5Z" fill="${dk}"/><circle cx="32" cy="15.6" r="1.6" fill="${dk}"/>`;
    if(h===3){const band=(y,R)=>Math.sqrt(R*R-(CY-y)**2);const a=band(22,17.9),b=band(27.5,17.9);
      return`<path d="M${CX-a} 22L${CX+a} 22L${CX+b} 27.5L${CX-b} 27.5Z" fill="${c}"/><path d="M${CX-a} 22L${CX+a} 22" stroke="${hi}" stroke-width="1"/><path d="M48 25l7-3-1 6zM48 25l6 5-6 1z" fill="${c}"/>`;}
    if(h===4)return`<path d="M13.5 34A18.5 18.5 0 0 1 50.5 34" fill="none" stroke="${c}" stroke-width="4.5"/><rect x="8.5" y="28" width="9" height="14" rx="4" fill="${c}"/><rect x="46.5" y="28" width="9" height="14" rx="4" fill="${c}"/><rect x="10.5" y="31" width="5" height="8" rx="2.5" fill="#e5626b"/><rect x="48.5" y="31" width="5" height="8" rx="2.5" fill="#e5626b"/>`;
    if(h===5)return dome(20,29,c)+`<path d="M29.5 14.4h5V29h-5z" fill="${hi}"/><rect x="10.5" y="27" width="43" height="4.5" rx="2.2" fill="${c}"/><rect x="10.5" y="27" width="43" height="4.5" rx="2.2" fill="${dk}"/>`;
    if(h===6)return`<path d="M18.5 24L32 0L45.5 24Z" fill="${c}"/><path d="M22.4 17L41.6 17M25.8 11L38.2 11" stroke="#f2c230" stroke-width="2.2"/><ellipse cx="32" cy="23.5" rx="14.5" ry="3" fill="${c}"/><ellipse cx="32" cy="23.5" rx="14.5" ry="3" fill="${dk}"/><circle cx="32" cy="1.5" r="3" fill="#ffa3ab"/>`;
    if(h===7)return dome(17.6,24,c)+`<rect x="18.5" y="2" width="27" height="21" rx="1.5" fill="${c}"/><rect x="18.5" y="17" width="27" height="4" fill="#e5626b"/><ellipse cx="32" cy="23" rx="21" ry="3.6" fill="${c}"/><path d="M21 4v12" stroke="${hi}" stroke-width="1.6"/>`;
    if(h===8)return dome(18.6,26.5,c)+`<path d="M13.6 27.5L13.6 13L22.5 20.5L32 7L41.5 20.5L50.4 13L50.4 27.5Z" fill="${c}"/><rect x="13.6" y="23.5" width="36.8" height="4.5" fill="${dk}"/><circle cx="32" cy="17" r="2.4" fill="#e5626b"/><circle cx="22.5" cy="23" r="1.6" fill="#4aa8ec"/><circle cx="41.5" cy="23" r="1.6" fill="#4aa8ec"/>`;
    return'';
  }
  let uid=0;
  const split=id=>{id=Math.max(0,id|0);return{face:id%100%FACES.length,hat:Math.floor(id/100)%HATS.length};};
  function svg(id,size=48){
    const{face,hat:h}=split(id),[bg,skin,style,hc,ey,mo,ex]=FACES[face],hair=HAIR[hc],fem=face>=10,k=++uid;
    // Mit Kopfbedeckung bleibt von der Frisur nur, was unter der Krempe hervorschaut
    const front=frontHair(style,hair);
    const cut={1:28,2:28.5,5:29,7:24,8:26.5}[h];   // Stirnband, Kopfhörer und Partyhut sitzen auf den Haaren
    const frontClipped=cut?`<clipPath id="gga${k}"><rect x="0" y="${cut}" width="64" height="40"/></clipPath><g clip-path="url(#gga${k})">${front}</g>`:front;
    return`<svg viewBox="0 0 64 64" width="${size}" height="${size}" role="img" aria-label="${fem?'Frau':'Mann'}${h?' mit '+HATS[h].name:''}" style="display:block;flex:none;overflow:visible">
      <circle cx="32" cy="32" r="32" fill="${bg}"/>${backHair(style,hair)}<path d="M8 64q4-15 24-15t24 15z" fill="rgba(0,0,0,.28)"/>
      <circle cx="${CX}" cy="${CY}" r="${HR}" fill="${SKIN[skin]}"/>${extra(ex,hair)}${frontClipped}${eyes(ey)}${mouth(mo,fem)}${h?hat(h):''}</svg>`;
  }
  root.Avatars={count:FACES.length,hats:HATS.length-1,hatName:h=>HATS[h]?HATS[h].name:'Ohne',split,make:(face,hat)=>face+100*hat,svg,female:f=>f>=10};
})(window);
