'use strict';
const feelings = [
 ['Físico','fatigue','Fatiga física','Fresco / Ligero','Exigido / Sostenible','Agotado / Sin piernas'],
 ['Físico','activation','Activación','Apático / Lento','Alerta / Intenso','Hiperactivo / Acelerado'],
 ['Físico','tension','Tensión muscular','Muy suelto / Sin firmeza','Firme y elástico','Rígido / Brazo encogido'],
 ['Mental','confidence','Confianza','Baja / Dudoso','Sólida / Realista','Excesiva / Confiado de más'],
 ['Mental','pressure','Presión o nervios','Relajado en exceso','Adrenalina funcional','Bloqueado / Ansioso'],
 ['Mental','focus','Enfoque','Distraído','En el presente / Táctico','Sobreanalizando'],
 ['Mental','frustration','Frustración','Indiferente','Inconformidad útil','Enojado / Impulsivo'],
 ['Técnico','stroke','Sensación del golpe','Inseguro / Empujando','Fluido / Con convicción','Arriesgado sin margen'],
 ['Técnico','power','Potencia','Débil / Pasivo','Controlada (70–80 %)','Desmedida (100 %)']
];
const extremes = levels => feelings.filter(([,id])=>levels[id]===3 || (id!=='fatigue' && levels[id]===1));
function directions(match, reading, ms, general) {
  const {levels,rivalServing,rivalReturning}=reading;
  if(levels.fatigue===3) return {
    serving:'Saca a una zona amplia y juega la siguiente pelota cruzada con altura.',
    receiving:ms>=4500000?'Devuelve profundo al centro. Acorta el punto solo si recibes una pelota favorable.':'Bloquea la devolución al centro y recupera tu posición.'
  };
  const tight=levels.tension===3||levels.stroke===1||levels.pressure===3;
  let serving = general || 'Busca una zona amplia con el primer saque y prepara una primera pelota cruzada.';
  if(tight || rivalReturning==='deep') serving='Saca a una zona amplia. Si la devolución llega profunda, responde cruzado con margen.';
  else if(rivalReturning==='short') serving='Si devuelve corto otra vez, avanza equilibrado y dirige la primera pelota a una zona amplia.';
  else if(rivalReturning==='direction') serving=serve(match.hand);
  let receiving='Devuelve profundo al centro y recupera tu posición.';
  if(rivalServing==='strong') receiving='Acorta la preparación y bloquea el primer saque profundo al centro.';
  if(rivalServing==='second' && levels.confidence===2 && levels.stroke===2) receiving='En el segundo saque, adelanta un paso si hay tiempo y devuelve profundo a una zona amplia.';
  if(rivalServing==='irregular') receiving='Observa el primer saque. Ante un segundo más lento, entra equilibrado y devuelve profundo.';
  if([levels.activation,levels.focus].includes(1)) serving='Antes de sacar, fija una zona y prepara una primera pelota cruzada.';
  if(levels.focus===3||levels.frustration===3||levels.power===3) receiving='Elige una zona amplia antes del punto y devuelve con potencia controlada.';
  const simple=tight||levels.focus===3||levels.frustration===3||levels.power===3;
  const patterns={
    baseline:['Si quedas equilibrado después del saque, juega profundo.','Devuelve profundo para evitar dejarle una pelota corta.'],
    net:['Tras el saque, juega profundo para dificultar su subida.','Si avanza, juega bajo a sus pies. Si se pega a la red y tienes equilibrio, prueba un globo.'],
    short:['Tras el saque, prioriza profundidad para que no entre con una pelota corta.','Devuelve profundo y recupera tu posición para el siguiente golpe.'],
    mixed:['Tras el saque, juega profundo si sigue atrás.','Si sube, juega bajo a sus pies cuando estés equilibrado.']
  };
  const adjustment=patterns[reading.rivalPattern];
  if(adjustment&&!simple) {
    serving+=' '+adjustment[0];
    receiving+=' '+adjustment[1];
  }
  return {serving,receiving};
}
function formatSets(match) {
 return SillaScore.played(match).map(set=>set.me+(set.super?'-':'/')+set.rival).join(' - ')||'Sin marcador';
}
function winnerName(match) {
 if(match.result==='Ganado') return 'Yo';
 if(match.result==='Perdido') return match.rivalName||'No registrado';
 return match.result==='Inconcluso'?'Sin ganador':'No registrado';
}
function parseSets(value,format,unfinished) {
 const tokens=value.trim()?value.trim().split(/\s*-\s*/):[];
 if(tokens.length>3 || (!tokens.length&&!unfinished)) throw Error('Ingresa de uno a tres sets con formato Yo/Rival.');
 const wins={me:0,rival:0};
 return tokens.map((token,index)=>{
  const parts=token.match(/^(\d+)\s*\/\s*(\d+)(?:\s*\((\d+)\s*\/\s*(\d+)\))?$/);
  if(!parts || wins.me===2 || wins.rival===2) throw Error('Revisa el orden y el formato del marcador.');
  const set={me:Number(parts[1]),rival:Number(parts[2])};
  if(!Number.isSafeInteger(set.me)||!Number.isSafeInteger(set.rival)) throw Error('Puntaje fuera de rango.');
  if(index===2 && (wins.me!==1||wins.rival!==1)) throw Error('El tercer set exige un empate 1–1.');
  if(index===2 && format==='super') set.super=true;
  if(!set.super && (Math.max(set.me,set.rival)>7 || (Math.max(set.me,set.rival)===7&&Math.min(set.me,set.rival)<5))) throw Error('Marcador de games inválido.');
  if(parts[3]!==undefined) {
   if(set.super || Math.min(set.me,set.rival)!==6 || ![6,7].includes(Math.max(set.me,set.rival))) throw Error('Detalle de tie-break incompatible.');
   set.points={me:Number(parts[3]),rival:Number(parts[4])};
   if(!Object.values(set.points).every(Number.isSafeInteger)) throw Error('Detalle de tie-break fuera de rango.');
   const pointWinner=SillaScore.winner(set);
   if(set.me===set.rival ? !!pointWinner : pointWinner!==(set.me>set.rival?'me':'rival')) throw Error('Los puntos del tie-break no coinciden con los games.');
  }
  const won=SillaScore.winner(set);
  if(won) wins[won]++;
  else if(index!==tokens.length-1 || !unfinished) throw Error('Solo el último set de un partido inconcluso puede estar abierto.');
  if(index===tokens.length-1 && ((wins.me===2||wins.rival===2)===unfinished)) throw Error('El estado debe coincidir con los sets ganados.');
  return set;
 });
}
