/* ═══════════════════════════════════════════════
   FOGO NA BOMBA — FIFA World Cup 2026
   Main application logic
═══════════════════════════════════════════════ */

// ─── STATE ────────────────────────────────────────────────────────────────────
const DATA_VERSION = '2'; // bump when localStorage schema changes
if (localStorage.getItem('fnb_version') !== DATA_VERSION) {
  localStorage.removeItem('fnb_scores');
  localStorage.removeItem('fnb_polls');
  localStorage.removeItem('fnb_myvotes');
  localStorage.setItem('fnb_version', DATA_VERSION);
}

let currentPhase = 'all';
let voterName = localStorage.getItem('fnb_voter_name') || null;

// Scores & polls stored in localStorage (persist across sessions)
function getScores()  { try { return JSON.parse(localStorage.getItem('fnb_scores')  || '{}'); } catch(e) { return {}; } }
function getPolls()   { try { return JSON.parse(localStorage.getItem('fnb_polls')   || '{}'); } catch(e) { return {}; } }
function getMyVotes() { try { return JSON.parse(localStorage.getItem('fnb_myvotes') || '{}'); } catch(e) { return {}; } }

function saveScores(s)  { localStorage.setItem('fnb_scores',  JSON.stringify(s)); }
function savePolls(p)   { localStorage.setItem('fnb_polls',   JSON.stringify(p)); }
function saveMyVotes(v) { localStorage.setItem('fnb_myvotes', JSON.stringify(v)); }

// ─── TIMEZONE SETUP ───────────────────────────────────────────────────────────
const TIMEZONES = [
  { label: "Miami / New York (ET)",        tz: "America/New_York" },
  { label: "Chicago / Dallas (CT)",        tz: "America/Chicago" },
  { label: "Denver / Phoenix (MT)",        tz: "America/Denver" },
  { label: "Los Angeles / Seattle (PT)",   tz: "America/Los_Angeles" },
  { label: "São Paulo / Brasília (BRT)",   tz: "America/Sao_Paulo" },
  { label: "Buenos Aires (ART)",           tz: "America/Argentina/Buenos_Aires" },
  { label: "Bogotá / Lima (COT)",          tz: "America/Bogota" },
  { label: "Mexico City (CST)",            tz: "America/Mexico_City" },
  { label: "Toronto / Montreal (ET)",      tz: "America/Toronto" },
  { label: "Vancouver (PT)",               tz: "America/Vancouver" },
  { label: "London (BST/GMT)",             tz: "Europe/London" },
  { label: "Paris / Madrid (CET)",         tz: "Europe/Paris" },
  { label: "Lisbon (WEST/WET)",            tz: "Europe/Lisbon" },
  { label: "Dubai (GST)",                  tz: "Asia/Dubai" },
  { label: "Tokyo (JST)",                  tz: "Asia/Tokyo" },
  { label: "Sydney (AEST)",               tz: "Australia/Sydney" },
];

function detectUserTZ() {
  const userTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return TIMEZONES.find(t => t.tz === userTZ)?.tz || 'America/New_York';
}

function selectedTZ() {
  return document.getElementById('tz-select')?.value || 'America/New_York';
}

function populateTZSelect() {
  const sel = document.getElementById('tz-select');
  const detected = detectUserTZ();
  TIMEZONES.forEach(t => {
    const opt = document.createElement('option');
    opt.value = t.tz;
    opt.textContent = t.label;
    if (t.tz === detected) opt.selected = true;
    sel.appendChild(opt);
  });
}

