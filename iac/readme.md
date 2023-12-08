brew install --cask google-cloud-sdk
brew install terraform
gcloud config set project rtw-armory

alias dfimage="docker run -v /var/run/docker.sock:/var/run/docker.sock --rm alpine/dfimage"

gcloud auth application-default login
code ~/.zshrc
alias (tf)="terraform"
source ~/.zshrc
gcloud container clusters get-credentials rtw-armory --zone europe-north1-b --project rtw-armory

dfimage "europe-north1-docker.pkg.dev/rtw-armory/rtw-armory-artifact-registry-prod/api-service:latest"
# Init connects you to the Azure terraform state backend, if you skipped step 3 here this will fail

terraform init -backend-config="bucket=rtw-armory-anders" -reconfigure

terraform init -backend-config="bucket=rtw-armory-terraform-states" -reconfigure

# Select current workspace dev,qa or run

terraform select {{environment}}

# First preview changes via

terraform plan -var-file="./environments/{{environment}}.tfvars"

# Apply changes via

terraform apply -var-file="./environments/{{environment}}.tfvars"

# Teardown

terraform destroy -var-file="./environments/{{environment}}.tfvars"
