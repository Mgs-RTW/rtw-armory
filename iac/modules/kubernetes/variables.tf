variable "gcp_region" {
  default = {
    region = "europe-north1"
    zone   = "europe-north1-b"
  }
}

variable "network" {
  default = {
    ip_cidr_range = "10.2.0.0/29"
    name          = "rtw-armory-nw"
    network_ranges = [
      {
        range_name    = "services-range"
        ip_cidr_range = "192.168.1.0/24"
      },
      { range_name    = "pod-ranges"
        ip_cidr_range = "192.168.64.0/22"
      }
    ]
  }
}

variable "k8s" {
  default = {
    cluster_name = "rtw-armory"
    node_count   = 1
  }
}
