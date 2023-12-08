resource "google_container_cluster" "my_vpc_native_cluster" {
  name               = var.k8s.cluster_name
  location           = var.gcp_region.zone
  initial_node_count = var.k8s.node_count

  network    = google_compute_network.custom.id
  subnetwork = google_compute_subnetwork.custom.id

  ip_allocation_policy {
    services_secondary_range_name = var.network.network_ranges[0].range_name
    cluster_secondary_range_name  = var.network.network_ranges[1].range_name
  }

  node_config {
    preemptible  = true
    machine_type = "e2-small"

    # Google recommends custom service accounts that have cloud-platform scope and permissions granted via IAM Roles.
    service_account = google_service_account.default.email

    oauth_scopes = [
      "https://www.googleapis.com/auth/cloud-platform",
      "https://www.googleapis.com/auth/logging.write",
      "https://www.googleapis.com/auth/monitoring",
      "https://www.googleapis.com/auth/devstorage.read_only",
      "https://www.googleapis.com/auth/service.management.readonly",
      "https://www.googleapis.com/auth/servicecontrol",
      "https://www.googleapis.com/auth/trace.append",
    ]
  }
  deletion_protection = false
}
