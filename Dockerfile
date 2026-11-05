FROM debian:trixie-slim AS ssl-patch
RUN apt-get update \
 && apt-get install -y --no-install-recommends --only-upgrade libssl3t64 \
 && rm -rf /var/lib/apt/lists/*
# Stage the patched libs + the matching dpkg metadata, arch-independent
RUN set -eux; \
    libssl="$(ls /usr/lib/*/libssl.so.3)"; \
    libdir="$(dirname "$libssl")"; \
    mkdir -p "/out$libdir" /out/var/lib/dpkg/status.d; \
    cp -a "$libdir/libssl.so.3" "$libdir/libcrypto.so.3" "/out$libdir/"; \
    dpkg-query -s libssl3t64 > /out/var/lib/dpkg/status.d/libssl3t64; \
    dpkg-query -W libssl3t64


FROM node:24-slim AS builder

WORKDIR /app
ENV CI=true
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0

# Enable corepack (automatically reads "packageManager" from package.json)
RUN corepack enable
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

## parse env
ARG CORPORATE_DASHBOARD_ENV
RUN echo "$CORPORATE_DASHBOARD_ENV" > .env

# Build static assets with Vite.
# The Sentry token is an optional BuildKit secret (never stored in a layer); without it, source maps are skipped.
ARG SENTRY_RELEASE
COPY . .
RUN --mount=type=secret,id=sentry_auth_token \
    if [ -f /run/secrets/sentry_auth_token ]; then export SENTRY_AUTH_TOKEN="$(cat /run/secrets/sentry_auth_token)"; fi; \
    pnpm run build

# Keep only production dependencies for runtime image non-interactively.
RUN pnpm prune --prod --ignore-scripts

FROM gcr.io/distroless/nodejs24-debian13:nonroot

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# copy patched libssl3t64 from ssl-patch stage
# Patched libssl/libcrypto + updated package record (one file, not the whole dpkg db)
COPY --from=ssl-patch /out/ /

# Distroless has no shell; copy only what the server needs.
COPY --from=builder --chown=nonroot:nonroot /app/server.js ./server.js
COPY --from=builder --chown=nonroot:nonroot /app/dist ./dist
COPY --from=builder --chown=nonroot:nonroot /app/node_modules ./node_modules
COPY --from=builder --chown=nonroot:nonroot /app/package.json ./package.json

USER nonroot:nonroot
EXPOSE 3000
CMD ["server.js"]