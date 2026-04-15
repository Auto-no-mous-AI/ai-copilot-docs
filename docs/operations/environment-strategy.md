# Environment Strategy

This chapter explains the remote environment model for AI Copilot.

## Environments

### Playground

- shared remote developer environment
- auto-promoted from `main`
- synthetic data only
- real provider integrations allowed with lower quotas and stricter allowlists

### QA

- stable tester environment
- promoted from a tested playground image SHA
- synthetic baseline plus masked production-derived snapshots
- no direct access to production data sources

### Production

- customer-facing multi-tenant environment
- promoted from QA only
- stricter scale, backup retention, alerting, and change control

## Isolation model

Each environment is designed to have its own:

- AWS account
- VPC
- EKS cluster
- RDS PostgreSQL
- Redis
- S3 buckets
- KMS keys
- Secrets Manager namespace
- self-hosted Keycloak deployment and database

## GitOps promotion model

Source of truth split:

- `ai-copilot-platform`: application code, Dockerfiles, image build workflows, smoke workflows
- `ai-copilot-infra`: Terraform, Kustomize overlays, Argo CD applications

Promotion flow:

1. merge to `main`
2. build immutable SHA-tagged images in Amazon ECR
3. update the playground overlay automatically
4. validate playground smoke
5. create QA promotion PR in `ai-copilot-infra`
6. merge QA PR after tester signoff
7. create prod promotion PR in `ai-copilot-infra`
8. merge prod PR after operational approval

## Secrets and identity

- secrets live in AWS Secrets Manager
- per-environment KMS keys protect secret values
- GitHub Actions uses OIDC to assume AWS roles
- each environment runs its own Keycloak deployment and realm

## Data policy

- playground: synthetic/demo tenants only
- QA: masked production-derived snapshots plus synthetic baseline
- prod: customer data only

See also:

- [Deployment and operations](deployment-operations.md)
- [Companion repositories](../workspace/companion-repositories.md)
- [Repo ownership matrix](../workspace/repo-ownership-matrix.md)
