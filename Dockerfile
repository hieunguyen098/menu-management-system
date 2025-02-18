FROM node:18-alpine

WORKDIR /app

# Copy package.json and prisma directory
COPY packages/backend/package*.json ./
COPY packages/backend/prisma ./prisma

# Install dependencies
RUN npm install

# Generate Prisma Client
RUN npx prisma generate

# Copy backend source code
COPY packages/backend/ ./

# Build the application
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]