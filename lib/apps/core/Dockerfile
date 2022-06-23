FROM node:14.18.1-slim as builder
RUN apt-get update \
  && apt-get install -y git --no-install-recommends \
  && rm -rf /var/lib/apt/lists/* \
  && apt-get purge -y --auto-remove git
RUN mkdir /app
COPY . /app

FROM node:14.18.1-slim
LABEL author=xavius@tutanuta.com
COPY --from=builder /app /app
#AUTOSETENVHERE
WORKDIR /app
EXPOSE 4001/tcp

CMD ["node", "app.js"]
