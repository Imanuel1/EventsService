# Use Node.js base image
FROM node:18

# Set environment variable for the host IP during build
RUN export HOST_IP=$(ifconfig | grep -E "([0-9]{1,3}\.){3}[0-9]{1,3}" | grep -v 127.0.0.1 | awk '{ print $2 }' | cut -f2 -d: | head -n1) && \
    echo "HOST_IP=${HOST_IP}"

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application using the package.json script
#RUN npm run build

# Expose the service port (for REST API)
EXPOSE 5000

# Start the Node.js application
# CMD ["node", "dist/index.js"]
CMD ["npm", "run", "dev"]
