resource "google_compute_subnetwork" "custom" {
  name          = "${var.network.name}-subnet"
  ip_cidr_range = var.network.ip_cidr_range
  region        = var.gcp_region.region
  network       = google_compute_network.custom.id

  dynamic "secondary_ip_range" {
    for_each = tolist(var.network.network_ranges)
    content {
      range_name    = secondary_ip_range.value.range_name
      ip_cidr_range = secondary_ip_range.value.ip_cidr_range
    }
  }
}

resource "google_compute_network" "custom" {
  name                    = var.network.name
  auto_create_subnetworks = false
}
