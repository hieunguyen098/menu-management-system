FROM node:18-alpine

WORKDIR /app

# Copy only the necessary files for installing dependencies
COPY packages/backend/package*.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy backend source code
COPY packages/backend/ ./

# Build the application
RUN yarn build

EXPOSE 3000
CMD ["yarn", "start"]