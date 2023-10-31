# Step 1: Build the React application
FROM node:20.8.0-alpine3.18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json before other files
# Utilize Docker cache to save re-installing dependencies if unchanged
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy all files
COPY . .

# Build the application
RUN yarn build

# Copy the build output to replace the default nginx contents.
COPY  /app/build /etc/nginx/html