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
        // const db = mongoose.connection//mongoose.connection;
        // db.on('error', console.error.bind(console, 'connection error:'));
        // db.once('open', function () {
        //     console.log('connect mongodb success')
        //     // we're connected!
        //     const kittySchema = new mongoose.Schema({
        //         name: String
        //     });
        //     kittySchema.methods.speak = function () {
        //         var greeting = this.name
        //             ? "Meow name is " + this.name
        //             : "I don't have a name";
        //         console.log(greeting);
        //     }

        //     const Kitten = mongoose.model('Kitten', kittySchema);
        //     const silence = new Kitten({ name: 'Silence' });
        //     console.log(silence.name);
        //     silence.save(function (err, silences) {
        //         if (err) return console.error(err);
        //         console.log(silences)
        //         silence.speak();
        //     });
        //     Kitten.find(function (err, kittens) {
        //         if (err) return console.error(err);
        //         console.log(kittens);
        //     })
        //     Kitten.find({ name: /^fluff/ }, function (err, kittens) {
        //         if (err) return console.error(err);
        //         console.log(kittens);
        //     });
        // });
    }


}

if (!global[conn]) {
    global[conn] = new Connection();
}

module.exports = global[conn];