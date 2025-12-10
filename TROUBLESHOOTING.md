# Debugging 500 Errors on Vercel

## Common Causes & Solutions

### 1. **Missing Environment Variables** (Most Likely)

Check if you've added these in Vercel Dashboard:

**Go to:** Vercel Dashboard → Your Project → Settings → Environment Variables

**Required variables:**
- `DATABASE_URL` - Your Neon DB connection string
- `JWT_SECRET` - Your JWT secret key
- `NODE_ENV` - Set to `production`

**After adding variables:**
- Go to Deployments tab
- Click "Redeploy" on latest deployment

---

### 2. **Incorrect DATABASE_URL Format**

Your Neon connection string MUST include `?sslmode=require`:

✅ **Correct:**
```
postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
```

❌ **Wrong:**
```
postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/neondb
```

---

### 3. **Neon DB is Paused**

Neon databases auto-pause after inactivity:

1. Go to [console.neon.tech](https://console.neon.tech)
2. Select your project
3. Check if database shows "Active" status
4. If paused, it will auto-wake on first query (may take 5-10 seconds)

---

### 4. **Check Vercel Function Logs**

To see the actual error:

1. Go to Vercel Dashboard → Your Project
2. Click on the latest deployment
3. Go to "Functions" tab
4. Click on `api/signup` or `api/signin`
5. Check the logs for error messages

Common errors you might see:
- `"DATABASE_URL is not defined"` → Missing env variable
- `"Connection refused"` → Wrong DATABASE_URL
- `"SSL required"` → Missing `?sslmode=require`
- `"Invalid JWT secret"` → Missing JWT_SECRET

---

### 5. **Test Database Connection**

In Neon Console SQL Editor, run:
```sql
SELECT * FROM users LIMIT 1;
```

If this fails, your database schema might not be set up correctly.

---

## Quick Fix Checklist

- [ ] Environment variables added in Vercel
- [ ] DATABASE_URL includes `?sslmode=require`
- [ ] JWT_SECRET is set (any random string)
- [ ] Redeployed after adding variables
- [ ] Neon DB is active (not paused)
- [ ] Checked Vercel function logs for specific error

---

## How to Add Environment Variables in Vercel

1. **Go to Vercel Dashboard:** https://vercel.com/dashboard
2. **Click your project** (jobisearch)
3. **Settings** → **Environment Variables**
4. **Add each variable:**
   - Key: `DATABASE_URL`
   - Value: `postgresql://...?sslmode=require`
   - Environment: Production, Preview, Development (check all)
   - Click "Save"
5. **Repeat for:**
   - `JWT_SECRET`
   - `NODE_ENV` (value: `production`)
6. **Redeploy:**
   - Go to "Deployments" tab
   - Click ⋯ menu on latest deployment
   - Click "Redeploy"

---

## Still Getting Errors?

Share the error from Vercel function logs and I can help debug further!
