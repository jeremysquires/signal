git clone -q https://github.com/jeremysquires/signal.git
git checkout deploy
cd signal

cd src/api
npm install
sudo npm install -g jest
sudo npm install -g dredd

cd ../menuguide
npm install
sudo npm install -g @vue/cli
sudo npm install -g @vue/cli-service-global

cd ~
