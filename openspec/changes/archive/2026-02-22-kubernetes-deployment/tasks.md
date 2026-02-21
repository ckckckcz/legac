## 1. Next.js Build Configuration

- [x] 1.1 Add `output: "standalone"` to `next.config.ts`

## 2. Docker Configuration

- [x] 2.1 Create multi-stage `Dockerfile` (deps → builder → runner)
- [x] 2.2 Create `.dockerignore` to exclude node_modules, .next, .env

## 3. Kubernetes Manifests

- [x] 3.1 Create `k8s/namespace.yaml` for `weci-holic` namespace
- [x] 3.2 Create `k8s/secret.yaml` with base64-encoded credentials (DATABASE_URL, GITHUB_ID, GITHUB_SECRET, AUTH_SECRET, NEXTAUTH_URL)
- [x] 3.3 Create `k8s/deployment.yaml` with env vars from Secret, readiness/liveness probes
- [x] 3.4 Create `k8s/service.yaml` (ClusterIP, port 80 → 3000)
- [x] 3.5 Create `k8s/ingress.yaml` for host `weci-holic.hackathon.sev-2.com`

## 4. Environment & OAuth Configuration

- [x] 4.1 Add `NEXTAUTH_URL=https://weci-holic.hackathon.sev-2.com` to `.env`
- [ ] 4.2 Update GitHub OAuth App callback URL to `https://weci-holic.hackathon.sev-2.com/api/auth/callback/github`

## 5. Build & Deploy

- [ ] 5.1 Build Docker image: `docker build -t weci-holic/legac:latest .`
- [ ] 5.2 Push image to Docker Hub: `docker push weci-holic/legac:latest`
- [ ] 5.3 Apply k8s manifests: `kubectl apply -f k8s/`
- [ ] 5.4 Verify pod is running: `kubectl get pods -n weci-holic`
- [ ] 5.5 Verify app is accessible at `https://weci-holic.hackathon.sev-2.com`
