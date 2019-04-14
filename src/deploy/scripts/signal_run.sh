cd /home/ubuntu/signal/src/api
npm run serve &

cd /home/ubuntu/signal/src/menuguide

# development: run serve uses CLI webpack devServer
npm run serve &

# production: run SPA under Node serve or nginx
# serve -s dist &

cd /home/ubuntu

