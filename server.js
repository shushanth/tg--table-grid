var http =require('http'),
    fs = require('fs');



fs.readFile('index.html',function(err,html){

     if(err)
     	 throw err;


   http.createServer(function(req,res){
       res.writeHeader(200,{"content-type":"text/html"});
       res.write(html);
       res.end();

   }).listen(3000);

});


console.log("Listening to server on 8888...");