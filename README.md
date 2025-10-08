# proto-jmazurek-listapp

The goal of this project is to provide a list application in Vue and integrated with Supabase. It also shows how I can adapt to new technologies that I haven't used previously.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
## Required Variables
```env
VITE_SUPABASE_URL = "https://[your link here].supabase.co"
VITE_SUPABASE_ANON_KEY = "[your key here]"
```

## Schema
### Table items
  id int8
  user_id uuid
  name text
  checked bool
  trashed bool
  trash_time timestamp
  next int8

### RLS
  It uses a very basic scheme of ensuring the user_id of the item in the table is the same as the user id that has sent the request. 
  Just using the basics from: https://supabase.com/docs/guides/database/postgres/row-level-security

## Next Steps
* ~~Routing~~
* ~~Restructure internal data handling~~
* ~~Multiple lists~~
* UI prettification
* Auto-deletion of old trashed items
* Sharing lists between users