/* Logos und Vorschaubilder der Minispiele (SVG), plus Kurzbeschreibung für die Vorschau beim Darüberfahren. */
(function(root){
  const C={rose:'#f6c6cf',roseD:'#e08aa0',mint:'#bfe5c8',mintD:'#7cc79a',sky:'#bcdcf3',skyD:'#7fb2e0',lav:'#d9c9f0',lavD:'#a98ad8',van:'#f9e3a3',vanD:'#e8c55e',apr:'#fbcfae',aprD:'#ef9f72',cream:'#f2e9dc',ink:'#3b3346',steel:'#b9b0aa',steelD:'#8f8580'};
  const INFO={
    scherbenwerk:{title:'Scherbenwerk',text:'Ein Bild ist in Glasscherben zersprungen. Zieh die Teile an die richtige Stelle, später auch gedreht.'},
    rohrleitung: {title:'Rohrleitung', text:'Dreh die Rohre, bis das Wasser von der Pumpe jeden Hahn erreicht und nirgends etwas ausläuft.'},
    farbfolge:   {title:'Farbfolge',   text:'Merk dir die Folge aus Farben und Tönen. Sie wird immer länger, ein Fehler und du bist raus.'},
    startampel:  {title:'Startampel',  text:'Klick, sobald das Signal kommt. Wer zu früh klickt, ist raus. Fünf Runden, verschiedene Signale.'},
    turmbau:     {title:'Turmbau',     text:'Lass die Blöcke vom Kran fallen. Was übersteht, wird abgeschnitten. Der höchste Turm gewinnt.'},
    schubsarena: {title:'Schubsarena', text:'Schubs die anderen Kugeln von der schrumpfenden Plattform. Der Letzte oben gewinnt.'},
  };
  // Logos: 64 × 64, runde Kachel
  const ICON={
    scherbenwerk:`<rect x="10" y="10" width="44" height="44" rx="6" fill="${C.sky}"/><path d="M10 30L27 24L32 10M27 24L36 36L54 30M36 36L30 54M36 36L48 54M27 24L10 44" stroke="#fff" stroke-width="2.5" fill="none" stroke-linejoin="round"/><path d="M36 36L54 30L54 46Z" fill="${C.rose}"/><path d="M27 24L32 10L54 10L54 30L36 36Z" fill="${C.lav}" opacity=".8"/>`,
    rohrleitung:`<path d="M12 22H34Q42 22 42 30V52" stroke="${C.steelD}" stroke-width="13" fill="none"/><path d="M12 22H34Q42 22 42 30V52" stroke="${C.steel}" stroke-width="9" fill="none"/><path d="M12 22H34Q42 22 42 30V52" stroke="${C.skyD}" stroke-width="4" fill="none"/><rect x="8" y="12" width="16" height="20" rx="4" fill="${C.vanD}"/><circle cx="16" cy="22" r="4.5" fill="#fff"/><circle cx="42" cy="52" r="6" fill="${C.skyD}"/>`,
    farbfolge:`<path d="M32 32V10A22 22 0 0 1 54 32Z" fill="${C.roseD}"/><path d="M32 32H54A22 22 0 0 1 32 54Z" fill="${C.vanD}"/><path d="M32 32V54A22 22 0 0 1 10 32Z" fill="${C.mintD}"/><path d="M32 32H10A22 22 0 0 1 32 10Z" fill="${C.skyD}"/><circle cx="32" cy="32" r="8" fill="#fff"/>`,
    startampel:`<rect x="8" y="20" width="48" height="24" rx="6" fill="${C.ink}"/>${[16,26,36,46].map((x,i)=>`<circle cx="${x+2}" cy="32" r="4.6" fill="${i<3?'#ff5a4f':'#5a2a2a'}"/>`).join('')}<rect x="30" y="44" width="4" height="12" fill="${C.ink}"/>`,
    turmbau:`<rect x="20" y="46" width="26" height="9" rx="1.5" fill="${C.aprD}"/><rect x="23" y="37" width="22" height="9" rx="1.5" fill="${C.mintD}"/><rect x="21" y="28" width="21" height="9" rx="1.5" fill="${C.lavD}"/><path d="M14 8H52" stroke="${C.ink}" stroke-width="3"/><path d="M36 8L38 16" stroke="${C.ink}" stroke-width="1.6"/><rect x="31" y="16" width="16" height="7" rx="1.5" fill="${C.roseD}"/>`,
    schubsarena:`<circle cx="32" cy="34" r="22" fill="${C.cream}" stroke="${C.vanD}" stroke-width="3" stroke-dasharray="5 4"/><circle cx="24" cy="30" r="6" fill="${C.roseD}"/><circle cx="38" cy="38" r="6" fill="${C.skyD}"/><circle cx="44" cy="25" r="6" fill="${C.mintD}"/><path d="M29 33L33 35" stroke="${C.ink}" stroke-width="1.5" stroke-linecap="round"/>`,
  };
  // Vorschaubilder: 240 × 135
  const PREV={
    scherbenwerk:`<rect width="240" height="135" fill="${C.cream}"/><rect x="10" y="12" width="52" height="111" rx="6" fill="#fff"/><rect x="178" y="12" width="52" height="111" rx="6" fill="#fff"/>
      <rect x="72" y="18" width="96" height="100" fill="${C.sky}"/><path d="M72 70Q100 52 120 64T168 58V118H72Z" fill="${C.mintD}" opacity=".7"/><circle cx="146" cy="38" r="9" fill="${C.van}"/>
      <path d="M72 50L100 44L106 18M100 44L118 72L168 62M118 72L108 118M118 72L146 118M100 44L72 96" stroke="#fff" stroke-width="2" fill="none"/>
      <path d="M18 30L46 24L52 50L26 58Z" fill="${C.rose}"/><path d="M22 72L50 66L44 104L20 98Z" fill="${C.lav}"/><path d="M186 26L222 32L214 62L190 54Z" fill="${C.mintD}"/><path d="M188 76L218 72L222 110L194 112Z" fill="${C.aprD}"/>`,
    rohrleitung:`<rect width="240" height="135" fill="${C.cream}"/><g transform="translate(60 8)">${Array.from({length:16},(_,i)=>`<rect x="${(i%4)*30+1}" y="${Math.floor(i/4)*30+1}" width="28" height="28" rx="3" fill="#fff"/>`).join('')}
      <path d="M15 15H75M45 15V75H105M75 75V105M15 15V45" stroke="${C.steel}" stroke-width="10" fill="none"/><path d="M15 15H75M45 15V75H105M75 75V105M15 15V45" stroke="${C.skyD}" stroke-width="4" fill="none"/>
      <rect x="36" y="66" width="18" height="18" rx="4" fill="${C.vanD}"/><circle cx="105" cy="75" r="7" fill="${C.skyD}"/><circle cx="75" cy="105" r="7" fill="${C.skyD}"/><circle cx="15" cy="45" r="7" fill="${C.skyD}"/><circle cx="105" cy="15" r="7" fill="${C.cream}" stroke="${C.steelD}" stroke-width="2"/></g>`,
    farbfolge:`<rect width="240" height="135" fill="${C.cream}"/><g transform="translate(120 68)"><path d="M0 0V-56A56 56 0 0 1 56 0Z" fill="${C.roseD}"/><path d="M0 0H56A56 56 0 0 1 0 56Z" fill="${C.van}"/><path d="M0 0V56A56 56 0 0 1 -56 0Z" fill="${C.mint}"/><path d="M0 0H-56A56 56 0 0 1 0 -56Z" fill="${C.sky}"/><circle r="20" fill="#fff"/><text y="7" text-anchor="middle" font-family="monospace" font-weight="700" font-size="18" fill="${C.ink}">7</text></g>
      <g fill="${C.ink}" opacity=".5"><circle cx="26" cy="60" r="4"/><circle cx="40" cy="60" r="4"/><circle cx="54" cy="60" r="4"/><circle cx="186" cy="60" r="4"/><circle cx="200" cy="60" r="4"/><circle cx="214" cy="60" r="4"/></g>`,
    startampel:`<rect width="240" height="135" fill="${C.cream}"/><rect x="30" y="28" width="180" height="56" rx="10" fill="${C.ink}"/>${[0,1,2,3,4].map(i=>`<circle cx="${54+i*33}" cy="46" r="9" fill="${i<4?'#ff5a4f':'#5a2a2a'}"/><circle cx="${54+i*33}" cy="68" r="9" fill="${i<4?'#ff5a4f':'#5a2a2a'}"/>`).join('')}
      <text x="120" y="116" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="20" fill="${C.ink}">Warten …</text>`,
    turmbau:`<rect width="240" height="135" fill="${C.sky}"/><rect y="120" width="240" height="15" fill="${C.steel}"/><path d="M0 14H240" stroke="${C.ink}" stroke-width="5"/><path d="M120 14L136 50" stroke="${C.ink}" stroke-width="1.5"/>
      <rect x="116" y="50" width="44" height="13" rx="2" fill="${C.roseD}"/>${[[96,107,52,C.aprD],[100,94,48,C.mintD],[98,81,46,C.lavD],[104,68,40,C.vanD]].map(([x,y,w,c])=>`<rect x="${x}" y="${y}" width="${w}" height="13" rx="2" fill="${c}"/>`).join('')}
      <rect x="84" y="120" width="72" height="6" fill="${C.steelD}"/>`,
    schubsarena:`<rect width="240" height="135" fill="${C.steel}"/><circle cx="120" cy="68" r="56" fill="#fff" stroke="${C.vanD}" stroke-width="4" stroke-dasharray="9 7"/>
      <circle cx="100" cy="56" r="10" fill="${C.vanD}"/><circle cx="100" cy="56" r="15" fill="none" stroke="${C.aprD}" stroke-width="2"/><circle cx="132" cy="80" r="10" fill="${C.roseD}"/><circle cx="148" cy="48" r="10" fill="${C.skyD}"/><circle cx="96" cy="94" r="10" fill="${C.mintD}"/><path d="M108 62L124 74" stroke="${C.ink}" stroke-width="2" stroke-linecap="round" stroke-dasharray="3 3"/>`,
  };
  const icon=(id,size=36)=>`<svg viewBox="0 0 64 64" width="${size}" height="${size}" aria-hidden="true" style="flex:none;display:block">${ICON[id]||''}</svg>`;
  const preview=id=>`<svg viewBox="0 0 240 135" width="240" height="135" aria-hidden="true" style="display:block;border-radius:8px">${PREV[id]||''}</svg>`;

  /* Eine schwebende Vorschau für alle Elemente mit data-game-tip="spiel-id" (Maus und Tastatur) */
  let tip=null;
  function show(el){
    const id=el.dataset.gameTip,info=INFO[id];if(!info)return;
    if(!tip){tip=document.createElement('div');tip.className='gametip';tip.setAttribute('role','tooltip');document.body.appendChild(tip);}
    tip.innerHTML=`${preview(id)}<strong>${info.title}</strong><span>${info.text}</span>`;tip.hidden=false;
    const r=el.getBoundingClientRect(),w=264,h=tip.offsetHeight||220,vw=document.documentElement.clientWidth;
    let x=r.left+r.width/2-w/2;x=Math.max(8,Math.min(vw-w-8,x));
    let y=r.top-h-10;if(y<8)y=r.bottom+10;
    tip.style.left=x+window.scrollX+'px';tip.style.top=y+window.scrollY+'px';
  }
  function hide(){if(tip)tip.hidden=true;}
  function wire(){
    if(wire.done)return;wire.done=true;
    const st=document.createElement('style');
    st.textContent=`.gametip{position:absolute;z-index:60;width:264px;background:var(--panel,#fff);border:1px solid var(--panel-edge,#ddd);border-radius:12px;padding:12px;box-shadow:0 14px 40px var(--shadow,rgba(0,0,0,.2));display:flex;flex-direction:column;gap:6px;pointer-events:none;font-family:var(--display,sans-serif);color:var(--ink,#222)}
      .gametip strong{font-size:1rem}.gametip span{font-size:.85rem;line-height:1.4;color:var(--muted,#666)}`;
    document.head.appendChild(st);
    document.addEventListener('mouseover',e=>{const el=e.target.closest('[data-game-tip]');if(el)show(el);else hide();});
    document.addEventListener('focusin',e=>{const el=e.target.closest('[data-game-tip]');if(el)show(el);else hide();});
    document.addEventListener('scroll',hide,true);
    document.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse')hide();});
  }
  root.GameArt={icon,preview,info:INFO,wire};
})(window);
