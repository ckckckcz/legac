## Context

The Legac application is a fullstack Next.js 16 app (App Router) using GitHub OAuth, PostgreSQL, and Tailwind CSS. It currently runs only in local development (`pnpm dev`). The hackathon organizer provides a Kubernetes cluster at `https://103.185.52.45:6443` with a pre-provisioned namespace `weci-holic` and a service account `weci-holic-sa`. The target domain `weci-holic.hackathon.sev-2.com` is already configured to point to the cluster's ingress.

No containerization or deployment infrastructure exists yet.

## Goals / Non-Goals

**Goals:**
- Containerize the Next.js app with an optimized multi-stage Docker build using standalone output
- Deploy to the `weci-holic` Kubernetes namespace with proper secret management
- Expose the app at `https://weci-holic.hackathon.sev-2.com` via Ingress
- Ensure GitHub OAuth works correctly with the production URL

**Non-Goals:**
- CI/CD pipeline automation (manual `docker build` + `kubectl apply` is sufficient for hackathon)
- Horizontal Pod Autoscaling or multi-replica setup
- Database migration automation (schema already exists in the cluster DB)
- SSL/TLS certificate management (assumed handled by cluster infrastructure)

## Decisions

### 1. Multi-stage Dockerfile with standalone output
**Decision**: Use a 3-stage Docker build (deps → builder → runner) with Next.js `output: "standalone"`.

**Rationale**: Standalone output produces a self-contained `server.js` that doesn't need `node_modules` at runtime, resulting in a ~150MB image vs ~1GB+ with full node_modules. The 3-stage approach keeps the final image minimal (only node runtime + compiled app).

**Alternative considered**: Single-stage build — rejected due to bloated image size including devDependencies and build tooling.

### 2. Kubernetes Secret for environment variables
**Decision**: Store all sensitive env vars (DATABASE_URL, GITHUB_ID, GITHUB_SECRET, AUTH_SECRET, NEXTAUTH_URL) in a Kubernetes Secret, referenced via `secretKeyRef` in the Deployment.

**Rationale**: Secrets are base64-encoded and can be managed separately from the deployment manifest. This prevents credentials from being baked into the Docker image.

**Alternative considered**: ConfigMap — rejected because it stores data in plaintext and is not appropriate for credentials.

### 3. Docker Hub as container registry
**Decision**: Use Docker Hub (`docker.io/weci-holic/legac`) as the container registry.

**Rationale**: Free tier, widely supported, no additional infrastructure needed. For a hackathon, simplicity is paramount.

### 4. ClusterIP Service + Ingress pattern
**Decision**: Use a ClusterIP Service with an Ingress resource for external access.

**Rationale**: Standard Kubernetes pattern. The Ingress handles hostname-based routing to the service, which forwards to pods on port 3000. This works with any ingress controller the cluster may have.

**Alternative considered**: NodePort or LoadBalancer service — rejected because Ingress provides hostname-based routing needed for the specific domain.

## Risks / Trade-offs

- **[Ingress controller unknown]** → Manifest uses `ingressClassName: nginx` which is the most common. If the cluster uses Traefik or another controller, the Ingress annotations and className need to be updated.
- **[Single replica]** → No high availability, but acceptable for hackathon. Pod restart means brief downtime.
- **[Docker Hub rate limits]** → Free tier has pull rate limits (100 pulls/6hr for anonymous). Unlikely to hit in hackathon context.
- **[Secrets in manifest]** → Base64 encoding is not encryption. The `k8s/secret.yaml` file must not be committed to public repos. `.gitignore` should exclude it or it should be applied manually.
