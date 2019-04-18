provider "aws" {
  region = "us-east-1"
}

# creates rule in default security group
resource "aws_security_group_rule" "allow_ssh" {
  type            = "ingress"
  from_port       = 22
  to_port         = 22
  protocol        = "tcp"
  cidr_blocks = ["205.206.87.17/32"]
  security_group_id = "sg-4c6cea0a"
}

# creates rule in default security group
resource "aws_security_group_rule" "allow_http" {
  type            = "ingress"
  from_port       = 80
  to_port         = 8282
  protocol        = "tcp"
  cidr_blocks = ["0.0.0.0/0"]
  security_group_id = "sg-4c6cea0a"
}

# adds deployer key
resource "aws_key_pair" "deployer" {
  key_name   = "deployer-key"
  public_key = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCypDLVjbZrmqJTDE69PLduMjJUjosnQYbzR8mvNTsY5eR532Ra470KuRNgbQtMH0AVORdUqS1KGpkVYDbZg57a2KOrN53FY8voU6Ojo13yf8pf+2YrpcfrPbcu37v51MOSwKtdBSqj788LLPIa8BGy4R/CFJFJEnZYbAsFPgWgRMeirLasb4ixb9Vy/rKE4JwYS6zQzr6A9QbAp+LvMFP4wFZRKkIaVV3s3rMxBQZitd8oySn4AUujK+h7HcuUSJFAwcOKVE8cdcwjCiZG0o0x70qCiRD4uFxiXN4JCf4nZuGy78Q0huCsAifrlFowoScTBWkkbvT/4OlRwDX9Iv5H jer@ustudio"
}