function formatMatchTime(isoDate, tz) {
  const d = new Date(isoDate);
  return d.toLocaleTimeString('en-US', {
    timeZone: tz,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

function formatMatchDay(isoDate, tz) {
  const d = new Date(isoDate);
  return d.toLocaleDateString('en-US', {
    timeZone: tz,
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });
}

function formatShortDate(isoDate, tz) {
  const d = new Date(isoDate);
  return d.toLocaleDateString('en-US', {
    timeZone: tz,
    month: 'short',
    day: 'numeric'
  });
}

function isLive(isoDate) {
  const start = new Date(isoDate);
  const now = new Date();
  const diffMs = now - start;
  return diffMs >= 0 && diffMs < 115 * 60 * 1000; // ~115 min window
}

function isFinished(isoDate, m) {
  if (m && m.hs != null && m.as != null) return true;
  const start = new Date(isoDate);
  const now = new Date();
  return now - start > 115 * 60 * 1000;
}

// ─── BRACKET RESOLUTION (group standings → real team names) ───────────────────
// Official result of record lives in data/matches.js as hs (home score) / as (away score).
// Once every match in a group has a result, placeholder labels like "Winner C" or
// "Runner-up F" in later rounds resolve to the actual qualified team.
function computeGroupStandings(group) {
  const groupMatches = WC2026_MATCHES.filter(m => m.group === group && m.phase === 'Group Stage');
  const table = {};
  groupMatches.forEach(m => {
    [m.home, m.away].forEach(t => {
      if (!table[t]) table[t] = { team: t, played: 0, pts: 0, gf: 0, ga: 0, gd: 0 };
    });
  });
  let complete = groupMatches.length > 0;
  groupMatches.forEach(m => {
    if (m.hs == null || m.as == null) { complete = false; return; }
    const h = table[m.home], a = table[m.away];
    h.played++; a.played++;
    h.gf += m.hs; h.ga += m.as;
    a.gf += m.as; a.ga += m.hs;
    if (m.hs > m.as) h.pts += 3;
    else if (m.hs < m.as) a.pts += 3;
    else { h.pts += 1; a.pts += 1; }
  });
  const standings = Object.values(table)
    .map(t => ({ ...t, gd: t.gf - t.ga }))
    .sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf);
  return { standings, complete };
}

function resolveTeamLabel(label) {
  let m = /^Winner ([A-L])$/.exec(label);
  if (m) {
    const { standings, complete } = computeGroupStandings(m[1]);
    return complete ? standings[0].team : label;
  }
  m = /^Runner-up ([A-L])$/.exec(label);
  if (m) {
    const { standings, complete } = computeGroupStandings(m[1]);
    return complete ? standings[1].team : label;
  }
  return label; // "Best 3rd …", "R32 Winner N" etc. resolve once the full bracket is wired up
}

function matchScore(m) {
  return (m.hs != null && m.as != null) ? { home: m.hs, away: m.as } : null;
}

// ─── COUNTDOWN ────────────────────────────────────────────────────────────────
function updateCountdown() {
  const el = document.getElementById('countdown');
  if (!el) return;
  const target = new Date('2026-06-11T19:00:00Z');
  const now = new Date();
  const diff = target - now;
  if (diff <= 0) { el.style.display = 'none'; return; }
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  el.innerHTML = `
    <div class="cd-label">Tournament kicks off in</div>
    <div class="cd-units">
      <div class="cd-unit"><span class="cd-num">${d}</span><span class="cd-sub">days</span></div>
      <span class="cd-sep">:</span>
      <div class="cd-unit"><span class="cd-num">${String(h).padStart(2,'0')}</span><span class="cd-sub">hrs</span></div>
      <span class="cd-sep">:</span>
      <div class="cd-unit"><span class="cd-num">${String(m).padStart(2,'0')}</span><span class="cd-sub">min</span></div>
      <span class="cd-sep">:</span>
      <div class="cd-unit"><span class="cd-num">${String(s).padStart(2,'0')}</span><span class="cd-sub">sec</span></div>
    </div>
  `;
}

// ─── JUMP TO NEXT MATCH ───────────────────────────────────────────────────────
function jumpToNextMatch() {
  // Switch to schedule tab if needed
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelector('[data-tab="schedule"]').classList.add('active');
  document.getElementById('tab-schedule').classList.add('active');

  const now = new Date();
  const next = WC2026_MATCHES.find(m => new Date(m.date) > now);
  if (!next) return;

  // Reset phase filter to All
  currentPhase = 'all';
  document.querySelectorAll('.phase-btn').forEach(b => b.classList.remove('active'));
  document.querySelector('.phase-btn[data-phase="all"]').classList.add('active');
  renderSchedule();

  setTimeout(() => {
    const card = document.querySelector(`.match-card[data-id="${next.id}"]`);
    if (card) card.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 100);
}

// ─── SCHEDULE RENDERING ───────────────────────────────────────────────────────
function renderSchedule() {
  const tz = selectedTZ();
  const scores = getScores();
  const q = (document.getElementById('team-search')?.value || '').toLowerCase().trim();

  let matches = [...WC2026_MATCHES];
  if (currentPhase !== 'all') {
    matches = matches.filter(m => m.phase === currentPhase);
  }
  if (q) {
    matches = matches.filter(m =>
      [m.home, m.away, m.city, m.venue, m.group, m.phase].join(' ').toLowerCase().includes(q)
    );
  }

  // Group by day in the selected timezone
  const byDay = {};
  matches.forEach(m => {
    const day = formatMatchDay(m.date, tz);
    if (!byDay[day]) byDay[day] = [];
    byDay[day].push(m);
  });

  const container = document.getElementById('schedule-container');
  container.innerHTML = '';

  Object.entries(byDay).forEach(([day, dayMatches]) => {
    const group = document.createElement('div');
    group.className = 'day-group';

    // Check if today
    const sampleDate = new Date(dayMatches[0].date);
    const today = new Date().toLocaleDateString('en-US', { timeZone: tz, weekday:'long', month:'long', day:'numeric' });
    const isToday = day === today;

    group.innerHTML = `
      <div class="day-label">
        ${day}
        ${isToday ? '<span class="day-badge">Today</span>' : ''}
      </div>
    `;

    dayMatches.forEach(m => {
      group.appendChild(buildMatchCard(m, tz, scores));
    });

    container.appendChild(group);
  });
}

function phaseClass(phase) {
  const map = {
    'Final': 'phase-final',
    'Semifinal': 'phase-semifinal',
    'Quarterfinal': 'phase-quarterfinal',
    'Round of 16': 'phase-r16',
    'Round of 32': 'phase-r32',
  };
  return map[phase] || '';
}

function buildMatchCard(m, tz, scores) {
  const card = document.createElement('div');
  const homeLabel = resolveTeamLabel(m.home);
  const awayLabel = resolveTeamLabel(m.away);
  const finished = isFinished(m.date, m);
  const live = !finished && isLive(m.date);
  const score = matchScore(m) || scores[m.id];

  card.className = `match-card ${phaseClass(m.phase)} ${live ? 'is-live' : ''} ${finished ? 'is-finished' : ''}`;
  card.dataset.id = m.id;

  const timeStr = formatMatchTime(m.date, tz);
  const [timePart, ampm] = timeStr.split(' ');

  const homeFlag = FLAGS[homeLabel] || '🏳️';
  const awayFlag = FLAGS[awayLabel] || '🏳️';

  let timeBlock = '';
  if (live) {
    timeBlock = `<div class="match-time"><div class="live-badge">LIVE</div></div>`;
  } else if (finished && score) {
    timeBlock = `<div class="match-time"><div class="time-val">${score.home}–${score.away}</div><div class="finished-badge">FT</div></div>`;
  } else if (finished) {
    timeBlock = `<div class="match-time"><div class="time-val">${timePart}</div><div class="finished-badge">FT</div></div>`;
  } else {
    timeBlock = `<div class="match-time"><div class="time-val">${timePart}</div><div class="time-ampm">${ampm}</div></div>`;
  }

  let scoreDisplay = '';
  if (live || finished) {
    scoreDisplay = `<span class="score-sep">${score ? `${score.home}–${score.away}` : 'vs'}</span>`;
  } else {
    scoreDisplay = `<span class="vs-sep">vs</span>`;
  }

  const groupBadge = m.group ? `<span class="meta-group">Group ${m.group}</span>` : `<span class="meta-group">${m.phase}</span>`;

  card.innerHTML = `
    ${timeBlock}
    <div class="match-teams">
      <div class="teams-row">
        <span class="team-flag">${homeFlag}</span>
        <span class="team-name">${homeLabel}</span>
        ${scoreDisplay}
        <span class="team-name" style="text-align:right">${awayLabel}</span>
        <span class="team-flag">${awayFlag}</span>
      </div>
      <div class="match-meta">
        ${groupBadge}
        <span class="meta-venue">📍 ${m.venue}, ${m.city}</span>
      </div>
    </div>
    <div class="match-actions">
      <button class="btn-cal-sm" onclick="downloadMatchCalendar(${m.id})">📅 Add</button>
      ${!finished && !live ? `<button class="btn-cal-sm" style="background:#EEF4FF;border-color:#B3C6FF;color:#1A3A8F" onclick="goToPoll(${m.id})">🗳️ Vote</button>` : ''}
    </div>
  `;

  return card;
}

// ─── PHASE FILTER ─────────────────────────────────────────────────────────────
function setupPhaseFilters() {
  document.querySelectorAll('.phase-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.phase-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentPhase = btn.dataset.phase;
      renderSchedule();
    });
  });
}

