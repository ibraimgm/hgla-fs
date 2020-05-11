# build image
FROM golang:1.13 as build

WORKDIR /app
COPY . .

RUN make CGO_ENABLED=0 EXTLDFLAGS="-static" FLAGS="-tags netgo"

# run image
FROM alpine

WORKDIR /app

ENV DB_DRIVER mysql
ENV DB_URL hg:hg@/hg?parseTime=true
ENV APP_PORT 8080
ENV SERVER_NAME localhost

COPY ./wait-for-it.sh .
COPY ./start.sh .
COPY --from=build /app/backend .

CMD ["./backend"]
