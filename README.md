# 🔥⚽ Fogo na Bomba — FIFA World Cup 2026

A beautiful, shareable World Cup tracker for the Fogo na Bomba crew.

**Features:**
- 📋 Full 104-match schedule with timezone converter
- 📅 Download .ics calendar files (full tournament or individual matches)
- 🗳️ Match prediction polls with friend leaderboard
- 🏅 Group stage draw overview
- 📲 Works on any phone, auto-adapts to your timezone
- 💬 One-tap WhatsApp sharing

---

## 🚀 Deploy to GitHub Pages (Free Hosting)

### Step 1 — Create your GitHub repo

1. Go to [github.com](https://github.com) and sign in
2. Click **"New repository"** (the green button)
3. Name it exactly: `fogo-na-bomba` (or any name you like)
4. Set to **Public**
5. Click **"Create repository"**

### Step 2 — Upload the files

**Option A — Drag & Drop (easiest):**
1. On your new empty repo page, click **"uploading an existing file"**
2. Drag ALL files and folders from this project into the upload area:
   - `index.html`
   - `css/` folder
   - `js/` folder
   - `data/` folder
   - `README.md`
3. Scroll down, click **"Commit changes"**

**Option B — Git command line:**
```bash
cd fogo-na-bomba
git init
git add .
git commit -m "🔥 Fogo na Bomba World Cup 2026"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/fogo-na-bomba.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages

1. Go to your repo → **Settings** (top right tab)
2. Scroll down to **"Pages"** in the left sidebar
3. Under **"Branch"**, select `main` and `/ (root)`
4. Click **Save**
5. Wait ~2 minutes, then your site will be live at:

```
https://YOUR_USERNAME.github.io/fogo-na-bomba
```

### Step 4 — Share on WhatsApp 🎉

Copy your URL and send it to the group, or use the **"Share on WhatsApp"** button on the site!

---

## 🗓️ How to Add Calendar to Phones

### iPhone / iPad
1. Click **"Download Full Calendar (.ics)"** on the site
2. Safari will ask → tap **"Open in Calendar"**
3. Tap **"Add All"** ✅

### Android / Google Calendar
1. Download the `.ics` file
2. Open **Google Calendar** → Settings → Import → select file

### Outlook
1. Download the `.ics` file → double-click it
2. Click **Import** in Outlook

> ⏰ All times automatically convert to each person's local timezone!

---

## 📊 Updating Scores

Scores are updated manually (or can be automated later). To update a score, open the browser console on your site and type:

```javascript
updateScore(MATCH_ID, HOME_GOALS, AWAY_GOALS)
```

**Examples:**
```javascript
updateScore(6, 2, 1)   // Brazil 2–1 Morocco (Match #6)
updateScore(104, 3, 2) // World Cup Final
```

Match IDs follow the order in the schedule (Match 1 = first game, Match 104 = Final).

> 💡 In a future version, scores can be pulled live from a free API like football-data.org

---

## 📁 Project Structure

```
fogo-na-bomba/
├── index.html          # Main site
├── css/
│   └── style.css       # Brazil green & gold styling
├── js/
│   └── app.js          # Schedule, polls, calendar logic
├── data/
│   └── matches.js      # All 104 WC2026 matches
└── README.md           # This file
```

---

## 🔧 Customization

- **Group name**: Change "FOGO NA BOMBA" in `index.html` (line with `<h1 class="site-title">`)
- **Default timezone**: Modify `detectUserTZ()` in `js/app.js`
- **Add a logo**: Drop an image in the project and add an `<img>` in the header section
- **Colors**: All in `css/style.css` under `:root` CSS variables

---

*Built with ❤️ for the Fogo na Bomba crew • FIFA World Cup 2026*
