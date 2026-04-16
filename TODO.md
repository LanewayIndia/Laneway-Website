# TODO: Merge .env.local and backend env

## Approved Plan Steps

### 1. [x] Create backend/.env.example with unified template
### 2. [x] Update backend/src/config/env.ts to load both .env and .env.local, export public vars
### 3. [x] Create backend public env API endpoint (/public-env)
### 4. [x] Update frontend lib/supabase.ts and lib/supabase-server.ts to fetch/use public env from backend
### 5. [x] Add Cloudinary, SMTP vars to backend env.ts
### 6. [x] Test: Backend /api/public-env returns merged env. Frontend getSupabase() works (backend running).
Copy vars from .env.local to backend/.env using .env.example, restart backend.
### 7. [ ] Clean up: Remove redundant .env.local usage

Progress will be updated after each step.
