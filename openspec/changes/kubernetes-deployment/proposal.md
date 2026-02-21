## Why

The application needs to be deployed to a Kubernetes cluster accessible at `https://weci-holic.hackathon.sev-2.com`. Currently there is no containerization (Dockerfile) or Kubernetes manifests, making it impossible to deploy to the target infrastructure. The hackathon environment provides a Kubernetes cluster with namespace `weci-holic` and we need to ship the app there.

## What Changes

- Add multi-stage `Dockerfile` for production-optimized Next.js standalone build
- Add `.dockerignore` to exclude unnecessary files from Docker context
- Enable `output: "standalone"` in `next.config.ts` for Docker-compatible builds
- Add Kubernetes manifests: Namespace, Secret, Deployment, Service, and Ingress
- Configure Ingress to route traffic from `weci-holic.hackathon.sev-2.com` to the app
- Add `NEXTAUTH_URL` environment variable pointing to the production domain for OAuth callback

## Capabilities

### New Capabilities
- `k8s-deployment`: Kubernetes deployment configuration including Dockerfile, manifests (Deployment, Service, Ingress, Secret, Namespace), and production build pipeline for the Next.js application

### Modified Capabilities
- `github-oauth`: NEXTAUTH_URL must be set to `https://weci-holic.hackathon.sev-2.com` for OAuth callbacks to work in production. GitHub OAuth App settings must be updated with the production callback URL.

## Impact

- **Code**: `next.config.ts` modified to add `output: "standalone"`
- **New files**: `Dockerfile`, `.dockerignore`, `k8s/namespace.yaml`, `k8s/secret.yaml`, `k8s/deployment.yaml`, `k8s/service.yaml`, `k8s/ingress.yaml`
- **Environment**: `.env` updated with `NEXTAUTH_URL` for production domain
- **Dependencies**: Requires Docker for building images, `kubectl` access to the cluster via provided kubeconfig
- **External**: GitHub OAuth App callback URL must be updated to `https://weci-holic.hackathon.sev-2.com/api/auth/callback/github`
