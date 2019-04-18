git clone -q https://github.com/jeremysquires/signal.git
cd signal
# if debugging, checkout the branch: git checkout deploy

cd src/api
npm install
sudo npm install -g jest
sudo npm install -g dredd

cd ../menuguide
npm install
sudo npm install -g @vue/cli
sudo npm install -g @vue/cli-service-global
sudo npm install -g serve
npm run build

cd ~
