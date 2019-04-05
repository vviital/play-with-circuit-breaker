# Motivation
The main motivation of the repository is to try in almost near live environments pattern Circuit Breaker using library [`brakes`](https://www.npmjs.com/package/brakes). Essentially this repository is a part of the presentation about [Circuit Breaker](https://docs.google.com/presentation/d/1-kc-GfgMhhq9jHESp2lnQBun4nW-mr_FFLF3WUn2CVk/edit#slide=id.p)

# Prerequisites
To run the project you need to have docker and docker-compose installed on your local machine. To do it - please follow [the link](https://docs.docker.com/install/).

# How to run everything

To run the whole setup you need just to type single command:

```
docker-compose up -d --build
```

This command will bring to live 5 services:

- `users`. Service has single endpoint `/collection` which responds with static collection of users.
- `assets`. Service has single endpoint `/collection` which responds with static collection of assets.
- `facade`. Service has two endpoints `/resource` and `/circuit-breaker-stream`. First endpoint responds with combined results from `users` and `assets` micro-services, while second is mainly used by the hystrix-dashboard to visualize state of the services.
- `runner`. Service which is constantly querying `facade` micro-service.
- `dashboard`. Hystrix-dashboard to visualize state of the services.


If you want to see some logs from services, just type:
```
docker-compose logs -f ${service-name}
```
