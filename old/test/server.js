var http = require("http")

var fs = require("fs")

var path = require("path")

http.createServer(
    function(req, response){
        var content;

        response.writeHead(
            200,
            { "Content-Type" : req.url.indexOf("html") ?"text/html":"text/javascript", "charset" : "utf-8" }
        );


        console.log(req.url)
        
        try {
            content = fs.readFileSync(
                path.join(__dirname,req.url)
            );
        }
        catch(ex){
            //this.error(e.request, response, 404, "找不到指定文件..", e.url);
            response.end();
            return;
        }
        
        response.write(content);
        response.end();
        //res.end("123");
    }
).listen(
    3000
)