FROM node:18-alpine as base
# Enable corepack and prepare pnpm
RUN corepack enable
RUN corepack prepare pnpm@latest --activate

# Set up pnpm environment
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Set working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

RUN pnpm rebuild bcrypt

# Build the application
RUN pnpm run build

# Expose port if necessary
EXPOSE 3000

# Start the application
CMD ["pnpm", "dev"]