var fs = require("fs");

function error(data){

    var date = new Date();
    var text = date + " " + data + "\n";

    var dirPath = __dirname;
    fs.appendFile(dirPath + '/../error.log', text, (err) => {
        if (err) throw err;
    });
}

exports.error = error;