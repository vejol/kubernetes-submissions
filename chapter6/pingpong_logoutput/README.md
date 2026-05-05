# Ping Pong / Log Output App

A multi-service application running on Kubernetes with Istio and Knative. The app consists of three services:

- **log-output** — displays a rolling hash, a configurable message, ping/pong count, and a greeting from the greeter service
- **ping-pong** — increments and returns a counter on each request; backed by PostgreSQL and deployed as a Knative Service
- **greeter** — returns a greeting string; traffic is split 75 % to v1 and 25 % to v2 via weighted HTTPRoute
  - v1 responds with `Hello from version 1`
  - v2 responds with `Hello from version 2`

## Prerequisites

- Kubernetes cluster (for example k3d)
- Istio installed
- Knative Serving installed
- Gateway API CRDs installed
- [sops](https://github.com/getsops/sops) and an age private key at `~/.config/sops/age/` (for decrypting the database secret)

## Deploying

### 0. (One-time) Install Gateway API CRDs

If your cluster does not already provide Gateway API resources, install them:

```bash
kubectl apply -f https://github.com/kubernetes-sigs/gateway-api/releases/download/v1.1.0/standard-install.yaml
```

### 1. Apply the database secret

The Ping Pong application requires a PostgreSQL password secret. It is stored encrypted with sops/age in `ping_pong/manifests/pingpong-postgres-password.enc.yaml`. Decrypt and apply it with:

```bash
sops -d ping_pong/manifests/pingpong-postgres-password.enc.yaml | kubectl apply -f -
```

### 2. Deploy all resources

```bash
kubectl apply -k .
```

This deploys all services, deployments, the Gateway API `Gateway`, HTTPRoutes, PostgreSQL, and the Knative `ping-pong` service.

### 3. Access the app locally

In k3d-like local environments, the generated gateway service may not get an external IP. Use port-forward:

```bash
kubectl port-forward svc/log-output-gateway-istio 8888:80 -n exercises
```

Then open:

- `http://localhost:8888/`
- `http://localhost:8888/pingpong`

## Traffic routing

Incoming external traffic hits the Istio Gateway (`log-output-gateway`) and is routed by `log-output-route`:

| Path        | Backend                                       |
| ----------- | --------------------------------------------- |
| `/`         | `log-output-svc`                              |
| `/pingpong` | `ping-pong-svc` (hostname and path rewritten) |

Internal traffic to `greeter-svc` is split by an HTTPRoute attached directly to the Service:

| Backend          | Weight |
| ---------------- | ------ |
| `greeter-svc-v1` | 75 %   |
| `greeter-svc-v2` | 25 %   |

## Application endpoints

| Path            | Description                                          |
| --------------- | ---------------------------------------------------- |
| `GET /`         | Log output: hash, message, ping/pong count, greeting |
| `GET /pingpong` | Increment and return the ping/pong counter           |
