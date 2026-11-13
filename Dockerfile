# ---- Base ----
FROM node:lts AS base
WORKDIR /app
# Activer pnpm
RUN npm install -g pnpm@9.10.0

# uniquement les manifests au début pour mieux cacher
COPY package.json pnpm-lock.yaml ./

# ---- Déps prod (sans dev) ----
FROM base AS prod-deps
RUN pnpm install --prod --frozen-lockfile

# ---- Déps complètes pour le build ----
FROM base AS build-deps
RUN pnpm install --frozen-lockfile

# ---- Build ----
FROM build-deps AS build
ARG LLM_MODEL=${LLM_MODEL}
ARG LLM_USERNAME=${LLM_USERNAME}
ARG LLM_PASSWORD=${LLM_PASSWORD}
ARG LLM_HOSTNAME=${LLM_HOSTNAME}
ARG API_KEY=${API_KEY}
ARG QUIZ_PASSWORD=${QUIZ_PASSWORD}

ENV LLM_MODEL=${LLM_MODEL}
ENV LLM_USERNAME=${LLM_USERNAME}
ENV LLM_PASSWORD=${LLM_PASSWORD}
ENV LLM_HOSTNAME=${LLM_HOSTNAME}
ENV API_KEY=${API_KEY}
ENV QUIZ_PASSWORD=${QUIZ_PASSWORD}


COPY . .
RUN pnpm run build

# ---- Runtime ----
FROM base AS runtime
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321
CMD ["node", "./dist/server/entry.mjs"]
