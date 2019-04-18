# signal_run.sh runs the api and menuguide development server
#
# the dev server will not run under linux systemd, so only use this for dev
# this puts the api in the background which makes it hard to debug both
# might be better to use screen to switch back and forth
#   - screen && Ctrl-A " to select screen

cd /home/ubuntu/signal/src/api
npm run serve &

cd /home/ubuntu/signal/src/menuguide

# development: run serve uses CLI webpack devServer
npm run serve &

# production: run SPA under Node serve or nginx
# serve -s dist &

cd /home/ubuntu

