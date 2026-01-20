# Ping Pong / Log Output App

Deploy the app by running `kubectl apply -f log_output/manifests/ && kubectl apply -f ping_pong/manifests/`

- The main path (`/`) shows the current log value and ping pong count.
- The pingpong count is increased by 1 by every request to path `/pingpong`.
