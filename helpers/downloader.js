const https = require('https');
const fs = require('fs');

const download = async (url, path, name, ext) => {
    const file = fs.createWriteStream(`${path}${name}.${ext}`);
    https.get(url, (response) => {
        response.pipe(file);
        file.on('finish', () => {
            file.close();
            console.log('Complete!');
        });
    });
}

module.exports = {download};
// const request = http.get("http://i3.ytimg.com/vi/J---aiyznGQ/mqdefault.jpg", function(response) {
//     response.pipe(file);
//
//     // after download completed close filestream
//     file.on("finish", () => {
//         file.close();
//         console.log("Download Completed");
//     });
// });