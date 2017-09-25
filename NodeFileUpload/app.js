var http = require('http');
var formidable = require('formidable');
var fs = require('fs');

var RES_HEAD = {'Cache-Control':'no-cache, no-store, max-age=0, must-revalidate' , 'Content-Security-Policy':'default-src \'self\' \'unsafe-inline\' \'unsafe-eval\' *' , 'Content-Type':'text/html;charset=UTF-8' , 'Expires':'0' , 'Pragma':'no-cache' , 'Server':'nodejs' , 'Strict-Transport-Security':'max-age=31536000' , 'X-Content-Type-Options':'nosniff' , 'X-Frame-Options':'SAMEORIGIN' , 'X-XSS-Protection':'1; mode=block'};

http.createServer(function (req, res) {
  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
    	var oldpath = files.filetoupload.path;
        var newpath = 'C:/Users/wiz_20150702/Desktop/upload/' + files.filetoupload.name;
        fs.rename(oldpath, newpath, function (err) {
          if (err) throw err;
          res.write('File uploaded and moved!');
          res.end();
        });
    });
  } else {
    res.writeHead(200, RES_HEAD);
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
}).listen(8080);