FROM alpine:3.9.3

RUN apk add --no-cache --update nodejs yarn zsh git
RUN wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | zsh || true

WORKDIR /opt/

COPY ./package.json ./yarn.lock ./

RUN yarn

CMD ["zsh"]