# Stage 1: Build
FROM gdssingapore/airbase:node-22-builder AS builder

WORKDIR /app

# Enable pnpm via corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install dependencies
COPY --chown=app:app package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy source and build
COPY --chown=app:app . .
RUN pnpm build

# Stage 2: Runtime
FROM gdssingapore/airbase:node-22 AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy standalone build output
COPY --from=builder --chown=app:app /app/.next/standalone ./
COPY --from=builder --chown=app:app /app/.next/static ./.next/static
COPY --from=builder --chown=app:app /app/public ./public

USER app

EXPOSE 3000

CMD ["node", "server.js"]
