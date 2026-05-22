// FIFA World Cup 2026 - All 104 matches (times in ET, stored as UTC ISO strings)
// ET = UTC-4 (EDT during summer)
const WC2026_MATCHES = [
  // ─── GROUP STAGE ────────────────────────────────────────────────────────────
  // June 11 – Thursday
  { id:1,  phase:"Group Stage", group:"A", home:"Mexico",          away:"South Africa", date:"2026-06-11T19:00:00Z", venue:"Estadio Azteca",          city:"Mexico City, MX" },
  { id:2,  phase:"Group Stage", group:"A", home:"South Korea",     away:"Czechia",      date:"2026-06-12T02:00:00Z", venue:"Estadio Akron",           city:"Zapopan, MX" },
  // June 12
  { id:3,  phase:"Group Stage", group:"B", home:"Canada",          away:"Bosnia & Herzegovina", date:"2026-06-12T19:00:00Z", venue:"BMO Field",         city:"Toronto, CA" },
  { id:4,  phase:"Group Stage", group:"D", home:"USA",             away:"Paraguay",     date:"2026-06-13T01:00:00Z", venue:"SoFi Stadium",            city:"Los Angeles, CA" },
  // June 13
  { id:5,  phase:"Group Stage", group:"B", home:"Qatar",           away:"Switzerland",  date:"2026-06-13T19:00:00Z", venue:"Levi's Stadium",          city:"Santa Clara, CA" },
  { id:6,  phase:"Group Stage", group:"C", home:"Brazil",          away:"Morocco",      date:"2026-06-13T22:00:00Z", venue:"MetLife Stadium",         city:"East Rutherford, NJ" },
  { id:7,  phase:"Group Stage", group:"C", home:"Haiti",           away:"Scotland",     date:"2026-06-14T01:00:00Z", venue:"Gillette Stadium",        city:"Foxborough, MA" },
  // June 14
  { id:8,  phase:"Group Stage", group:"D", home:"Australia",       away:"Türkiye",      date:"2026-06-14T16:00:00Z", venue:"BC Place",                city:"Vancouver, CA" },
  { id:9,  phase:"Group Stage", group:"E", home:"Germany",         away:"Curaçao",      date:"2026-06-14T17:00:00Z", venue:"NRG Stadium",             city:"Houston, TX" },
  { id:10, phase:"Group Stage", group:"F", home:"Netherlands",     away:"Japan",        date:"2026-06-14T20:00:00Z", venue:"AT&T Stadium",            city:"Arlington, TX" },
  { id:11, phase:"Group Stage", group:"E", home:"Ivory Coast",     away:"Ecuador",      date:"2026-06-14T23:00:00Z", venue:"Lincoln Financial Field", city:"Philadelphia, PA" },
  { id:12, phase:"Group Stage", group:"F", home:"Sweden",          away:"Tunisia",      date:"2026-06-15T02:00:00Z", venue:"Estadio BBVA",            city:"Monterrey, MX" },
  // June 15
  { id:13, phase:"Group Stage", group:"H", home:"Spain",           away:"Cape Verde",   date:"2026-06-15T16:00:00Z", venue:"Mercedes-Benz Stadium",  city:"Atlanta, GA" },
  { id:14, phase:"Group Stage", group:"G", home:"Belgium",         away:"Egypt",        date:"2026-06-15T19:00:00Z", venue:"Lumen Field",             city:"Seattle, WA" },
  { id:15, phase:"Group Stage", group:"H", home:"Saudi Arabia",    away:"Uruguay",      date:"2026-06-15T22:00:00Z", venue:"Hard Rock Stadium",       city:"Miami Gardens, FL" },
  { id:16, phase:"Group Stage", group:"G", home:"Iran",            away:"New Zealand",  date:"2026-06-16T01:00:00Z", venue:"SoFi Stadium",            city:"Los Angeles, CA" },
  // June 16
  { id:17, phase:"Group Stage", group:"I", home:"France",          away:"Senegal",      date:"2026-06-16T19:00:00Z", venue:"MetLife Stadium",         city:"East Rutherford, NJ" },
  { id:18, phase:"Group Stage", group:"I", home:"Iraq",            away:"Norway",       date:"2026-06-16T22:00:00Z", venue:"Gillette Stadium",        city:"Foxborough, MA" },
  { id:19, phase:"Group Stage", group:"J", home:"Argentina",       away:"Algeria",      date:"2026-06-17T01:00:00Z", venue:"Arrowhead Stadium",       city:"Kansas City, MO" },
  // June 17
  { id:20, phase:"Group Stage", group:"J", home:"Austria",         away:"Jordan",       date:"2026-06-17T04:00:00Z", venue:"Levi's Stadium",          city:"Santa Clara, CA" },
  { id:21, phase:"Group Stage", group:"K", home:"Portugal",        away:"DR Congo",     date:"2026-06-17T17:00:00Z", venue:"NRG Stadium",             city:"Houston, TX" },
  { id:22, phase:"Group Stage", group:"L", home:"England",         away:"Croatia",      date:"2026-06-17T20:00:00Z", venue:"AT&T Stadium",            city:"Arlington, TX" },
  { id:23, phase:"Group Stage", group:"L", home:"Ghana",           away:"Panama",       date:"2026-06-17T23:00:00Z", venue:"BMO Field",               city:"Toronto, CA" },
  { id:24, phase:"Group Stage", group:"K", home:"Uzbekistan",      away:"Colombia",     date:"2026-06-18T02:00:00Z", venue:"Estadio Azteca",          city:"Mexico City, MX" },
  // June 18
  { id:25, phase:"Group Stage", group:"A", home:"Czechia",         away:"South Africa", date:"2026-06-18T16:00:00Z", venue:"Mercedes-Benz Stadium",  city:"Atlanta, GA" },
  { id:26, phase:"Group Stage", group:"B", home:"Switzerland",     away:"Bosnia & Herzegovina", date:"2026-06-18T19:00:00Z", venue:"SoFi Stadium",  city:"Los Angeles, CA" },
  { id:27, phase:"Group Stage", group:"B", home:"Canada",          away:"Qatar",        date:"2026-06-18T22:00:00Z", venue:"BC Place",                city:"Vancouver, CA" },
  { id:28, phase:"Group Stage", group:"A", home:"Mexico",          away:"South Korea",  date:"2026-06-19T01:00:00Z", venue:"Estadio Akron",           city:"Zapopan, MX" },
  // June 19
  { id:29, phase:"Group Stage", group:"D", home:"USA",             away:"Australia",    date:"2026-06-19T19:00:00Z", venue:"Lumen Field",             city:"Seattle, WA" },
  { id:30, phase:"Group Stage", group:"C", home:"Scotland",        away:"Morocco",      date:"2026-06-19T22:00:00Z", venue:"Gillette Stadium",        city:"Foxborough, MA" },
  { id:31, phase:"Group Stage", group:"C", home:"Brazil",          away:"Haiti",        date:"2026-06-20T00:30:00Z", venue:"Lincoln Financial Field", city:"Philadelphia, PA" },
  { id:32, phase:"Group Stage", group:"D", home:"Türkiye",         away:"Paraguay",     date:"2026-06-20T03:00:00Z", venue:"Levi's Stadium",          city:"Santa Clara, CA" },
  // June 20
  { id:33, phase:"Group Stage", group:"F", home:"Netherlands",     away:"Sweden",       date:"2026-06-20T17:00:00Z", venue:"NRG Stadium",             city:"Houston, TX" },
  { id:34, phase:"Group Stage", group:"E", home:"Germany",         away:"Ivory Coast",  date:"2026-06-20T20:00:00Z", venue:"BMO Field",               city:"Toronto, CA" },
  { id:35, phase:"Group Stage", group:"E", home:"Ecuador",         away:"Curaçao",      date:"2026-06-21T00:00:00Z", venue:"Arrowhead Stadium",       city:"Kansas City, MO" },
  // June 21
  { id:36, phase:"Group Stage", group:"F", home:"Tunisia",         away:"Japan",        date:"2026-06-21T04:00:00Z", venue:"Estadio BBVA",            city:"Monterrey, MX" },
  { id:37, phase:"Group Stage", group:"H", home:"Spain",           away:"Saudi Arabia", date:"2026-06-21T16:00:00Z", venue:"Mercedes-Benz Stadium",  city:"Atlanta, GA" },
  { id:38, phase:"Group Stage", group:"G", home:"Belgium",         away:"Iran",         date:"2026-06-21T19:00:00Z", venue:"SoFi Stadium",            city:"Los Angeles, CA" },
  { id:39, phase:"Group Stage", group:"H", home:"Uruguay",         away:"Cape Verde",   date:"2026-06-21T22:00:00Z", venue:"Hard Rock Stadium",       city:"Miami Gardens, FL" },
  { id:40, phase:"Group Stage", group:"G", home:"New Zealand",     away:"Egypt",        date:"2026-06-22T01:00:00Z", venue:"BC Place",                city:"Vancouver, CA" },
  // June 22
  { id:41, phase:"Group Stage", group:"J", home:"Argentina",       away:"Austria",      date:"2026-06-22T17:00:00Z", venue:"AT&T Stadium",            city:"Arlington, TX" },
  { id:42, phase:"Group Stage", group:"I", home:"France",          away:"Iraq",         date:"2026-06-22T21:00:00Z", venue:"Lincoln Financial Field", city:"Philadelphia, PA" },
  { id:43, phase:"Group Stage", group:"I", home:"Norway",          away:"Senegal",      date:"2026-06-23T00:00:00Z", venue:"MetLife Stadium",         city:"East Rutherford, NJ" },
  { id:44, phase:"Group Stage", group:"J", home:"Jordan",          away:"Algeria",      date:"2026-06-23T03:00:00Z", venue:"Levi's Stadium",          city:"Santa Clara, CA" },
  // June 23
  { id:45, phase:"Group Stage", group:"K", home:"Portugal",        away:"Uzbekistan",   date:"2026-06-23T17:00:00Z", venue:"NRG Stadium",             city:"Houston, TX" },
  { id:46, phase:"Group Stage", group:"L", home:"England",         away:"Ghana",        date:"2026-06-23T20:00:00Z", venue:"Gillette Stadium",        city:"Foxborough, MA" },
  { id:47, phase:"Group Stage", group:"L", home:"Panama",          away:"Croatia",      date:"2026-06-23T23:00:00Z", venue:"BMO Field",               city:"Toronto, CA" },
  { id:48, phase:"Group Stage", group:"K", home:"Colombia",        away:"DR Congo",     date:"2026-06-24T02:00:00Z", venue:"Estadio Akron",           city:"Zapopan, MX" },
  // June 24
  { id:49, phase:"Group Stage", group:"B", home:"Switzerland",     away:"Canada",       date:"2026-06-24T19:00:00Z", venue:"BC Place",                city:"Vancouver, CA" },
  { id:50, phase:"Group Stage", group:"B", home:"Bosnia & Herzegovina", away:"Qatar",   date:"2026-06-24T19:00:00Z", venue:"Lumen Field",             city:"Seattle, WA" },
  { id:51, phase:"Group Stage", group:"C", home:"Scotland",        away:"Brazil",       date:"2026-06-24T22:00:00Z", venue:"Hard Rock Stadium",       city:"Miami Gardens, FL" },
  { id:52, phase:"Group Stage", group:"C", home:"Morocco",         away:"Haiti",        date:"2026-06-24T22:00:00Z", venue:"Mercedes-Benz Stadium",  city:"Atlanta, GA" },
  { id:53, phase:"Group Stage", group:"A", home:"Czechia",         away:"Mexico",       date:"2026-06-25T01:00:00Z", venue:"Estadio Azteca",          city:"Mexico City, MX" },
  { id:54, phase:"Group Stage", group:"A", home:"South Africa",    away:"South Korea",  date:"2026-06-25T01:00:00Z", venue:"Estadio BBVA",            city:"Monterrey, MX" },
  // June 25
  { id:55, phase:"Group Stage", group:"E", home:"Curaçao",         away:"Ivory Coast",  date:"2026-06-25T20:00:00Z", venue:"Lincoln Financial Field", city:"Philadelphia, PA" },
  { id:56, phase:"Group Stage", group:"E", home:"Ecuador",         away:"Germany",      date:"2026-06-25T20:00:00Z", venue:"MetLife Stadium",         city:"East Rutherford, NJ" },
  { id:57, phase:"Group Stage", group:"F", home:"Japan",           away:"Sweden",       date:"2026-06-25T23:00:00Z", venue:"AT&T Stadium",            city:"Arlington, TX" },
  { id:58, phase:"Group Stage", group:"F", home:"Tunisia",         away:"Netherlands",  date:"2026-06-25T23:00:00Z", venue:"Arrowhead Stadium",       city:"Kansas City, MO" },
  { id:59, phase:"Group Stage", group:"D", home:"Türkiye",         away:"USA",          date:"2026-06-26T02:00:00Z", venue:"SoFi Stadium",            city:"Los Angeles, CA" },
  { id:60, phase:"Group Stage", group:"D", home:"Paraguay",        away:"Australia",    date:"2026-06-26T02:00:00Z", venue:"Levi's Stadium",          city:"Santa Clara, CA" },
  // June 26
  { id:61, phase:"Group Stage", group:"I", home:"Norway",          away:"France",       date:"2026-06-26T19:00:00Z", venue:"Gillette Stadium",        city:"Foxborough, MA" },
  { id:62, phase:"Group Stage", group:"I", home:"Senegal",         away:"Iraq",         date:"2026-06-26T19:00:00Z", venue:"BMO Field",               city:"Toronto, CA" },
  { id:63, phase:"Group Stage", group:"H", home:"Cape Verde",      away:"Saudi Arabia", date:"2026-06-27T00:00:00Z", venue:"NRG Stadium",             city:"Houston, TX" },
  { id:64, phase:"Group Stage", group:"H", home:"Uruguay",         away:"Spain",        date:"2026-06-27T00:00:00Z", venue:"Estadio Akron",           city:"Zapopan, MX" },
  { id:65, phase:"Group Stage", group:"G", home:"Egypt",           away:"Iran",         date:"2026-06-27T03:00:00Z", venue:"Lumen Field",             city:"Seattle, WA" },
  { id:66, phase:"Group Stage", group:"G", home:"New Zealand",     away:"Belgium",      date:"2026-06-27T03:00:00Z", venue:"BC Place",                city:"Vancouver, CA" },
  // June 27
  { id:67, phase:"Group Stage", group:"L", home:"Panama",          away:"England",      date:"2026-06-27T21:00:00Z", venue:"MetLife Stadium",         city:"East Rutherford, NJ" },
  { id:68, phase:"Group Stage", group:"L", home:"Croatia",         away:"Ghana",        date:"2026-06-27T21:00:00Z", venue:"Lincoln Financial Field", city:"Philadelphia, PA" },
  { id:69, phase:"Group Stage", group:"K", home:"Colombia",        away:"Portugal",     date:"2026-06-27T23:30:00Z", venue:"Hard Rock Stadium",       city:"Miami Gardens, FL" },
  { id:70, phase:"Group Stage", group:"K", home:"DR Congo",        away:"Uzbekistan",   date:"2026-06-27T23:30:00Z", venue:"Mercedes-Benz Stadium",  city:"Atlanta, GA" },
  { id:71, phase:"Group Stage", group:"J", home:"Algeria",         away:"Austria",      date:"2026-06-28T02:00:00Z", venue:"Arrowhead Stadium",       city:"Kansas City, MO" },
  { id:72, phase:"Group Stage", group:"J", home:"Jordan",          away:"Argentina",    date:"2026-06-28T02:00:00Z", venue:"AT&T Stadium",            city:"Arlington, TX" },

  // ─── ROUND OF 32 ────────────────────────────────────────────────────────────
  { id:73, phase:"Round of 32", group:"", home:"Runner-up A",      away:"Runner-up B",         date:"2026-06-28T19:00:00Z", venue:"SoFi Stadium",          city:"Los Angeles, CA" },
  { id:74, phase:"Round of 32", group:"", home:"Winner C",         away:"Runner-up F",          date:"2026-06-29T17:00:00Z", venue:"NRG Stadium",           city:"Houston, TX" },
  { id:75, phase:"Round of 32", group:"", home:"Winner E",         away:"Best 3rd A/B/C/D/F",   date:"2026-06-29T20:30:00Z", venue:"Gillette Stadium",      city:"Foxborough, MA" },
  { id:76, phase:"Round of 32", group:"", home:"Winner F",         away:"Runner-up C",          date:"2026-06-30T01:00:00Z", venue:"Estadio BBVA",          city:"Monterrey, MX" },
  { id:77, phase:"Round of 32", group:"", home:"Runner-up E",      away:"Runner-up I",          date:"2026-06-30T17:00:00Z", venue:"AT&T Stadium",          city:"Arlington, TX" },
  { id:78, phase:"Round of 32", group:"", home:"Winner I",         away:"Best 3rd C/D/F/G/H",   date:"2026-06-30T21:00:00Z", venue:"MetLife Stadium",       city:"East Rutherford, NJ" },
  { id:79, phase:"Round of 32", group:"", home:"Winner A",         away:"Best 3rd C/E/F/H/I",   date:"2026-07-01T01:00:00Z", venue:"Estadio Azteca",        city:"Mexico City, MX" },
  { id:80, phase:"Round of 32", group:"", home:"Winner L",         away:"Best 3rd E/H/I/J/K",   date:"2026-07-01T16:00:00Z", venue:"Mercedes-Benz Stadium", city:"Atlanta, GA" },
  { id:81, phase:"Round of 32", group:"", home:"Winner G",         away:"Best 3rd A/E/H/I/J",   date:"2026-07-01T20:00:00Z", venue:"Lumen Field",           city:"Seattle, WA" },
  { id:82, phase:"Round of 32", group:"", home:"Winner D",         away:"Best 3rd B/E/F/I/J",   date:"2026-07-02T00:00:00Z", venue:"Levi's Stadium",        city:"Santa Clara, CA" },
  { id:83, phase:"Round of 32", group:"", home:"Winner H",         away:"Runner-up J",          date:"2026-07-02T19:00:00Z", venue:"SoFi Stadium",          city:"Los Angeles, CA" },
  { id:84, phase:"Round of 32", group:"", home:"Runner-up K",      away:"Runner-up L",          date:"2026-07-02T23:00:00Z", venue:"BMO Field",             city:"Toronto, CA" },
  { id:85, phase:"Round of 32", group:"", home:"Winner B",         away:"Best 3rd E/F/G/I/J",   date:"2026-07-03T03:00:00Z", venue:"BC Place",              city:"Vancouver, CA" },
  { id:86, phase:"Round of 32", group:"", home:"Runner-up D",      away:"Runner-up G",          date:"2026-07-03T18:00:00Z", venue:"AT&T Stadium",          city:"Arlington, TX" },
  { id:87, phase:"Round of 32", group:"", home:"Winner J",         away:"Runner-up H",          date:"2026-07-03T22:00:00Z", venue:"Hard Rock Stadium",     city:"Miami Gardens, FL" },
  { id:88, phase:"Round of 32", group:"", home:"Winner K",         away:"Best 3rd D/E/I/J/L",   date:"2026-07-04T01:30:00Z", venue:"Arrowhead Stadium",     city:"Kansas City, MO" },

  // ─── ROUND OF 16 ────────────────────────────────────────────────────────────
  { id:89, phase:"Round of 16", group:"", home:"R32 Winner 1",     away:"R32 Winner 2",  date:"2026-07-04T17:00:00Z", venue:"NRG Stadium",           city:"Houston, TX" },
  { id:90, phase:"Round of 16", group:"", home:"R32 Winner 3",     away:"R32 Winner 4",  date:"2026-07-04T21:00:00Z", venue:"Lincoln Financial Field",city:"Philadelphia, PA" },
  { id:91, phase:"Round of 16", group:"", home:"R32 Winner 5",     away:"R32 Winner 6",  date:"2026-07-05T20:00:00Z", venue:"MetLife Stadium",       city:"East Rutherford, NJ" },
  { id:92, phase:"Round of 16", group:"", home:"R32 Winner 7",     away:"R32 Winner 8",  date:"2026-07-06T00:00:00Z", venue:"Estadio Azteca",        city:"Mexico City, MX" },
  { id:93, phase:"Round of 16", group:"", home:"R32 Winner 9",     away:"R32 Winner 10", date:"2026-07-06T19:00:00Z", venue:"AT&T Stadium",          city:"Arlington, TX" },
  { id:94, phase:"Round of 16", group:"", home:"R32 Winner 11",    away:"R32 Winner 12", date:"2026-07-07T00:00:00Z", venue:"Lumen Field",           city:"Seattle, WA" },
  { id:95, phase:"Round of 16", group:"", home:"R32 Winner 13",    away:"R32 Winner 14", date:"2026-07-07T16:00:00Z", venue:"Mercedes-Benz Stadium", city:"Atlanta, GA" },
  { id:96, phase:"Round of 16", group:"", home:"R32 Winner 15",    away:"R32 Winner 16", date:"2026-07-07T20:00:00Z", venue:"BC Place",              city:"Vancouver, CA" },

  // ─── QUARTERFINALS ──────────────────────────────────────────────────────────
  { id:97, phase:"Quarterfinal", group:"", home:"QF1 TBD",         away:"QF2 TBD",  date:"2026-07-09T20:00:00Z", venue:"Gillette Stadium",      city:"Foxborough, MA" },
  { id:98, phase:"Quarterfinal", group:"", home:"QF3 TBD",         away:"QF4 TBD",  date:"2026-07-10T19:00:00Z", venue:"SoFi Stadium",          city:"Los Angeles, CA" },
  { id:99, phase:"Quarterfinal", group:"", home:"QF5 TBD",         away:"QF6 TBD",  date:"2026-07-11T21:00:00Z", venue:"Hard Rock Stadium",     city:"Miami Gardens, FL" },
  { id:100,phase:"Quarterfinal", group:"", home:"QF7 TBD",         away:"QF8 TBD",  date:"2026-07-12T01:00:00Z", venue:"Arrowhead Stadium",     city:"Kansas City, MO" },

  // ─── SEMIFINALS ─────────────────────────────────────────────────────────────
  { id:101,phase:"Semifinal",   group:"", home:"SF1 TBD",          away:"SF2 TBD",  date:"2026-07-14T19:00:00Z", venue:"AT&T Stadium",          city:"Arlington, TX" },
  { id:102,phase:"Semifinal",   group:"", home:"SF3 TBD",          away:"SF4 TBD",  date:"2026-07-15T19:00:00Z", venue:"Mercedes-Benz Stadium", city:"Atlanta, GA" },

  // ─── 3RD PLACE + FINAL ─────────────────────────────────────────────────────
  { id:103,phase:"3rd Place",   group:"", home:"3P TBD",           away:"3P TBD",   date:"2026-07-18T21:00:00Z", venue:"Hard Rock Stadium",     city:"Miami Gardens, FL" },
  { id:104,phase:"Final",       group:"", home:"Finalist 1",       away:"Finalist 2",date:"2026-07-19T19:00:00Z", venue:"MetLife Stadium",       city:"East Rutherford, NJ" },
];

