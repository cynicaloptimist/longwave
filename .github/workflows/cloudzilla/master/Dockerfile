# Step 1: Use Node.js for building the app
FROM node:21 AS builder

# Set the working directory
WORKDIR /app

# Add `/app/node_modules/.bin` to PATH
ENV PATH /app/node_modules/.bin:$PATH

# This is a fix for this reported issue, can likely remove at some point in the future
# https://github.com/nodejs/corepack/issues/612
RUN npm install -g corepack@latest

# Enable Corepack for managing pnpm and Yarn versions
RUN corepack enable

# Install dependencies
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

RUN if [ -f package-lock.json ]; then npm install; \
    elif [ -f yarn.lock ]; then yarn install; \
    elif [ -f pnpm-lock.yaml ]; then pnpm install; \
    else echo "No lockfile found. Attempting install anyways with npm" && npm install; \
    fi

# Copy the app's source code and build it
COPY . ./
RUN react-scripts build

# Use a lightweight NGINX image for serving the app
FROM nginx:alpine

# Copy the built files from the previous stage
COPY --from=builder /app/build /usr/share/nginx/html

# Copy a custom NGINX configuration file
COPY .github/workflows/cloudzilla/master/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
