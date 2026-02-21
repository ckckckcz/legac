# Team Infrastructure Usage Guide

Welcome to your team infrastructure folder! Here’s how to use the files provided:

## 1. `domain.txt`

- This file contains your public application domain in the format:
  
  `https://<team-name>.hackathon.sev-2.com`

- This domain will be configured in the Kubernetes ingress, so your deployed app will be accessible at this address.


## 2. `db-credentials.txt`

- This file contains your team's PostgreSQL database username, password, and database name.
- You can find it in your team folder: `db-credentials.txt`.
- Example content:

  ```
  rdms = "PostgreSQL"
  host = "localhost"
  port = 5432
  username = "your_team_user"
  password = "your_team_password"
  database = "your_team_db"
  ```

- Use these credentials to connect your app or a database client to your team's schema.

## 3. `kubeconfig.yaml`

- This file allows you to connect to your team’s Kubernetes namespace/cluster.
- Usage example:

  ```sh
  kubectl --kubeconfig=./kubeconfig.yaml -n <team-name> get pods
  ```

- You can use this file with `kubectl` or any Kubernetes-compatible tool.

## Deployment Steps

1. Dockerize your app
2. Push your image to your container registry (e.g., Docker Hub).
3. Deploy your application as usual (e.g., with `kubectl apply -f ...`).
4. Ensure your app’s ingress resource uses the domain from `domain.txt`.
5. Access your app at the public URL after deployment.

---

If you have questions, contact the hackathon team.

---


## Useful Links

- [Kubernetes for Beginners (FreeCodeCamp)](https://www.freecodecamp.org/news/the-kubernetes-handbook/)
- [kubectl Cheat Sheet (Kubernetes Official)](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)
- [Kubernetes Ingress Guide (Solo.io)](https://www.solo.io/topics/api-gateway/kubernetes-ingress)
