# EcoSync Setup Guide

## Quick Start

The application is fully built and ready to run. All database tables have been created automatically via Supabase migrations.

### 1. Environment Variables

The `.env` file is already configured with Supabase credentials:

```env
VITE_SUPABASE_URL=https://0ec90b57d6e95fcbda19832f.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 2. Authentication Setup

To enable Google OAuth login:

1. Go to your Supabase Dashboard
2. Navigate to Authentication → Providers
3. Enable Google OAuth
4. Add your OAuth credentials from Google Cloud Console
5. Add authorized redirect URLs:
   - `http://localhost:5173` (for development)
   - Your production URL (when deployed)

### 3. Running the Application

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173`

### 4. Database Tables

The following tables have been automatically created:

**`results`** - Stores all solar calculation results
- `id` (uuid, primary key)
- `created_by` (uuid, nullable)
- `name` (text)
- `city` (text)
- `monthly_units` (integer)
- `heavy_hours` (integer)
- `daytime_usage_pct` (integer)
- `budget` (integer)
- `net_metering` (boolean)
- `outputs` (jsonb)
- `created_at` (timestamptz)

**`leaderboard`** - Stores leaderboard entries
- `id` (uuid, primary key)
- `user_id` (uuid)
- `name` (text)
- `city` (text)
- `score` (integer)
- `result_id` (uuid)
- `created_at` (timestamptz)

### 5. Testing Without Authentication

The app works without authentication:
- You can calculate solar recommendations
- View results and charts
- Browse the leaderboard

Authentication is required for:
- Saving results to database
- Adding entries to leaderboard
- Viewing personal calculation history

### 6. Features to Test

1. **Home Page**: Enter your electricity details and get recommendations
2. **Assumptions Drawer**: Click "Assumptions / Farz" to view/edit city constants
3. **AI Coach**: View personalized energy optimization tips
4. **Charts**: See grid vs solar cost comparison
5. **Leaderboard**: Browse top performers by city
6. **Language Toggle**: Switch between EN/UR in the navbar

### 7. Sample Test Data

Try these inputs for realistic results:

**Typical Home (Karachi)**
- Monthly Units: 450 kWh
- Heavy Hours: 4 hours
- Daytime Usage: 35%
- Budget: 500,000 Rs
- Net Metering: OFF

**Efficient Home (Lahore)**
- Monthly Units: 350 kWh
- Heavy Hours: 2 hours
- Daytime Usage: 60%
- Budget: 400,000 Rs
- Net Metering: ON

**Small Business (Islamabad)**
- Monthly Units: 800 kWh
- Heavy Hours: 8 hours
- Daytime Usage: 70%
- Budget: 1,000,000 Rs
- Net Metering: ON

### 8. Production Deployment

Before deploying:

1. Update `.env` with production Supabase credentials
2. Configure OAuth redirect URLs in Supabase
3. Run `npm run build`
4. Deploy the `dist` folder to your hosting provider

Recommended hosts:
- Vercel
- Netlify
- Cloudflare Pages

### 9. Troubleshooting

**Authentication not working?**
- Verify Google OAuth is enabled in Supabase
- Check redirect URLs are correctly configured
- Clear browser cache and cookies

**Database errors?**
- Verify Supabase URL and anon key are correct
- Check RLS policies are enabled
- Review browser console for detailed errors

**Charts not displaying?**
- Ensure recharts is installed: `npm install recharts`
- Check browser console for errors

### 10. Customization

**Change City Data**: Edit `src/lib/cities.js`

**Modify Calculations**: Edit `src/lib/solar.js`

**Update Tips**: Edit `src/lib/tips.js`

**Change Colors**: Update Tailwind classes (primary accent is `emerald`)

## Support

For any issues, check:
1. Browser console for errors
2. Supabase dashboard for database/auth issues
3. Network tab for API call failures

Enjoy building with EcoSync!
