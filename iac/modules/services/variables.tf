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

variable "gke_cluster" {
  default = {
    config_context_cluster = ""
    host                   = ""
    token                  = ""
    cluster_ca_certificate = ""
  }
}


variable "postgres" {
  default = {
    user : "",
    password : "",
    db : "",
    port : 0,
    host : ""
  }
}

variable "session_secret" {
}
