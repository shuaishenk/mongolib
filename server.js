const cfg = require('./config.json')
const app =require('./src/app.js');

const init = async () => {
    new app(cfg).run();
}

init();