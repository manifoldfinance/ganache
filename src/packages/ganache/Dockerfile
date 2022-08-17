# use full node to install dependencies
FROM node:14.18.1-stretch AS builder

WORKDIR /app

COPY . .

ENV NODE_ENV production

# clean and install dependencies
RUN npm run clean && \
    npm ci --unsafe-perm && \
    npm run build && \
    npm cache clean --force

# prune development dependencies
RUN npx lerna exec --scope ganache -- npm prune --production

# we use node "slim" instead of "alpine" until we create a uwebsockets build for alpine.
FROM node:14.18.1-slim

WORKDIR /app

# copy from build image
COPY --from=builder /app/src/packages/ganache/node_modules node_modules
# TODO(perf): we don't need everything in here. Maybe either create a separate
# build for docker or cherry-pick the files we actually need.
COPY --from=builder /app/src/packages/ganache/dist/node dist/node

ENV DOCKER true
ENV NODE_ENV production


STOPSIGNAL SIGTERM

EXPOSE 8545

ENV PORT 8545
# set the entrypoint
ENTRYPOINT ["node", "/app/dist/node/cli.js"]
