cd ~/signal/src/api
npm run serve &
disown

cd ~/signal/src/menuguide
# development: run serve uses CLI webpack devServer
npm run serve &
disown
# production: run SPA under Node serve or nginx
# npm install -g serve
# serve -s dist

cd ~

