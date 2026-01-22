# Ping Pong / Log Output App

## How to deploy in k3d

Deploy the app by running `kubectl apply -f log_output/manifests/ && kubectl apply -f ping_pong/manifests/`

In addition, you need to add a Secret for the Ping Pong application's PostgreSQL database. The file `./ping_pong/manifests/secret.enc.yaml` contains the required values encrypted using the `sops` and `age` tools. If you have the private key in your possession and it is stored in the default location `~/.config/sops/age/`, you can apply the secret to the cluster with the following command:

`sops -d ping_pong/manifests/secret.enc.yaml | kubectl apply -f -`

## How to use App

- The main path (`/`) shows the current log value and ping pong count.
- The pingpong count is increased by 1 by every request to path `/pingpong`.