// Country flag emoji map
const FLAGS = {
  "Mexico":"🇲🇽","South Africa":"🇿🇦","South Korea":"🇰🇷","Czechia":"🇨🇿",
  "Canada":"🇨🇦","Bosnia & Herzegovina":"🇧🇦","Qatar":"🇶🇦","Switzerland":"🇨🇭",
  "USA":"🇺🇸","Paraguay":"🇵🇾","Brazil":"🇧🇷","Morocco":"🇲🇦","Haiti":"🇭🇹",
  "Scotland":"🏴󠁧󠁢󠁳󠁣󠁴󠁿","Australia":"🇦🇺","Türkiye":"🇹🇷","Germany":"🇩🇪","Curaçao":"🇨🇼",
  "Netherlands":"🇳🇱","Japan":"🇯🇵","Ivory Coast":"🇨🇮","Ecuador":"🇪🇨",
  "Sweden":"🇸🇪","Tunisia":"🇹🇳","Spain":"🇪🇸","Cape Verde":"🇨🇻",
  "Belgium":"🇧🇪","Egypt":"🇪🇬","Saudi Arabia":"🇸🇦","Uruguay":"🇺🇾",
  "Iran":"🇮🇷","New Zealand":"🇳🇿","France":"🇫🇷","Senegal":"🇸🇳",
  "Iraq":"🇮🇶","Norway":"🇳🇴","Argentina":"🇦🇷","Algeria":"🇩🇿",
  "Austria":"🇦🇹","Jordan":"🇯🇴","Portugal":"🇵🇹","DR Congo":"🇨🇩",
  "England":"🏴󠁧󠁢󠁥󠁮󠁧󠁿","Croatia":"🇭🇷","Ghana":"🇬🇭","Panama":"🇵🇦",
  "Uzbekistan":"🇺🇿","Colombia":"🇨🇴"
};
