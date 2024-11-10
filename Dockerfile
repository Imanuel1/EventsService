# Use Node.js base image
FROM node:18

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
