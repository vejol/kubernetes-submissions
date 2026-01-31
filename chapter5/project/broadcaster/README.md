# Broadcaster

A simple Node.js service that listens to Todo app events from NATS and forwards them to Discord via a webhook.

- Subscribed subjects: `todo_created`, `todo_updated`
- NATS queue group: `broadcaster` (multiple replicas share the messages)

This app is used with other apps in the project (todo-app, todo-backend).

## Run locally

1. Create .env file with environment variables shown in `.env.example`

2. Run app with `npm i && npm run dev`

## How to deploy to Kubernetes

This app will be deployed to namespace `project`. You can create the namespace with `kubectl create namespace project` if needed.

Deploy the app by running `kubectl apply -f manifests/deployment.yaml`

In addition, you need to add a Secret for the Discord webhook URL. The file `./manifests/secret.enc.yaml` contains the required value encrypted with the `sops` and `age` tools. If you have the private key in the default location `~/.config/sops/age/`, you can apply the secret to the cluster with the following command:

`sops -d manifests/secret.enc.yaml | kubectl apply -f -`
