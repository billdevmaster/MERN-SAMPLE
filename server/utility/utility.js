const fs = require('fs');

const numberWithCommas = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const readHTMLFile = (path, callback) => {
    console.log("step3")
    html = fs.readFileSync(path, {encoding: 'utf-8'});
    callback(null, html);
};

module.exports = {
    numberWithCommas,
    readHTMLFile
}