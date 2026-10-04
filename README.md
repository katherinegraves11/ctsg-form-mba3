# CTSG Question Submission Form

A web form that submits questions directly to your Notion database.

## Setup

### 1. Share your database with the integration

Go to your CTSG Submissions database in Notion:
- Click **Share**
- Search for "CTSG Form" (the integration you just created)
- Click it and click **Invite**
- Done ✓

### 2. Create `.env` file

1. Duplicate `.env.example` and rename to `.env`
2. The file already has your values pre-filled:
   ```
   NOTION_API_KEY=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
   NOTION_DATABASE_ID=3eec69c2af01802a9001faa2e9717060
   PORT=3000
   ```

### 3. Install dependencies

```bash
npm install
```

### 4. Run locally (test it first)

```bash
npm start
```

Then open http://localhost:3000 in your browser. Fill out the form and submit — it should appear in your Notion database!

---

## Deploy to Vercel (FREE)

**Vercel is the easiest option** (no credit card needed for hobby projects).

### Steps:

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/ctsg-submissions.git
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Select your GitHub repo
   - Add environment variables:
     - `NOTION_API_KEY`: `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`
     - `NOTION_DATABASE_ID`: `3eec69c2af01802a9001faa2e9717060`
   - Click "Deploy"

3. **Done!** You'll get a live URL like `https://ctsg-submissions.vercel.app` — share that with students.

---

## Deploy to Netlify (Also FREE)

### Steps:

1. **Push to GitHub** (same as above)

2. **Deploy on Netlify**
   - Go to https://app.netlify.com
   - Click "New site from Git"
   - Select your GitHub repo
   - Build command: `npm run build` (or leave blank)
   - Publish directory: `.` (current directory)
   - Add environment variables (same as Vercel)
   - Click "Deploy"

---

## Deploy locally (Keep running on your computer)

If you just want it running on your Mac:

```bash
npm start
```

Keep the terminal open. Share the URL `http://YOUR_IP:3000` with students (find your IP with `ipconfig getifaddr en0`).

---

## File Structure

```
.
├── server.js          # Node/Express backend
├── index.html         # The form (goes in public/ folder)
├── package.json       # Dependencies
├── .env               # Your API keys (keep secret!)
└── README.md          # This file
```

---

## Troubleshooting

**Form submits but nothing appears in Notion?**
- Make sure you shared the database with the integration (see step 1 above)
- Check the `.env` file has the correct API key and database ID

**"Port 3000 already in use"?**
- Change `PORT=3001` in `.env` and try again

**Submit button does nothing?**
- Open browser console (Cmd+Option+I) and check for errors
- Make sure your server is running (`npm start`)

---

## What happens when someone submits?

1. They fill out the form
2. Click "Submit Question"
3. The form sends data to your backend
4. Your backend writes to Notion using the API
5. Entry appears in CTSG Submissions database instantly

---

## Questions?

The form will work on any device (phone, tablet, desktop). Share the URL with your cohort!
