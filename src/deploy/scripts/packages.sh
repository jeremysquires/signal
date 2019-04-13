sudo apt-get -q -y update
# sudo apt-get -q -y upgrade
curl -sL https://deb.nodesource.com/setup_8.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo apt-get -q -y install nodejs-doc nodejs
sudo apt-get -q -y install npm
# install NVM to manage node versions
# only local to user, sudo nvm fails
# curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
# source ~/.bashrc
# nvm install 8.15.1

