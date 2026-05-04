# Ping Pong / Log Output App

A multi-service application running on Kubernetes with Istio ambient mesh. The app consists of three services:

- **log-output** — displays a rolling hash, a configurable message, ping/pong count, and a greeting from the greeter service
- **ping-pong** — increments and returns a counter on each request; backed by PostgreSQL
- **greeter** — returns a greeting string; traffic is split 75 % to v1 and 25 % to v2 via weighted HTTPRoute
  - v1 responds with `Hello from version 1`
  - v2 responds with `Hello from version 2`

## Prerequisites

- GKE cluster with Istio ambient mode enabled (`istio.io/dataplane-mode: ambient` on the `exercises` namespace)
- [Argo Rollouts](https://argoproj.github.io/rollouts/) controller installed (used for canary deployments of ping-pong)
- Prometheus available at `kube-prometheus-stack-1777-prometheus.prometheus.svc.cluster.local:9090` (used by the canary AnalysisTemplate)
- [sops](https://github.com/getsops/sops) and an age private key at `~/.config/sops/age/` (for decrypting the database secret)

## Deploying to Google Kubernetes Engine

### 1. Apply the database secret

The Ping Pong application requires a PostgreSQL password secret. It is stored encrypted with sops/age in `ping_pong/manifests/pingpong-postgres-password.enc.yaml`. Decrypt and apply it with:

```bash
sops -d ping_pong/manifests/pingpong-postgres-password.enc.yaml | kubectl apply -f -
```

### 2. Deploy all resources

```bash
kubectl apply -k .
```

This deploys all services, deployments, the Istio Gateway, HTTPRoutes, and the greeter weighted routing config.

## Traffic routing

Incoming external traffic hits the Istio Gateway (`log-output-gateway`) and is routed by `log-output-route`:

| Path        | Backend                                 |
| ----------- | --------------------------------------- |
| `/`         | `log-output-svc`                        |
| `/pingpong` | `ping-pong-svc` (path rewritten to `/`) |

Internal traffic to `greeter-svc` is split by an HTTPRoute attached directly to the Service:

| Backend          | Weight |
| ---------------- | ------ |
| `greeter-svc-v1` | 75 %   |
| `greeter-svc-v2` | 25 %   |

## Canary deployments

`ping-pong` uses an Argo Rollouts `Rollout` resource with a canary strategy:

1. Route 50 % of traffic to the new version
2. Run `cpu-usage-rate` AnalysisTemplate (Prometheus query, 4 checks × 30 s intervals, fails if CPU rate > 0.2)
3. Promote to 100 % if analysis passes

## Application endpoints

| Path            | Description                                          |
| --------------- | ---------------------------------------------------- |
| `GET /`         | Log output: hash, message, ping/pong count, greeting |
| `GET /pingpong` | Increment and return the ping/pong counter           |
