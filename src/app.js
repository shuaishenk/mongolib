const Koa = require('koa');
const http = require('http');
const https = require('https');
const cors = require('koa2-cors');
const fs = require('fs');
const koaBody = require('koa-body');
const handler = require('./middleware/handler.js')
const conn = require('./db_mongo/connections');
const test = require('./test.js')


class App {
    constructor(cfg) {
        this.app = null;
        this.port = cfg.port;
        this.sslPort = cfg.sslPort;
        this.cfg = cfg;
    };

    async _init() {
        this.app = new Koa();
        this.app.on('error', (err, ctx) => {
            console.log('error=============>')
            console.error('server error', err, ctx)
            // if(ctx) ctx.body = { success: true, result: {message:err?err.message:'internal error'} }
        });
        this.app.use(koaBody({ strict: false }));
        this.app.use(handler)
        // logger
        this.app.use(async (ctx, next) => {
            console.log('state====>', ctx.state)
            let url = ctx.url;
            if (url.endsWith('/')) {
                url = url.substr(0, url.length - 1);
                // ctx.redirect(url);
            }
            console.log('url==>', url)
            ctx.state.config = this.cfg;
            // console.log('inspect===>',ctx.inspect())
            // console.log('assert===>',ctx.assert( 401, 'Please login!'))
            await next();
            const rt = ctx.response.get('X-Response-Time');
            console.log(`${ctx.method} ${ctx.url} - ${rt}`);
        });

        // x-response-time

        this.app.use(async (ctx, next) => {
            const start = Date.now();
            await next();
            const ms = Date.now() - start;
            ctx.set('X-Response-Time', `${ms}ms`);
        });
        await conn.connect();
        this.app.use(cors())
        // .use(router())


    }

    async run() {
        await this._init();
        let httpServer = http.createServer(this.app.callback()).listen(this.port, () => {
            console.log("mongodb server listening on port:" + this.port);
        });
        const options = {
            // key: fs.readFileSync(__dirname + '/certs/1535875729243.key'),
            // cert: fs.readFileSync(__dirname + '/certs/1535875729243.pem')
        };
        // let httpsServer = https.createServer(options, this.app.callback()).listen(this.sslPort, () => {
        //     console.log(`mongodb server listening on ssl port:${this.sslPort}`);
        // });
        await test();
    }
}

module.exports = App