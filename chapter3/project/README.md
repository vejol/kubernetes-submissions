# Project (Todo App)

## How to deploy in k3d

This app will be deployed to namespace `project`. You can create the namespace with `kubectl create namespace project`.

Deploy app to k3d with `kubectl apply -f todo-app/manifests/ -f todo-backend/manifests -f ../persistent_volumes`

In addition, you need to add a Secret for the PostgreSQL database. The file `./todo-backend/manifests/secret.enc.yaml` contains the required values encrypted using the `sops` and `age` tools. If you have the private key in your possession and it is stored in the default location `~/.config/sops/age/`, you can apply the secret to the cluster with the following command:

`sops -d todo-backend/manifests/secret.enc.yaml | kubectl apply -f -`

If you have deployed also pingpong / logoutput app, its ingress will conflict with the ingress of the project. In this case, delete log-output ingress with `kubectl delete ingress log-output-ingress`.
