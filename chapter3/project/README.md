# Project (Todo App)

This app will be deployed to namespace `project`. You can create the namespace with `kubectl create namespace project`.

Deploy app to k3d with `kubectl apply -f todo-app/manifests/ -f todo-backend/manifests -f ../persistent_volumes`

If you have deployed also pingpong / logoutput app, its ingress will conflict with the ingress of the project. In this case, delete log-output ingress with `kubectl delete ingress log-output-ingress`.
