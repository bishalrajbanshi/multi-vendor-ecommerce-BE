# -------------------------
# 1. Builder Stage
# -------------------------
FROM node:20-alpine AS builder

# Install required tools
RUN apk add --no-cache bash git openssh

# Set working directory
WORKDIR /app

# Copy package files first (for caching)
COPY package*.json ./

# Install all dependencies (including dev for build)
RUN npm install

# Copy rest of the code
COPY . .

# Build NestJS app
RUN npm run build


# -------------------------
# 2. Production Stage
# -------------------------
FROM node:20-alpine AS production

# Set NODE_ENV
ENV NODE_ENV=production

# Set working directory
WORKDIR /app

# Copy only necessary files
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy built files from builder
COPY --from=builder /app/dist ./dist



# Expose port (default NestJS)
EXPOSE 3000

# Start app
CMD ["node", "dist/main.js"]