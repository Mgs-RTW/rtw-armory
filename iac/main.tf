module "setup" {
  source = "./modules/setup"
}

module "kubernetes" {
  depends_on = [module.setup]
  source     = "./modules/kubernetes"
}

data "google_client_config" "provider" {
}

data "google_container_cluster" "gke" {
  depends_on = [module.kubernetes]
  name       = var.k8s.cluster_name
  location   = var.gcp_region.zone
}

provider "kubernetes" {
  host                   = "https://${data.google_container_cluster.gke.endpoint}"
  token                  = data.google_client_config.provider.access_token
  cluster_ca_certificate = base64decode(data.google_container_cluster.gke.master_auth[0].cluster_ca_certificate)
}

module "services" {
  source = "./modules/services"
}
