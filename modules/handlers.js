var fs = require("fs");
var formidable = require('formidable');
var log = require("./error");

function setExtension(file) {
    var type = file.upload.type;
    console.log(type);
    var exte;
    switch (type){
        case "image/jpeg":
            exte = ".jpeg";
            break;
        case "image/png":
            exte = ".png";
            break;
        case "image/gif":
            exte = ".gif";
            break;
        default:
            exte = "unknown";
    }
    return exte;
}


exports.upload = function onReqest(req, res) {

    var form = new formidable.IncomingForm();
    form.parse(req, function(error, fields, file) {
        var ext = setExtension(file);
        if(ext !== "unknown"){
            var d = new Date();
            var time = d.getTime();
            fs.renameSync(file.upload.path, time+ext);
            res.writeHead(200, {"Content-Type": "text/html"});
            res.write("received image:<br/>");
            res.write("<img src='/show' />");
            res.end();
        }else{
            fs.readFile("../images/template-404-error-page-preview.jpg", function (err, content) {
                if (err){
                    log.error(err);
                    // throw err
                }
                res.statusCode ="404";
                res.setHeader("Content-Type", "image/jpg; ");

                res.end(content);
            });
        }
    });

}

exports.welcome = function(req, res) {
    
    fs.readFile("./templates/index.html", function (err, data) {
        res.write(data);
        res.end();
    })
}

exports.show = function (req, res) {
    fs.readFile("test.jpg", "binary" ,function (err, file) {
        res.write(file, "binary");
        res.end();
    })
}

exports.error = function(req, res) {
    var data = req.url ;
    var err  = log.error(data);
}
