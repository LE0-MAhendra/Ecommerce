FROM node:18-alpine as builder

WORKDIR /frontend

# Copy only the package.json and pnpm-lock.yaml to leverage Docker cache
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN npm install -g pnpm && \
    pnpm install

# Copy the rest of the application
COPY . .
RUN ls -la
# Build the application
RUN pnpm run build

FROM node:18-alpine as runner

WORKDIR /frontend

# Copy only the necessary files from the builder stage
COPY --from=builder /frontend/package.json .
COPY --from=builder /frontend/pnpm-lock.yaml .
COPY --from=builder /frontend/next.config.js ./
COPY --from=builder /frontend/public ./public
COPY --from=builder /frontend/.next/static ./.next/static

# Install pnpm and next globally in the runner stage
RUN npm install -g pnpm next

EXPOSE 3000

ENTRYPOINT ["pnpm", "start"]  
