variable "gcp_region" {
  default = {
    region = "europe-north1"
    zone   = "europe-north1-b"
  }
}

variable "k8s" {
  default = {
    cluster_name = "rtw-armory"
    node_count   = 1
  }
}
