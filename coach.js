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
function pointPlans(match, reading, ms, general) {
 const {levels,rivalServing,rivalReturning,rivalPattern}=reading;
 const protect=levels.fatigue===3||levels.tension===3||levels.stroke===1||levels.pressure===3||levels.confidence===1||levels.power===3;
 const atNet=rivalPattern==='net'||rivalPattern==='mixed';
 const shortApproach=rivalPattern==='short';
 const fatigueLate=levels.fatigue===3&&ms>=4500000;
 const defend='Si la pelota llega profunda o quedas desequilibrado, juega cruzado con altura y recupera posición.';
 const attack=fatigueLate?'Si llega corta y estás equilibrado, juega profundo al espacio libre y acorta el punto.':'Si llega corta y estás equilibrado, desplaza al rival al espacio libre y sube solo tras una aproximación profunda.';
 const serveStart=protect?'Saca con ritmo a una zona amplia para iniciar equilibrado.':rivalReturning==='direction'?serve(match.hand):rivalReturning==='deep'?'Varía entre al cuerpo y a una zona amplia para limitar su devolución profunda.':rivalReturning==='short'?'Repite un saque con margen que provoque otra devolución corta.':'Saca con margen y prepárate para jugar la siguiente pelota.';
 const buildServe=atNet?'Si se queda atrás, juega profundo para impedir la subida. Si avanza, baja la pelota a sus pies.':shortApproach?'Juega la primera pelota profunda para que no pueda avanzar sobre una bola corta.':rivalPattern==='baseline'?'Abre la cancha con una primera pelota cruzada profunda antes de cambiar de dirección.':protect?'Juega la primera pelota cruzada con altura y profundidad.':general||'Juega la primera pelota cruzada profunda y recupera posición.';
 const returnStart=rivalServing==='strong'?'Acorta la preparación y bloquea profundo al centro.':rivalServing==='second'&&!protect?'Ante el segundo saque, entra equilibrado y devuelve profundo a una zona amplia.':'Devuelve profundo a una zona amplia y recupera posición.';
 const buildReturn=atNet?'Si el rival avanza, juega bajo a sus pies. Si se queda atrás, usa profundidad cruzada.':shortApproach?'Mantén la siguiente pelota profunda para negarle la subida.':rivalPattern==='baseline'?'Construye cruzado profundo hasta moverlo fuera de su posición.':'Consolida la devolución con una pelota cruzada profunda.';
 const finishReturn=atNet?'Si su volea queda corta, entra equilibrado y pasa al espacio libre. Si está pegado a la red, considera el globo. '+defend:attack+' '+defend;
 const plan=(start,build,finish)=>'Inicio · '+start+'\nConstrucción · '+build+'\nCierre · '+finish;
 return {serving:plan(serveStart,buildServe,attack+' '+defend),receiving:plan(returnStart,buildReturn,finishReturn)};
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
