# Development Stage
FROM node:20-slim AS development

WORKDIR /app

# Set up a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --chown=nextjs:nodejs package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install

COPY --chown=nextjs:nodejs . .

# This command will be run in the dev container
# RUN pnpm i && prisma generate && playwright install --with-deps

EXPOSE 3000 5555

CMD ["pnpm", "dev"]

# Production Stage
FROM node:20-slim AS production

WORKDIR /app

# Set up a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=development /app/node_modules ./node_modules
COPY --from=development /app/package.json ./package.json
COPY --from=development /app/.next ./.next
COPY --from=development /app/public ./public


EXPOSE 3000

CMD ["npm", "start"]
