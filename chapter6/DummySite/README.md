# DummySite Operator

DummySite is a Kubernetes custom resource (CRD) that lets you deploy a website by simply pointing to a URL — no Deployments, ConfigMaps, or Services to write by hand. You declare what you want, and the operator takes care of the rest.

The operator is built with Python and [kopf](https://kopf.readthedocs.io/). It watches `DummySite` resources and automatically creates a Deployment, Service, and ConfigMap that serve the HTML content fetched from the given URL.

## How it works

When a `DummySite` resource is created, the controller:

1. Fetches the HTML from `spec.website_url`
2. Stores it in a ConfigMap
3. Deploys an nginx pod that serves the ConfigMap as `index.html`
4. Creates a LoadBalancer Service for the pod

When the resource is deleted, all three child resources are removed.

## Repository structure

```
DummySite/
  controller/         # Controller source code and Dockerfile
    controller.py
    requirements.txt
    Dockerfile
    templates/        # Kubernetes resource templates used by the controller
  manifests/          # Install the controller into a cluster
    dummysite-crd.yaml
    controller-rbac.yaml
    controller-deployment.yaml
  examples/           # Example DummySite resources
    example-dummysite.yaml
    kubernetes-wikipedia-dummysite.yaml
```

## Deploy to cluster

```sh
kubectl apply -f manifests/
```

This installs the CRD, RBAC rules, and the controller Deployment in the `default` namespace.

## Usage

The `examples/` directory contains ready-made `DummySite` resources you can try:

```sh
kubectl apply -f examples/kubernetes-wikipedia-dummysite.yaml
```

Or create your own:

```yaml
apiVersion: stable.dwk/v1
kind: DummySite
metadata:
  name: my-dummysite
  namespace: default
spec:
  website_url: https://en.wikipedia.org/wiki/Kubernetes
```

```sh
kubectl apply -f my-dummysite.yaml
```

## Local development

### Setup

```sh
python3 -m venv controller/.venv
source controller/.venv/bin/activate
pip install -r controller/requirements.txt
```

### Run

```sh
cd controller
kopf run controller.py --verbose --all-namespaces
```

The controller uses `~/.kube/config` for authentication when running locally.
