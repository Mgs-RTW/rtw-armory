resource "kubernetes_deployment" "api-service" {
  metadata {
    name = "api-service"
    labels = {
      app = "api-service"
    }
  }
  spec {
    replicas = 1

    selector {
      match_labels = {
        test = "api-service"
      }
    }

    template {
      metadata {
        labels = {
          test = "api-service"
        }
      }

      spec {
        container {
          image = "europe-north1-docker.pkg.dev/rtw-armory/rtw-armory-artifact-registry-prod/api-service:latest"
          name  = "api-service"

          port {
            container_port = 8000
          }
          
          env {
            name  = "PORT"
            value = 8000
          }

          env {
            name  = "NODE_ENV"
            value = "production"
          }

          env {
            name  = "PG_HOST"
            value = var.postgres.host
          }

          env {
            name  = "PG_PORT"
            value = var.postgres.port
          }

          env {
            name  = "PG_DATABASE"
            value = var.postgres.db
          }


          env {
            name  = "PG_USER"
            value = var.postgres.user
          }

          env {
            name  = "PG_PASSWORD"
            value = var.postgres.password
          }

          env {
            name  = "SESSION_SECRET"
            value = var.session_secret
          }
          env {
            name  = "GCS_BUCKET"
            value = "rtw-armory"
          }

          env {
            name  = "GCLOUD_PROJECT"
            value = "rtw-armory"
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
              path = "/health"
              port = 8000
            }

            initial_delay_seconds = 3
            period_seconds        = 3
          }

          readiness_probe {
            http_get {
              path = "/health"
              port = 8000
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

resource "kubernetes_service_v1" "api-service" {
  metadata {
    name = "api-service"
  }
  spec {
    selector = {
      test = kubernetes_deployment.api-service.metadata.0.labels.app
    }
    session_affinity = "ClientIP"
    port {
      port        = 8000
      target_port = 8000
    }

    type = "LoadBalancer"
  }
}
