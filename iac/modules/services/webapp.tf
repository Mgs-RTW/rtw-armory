resource "kubernetes_deployment" "webapp" {
  metadata {
    name = "webapp"
    labels = {
      app = "webapp"
    }
  }
  spec {
    replicas = 1

    selector {
      match_labels = {
        test = "webapp"
      }
    }

    template {
      metadata {
        labels = {
          test = "webapp"
        }
      }

      spec {
        container {
          image = "europe-north1-docker.pkg.dev/rtw-armory/rtw-armory-artifact-registry-prod/webapp:latest"
          name  = "webapp"

          env {
            name  = "PORT"
            value = 80
          }

          env {
            name  = "NODE_ENV"
            value = "production"
          }

          resources {
            limits = {
              cpu    = "200m"
              memory = "400Mi"
            }
            requests = {
              cpu    = "100m"
              memory = "125Mi"
            }
          }

          liveness_probe {
            http_get {
              path = "/"
              port = 80
            }

            initial_delay_seconds = 3
            period_seconds        = 3
          }
        }
      }
    }
  }

  lifecycle {
    ignore_changes = [spec[0].template[0].spec[0].container[0].image]
  }
}

resource "kubernetes_service_v1" "webapp" {
  metadata {
    name = "webapp"
  }
  spec {
    selector = {
      test = kubernetes_deployment.webapp.metadata.0.labels.app
    }
    session_affinity = "ClientIP"
    port {
      port        = 80
      target_port = 80
    }

    type = "LoadBalancer"
  }
}
