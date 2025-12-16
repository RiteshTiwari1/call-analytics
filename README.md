# Call Analytics Dashboard

Voice Agent Call Analytics Dashboard built with React + TypeScript.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file with your Supabase credentials:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

3. Run dev server:
```bash
npm run dev
```

## Deploy to Render

1. Push code to GitHub
2. Go to [render.com](https://render.com) → New → Static Site
3. Connect your GitHub repo
4. Configure:
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
5. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. Deploy

**Note:** Make sure your Supabase table `user_chart_data` exists with columns: `id` (uuid), `email` (text, unique), `chart_data` (jsonb), `created_at`, `updated_at`.
