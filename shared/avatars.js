/* Avatare der Garage Games: 16 Gesichter als SVG, damit man die Spieler auf einen Blick auseinanderhält. */
(function(root){
  const SKIN=['#f2c9a0','#e0a878','#b9784b','#8a5a3a','#ffdcb8'];
  const HAIR=['#2b1d14','#6b4423','#c98b3a','#1b1b1b','#9aa1a6'];
  // bg, skin, eyes, mouth, top, topColor, extra
  const LIST=[
    ['#f0b24a',0,'dot','smile','cap','#c93b3b','none'],
    ['#e5626b',1,'happy','grin','hair',HAIR[0],'none'],
    ['#5fc3b0',2,'glasses','smile','hair',HAIR[3],'beard'],
    ['#4aa8ec',4,'wink','tongue','beanie','#f0b24a','freckles'],
    ['#a98bf0',0,'sun','flat','mohawk','#e5626b','none'],
    ['#b6d65a',3,'dot','grin','helmet','#f0b24a','none'],
    ['#ee8a2a',1,'sleepy','o','hair',HAIR[2],'mustache'],
    ['#a3b1b5',2,'happy','smile','headband',HAIR[1],'blush'],
    ['#c93b3b',4,'glasses','grin','cap','#2f6db5','freckles'],
    ['#2f6db5',0,'dot','o','helmet','#e5626b','none'],
    ['#3a9a5b',3,'sun','smile','cap','#1b1b1b','beard'],
    ['#7b3fa0',1,'wink','grin','hair',HAIR[4],'none'],
    ['#e2587e',2,'happy','tongue','beanie','#5fc3b0','blush'],
    ['#8a5a2b',0,'glasses','flat','headband',HAIR[3],'mustache'],
    ['#1fa384',4,'dot','smile','mohawk','#a98bf0','freckles'],
    ['#f2c230',3,'sleepy','grin','hair',HAIR[1],'none'],
  ];
  const D='#1b1b1b';
  function eyes(t){
    if(t==='happy')return`<path d="M22 34q3-4 6 0M36 34q3-4 6 0" fill="none" stroke="${D}" stroke-width="2.2" stroke-linecap="round"/>`;
    if(t==='glasses')return`<g fill="none" stroke="${D}" stroke-width="2"><circle cx="25" cy="33" r="5"/><circle cx="39" cy="33" r="5"/><path d="M30 33h4"/></g><circle cx="25" cy="33" r="1.8" fill="${D}"/><circle cx="39" cy="33" r="1.8" fill="${D}"/>`;
    if(t==='sun')return`<rect x="19" y="29" width="11" height="7" rx="2" fill="${D}"/><rect x="34" y="29" width="11" height="7" rx="2" fill="${D}"/><path d="M30 31h4" stroke="${D}" stroke-width="2"/>`;
    if(t==='wink')return`<circle cx="25" cy="33" r="2.4" fill="${D}"/><path d="M36 33h6" stroke="${D}" stroke-width="2.2" stroke-linecap="round"/>`;
    if(t==='sleepy')return`<path d="M22 33q3 3 6 0M36 33q3 3 6 0" fill="none" stroke="${D}" stroke-width="2.2" stroke-linecap="round"/>`;
    return`<circle cx="25" cy="33" r="2.4" fill="${D}"/><circle cx="39" cy="33" r="2.4" fill="${D}"/>`;
  }
  function mouth(t){
    if(t==='grin')return`<path d="M25 40q7 9 14 0z" fill="#fff" stroke="${D}" stroke-width="1.8" stroke-linejoin="round"/>`;
    if(t==='o')return`<circle cx="32" cy="42" r="2.6" fill="${D}"/>`;
    if(t==='flat')return`<path d="M27 42h10" stroke="${D}" stroke-width="2.2" stroke-linecap="round"/>`;
    if(t==='tongue')return`<path d="M26 40q6 6 12 0" fill="none" stroke="${D}" stroke-width="2.2" stroke-linecap="round"/><path d="M30 43q2 4 4 0z" fill="#e2587e"/>`;
    return`<path d="M26 40q6 6 12 0" fill="none" stroke="${D}" stroke-width="2.2" stroke-linecap="round"/>`;
  }
  function top(t,c){
    if(t==='cap')return`<path d="M15 29q17-20 34 0z" fill="${c}"/><rect x="30" y="26" width="24" height="4.5" rx="2.2" fill="${c}"/>`;
    if(t==='helmet')return`<path d="M13 32q19-28 38 0z" fill="${c}"/><path d="M30 10h4v20h-4z" fill="rgba(255,255,255,.35)"/>`;
    if(t==='beanie')return`<path d="M15 27q17-21 34 0z" fill="${c}"/><rect x="14" y="24" width="36" height="7" rx="3.5" fill="rgba(0,0,0,.25)"/><circle cx="32" cy="9" r="3.5" fill="${c}"/>`;
    if(t==='mohawk')return`<path d="M27 19l5-14 5 14z" fill="${c}"/>`;
    if(t==='headband')return`<path d="M15 31q2-17 17-16 15-1 17 16-4-9-17-9t-17 9z" fill="${c}"/><rect x="15" y="23" width="34" height="4" rx="2" fill="#e5626b"/>`;
    if(t==='hair')return`<path d="M15 31q2-17 17-16 15-1 17 16-4-9-17-9t-17 9z" fill="${c}"/>`;
    return'';
  }
  function extra(t,hair){
    if(t==='beard')return`<path d="M16 35q2 16 16 16t16-16q-4 7-8 6-4-2-8-2t-8 2q-4 1-8-6z" fill="${hair}"/>`;
    if(t==='mustache')return`<path d="M25 39q3-3 7-1 4-2 7 1-4 1-7 0-3 1-7 0z" fill="${hair}"/>`;
    if(t==='freckles')return`<g fill="rgba(120,60,30,.55)"><circle cx="22" cy="38" r="1"/><circle cx="25" cy="39.5" r="1"/><circle cx="39" cy="39.5" r="1"/><circle cx="42" cy="38" r="1"/></g>`;
    if(t==='blush')return`<g fill="rgba(229,98,107,.45)"><circle cx="21" cy="39" r="3"/><circle cx="43" cy="39" r="3"/></g>`;
    return'';
  }
  function svg(id,size=48){
    const a=LIST[((id|0)%LIST.length+LIST.length)%LIST.length],[bg,skin,ey,mo,tp,tc,ex]=a;
    return`<svg viewBox="0 0 64 64" width="${size}" height="${size}" role="img" aria-label="Avatar ${(id|0)+1}" style="display:block;flex:none">
      <circle cx="32" cy="32" r="32" fill="${bg}"/><path d="M8 64q4-15 24-15t24 15z" fill="rgba(0,0,0,.28)"/>
      <circle cx="32" cy="34" r="17" fill="${SKIN[skin]}"/>${extra(ex,tc.startsWith('#')?HAIR[0]:tc)}${top(tp,tc)}${eyes(ey)}${mouth(mo)}</svg>`;
  }
  root.Avatars={count:LIST.length,svg};
})(window);
