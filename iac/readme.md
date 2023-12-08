# Setup

code ~/.zshrc
alias (tf)="terraform"
source ~/.zshrc

# Kevin

tf init -backend-config="bucket=rtw-armory-kevin" -reconfigure

# Anders

tf init -backend-config="bucket=rtw-armory-anders" -reconfigure
tf init -backend-config="bucket=rtw-armory-terraform-states" -reconfigure

# Select current workspace local or prod

tf select gcp

# First preview changes via

tf plan -var-file="./vars/gcp.tfvars"

# Apply changes via

tf apply -var-file="./vars/gcp.tfvars"

# Teardown

tf destroy -var-file="./vars/gcp.tfvars"
