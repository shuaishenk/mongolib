const readline = require('readline');
const fs = require('fs');
const path = require('path');
// const log4js = require('log4js');

const parseLabel = async function (_path) {
    return new Promise((resovled, rejected) => {
        console.log('path==>', path.resolve(__dirname, _path));
        let readStream = fs.createReadStream(path.resolve(__dirname, _path));
        const rl = readline.createInterface({
            input: readStream
        });
        let mapped = []
        rl.on('line', (input) => {
            // console.log(`Received: ${input}`);
            mapped.push(input);
            //   rl.close();
        });
        rl.on('close', function () {

        });
        readStream.on('end', () => {
            resovled(mapped);
        });
        readStream.on('error', () => {
            rejected('parse label failed');
        });
    });
}


module.exports = {
    parseLabel
}