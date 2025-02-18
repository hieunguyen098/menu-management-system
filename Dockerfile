FROM node:18-alpine

WORKDIR /app

# Copy package.json files
COPY packages/backend/package*.json ./

# Install dependencies
RUN npm install

# Copy backend source code
COPY packages/backend/ ./

# Build the application
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]