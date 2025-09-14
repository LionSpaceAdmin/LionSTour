FROM mcr.microsoft.com/devcontainers/javascript-node:20

# Install pnpm
RUN npm install -g pnpm@9.0.0

# Install additional dependencies
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
        postgresql-client \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Set the default user
USER node