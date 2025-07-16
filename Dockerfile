# 1. Use official Node.js image
FROM node:20-alpine

# 2. Set working directory
WORKDIR /app

# 3. Copy package files and install dependencies
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN npm install

# 4. Copy the rest of your app
COPY . .

# 5. Generate Prisma client
RUN npx prisma generate

# 6. Expose default Next.js port
EXPOSE 3000

# 7. Build & Start app at runtime with memory limit raised
CMD ["sh", "-c", "NODE_OPTIONS='--max-old-space-size=2048' npm run build && npm start"]
