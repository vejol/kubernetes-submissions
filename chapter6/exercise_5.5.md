# Exercise 5.5. Platform comparison

> Exercise 5.5: Choose one service provider such as Rancher and compare it to another such as OpenShift. Decide arbitrarily which service provider is "better" and argue for it against the other service provider.

## Overview

OpenShift and Rancher serve quite different purposes:

- OpenShift is a Kubernetes distribution that provides additional features on top of Kubernetes, such as a container registry and built-in deployment tooling.
- Rancher is a tool for managing Kubernetes clusters. It does not include a Kubernetes distribution itself — it is installed on top of an existing cluster.

A direct comparison is therefore not entirely apples-to-apples. However, both tools provide a web UI and tooling for cluster management, so I will compare them from that angle. I will argue that Rancher is the better choice.

## Why Rancher is better than OpenShift?

### Vendor Lock-in

OpenShift introduces its own custom objects on top of standard Kubernetes. Resources such as `Route`, `BuildConfig`, and `ImageStream` are OpenShift-specific and can make certain workflows easier. However, this comes with trade-offs:

- Switching providers becomes harder, as OpenShift-specific manifests must be converted to standard solutions, and the architecture may also need to be reworked. Pipelines built on OpenShift's custom resources may need to be rebuilt from scratch.
- New team members need to learn OpenShift-specific patterns on top of standard Kubernetes knowledge. The lock-in therefore also extends to skill requirements.

Rancher, by contrast, works with any Kubernetes provider and is a vendor-neutral solution, making it straightforward to switch providers when needed.

### Multi-cluster Support in Rancher

Rancher allows managing multiple clusters through a single UI. The clusters do not even need to be in the same cloud — Rancher can manage clusters across different environments simultaneously. OpenShift can only manage one cluster at a time and cannot be connected to clusters from other providers.

### Rancher Provides a Lightweight Management Layer

Rancher adds a lightweight management layer on top of existing clusters, while OpenShift ships with a large number of built-in components and additional features. For teams that simply need a good cluster management tool, Rancher is the better fit.
