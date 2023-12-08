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

          env {
            name  = "PORT"
            value = 8000
          }

          env {
            name  = "POSTGRES_URL"
            value = "postgres://avnadmin:AVNS_g2eLQdMdem6BwyU5jmZ@rtw-armory-rtw-armory.a.aivencloud.com:10143/defaultdb?sslmode=require"
          }

          env {
            name  = "SESSION_SECRET"
            value = "e816911d-db8a-4e91-82d4-7252820877b7"
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
        }
      }
    }
  }
}

resource "kubernetes_service" "api-service" {
  metadata {
    name = "mail-service"
  }
  spec {
    selector = {
      test = kubernetes_deployment.api-service.metadata.0.labels.app
    }
    session_affinity = "ClientIP"
    port {
      port        = 8080
      target_port = 8000
    }

    type = "LoadBalancer"
  }
}