// ─── POLLS ────────────────────────────────────────────────────────────────────
function setVoterName() {
  const input = document.getElementById('voter-name');
  const name = input.value.trim();
  if (!name) { input.focus(); return; }
  voterName = name;
  localStorage.setItem('fnb_voter_name', name);
  document.getElementById('name-gate').style.display = 'none';
  document.getElementById('polls-container').style.display = 'block';
  renderPolls();
}

function renderPolls() {
  if (!voterName) return;
  const container = document.getElementById('polls-container');
  container.innerHTML = '';

  // Voter banner
  const banner = document.createElement('div');
  banner.className = 'voter-banner';
  banner.innerHTML = `
    <strong>⚽ Voting as: ${escHtml(voterName)}</strong>
    <button onclick="changeVoterName()">Change name</button>
  `;
  container.appendChild(banner);

  const polls = getPolls();
  const myVotes = getMyVotes();
  const tz = selectedTZ();

  // Show upcoming matches that haven't started yet for voting
  // Plus recently finished ones to see results
  const relevant = WC2026_MATCHES.filter(m => {
    const d = new Date(m.date);
    const now = new Date();
    const diffDays = (d - now) / (1000*60*60*24);
    return diffDays > -3 && diffDays < 60; // 3 days past, up to 60 days ahead
  }).slice(0, 30);

  if (relevant.length === 0) {
    container.innerHTML += '<p style="text-align:center;color:var(--text-light);padding:40px">No upcoming matches to vote on right now.</p>';
    return;
  }

  relevant.forEach(m => {
    const finished = isFinished(m.date, m);
    const myVote = myVotes[m.id];
    const pollData = polls[m.id] || { voters: [] };
    const total = (pollData.voters || []).length;

    const card = document.createElement('div');
    card.className = `poll-card ${myVote ? 'poll-voted' : ''}`;
    card.id = `poll-card-${m.id}`;

    const homeLabel = resolveTeamLabel(m.home);
    const awayLabel = resolveTeamLabel(m.away);
    const homeFlag = FLAGS[homeLabel] || '🏳️';
    const awayFlag = FLAGS[awayLabel] || '🏳️';
    const dateStr = formatMatchDay(m.date, tz);
    const timeStr = formatMatchTime(m.date, tz);

    let votingUI = '';
    if (finished) {
      const predText = myVote ? `You predicted: <strong>${myVote.h}–${myVote.a}</strong>` : 'You did not vote.';
      votingUI = `<p style="font-size:0.8rem;color:var(--text-light);margin-top:10px">Match has ended. ${predText}</p>`;
    } else if (myVote) {
      votingUI = `
        <div class="score-voted">
          ✅ Your prediction: <strong>${homeFlag} ${homeLabel} ${myVote.h} – ${myVote.a} ${awayLabel} ${awayFlag}</strong>
          <button class="change-vote-btn" onclick="clearVote(${m.id})">Change</button>
        </div>`;
    } else {
      votingUI = `
        <div class="score-input-row">
          <span class="score-team">${homeFlag} ${homeLabel}</span>
          <input type="number" id="score-h-${m.id}" class="score-input" min="0" max="20" value="0" />
          <span class="score-dash">–</span>
          <input type="number" id="score-a-${m.id}" class="score-input" min="0" max="20" value="0" />
          <span class="score-team right">${awayLabel} ${awayFlag}</span>
          <button class="poll-submit-btn" onclick="castScoreVote(${m.id})">Submit 🔥</button>
        </div>`;
    }

    let resultsUI = '';
    if (total > 0) {
      // Show top predictions grouped by score
      const scoreMap = {};
      (pollData.voters || []).forEach(v => {
        const key = `${v.h}-${v.a}`;
        if (!scoreMap[key]) scoreMap[key] = { h: v.h, a: v.a, count: 0, names: [] };
        scoreMap[key].count++;
        scoreMap[key].names.push(v.name);
      });
      const sorted = Object.values(scoreMap).sort((a,b) => b.count - a.count).slice(0, 5);
      const rows = sorted.map(s => {
        const pct = Math.round((s.count / total) * 100);
        const outcome = s.h > s.a ? `${homeLabel.split(' ')[0]} win` : s.h < s.a ? `${awayLabel.split(' ')[0]} win` : 'Draw';
        return `
          <div class="poll-result-row">
            <span class="result-label">${s.h}–${s.a} <span class="outcome-tag">${outcome}</span></span>
            <div class="result-bar-wrap"><div class="result-bar bar-home" style="width:${pct}%"></div></div>
            <span class="result-pct">${pct}% <span style="font-weight:400;font-size:0.7rem">(${s.count})</span></span>
          </div>`;
      }).join('');
      const voterList = (pollData.voters || []).slice(-3).map(v => escHtml(v.name)).join(', ');
      resultsUI = `
        <div class="poll-results">
          <div class="results-title">Top predictions:</div>
          ${rows}
          <div class="result-voters">${total} prediction${total !== 1 ? 's' : ''}${voterList ? ` • Latest: ${voterList}` : ''}</div>
        </div>`;
    }

    card.innerHTML = `
      <div class="poll-match-title">
        ${homeFlag} ${homeLabel} vs ${awayFlag} ${awayLabel}
        <span class="poll-date">${dateStr} · ${timeStr}</span>
      </div>
      ${votingUI}
      ${resultsUI}
    `;
    container.appendChild(card);
  });
}

