FROM node:16.16.0-slim as builder
RUN apt-get update \
  && apt-get install -y git --no-install-recommends \
  && rm -rf /var/lib/apt/lists/* \
  && apt-get purge -y --auto-remove git
RUN mkdir /app
COPY ./dist /app

FROM node:16.16.0-slim
LABEL author=xavius@tutanuta.com
COPY --from=builder /app /app
WORKDIR /app
EXPOSE 4001/tcp

CMD ["node", "index.js"]
