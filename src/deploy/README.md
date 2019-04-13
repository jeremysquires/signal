# Deploy

Using Hashicorp's Terraform and standard Basic Tier AWS instances, create
a web server machine, deploy the signal apps and start them up.

## Quick Start


>
> Follow instructions in **Security** section to configure SSH/HTTP rules
>
> cd security
>
> `terraform init`
>
> `terraform apply`
>
> cd ..
>
> `terraform init`
>
> `terraform apply`
>

Once everything is running, open the app in a browser at the URL indicated by
the serve command: http://<ip_address>:8081

Once done, you can also log in via the command: `ssh ubuntu@<ip_address>`

## Security

This plan uses the default security group. As such, the access rules and SSH keys
are created using a separate plan in the `security` folder. This is so that multiple
instances can share these resources and do not duplicate them.

Edit `security/security.tf`

>
> Change resource `"aws_security_group_rule" "allow_ssh" and "allow_http"`
>
> Modify the `cidr_blocks` line to include the public IP address of your client machine.
> You can find this by putting `IP address` into any search engine.
>
> Modify the `security_group_id` = "sg-4c6cea0a" line in two places to inject the
> rules into your default security group.
>
> Change resource `"aws_key_pair" "deployer"`
>
> Modify the `public_key` line to include your own deployer SSH key.
> See `~/.ssh/id_rsa.pub`
>

NOTE: this plan also creates the `allow_http` rule that is required by the web site.

## Scripts

The `scripts` folder contains the scripts that will be uploaded using the
file provider and run to set up the apps.


