FROM node:15

ENV PORT=3000 APP_DIR=/app

WORKDIR ${APP_DIR}

ADD main.js .
ADD package.json .
ADD package-lock.json .
ADD public public
ADD views views

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
	CMD curl localhost:3000/healthz || exit 1

RUN npm i

EXPOSE ${PORT}

ENTRYPOINT [ "node", "main" ]
