terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "5.8.0"
    }
  }
}

provider "google" {
  # Configuration options
  project = "rtw-armory"
  region  = var.gcp_region.region

}
