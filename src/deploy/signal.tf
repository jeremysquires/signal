provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "signal" {
  ami = "ami-0a313d6098716f372"
  instance_type = "t2.micro"
  key_name = "deployer-key"

  # Copies scripts
  provisioner "file" {
    source      = "scripts"
    destination = "/home/ubuntu"
    connection {
      type     = "ssh"
      user     = "ubuntu"
    }
  }

  # Copies vimrc
  provisioner "file" {
    source      = "scripts/.vimrc"
    destination = "/home/ubuntu"
    connection {
      type     = "ssh"
      user     = "ubuntu"
    }
  }

  # Executes scripts
  provisioner "remote-exec" {
    inline = [
      "chmod +x /home/ubuntu/scripts/*.sh",
      "bash --login /home/ubuntu/scripts/packages.sh",
      "bash --login /home/ubuntu/scripts/signal_install.sh",
    ]
    connection {
      type     = "ssh"
      user     = "ubuntu"
    }
  }
}

resource "aws_eip" "ip" {
  instance = "${aws_instance.signal.id}"
}

output "ip" {
  value = "${aws_eip.ip.public_ip}"
}

