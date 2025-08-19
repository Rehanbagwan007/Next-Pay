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

# 6. Build Next.js at build time (important for Render)
RUN npm run build

# 7. Expose port (Next.js default)
EXPOSE 3000

# 8. Start app (no build here, just run)
CMD ["npm", "start"]
