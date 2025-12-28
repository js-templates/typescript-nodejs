FROM imbios/bun-node:1.3.5-24.12.0-slim AS build
WORKDIR /build
ENV CI=1
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY pnpm-lock.yaml ./pnpm-lock.yaml
COPY package.json ./package.json
RUN pnpm install --frozen-lockfile
COPY tsconfig.json ./tsconfig.json
COPY build.js ./build.js
COPY ./src ./src
RUN pnpm build

FROM gcr.io/distroless/nodejs24-debian12 AS final
ENV NODE_ENV=production
COPY --from=build /build/dist ./
CMD [ "--max_semi_space_size=64", "index.js" ]
