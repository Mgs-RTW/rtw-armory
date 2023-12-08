resource "google_artifact_registry_repository" "my-repo" {
  location      = var.gcp_region.region
  repository_id = "rtw-armory-artifact-registry-${terraform.workspace}"
  description   = "RTW Armory Artifact Registry"
  format        = "DOCKER"
}
