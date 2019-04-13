cd signal/src/api
npm run serve &

cd ../menuguide
# development: run serve uses CLI webpack devServer
npm run serve &
# production: run SPA under Node serve or nginx
# npm install -g serve
# serve -s dist

cd ~

