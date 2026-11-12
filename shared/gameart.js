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
    farbschlacht:{title:'Farbschlacht',text:'Farbkugel-Shooter von oben, jeder gegen jeden. Abschüsse bringen Punkte, Kopfschüsse extra. Bessere Waffen liegen auf der Karte.'},
    parkluecke:  {title:'Parklücke',   text:'Park Kleinwagen, Bus, Bagger, Panzer und LKW mit Hänger ein, ohne anzuecken. Die Lücken werden immer enger, Tempo bringt Punkte.'},
    grillmeister:{title:'Grillmeister',text:'Wurst, Steak und Spieße auf den Punkt grillen: richtige Kerntemperatur, schöne Grillstreifen, nichts verkohlt. Später nur noch mit Thermometer.'},
    simson:{title:'Simson-Rennen',text:'Mit der S50 durchs Dorf gegen Kalle, Mandy und Ronny: antreten, von Hand schalten und bloß keinen Kolbenklemmer riskieren.'},
  };
  // Logos: 64 × 64, runde Kachel
  const ICON={
    scherbenwerk:`<rect x="10" y="10" width="44" height="44" rx="6" fill="${C.sky}"/><path d="M10 30L27 24L32 10M27 24L36 36L54 30M36 36L30 54M36 36L48 54M27 24L10 44" stroke="#fff" stroke-width="2.5" fill="none" stroke-linejoin="round"/><path d="M36 36L54 30L54 46Z" fill="${C.rose}"/><path d="M27 24L32 10L54 10L54 30L36 36Z" fill="${C.lav}" opacity=".8"/>`,
    rohrleitung:`<path d="M12 22H34Q42 22 42 30V52" stroke="${C.steelD}" stroke-width="13" fill="none"/><path d="M12 22H34Q42 22 42 30V52" stroke="${C.steel}" stroke-width="9" fill="none"/><path d="M12 22H34Q42 22 42 30V52" stroke="${C.skyD}" stroke-width="4" fill="none"/><rect x="8" y="12" width="16" height="20" rx="4" fill="${C.vanD}"/><circle cx="16" cy="22" r="4.5" fill="#fff"/><circle cx="42" cy="52" r="6" fill="${C.skyD}"/>`,
    farbfolge:`<path d="M32 32V10A22 22 0 0 1 54 32Z" fill="${C.roseD}"/><path d="M32 32H54A22 22 0 0 1 32 54Z" fill="${C.vanD}"/><path d="M32 32V54A22 22 0 0 1 10 32Z" fill="${C.mintD}"/><path d="M32 32H10A22 22 0 0 1 32 10Z" fill="${C.skyD}"/><circle cx="32" cy="32" r="8" fill="#fff"/>`,
    startampel:`<rect x="8" y="20" width="48" height="24" rx="6" fill="${C.ink}"/>${[16,26,36,46].map((x,i)=>`<circle cx="${x+2}" cy="32" r="4.6" fill="${i<3?'#ff5a4f':'#5a2a2a'}"/>`).join('')}<rect x="30" y="44" width="4" height="12" fill="${C.ink}"/>`,
    turmbau:`<rect x="20" y="46" width="26" height="9" rx="1.5" fill="${C.aprD}"/><rect x="23" y="37" width="22" height="9" rx="1.5" fill="${C.mintD}"/><rect x="21" y="28" width="21" height="9" rx="1.5" fill="${C.lavD}"/><path d="M14 8H52" stroke="${C.ink}" stroke-width="3"/><path d="M36 8L38 16" stroke="${C.ink}" stroke-width="1.6"/><rect x="31" y="16" width="16" height="7" rx="1.5" fill="${C.roseD}"/>`,
    schubsarena:`<circle cx="32" cy="34" r="22" fill="${C.cream}" stroke="${C.vanD}" stroke-width="3" stroke-dasharray="5 4"/><circle cx="24" cy="30" r="6" fill="${C.roseD}"/><circle cx="38" cy="38" r="6" fill="${C.skyD}"/><circle cx="44" cy="25" r="6" fill="${C.mintD}"/><path d="M29 33L33 35" stroke="${C.ink}" stroke-width="1.5" stroke-linecap="round"/>`,
    farbschlacht:`<rect x="8" y="8" width="48" height="48" rx="10" fill="${C.mint}"/><circle cx="20" cy="22" r="7" fill="${C.mintD}"/><rect x="34" y="34" width="16" height="16" rx="3" fill="${C.apr}" stroke="${C.aprD}" stroke-width="2"/><circle cx="26" cy="40" r="7" fill="${C.roseD}"/><path d="M24 22l10 4" stroke="${C.ink}" stroke-width="1" fill="none"/><circle cx="42" cy="20" r="5" fill="${C.skyD}"/><path d="M38 18l-8 1" stroke="${C.ink}" stroke-width="2.5" stroke-linecap="round"/><circle cx="29" cy="25" r="2.5" fill="${C.skyD}"/><circle cx="33" cy="40" r="3" fill="${C.roseD}" opacity=".6"/>`,
    parkluecke:`<rect x="8" y="8" width="48" height="48" rx="10" fill="#e6e3ea"/><rect x="24" y="12" width="16" height="30" rx="2" fill="${C.sky}" opacity=".55" stroke="${C.skyD}" stroke-width="2" stroke-dasharray="4 3"/><rect x="12" y="14" width="9" height="20" rx="3" fill="${C.mintD}"/><rect x="43" y="14" width="9" height="20" rx="3" fill="${C.lavD}"/><g transform="rotate(-28 34 44)"><rect x="29" y="34" width="11" height="21" rx="4" fill="${C.roseD}"/><rect x="31" y="38" width="7" height="4" rx="1" fill="#fff"/></g>`,
    grillmeister:`<rect x="8" y="10" width="48" height="40" rx="10" fill="${C.ink}"/><rect x="12" y="14" width="40" height="32" rx="6" fill="#5e5566"/><path d="M17 14V46M24 14V46M31 14V46M38 14V46M45 14V46" stroke="${C.steelD}" stroke-width="2"/><rect x="15" y="19" width="24" height="8" rx="4" fill="${C.aprD}"/><path d="M21 19v8M27 19v8M33 19v8" stroke="#a3562b" stroke-width="1.6"/><ellipse cx="38" cy="37" rx="11" ry="7" fill="${C.roseD}"/><path d="M32 31l5 12M37 30l5 12M42 31l4 9" stroke="#8e3b4f" stroke-width="1.6"/><path d="M18 50L14 58M46 50L50 58" stroke="${C.ink}" stroke-width="3" stroke-linecap="round"/>`,
    simson:`<rect x="8" y="8" width="48" height="48" rx="10" fill="${C.mint}"/><circle cx="19" cy="42" r="8" fill="none" stroke="${C.ink}" stroke-width="4"/><circle cx="46" cy="42" r="8" fill="none" stroke="${C.ink}" stroke-width="4"/><path d="M19 42L27 31H41L46 42" stroke="${C.steelD}" stroke-width="3" fill="none" stroke-linejoin="round"/><rect x="22" y="25" width="19" height="9" rx="4" fill="${C.skyD}"/><rect x="18" y="21" width="15" height="5" rx="2.5" fill="${C.ink}"/><path d="M41 31L44 19H49" stroke="${C.ink}" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="50" cy="24" r="3" fill="${C.van}"/><circle cx="12" cy="46" r="2.5" fill="${C.steel}" opacity=".8"/><circle cx="8" cy="42" r="2" fill="${C.steel}" opacity=".5"/>`,
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
    farbschlacht:`<rect width="240" height="135" fill="#dcebc6"/><circle cx="40" cy="30" r="22" fill="#a9d8b0" stroke="#79b58a" stroke-width="2"/><circle cx="196" cy="104" r="24" fill="#a9d8b0" stroke="#79b58a" stroke-width="2"/>
      <rect x="96" y="40" width="64" height="54" rx="3" fill="#f6eee2" stroke="#a57d58" stroke-width="5"/><rect x="118" y="37" width="20" height="6" fill="#f6eee2"/>
      <circle cx="64" cy="96" r="14" fill="${C.roseD}" opacity=".5"/><circle cx="182" cy="40" r="10" fill="${C.skyD}" opacity=".5"/>
      <circle cx="70" cy="90" r="10" fill="${C.van}" stroke="#ef9f2f" stroke-width="3"/><path d="M78 86l14-7" stroke="${C.ink}" stroke-width="4" stroke-linecap="round"/>
      <circle cx="176" cy="50" r="10" fill="${C.lav}" stroke="#e2557c" stroke-width="3"/><path d="M167 54l-14 7" stroke="${C.ink}" stroke-width="4" stroke-linecap="round"/>
      <circle cx="104" cy="74" r="3.5" fill="#ef9f2f"/><circle cx="118" cy="67" r="3.5" fill="#ef9f2f"/><circle cx="140" cy="64" r="3.5" fill="#e2557c"/>
      <circle cx="128" cy="67" r="13" fill="none" stroke="${C.roseD}" stroke-width="2" stroke-dasharray="4 3"/>`,
    parkluecke:`<rect width="240" height="135" fill="#e6e3ea"/><path d="M30 0V52M70 0V52M110 0V52M150 0V52M190 0V52" stroke="#fff" stroke-width="3"/>
      <rect x="38" y="6" width="24" height="42" rx="7" fill="${C.mintD}"/><rect x="78" y="8" width="24" height="42" rx="7" fill="${C.vanD}"/><rect x="158" y="6" width="24" height="42" rx="7" fill="${C.lavD}"/>
      <rect x="112" y="2" width="36" height="50" fill="${C.sky}" opacity=".6" stroke="${C.skyD}" stroke-width="2.5" stroke-dasharray="6 4"/><text x="130" y="34" font-family="sans-serif" font-weight="800" font-size="20" fill="${C.skyD}" text-anchor="middle">P</text>
      <path d="M40 104C80 104 118 100 128 66" stroke="${C.ink}" stroke-width="2" stroke-dasharray="5 5" fill="none" opacity=".5"/>
      <g transform="rotate(-18 60 104)"><rect x="34" y="92" width="52" height="24" rx="8" fill="${C.roseD}"/><rect x="64" y="95" width="8" height="18" rx="2" fill="#fff"/></g>
      <circle cx="180" cy="100" r="6" fill="${C.aprD}"/><circle cx="180" cy="100" r="2.5" fill="#fff"/><circle cx="206" cy="84" r="6" fill="${C.aprD}"/><circle cx="206" cy="84" r="2.5" fill="#fff"/>`,
    grillmeister:`<rect width="240" height="135" fill="${C.cream}"/><rect x="8" y="10" width="44" height="115" rx="8" fill="#fff"/><rect x="188" y="10" width="44" height="115" rx="8" fill="#fff"/><rect x="62" y="14" width="116" height="108" rx="12" fill="${C.ink}"/><rect x="70" y="24" width="100" height="90" rx="4" fill="#5e5566"/><rect x="70" y="24" width="55" height="90" fill="${C.aprD}" opacity=".45"/><path d="M76 24V114M86 24V114M96 24V114M106 24V114M116 24V114M126 24V114M136 24V114M146 24V114M156 24V114M166 24V114" stroke="${C.steelD}" stroke-width="3"/><rect x="78" y="34" width="44" height="12" rx="6" fill="${C.aprD}"/><path d="M88 34v12M98 34v12M108 34v12" stroke="#a3562b" stroke-width="2.5"/><rect x="80" y="56" width="44" height="12" rx="6" fill="${C.apr}"/><path d="M90 56v12M100 56v12M110 56v12" stroke="#c97f4f" stroke-width="2.5"/><ellipse cx="146" cy="88" rx="18" ry="12" fill="${C.roseD}"/><path d="M134 80l8 18M142 77l8 20M151 78l7 16" stroke="#8e3b4f" stroke-width="2.5"/><path d="M134 84l22-6M134 92l24-7" stroke="#8e3b4f" stroke-width="2" opacity=".6"/><rect x="16" y="22" width="28" height="9" rx="4.5" fill="${C.rose}"/><ellipse cx="30" cy="54" rx="13" ry="9" fill="${C.roseD}" opacity=".8"/><rect x="194" y="20" width="32" height="26" rx="4" fill="${C.van}"/><rect x="194" y="54" width="32" height="26" rx="4" fill="${C.van}"/><rect x="194" y="88" width="32" height="26" rx="4" fill="${C.mint}"/>`,
    simson:`<rect width="240" height="135" fill="${C.mint}"/><rect x="150" y="6" width="80" height="50" fill="${C.van}" opacity=".7"/><circle cx="30" cy="110" r="14" fill="${C.mintD}"/><circle cx="210" cy="96" r="12" fill="${C.mintD}"/><path d="M-10 100C40 100 60 30 120 34S200 110 250 70" stroke="${C.steelD}" stroke-width="34" fill="none"/><path d="M-10 100C40 100 60 30 120 34S200 110 250 70" stroke="${C.steel}" stroke-width="28" fill="none"/><path d="M-10 100C40 100 60 30 120 34S200 110 250 70" stroke="#fff" stroke-width="2" stroke-dasharray="8 10" fill="none"/><g transform="translate(118 34) rotate(4)"><rect x="-14" y="-5" width="28" height="10" rx="4" fill="${C.vanD}"/><circle cx="-2" r="5" fill="#fff"/></g><g transform="translate(80 52) rotate(-40)"><rect x="-14" y="-5" width="28" height="10" rx="4" fill="${C.skyD}"/><circle cx="-2" r="5" fill="#fff"/></g><g transform="translate(160 64) rotate(40)"><rect x="-14" y="-5" width="28" height="10" rx="4" fill="${C.roseD}"/><circle cx="-2" r="5" fill="#fff"/></g><circle cx="98" cy="40" r="5" fill="#fff" opacity=".6"/><circle cx="92" cy="44" r="4" fill="#fff" opacity=".4"/>`,
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
