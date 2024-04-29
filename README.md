# Description

### Application Env

```
KEYS=VALUES
```

## Docker Environment

### Build image

```bash
docker build --tag xxx:0.0.1 .
docker build --tag xxx:0.0.1 --no-cache .
```

### Create attachable swarm overlay network

```bash
docker network create --driver overlay --attachable <name>
```

### Develop application inside the container

if you have docker desktop running, you can develop locally inside the container.

```bash
cd <to app directory>
docker run -dit --rm --mount type=bind,source="$(pwd)",target=/data node bash -c "cd /data && npm run start:dev"
docker run -it --rm --mount type=bind,source="$(pwd)",target=/data node bash -c "cd /data && npm run start:dev"
```

## Installation

```bash
$ npm install
```

## Protobuf

```bash
npx protoc --ts_out protos --proto_path protos protos/dave.proto
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## License

Nest is [MIT licensed](LICENSE).