function castScoreVote(matchId) {
  if (!voterName) return;
  const hVal = parseInt(document.getElementById(`score-h-${matchId}`)?.value ?? 0, 10);
  const aVal = parseInt(document.getElementById(`score-a-${matchId}`)?.value ?? 0, 10);
  if (isNaN(hVal) || isNaN(aVal)) return;

  const polls   = getPolls();
  const myVotes = getMyVotes();
  if (myVotes[matchId]) return;

  if (!polls[matchId]) polls[matchId] = { voters: [] };
  polls[matchId].voters = polls[matchId].voters || [];
  polls[matchId].voters.push({ name: voterName, h: hVal, a: aVal, ts: Date.now() });

  myVotes[matchId] = { h: hVal, a: aVal };
  savePolls(polls);
  saveMyVotes(myVotes);
  renderPolls();
}

function clearVote(matchId) {
  const myVotes = getMyVotes();
  const polls   = getPolls();
  if (polls[matchId]?.voters) {
    polls[matchId].voters = polls[matchId].voters.filter(v => v.name !== voterName);
    savePolls(polls);
  }
  delete myVotes[matchId];
  saveMyVotes(myVotes);
  renderPolls();
}

function changeVoterName() {
  voterName = null;
  localStorage.removeItem('fnb_voter_name');
  document.getElementById('polls-container').style.display = 'none';
  document.getElementById('name-gate').style.display = 'flex';
  document.getElementById('voter-name').value = '';
}

