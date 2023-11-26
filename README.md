# Elastic Search Attempts With Nest.js

- To attempt elastic search queries on Nest.js

## Technologies

## On Backend

- Nest.js
- Typescript
- Elastic Search

## On Frontend

- Handlebars

## Prerequisites

---

- Docker
- Node

---

## Running Application

```
yarn start:dev
```

## Docker Run

The application can be built and run by the `Docker` engine. The `Dockerfile` has multistage build, so you do not need to build and run separately.

Please follow the below directions in order to build and run the application with Docker Compose;

```sh
$ cd open-weather
$ docker-compose up -d
```

OR

```sh
$ cd open-weather
$ ./build.sh
```

Docker compose creates 2 replicas (instances) of the application.

### Elastic Search

#### You can reach ElasticSearch page via `http://{HOST}:9200`

### Kibana

#### You can reach Kibana page via `http://{HOST}:5601`
