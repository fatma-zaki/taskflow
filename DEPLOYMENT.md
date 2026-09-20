# Deploying TaskFlow to Vercel

TaskFlow deploys as **two Vercel projects** from this one repository:

| Project | Root directory | What it is |
| --- | --- | --- |
| `taskflow-web` | `client` | The React app, built by Vite and served as static files |
| `taskflow-api` | `server` | The Express API, running as a serverless function |

You need a MongoDB Atlas cluster (already in use locally) and a Vercel account. The free
(Hobby) plan is enough.

---

## 1. Prepare MongoDB Atlas

Vercel functions do not have fixed IP addresses, so Atlas must accept connections from anywhere:

1. Atlas → **Network Access** → **Add IP Address** → **Allow access from anywhere** (`0.0.0.0/0`).
2. Atlas → **Database** → **Connect** → copy the `mongodb+srv://...` connection string.
3. Add the database name to the string, before the `?`: `...mongodb.net/taskflow?retryWrites=true&w=majority`

> Use the `mongodb+srv://` form on Vercel. The long multi-host string in your local `.env`
> only exists because this Windows machine can't do the SRV address lookup.

---

## 2. Deploy the API (`server`)

1. Vercel → **Add New → Project** → import this repository.
2. Set **Root Directory** to `server`. Leave the framework preset as "Other".
3. Add the environment variables below (**Settings → Environment Variables**), then deploy.

| Variable | Required | Value |
| --- | --- | --- |
| `MONGODB_URI` | yes | Your Atlas `mongodb+srv://` string, including `/taskflow` |
| `JWT_SECRET` | yes | A long random string. Reuse the one from `server/.env` or generate a new one (logs everyone out) |
| `CRON_SECRET` | yes | A long random string. Vercel sends it to the cron endpoints |
| `FRONTEND_URL` | yes | The web app's URL, e.g. `https://taskflow-web.vercel.app`. Comma-separate to allow several |
| `NODE_ENV` | no | `production` |
| `JWT_EXPIRE` | no | `7d` |
| `UPLOAD_MAX_SIZE` | no | `10485760` (10MB) |
| `UPLOAD_ALLOWED_TYPES` | no | `jpg,jpeg,png,pdf,doc,docx,xls,xlsx,txt` |
| `REMINDER_BEFORE_HOURS` | no | `24` |
| `CRON_TIMEZONE` | no | `UTC` |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `EMAIL_FROM` | no | Only needed for email notifications |

Do **not** set `PORT`. Vercel does not use it.

Check it worked: `https://<your-api>.vercel.app/api/health` should return
`{"success":true,"message":"Server is running"}`.

### File attachments (Vercel Blob)

Uploads cannot be written to disk on Vercel, so the API stores them in Vercel Blob.

1. Vercel → your API project → **Storage** → **Create Database** → **Blob**.
2. Connect it to the project. Vercel adds `BLOB_READ_WRITE_TOKEN` automatically.
3. Redeploy.

The code picks its storage at runtime: Blob when `BLOB_READ_WRITE_TOKEN` is set, local disk
otherwise, so local development keeps working unchanged. Note that blob files live at public,
unguessable URLs. The API still checks permissions before serving a file, but anyone who has
the raw blob URL can open it.

### Scheduled reminders

`node-cron` needs a process that runs continuously, which serverless does not provide. The two
jobs are exposed as endpoints instead, and [`server/vercel.json`](server/vercel.json) schedules them:

| Endpoint | Schedule | What it does |
| --- | --- | --- |
| `/api/cron/reminders` | `0 8 * * *` (08:00 UTC daily) | Emails reminders for tasks due soon |
| `/api/cron/overdue` | `0 9 * * *` (09:00 UTC daily) | Marks overdue tasks and notifies |

Both require the `Authorization: Bearer $CRON_SECRET` header, which Vercel Cron sends on its own.
Requests without it get a 401.

**Hobby plan limits:** at most 2 cron jobs, each triggered once a day, and the exact minute is
approximate. Locally these still run hourly and half-hourly through `node-cron`. On the Pro plan
you can change the schedules in `server/vercel.json` to `0 * * * *` (hourly) and `*/30 * * * *`.

You can trigger one by hand:

```bash
curl -H "Authorization: Bearer $CRON_SECRET" https://<your-api>.vercel.app/api/cron/overdue
```

---

## 3. Deploy the web app (`client`)

1. Vercel → **Add New → Project** → import the same repository again.
2. Set **Root Directory** to `client`. The framework preset should detect **Vite**.
3. Add one environment variable:

| Variable | Value |
| --- | --- |
| `VITE_API_URL` | `https://<your-api>.vercel.app/api` — note the `/api` on the end |

4. Deploy, then go back to the **API** project and set `FRONTEND_URL` to the web app's URL.
   Redeploy the API so the new value takes effect.

> `VITE_API_URL` is baked in at build time, not read when the page loads. If you change it,
> redeploy the web app.

---

## 4. Seed the production database

The seed script runs against whatever `MONGODB_URI` points at, so run it from your machine
with the production string:

```bash
cd server
MONGODB_URI="<your atlas srv string>" npm run seed
```

On Windows PowerShell:

```powershell
cd server
$env:MONGODB_URI="<your atlas srv string>"; npm run seed
```

This creates `admin@taskflow.com` / `Admin123` and two other accounts. **Change these passwords
immediately** on a public deployment, and remove the "Demo Credentials" box from the login page.

---

## Configuration reference

- [`client/vercel.json`](client/vercel.json) — Vite build plus a rewrite so client-side routes
  like `/tasks/123` serve `index.html` instead of 404ing on refresh.
- [`server/vercel.json`](server/vercel.json) — routes every request to the serverless function,
  allows 30s per request, and defines the two cron schedules.
- [`server/api/index.js`](server/api/index.js) — the serverless entry point. It connects to
  MongoDB (reusing the cached connection) and hands the request to the Express app. There is no
  `app.listen`; `server/src/server.js` still has one for local development.

## Things worth knowing

- **Cold starts.** After a quiet period the first request takes a few seconds while the function
  starts and connects to MongoDB. Later requests reuse both.
- **Request timeout.** Serverless requests are capped (30s here). Long CSV exports of very large
  task lists could hit that limit.
- **Uploads are capped** at 10MB by `UPLOAD_MAX_SIZE`, and Vercel itself limits request bodies
  to 4.5MB, so large attachments will fail with a 413 before your limit applies.
- **Logs** are under the project's **Deployments → Functions** tab (or `vercel logs`).
- **Secrets:** `server/.env` is git-ignored and is never uploaded. Everything the deployment
  needs must be set in the Vercel dashboard.
