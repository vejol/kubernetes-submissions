# Project (Todo App)

## How to deploy to Google Cloud

Deploy app with `kubectl apply -k .`

In addition, you need to add a Secret for the PostgreSQL database. The file `./todo-backend/manifests/secret.enc.yaml` contains the required values encrypted using the `sops` and `age` tools. If you have the private key in your possession and it is stored in the default location `~/.config/sops/age/`, you can apply the secret to the cluster with the following command:

`sops -d todo-backend/manifests/secret.enc.yaml | kubectl apply -f -`
