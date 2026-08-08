# Stage 1: Builder
FROM node:20-alpine AS builder
WORKDIR /app
# RUN command executes runs during image build process# RUN command executes runs during image build process
RUN npm install -g pnpm
COPY package*.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install
COPY . .
RUN pnpm build

# Stage 2: Production
FROM node:20-alpine
WORKDIR /app
RUN npm install -g pnpm
COPY package*.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --prod
COPY --from=builder /app/.next ./.next
EXPOSE 3000
# CMD command executes during container creation process
CMD ["pnpm", "start"]
