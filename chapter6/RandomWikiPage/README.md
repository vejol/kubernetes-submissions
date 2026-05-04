# Random Wiki Page Application

## 📌 Overview

This project is a Kubernetes exercise application that serves Wikipedia pages using a simple multi-container pod design.

The application demonstrates:

- initContainer usage
- sidecar container pattern

## 🚀 Deploy

```bash
kubectl apply -f manifests/
```

## 🌐 Access

The app is exposed as a `ClusterIP` service. Use port-forwarding for local access:

```bash
kubectl port-forward service/wiki-service 8080:80
```

Then open http://localhost:8080 in a browser.

## 🧱 Architecture

The application consists of three containers in a single Pod:

### 1. Nginx main container

- Serves static HTML content
- Reads files from `/usr/share/nginx/html`

### 2. Init container

- Fetches a fixed Wikipedia page https://en.wikipedia.org/wiki/Kubernetes
- Stores the result as `index.html` in a shared volume
- Runs only once at Pod startup

### 3. Sidecar container

- Runs in a loop
- Waits a random time (5–15 minutes)
- Fetches a random Wikipedia page: from https://en.wikipedia.org/wiki/Special:Random
- Overwrites `index.html` in the shared volume

---

## 📁 Shared Storage

The containers share a volume:

- Type: `emptyDir`
- Purpose: temporary shared storage between containers
- Lifecycle: data is lost when the Pod is deleted

---
