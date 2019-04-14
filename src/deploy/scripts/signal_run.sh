cd ~/signal/src/api
npm run serve &

cd ~/signal/src/menuguide
# development: run serve uses CLI webpack devServer
npm run serve &
# production: run SPA under Node serve or nginx
# npm install -g serve
# serve -s dist

cd ~

