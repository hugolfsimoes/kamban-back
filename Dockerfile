FROM node:20-alpine AS builder

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY prisma ./prisma/
RUN pnpm prisma generate

COPY tsconfig.json ./
COPY src ./src/
RUN pnpm run build && cp -r src/generated dist/


FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=development

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod

COPY --from=builder /app/dist ./dist
COPY prisma ./prisma

RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001
RUN chown -R nodejs:nodejs /app
USER nodejs

EXPOSE 3000

CMD ["node", "dist/server.js"]
