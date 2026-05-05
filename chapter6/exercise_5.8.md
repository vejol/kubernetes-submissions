# Exercise 5.8. Landscape

> Exercise 5.8: Look at the [CNCF Cloud Native Landscape](https://landscape.cncf.io/).
>
> Circle the logo of every product / project you've used. It does not have to be in this course. "Used" is defined here as something that you know you were using it. Next use different color to circle those that something we used was depending on, except those already circled. Then create a list with information where they were used. Anything outside of this course context can be labeled as "outside of the course"
>
> For example:
>
> - I used HELM to install Prometheus in part 2.
> - I indirectly used Flannel as k3d (through k3s) uses it. But I have no clue how it works.
> - I've used Istio outside of the course.
>
> You can follow the indirect use as deep as you want, like in the k3d -> k3s -> flannel example, but use common sense to make the final image meaningful.

## My list

### Application Definition & Image Build

- Helm: I used it to install charts into a cluster.
- Docker Compose: I have used it outside of this course to manage local containerized environments.

### Continuous Integration & Delivery

- ArgoCD: I used it as part of a GitOps deployment pipeline to GKE.
- GitHub Actions: I used it to build and publish container images.
- GitLab: I have used it outside of this course as a code repository.

### Database

- MongoDB: I have used it in the Full Stack course (outside this course).
- Redis: I have used it in the DevOps with Docker course (outside this course).
- PostgreSQL: I used it to store todo items and ping-pong counter values.

### Streaming & Messaging

- NATS: I used it as a message broker between the todo backend and the broadcaster.

### Scheduling & Orchestration

- Kubernetes: This was the main platform used throughout the course.
- Knative: I used it in Chapter 6 to run the ping-pong app as a serverless service.
- Docker Swarm: I have used it in the DevOps with Docker course (outside this course).

### Service Mesh

- Istio: I used it to build a service mesh and to configure traffic routing.

### Remote Procedure Call

- gRPC: I have used it in the Distributed Systems course (outside this course).

### Coordination & Service Discovery

- etcd: I used it indirectly because Kubernetes depends on it as the cluster's source of truth.

### Cloud Native Network

- Flannel: I used it indirectly because k3d (through k3s) uses it for pod networking.

### Container Runtime

- containerd: I used it indirectly as a container runtime in Kubernetes environments.

### Security & Compliance

- SOPS: I used it to encrypt Secret manifests and keep them safely in version control.

### Container Registry

- Google Container Registry: I used it to store container images in Chapter 4.
- Quay: I have used it outside of this course in other projects and in previous work.

### Observability

- Jaeger: I used it in the Software Evolution and Reliability course to trace messages between services (outside this course).
- Prometheus: I used it for monitoring and collecting metrics from clusters.
- Grafana: I used it to visualize cluster metrics.
- Grafana Loki: I used it to collect and store application logs.
- Kiali: I used it to visualize Istio service-mesh traffic.
