var http = require("http");
var colors = require("colors");
var handlers = require("./handlers");


function init() {
    function onReqest(req, res) {
        console.log("Reqest ".green, req.url, req.method);
        // res.writeHead(200, {"Content-Type": "text/html"});

        switch (req.url) {
            case '/':
            case '/start':
                handlers.welcome(req, res);
                break;
            case '/upload':
                handlers.upload(req, res);
                break;
            case '/show':
                handlers.show(req, res);
                break;
            default:
                handlers.error(req, res);
        }
    }
    var server = http.createServer(onReqest);
    server.listen(9876);
    console.log("Connected...".blue);
}

exports.init = init;