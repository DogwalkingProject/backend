# Use an official Node.js LTS (Long Term Support) image as the base
FROM node:lts

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the app dependencies
RUN npm ci --production

# Copy the source code to the container
COPY . .

# Build the TypeScript app
RUN npm run build

# Expose the port that the app listens on
EXPOSE 3000

# Define the command to run the app when the container starts
CMD ["node", "dist/index.js"]
