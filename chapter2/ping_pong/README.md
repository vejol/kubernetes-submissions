# Ping-pong App

This app is used with Log Output App.

Deploy both apps by running `kubectl apply -f manifests/` in the both project folders ([log_output](/log_output/) and [ping_pong](/ping_pong/))

Make sure you create persistent volume when launching app first time by running `kubectl apply -f .` in [persistent_volumes](/persistent_volumes/)
