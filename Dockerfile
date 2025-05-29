# Explicitly use Linux/Ubuntu platform
FROM node:18-bullseye

# Set working directory in container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the required port
EXPOSE 7171

# Start the server
CMD ["node", "server.js"]