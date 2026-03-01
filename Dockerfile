# ========================= #
#     Stage 1: Build        #
# ========================= #
FROM node:22 AS builder

WORKDIR /app

COPY package*.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install

COPY . .

RUN pnpm build

# ========================= #
#     Stage 2: Run Prod     #
# ========================= #
FROM node:22

WORKDIR /app

COPY --from=builder /app .

RUN npm install -g pm2

EXPOSE 9000

CMD ["pm2-runtime", "start", "ecosystem.config.js"]
