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

# 6. Build Next.js app
RUN npm run build

# 7. Expose port (default for Next.js)
EXPOSE 3000

# 8. Start the app
CMD ["npm", "start"]