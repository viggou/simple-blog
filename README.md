# Simple Blog

A blog with a [Praia](https://github.com/praia-lang/praia) REST API backend, PostgreSQL database, and Vue.js frontend.

## Requirements

- [Praia](https://github.com/praia-lang/praia) >= 0.2.6
- [Docker](https://docs.docker.com/get-docker/) (for PostgreSQL, or bring your own)
- [Node.js](https://nodejs.org/) >= 18 (for frontend development)

## Quick start

### With Docker Compose

```sh
docker compose up
```

This starts PostgreSQL, the Praia backend (port 3000), and the Nginx frontend (port 8080). Open http://localhost:8080.

### Local development

Start PostgreSQL:

```sh
docker compose up db -d
```

Install backend dependencies and start the server:

```sh
cd backend
sand install
cp .env.example .env   # edit if needed
praia main.praia
```

In a separate terminal, start the frontend dev server:

```sh
cd frontend
npm install
npm run dev
```

Open http://localhost:5173. The Vite dev server proxies `/api` requests to the Praia backend.

## Project structure

```
blog/
├── docker-compose.yml
├── backend/
│   ├── main.praia              # entry point — routes, middleware, server
│   ├── .env                    # DB credentials (not committed)
│   ├── sand-lock.yaml          # grain dependencies
│   ├── migrations/             # SQL migrations (-- up / -- down)
│   │   └── 001_create_posts.sql
│   └── grains/
│       ├── posts.praia         # CRUD data layer
│       ├── utils.praia         # slug generation
│       └── migrate.praia       # migration runner
└── frontend/
    ├── vite.config.js          # proxies /api to backend
    ├── nginx.conf              # production proxy + SPA fallback
    └── src/
        ├── api/posts.js        # API client
        ├── views/              # Home, Post, Admin, Editor, NotFound
        └── components/         # Header, Footer, PostCard, MarkdownContent
```

## API

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/posts` | List published posts (`?all=true` for drafts) |
| GET | `/api/posts/:slug` | Get post by slug |
| POST | `/api/posts` | Create post |
| PUT | `/api/posts/:id` | Update post |
| DELETE | `/api/posts/:id` | Delete post |

## Migrations

Migration files live in `backend/migrations/` with `-- up` and `-- down` sections:

```sql
-- up
CREATE TABLE posts ( ... );

-- down
DROP TABLE posts;
```

Migrations run automatically on server startup. To check status or rollback manually:

```
praia -c 'use "db"; use "./grains/migrate"; let pg = db.postgres({...}); migrate.status(pg, "./migrations")'
```

## Building for production

```sh
cd frontend && npm run build
```

The backend serves the built files from `../frontend/dist/` automatically.

## License

MIT