function goToPoll(matchId) {
  // Switch to polls tab
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelector('[data-tab="polls"]').classList.add('active');
  document.getElementById('tab-polls').classList.add('active');

  if (!voterName) return;
  document.getElementById('polls-container').style.display = 'block';
  document.getElementById('name-gate').style.display = 'none';
  renderPolls();

  setTimeout(() => {
    const el = document.getElementById(`poll-card-${matchId}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 100);
}

// ─── GROUPS GRID ──────────────────────────────────────────────────────────────
const GROUPS_DATA = {
  A: ["Mexico","South Africa","South Korea","Czechia"],
  B: ["Canada","Bosnia & Herzegovina","Qatar","Switzerland"],
  C: ["Brazil","Morocco","Haiti","Scotland"],
  D: ["USA","Paraguay","Australia","Türkiye"],
  E: ["Germany","Curaçao","Ivory Coast","Ecuador"],
  F: ["Netherlands","Japan","Sweden","Tunisia"],
  G: ["Belgium","Egypt","Iran","New Zealand"],
  H: ["Spain","Cape Verde","Saudi Arabia","Uruguay"],
  I: ["France","Senegal","Iraq","Norway"],
  J: ["Argentina","Algeria","Austria","Jordan"],
  K: ["Portugal","DR Congo","Uzbekistan","Colombia"],
  L: ["England","Croatia","Ghana","Panama"],
};

function renderGroups() {
  const grid = document.getElementById('groups-grid');
  grid.innerHTML = '';
  Object.entries(GROUPS_DATA).forEach(([grp, teams]) => {
    const card = document.createElement('div');
    card.className = 'group-card';
    card.innerHTML = `
      <div class="group-card-header">GROUP ${grp}</div>
      ${teams.map(t => `
        <div class="group-team">
          <span class="flag">${FLAGS[t] || '🏳️'}</span>
          <span>${t}</span>
        </div>
      `).join('')}
    `;
    grid.appendChild(card);
  });
}

// ─── ICS CALENDAR GENERATION ──────────────────────────────────────────────────
function icsEscape(str) {
  return str.replace(/\\/g,'\\\\').replace(/;/g,'\\;').replace(/,/g,'\\,').replace(/\n/g,'\\n');
}

function toICSDate(isoStr) {
  // UTC datetime format for ICS: YYYYMMDDTHHMMSSZ
  return isoStr.replace(/[-:]/g,'').replace(/\.\d{3}/,'').replace('T','T');
}

function matchToICSEvent(m) {
  const start = new Date(m.date);
  const end   = new Date(start.getTime() + 115 * 60 * 1000); // ~115 min
  const startStr = start.toISOString().replace(/[-:]/g,'').split('.')[0] + 'Z';
  const endStr   = end.toISOString().replace(/[-:]/g,'').split('.')[0] + 'Z';
  const uid = `fnb-wc2026-${m.id}@fogonabomba`; // must match generate-ics.ps1's UID scheme
  const homeLabel = resolveTeamLabel(m.home);
  const awayLabel = resolveTeamLabel(m.away);
  const score = matchScore(m) || getScores()[m.id];
  const scoreStr = score ? ` [${score.home}–${score.away}]` : '';
  const summary = `⚽ ${homeLabel} vs ${awayLabel}${scoreStr} — WC2026`;
  const description = [
    `FIFA World Cup 2026`,
    `${m.phase}${m.group ? ' – Group '+m.group : ''}`,
    `${homeLabel} vs ${awayLabel}`,
    score ? `Final Score: ${homeLabel} ${score.home} – ${score.away} ${awayLabel}` : 'Score TBD',
    `📍 ${m.venue}, ${m.city}`,
    ``,
    `🔥 Fogo na Bomba World Cup Tracker`,
  ].join('\\n');

  return [
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${startStr}`,
    `DTSTART:${startStr}`,
    `DTEND:${endStr}`,
    `SUMMARY:${icsEscape(summary)}`,
    `DESCRIPTION:${icsEscape(description)}`,
    `LOCATION:${icsEscape(m.venue + ', ' + m.city)}`,
    `CATEGORIES:Sports,Soccer,World Cup`,
    'END:VEVENT',
  ].join('\r\n');
}

function buildICS(matches) {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Fogo na Bomba//WC2026//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:⚽ Fogo na Bomba — World Cup 2026',
    'X-WR-CALDESC:All 104 FIFA World Cup 2026 matches. Times in your local timezone.',
    'X-WR-TIMEZONE:UTC',
    ...matches.map(matchToICSEvent),
    'END:VCALENDAR',
  ];
  return lines.join('\r\n');
}

async function downloadICS(content, filename) {
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });

  // iOS Safari: use Web Share API (shows "Add to Calendar" in the native share sheet)
  if (navigator.share && navigator.canShare) {
    const file = new File([blob], filename, { type: 'text/calendar;charset=utf-8' });
    if (navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({ files: [file], title: '⚽ World Cup 2026 Calendar' });
        return;
      } catch (err) {
        if (err.name === 'AbortError') return; // user cancelled — do nothing
        // other error: fall through to standard download
      }
    }
  }

  // Desktop: standard blob download
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 1000);
}

