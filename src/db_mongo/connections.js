const config = require('../../config.json');
const path = require("path");
const fse = require("fs-extra");
const mongoose = require('mongoose');
const conn = Symbol.for('conn');



class Connection {
    constructor() {
        this.conn = mongoose;
    }

    async connect() {
        mongoose.Promise = global.Promise;
        const db = config.db;
        const options = {
            useNewUrlParser: true,
            // user: 'test',
            // pass: '123456',
            autoIndex: true, // Don't build indexes
            reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
            reconnectInterval: 500, // Reconnect every 500ms
            poolSize: 10, // Maintain up to 10 socket connections
            // If not connected, return errors immediately rather than waiting for reconnect
            bufferMaxEntries: 0,
            connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            family: 4 // Use IPv4, skip trying IPv6
        };
        mongoose.connect(db.url, options, function (err) {
            if (err) {
                console.error(err);
                return;
            }
            console.log('数据库连接成功')
        });
    }


}

if (!global[conn]) {
    global[conn] = new Connection();
}

module.exports = global[conn];