# AGENTS.md

## Project Overview
Static single-page HTML site (Persian RTL) for "قابانا" — a photo framing storefront. No backend, no build step, no dependencies.

## Running in the Sandbox
- Served by `nginx:alpine` on host port 3000 via `docker-compose.base44.yml`.
- The repo directory is bind-mounted read-only into the container at `/usr/share/nginx/html`.
- A custom `nginx.dev.conf` runs nginx as `root` because the sandbox host directory has restrictive (700) permissions that the default `nginx` worker user cannot read.
- Edits to `index.html` are reflected immediately (nginx reads the file on each request); call `reload_preview` if the iframe doesn't refresh.

## No External Credentials
The app is fully static — no secrets, API keys, or database required.