function subscribeCalendar() {
  // webcal:// tells the OS to SUBSCRIBE rather than one-time import — the calendar
  // app then periodically re-fetches calendar.ics on its own, so future score and
  // bracket updates appear automatically with no re-download needed.
  const calUrl = window.location.origin + window.location.pathname.replace(/[^/]*$/, '') + 'calendar.ics';
  const isApple = /iPad|iPhone|iPod|Macintosh/.test(navigator.userAgent) && !window.MSStream;

  if (isApple) {
    window.location.href = calUrl.replace(/^https?:/, 'webcal:');
    return;
  }

  navigator.clipboard?.writeText(calUrl).catch(() => {});
  alert(
    '🔁 To subscribe (calendar auto-updates with new scores):\n\n' +
    'Google Calendar: Settings → Add calendar → From URL → paste:\n' + calUrl + '\n\n' +
    'Outlook: Add calendar → Subscribe from web → paste the same URL.\n\n' +
    '(Link copied to your clipboard — just paste it in.)'
  );
}

function downloadFullCalendar() {
  // On iOS Safari: open static .ics URL directly — Safari will offer "Add to Calendar"
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if (isIOS) {
    window.open('calendar.ics', '_blank');
    return;
  }
  const ics = buildICS(WC2026_MATCHES);
  downloadICS(ics, 'fogo-na-bomba-worldcup-2026.ics');
}

