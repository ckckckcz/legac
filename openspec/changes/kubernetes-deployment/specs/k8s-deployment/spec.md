## ADDED Requirements

### Requirement: Dockerfile produces optimized production image
The system SHALL have a multi-stage Dockerfile that builds a production-optimized Next.js standalone image with a final image size under 300MB.

#### Scenario: Successful Docker build
- **WHEN** `docker build -t weci-holic/legac:latest .` is run in the project root
- **THEN** a Docker image is produced that contains only the standalone server, static assets, and public files

#### Scenario: Container starts and serves the app
- **WHEN** the Docker container is started with required environment variables
- **THEN** the Next.js application SHALL listen on port 3000 and respond to HTTP requests

### Requirement: Next.js standalone output mode enabled
The `next.config.ts` SHALL have `output: "standalone"` configured to produce a self-contained build artifact.

#### Scenario: Build produces standalone output
- **WHEN** `pnpm build` is executed
- **THEN** a `.next/standalone/` directory SHALL be produced containing `server.js` and all required dependencies

### Requirement: Kubernetes Deployment runs the application
A Kubernetes Deployment resource SHALL exist in namespace `weci-holic` that runs the containerized application with all required environment variables injected from a Secret.

#### Scenario: Deployment creates running pod
- **WHEN** `kubectl apply -f k8s/deployment.yaml` is executed against the cluster
- **THEN** a pod with label `app: legac` SHALL be created in namespace `weci-holic` and reach Ready state

#### Scenario: Pod has all required environment variables
- **WHEN** the pod starts
- **THEN** the following environment variables SHALL be available: DATABASE_URL, GITHUB_ID, GITHUB_SECRET, AUTH_SECRET, NEXTAUTH_URL, NEXT_PUBLIC_SAWERIA_USERNAME, NEXT_PUBLIC_KREATE_USERNAME

### Requirement: Kubernetes Service exposes the app internally
A ClusterIP Service SHALL route traffic from port 80 to the pod's port 3000.

#### Scenario: Service routes to pod
- **WHEN** traffic is sent to `legac.weci-holic.svc.cluster.local:80`
- **THEN** it SHALL be forwarded to port 3000 on the pod

### Requirement: Kubernetes Ingress exposes the app externally
An Ingress resource SHALL route traffic for host `weci-holic.hackathon.sev-2.com` to the Service.

#### Scenario: External traffic reaches the app
- **WHEN** an HTTP request is made to `https://weci-holic.hackathon.sev-2.com`
- **THEN** the Ingress SHALL route it to the `legac` Service on port 80

### Requirement: Kubernetes Secret stores credentials securely
A Secret resource SHALL contain all sensitive environment variables (DATABASE_URL, GITHUB_ID, GITHUB_SECRET, AUTH_SECRET, NEXTAUTH_URL) base64-encoded.

#### Scenario: Secret is applied to cluster
- **WHEN** `kubectl apply -f k8s/secret.yaml` is executed
- **THEN** a Secret named `legac-secret` SHALL exist in namespace `weci-holic` with all required keys

### Requirement: Docker build context excludes unnecessary files
A `.dockerignore` file SHALL exclude `node_modules/`, `.next/`, `.env`, and log files from the Docker build context.

#### Scenario: Build context is clean
- **WHEN** Docker build runs
- **THEN** the build context SHALL not include `node_modules/`, `.next/`, or `.env` files
