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
function pointPlans(match, reading, ms) {
 const {levels,rivalServing,rivalReturning,rivalPattern}=reading;
 const protect=levels.fatigue===3||levels.tension===3||levels.stroke===1||levels.pressure===3||levels.confidence===1||levels.power===3;
 const net=rivalPattern==='net'||rivalPattern==='mixed';
 const short=rivalPattern==='short';
 const late=levels.fatigue===3&&ms>=4500000;
 const target=match.hand==='Zurdo'?'Abierto en iguales, T en ventaja.':match.hand==='Diestro'?'T en iguales, abierto en ventaja.':'Saca a una zona amplia.';
 const start=protect?'Saca con margen.':rivalReturning==='direction'?target:rivalReturning==='deep'?'Saca al cuerpo.':rivalReturning==='short'?'Repite el saque que lo deja corto.':'Saca con margen.';
 const build=net?'Profundo si espera, bajo si sube.':short?'Profundo para impedir la subida.':protect?'Cruzado alto y profundo.':'Abre con un cruzado profundo.';
 const returnStart=rivalServing==='strong'?'Bloquea profundo al centro.':rivalServing==='second'&&!protect?'Entra al segundo y devuelve profundo.':protect?'Devuelve con margen al centro.':'Devuelve profundo a zona amplia.';
 const returnBuild=net?'Si sube, juega a sus pies.':short?'Mantén la pelota profunda.':protect?'Cruzado alto y profundo.':rivalPattern==='baseline'?'Muévelo con un cruzado profundo.':'Construye cruzado.';
 const close=late?'Corta y cómodo: acelera. Si no, profundidad.':'Corta y cómodo: ataca. Si no, cruzado.';
 const returnClose=net&&!protect?'Volea corta: pasa al espacio. Si no, neutraliza.':close;
 const plan=(a,b,c)=>'Inicio · '+a+'\nConstrucción · '+b+'\nCierre · '+c;
 return {serving:plan(start,build,close),receiving:plan(returnStart,returnBuild,returnClose)};
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
