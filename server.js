var http   = require('http'),
    util   = require('util'),
    url    = require('url'),
    os     = require('os'),
    server = http.createServer();
    server.on('request', function(req, res){
        var requrl = url.parse(req.url, true);
        if (requrl.pathname === '/') {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(
                ["<html><head><title>Hello World</title></head>",
                "<body><h1>Hi I am a webserver made by Himanshu</h1>",
                "</body></html>"]
                .join('/n')
            );
        } else if(requrl.pathname === "/osinfo"){
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(
                ["<html><head><title>I am going to tell you about this system</title></head>",
                "<body><h1>Here are the details</h1>",
                "<table>",
                "<tr><th>TMP DIR</th><td>{tmpdir}</td></tr>",
                "<tr><th>Host Name</th><td>{hostname}</td></tr>",
                "<tr><th>OS Type</th>", 
                "<td>{type} {osplat} {osarch} {osrelease}</td></tr>",
                "<tr><th>Uptime</th>",
                "<td>{uptime} {loadavg} </td></tr>", 
                "<tr><th>Memory</th>",
                "<td>total: {totalmem} free: {freemem}</td></tr>",
                "<tr><th>CPU's</th>",
                "<td><pre>{cpudata}</pre></td></tr>",
                "<tr><th>Network</th>",
                "<td><pre>{netdata}</pre></td></tr>",
                "</table>",
                "</body></html>"]
                .join('\n')
                .replace("{tmpdir}", os.tmpDir())
                .replace("{hostname}", os.hostname())
                .replace("{type}", os.type())
                .replace("{osplat}", os.platform())
                .replace("{osarch}", os.arch())
                .replace("{osrelease}", os.release())
                .replace("{uptime}", os.uptime())
                .replace("{loadavg}", util.inspect(os.loadavg()))
                .replace("{totalmem}", os.totalmem())
                .replace("{freemem}", os.freemem())
                .replace("{cpudata}", util.inspect(os.cpus()))
                .replace("{netdata}", util.inspect(os.networkInterfaces()))
             );
        } else {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end("bad URL" + req.url);
        }
    });

    server.listen(8080);
    console.log("Server started at port 8-0-8-0");