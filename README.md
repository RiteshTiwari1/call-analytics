# Call Analytics Dashboard

Voice Agent Call Analytics Dashboard built with React + TypeScript.

## Features

- Dark theme UI
- 4 analytics charts (Bar, Pie, Line, Area)
- Editable "Daily Call Volume" chart
- User data saved to Supabase against email
- Overwrite confirmation for returning users

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Recharts
- Supabase

## Setup

1. Install dependencies:
```bash
npm install
```

2. Add your Supabase credentials to `.env`:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

3. Run dev server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Deploy to Render

### Option 1: Using Render Dashboard

1. Push code to GitHub
2. Go to [render.com](https://render.com) → New → Static Site
3. Connect your GitHub repo
4. Configure:
   - **Name**: `call-analytics-dashboard` (or your preferred name)
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
5. Add environment variables in Render dashboard:
   - `VITE_SUPABASE_URL` - Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` - Your Supabase anon/public key
6. Click "Create Static Site" and wait for deployment

### Option 2: Using render.yaml (Recommended)

1. Push code to GitHub (make sure `render.yaml` is included)
2. Go to [render.com](https://render.com) → New → Static Site
3. Connect your GitHub repo
4. Render will automatically detect `render.yaml` and use those settings
5. Add environment variables in Render dashboard:
   - `VITE_SUPABASE_URL` - Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` - Your Supabase anon/public key
6. Deploy

### Important Notes

- Make sure your Supabase table `user_chart_data` is created with the following schema:
  - `id` (uuid, primary key)
  - `email` (text, unique)
  - `chart_data` (jsonb)
  - `created_at` (timestamp)
  - `updated_at` (timestamp)
- Environment variables must be set in Render dashboard for the app to work
- The app will be available at `https://your-app-name.onrender.com`

## How It Works

1. User sees dashboard with dummy chart data
2. Click "Edit Data" on Daily Call Volume chart
3. Enter email (first time)
4. Edit values → Chart updates → Data saved to Supabase
5. Next time same email is used, shows previous values with overwrite confirmation
