resource "google_service_account" "default" {
  account_id   = "k8s-service-account-id"
  display_name = "Kubernetes Service Account"
}

variable "roles" {
  type = list(string)
  default = [
    "roles/artifactregistry.reader",
    "roles/storage.objectViewer",
    "roles/servicemanagement.serviceController",
    "roles/logging.logWriter",
    "roles/monitoring.admin",
    "roles/cloudtrace.agent",
    "roles/iam.serviceAccountTokenCreator"
  ]
  description = "list of roles for the node pool service account."
}
resource "google_project_iam_member" "roles" {
  for_each = toset(var.roles)
  project  = "rtw-armory"
  role     = each.value
  member   = "serviceAccount:${google_service_account.default.email}"
}
