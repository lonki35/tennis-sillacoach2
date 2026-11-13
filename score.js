'use strict';
const SillaScore = (() => {
  const empty = () => ({me:0,rival:0});
  function winner(set) {
    if (set.super) return pointWinner(set,10);
    if (set.points) return pointWinner(set.points,7);
    const high = Math.max(set.me,set.rival);
    const low = Math.min(set.me,set.rival);
    return ((high===6 && low<=4) || (high===7 && low>=5 && low<=6)) ? (set.me>set.rival?'me':'rival') : null;
  }
  function pointWinner({me,rival}, target) {
    return Math.max(me,rival)>=target && Math.abs(me-rival)>=2 ? (me>rival?'me':'rival') : null;
  }
  function advance(match, now) {
    const wins = match.sets.reduce((counts,set) => {
      const side = winner(set);
      if (side) counts[side]++;
      return counts;
    },{me:0,rival:0});
    if (wins.me===2 || wins.rival===2) {
      match.end = now;
      return;
    }
    do { match.set++; } while (match.sets[match.set] && winner(match.sets[match.set]));
    if (!match.sets[match.set]) match.sets.push({...empty(),super:match.set===2 && match.format==='super'});
  }
  function add(match, side, now) {
    if (match.end!==null || match.pendingSet || !['me','rival'].includes(side)) return;
    match.undo = {set:match.set,sets:JSON.parse(JSON.stringify(match.sets)),end:match.end,pendingSet:match.pendingSet??null,progressLength:match.progress?.length??0};
    const set = match.sets[match.set];
    const tally = set.points ?? set;
    tally[side]++;
    if (!set.super && !set.points && set.me===6 && set.rival===6) set.points = empty();
    const won = winner(set);
    if (won) {
      if (set.points) set[won] = 7;
      if(match.confirmSets) match.pendingSet={at:now};
      else advance(match,now);
    }
  }
  function undo(match) {
    if (!match.undo) return;
    const previous=match.undo;
    if(match.progress) match.progress.length=previous.progressLength??0;
    Object.assign(match,previous,{undo:null});
  }
  function label(set) {
    const score = set.me+'–'+set.rival;
    if (set.super) return 'Súper tie-break '+score;
    return set.points ? score+' (tie-break '+set.points.me+'–'+set.points.rival+')' : score;
  }
  function played(match) {
    return match.sets.filter(set=>set.me || set.rival || set.points?.me || set.points?.rival);
  }
  function migrate(data) {
    if (data.version===2) return data;
    const history = [...data.history].sort((a,b)=>a.start-b.start);
    let next = 1;
    for (const match of history) Object.assign(match,{number:next++,format:null});
    if (data.active) {
      const match = data.active;
      match.goals ??= []; match.observations ??= [];
      Object.assign(match,{number:next++,format:'normal',undo:null});
      // Preserve the old manual marker, including any games in later sets.
      for (const set of match.sets) if (set.me===6 && set.rival===6) set.points = empty();
      const firstOpen = match.sets.findIndex(set=>!winner(set));
      match.set = firstOpen<0 ? Math.min(match.set,2) : firstOpen;
      const counts = match.sets.map(winner);
      if (['me','rival'].some(side=>counts.filter(value=>value===side).length>=2)) match.end = Date.now();
      match.legacyManual = match.sets.some(set=>Math.max(set.me,set.rival)===7 && !winner(set));
    }
    return {version:2,active:data.active,history:history.reverse(),next};
  }
  function close(match,now) {
    const completed = match.end!==null;
    match.result = completed ? (match.sets.filter(set=>winner(set)==='me').length===2?'Ganado':'Perdido') : 'Inconcluso';
    match.end ??= now;
    delete match.undo;
  }
  return {winner,add,undo,confirm(match){if(!match.pendingSet)return;const {at}=match.pendingSet;match.pendingSet=null;advance(match,at);},label,played,migrate,close};
})();
if (typeof module!=='undefined') module.exports = SillaScore;