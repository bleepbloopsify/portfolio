FROM alpine:3.9.3

RUN apk add --no-cache --update nodejs yarn

RUN set -x ; \
  addgroup -g 82 -S www-data ; \
  adduser -u 82 -D -S -G www-data www-data && exit 0 ; exit 1


WORKDIR /opt/

RUN chown -R www-data:www-data /opt/

COPY --chown=www-data:www-data ./package.json ./yarn.lock ./

USER www-data

RUN yarn

EXPOSE 8080

COPY --chown=www-data:www-data ./ ./

CMD ["node", "index.js"]