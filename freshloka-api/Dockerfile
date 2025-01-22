# Stage 1: Build the application
FROM node:18 AS build

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies (including dev dependencies)
RUN npm install

# Copy the rest of the application files
COPY . .

# Stage 2: Final image
FROM node:18-slim

# Set working directory
WORKDIR /usr/src/app

# Copy only the necessary files from the build stage
COPY --from=build /usr/src/app /usr/src/app

# Install only production dependencies
RUN npm ci --only=production

# Expose the application port
EXPOSE 3000

# Start the server
CMD ["npm", "run", "start"]