function downloadMatchCalendar(matchId) {
  const m = WC2026_MATCHES.find(x => x.id === matchId);
  if (!m) return;
  const ics = buildICS([m]);
  const safe = `${m.home.replace(/\s/g,'-')}-vs-${m.away.replace(/\s/g,'-')}`.toLowerCase();
  downloadICS(ics, `wc2026-${safe}.ics`);
}

// ─── WHATSAPP SHARE ───────────────────────────────────────────────────────────
function shareWhatsApp() {
  const url = encodeURIComponent(window.location.href);
  const msg = encodeURIComponent(
    '🔥⚽ *FOGO NA BOMBA — World Cup 2026* ⚽🔥\n\n' +
    'Click to see the full schedule, vote on match results & add games to your calendar!\n\n' +
    window.location.href
  );
  window.open(`https://wa.me/?text=${msg}`, '_blank');
}

// ─── TAB NAVIGATION ───────────────────────────────────────────────────────────
function setupTabs() {
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(`tab-${target}`).classList.add('active');

      if (target === 'polls') {
        if (voterName) {
          document.getElementById('polls-container').style.display = 'block';
          document.getElementById('name-gate').style.display = 'none';
          renderPolls();
        }
      }
    });
  });
}

// ─── SCORE UPDATE (admin helper in console) ───────────────────────────────────
// Usage from browser console: updateScore(6, 2, 1)  → Match 6: Brazil 2-1 Morocco
window.updateScore = function(matchId, homeGoals, awayGoals) {
  const scores = getScores();
  scores[matchId] = { home: homeGoals, away: awayGoals };
  saveScores(scores);
  renderSchedule();
  console.log(`✅ Score updated: Match ${matchId} → ${homeGoals}–${awayGoals}`);
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function escHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ─── INIT ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  populateTZSelect();
  setupTabs();
  setupPhaseFilters();
  renderSchedule();
  renderGroups();

  // If voter name already saved, prep polls tab
  if (voterName) {
    document.getElementById('polls-container').style.display = 'none'; // only show on tab click
    document.getElementById('name-gate').style.display = 'none';
  }

  // Enter key in name input
  document.getElementById('voter-name')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') setVoterName();
  });

  // Countdown timer
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Auto-refresh schedule every 60s (for live score updates)
  setInterval(() => {
    const anyLive = WC2026_MATCHES.some(m => isLive(m.date));
    if (anyLive) renderSchedule();
  }, 60000);
});
