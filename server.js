var http = require('http');
var express = require("express");
var path = require("path");

var app = express();

var server = http.createServer(app)

var json = {
            unix :0,
            natural : ""
        };

app.use(express.static(path.join(__dirname, 'client')));

app.get('/', function(req,res) {
  res.status(200).sendFile('index.html', { root: path.join(__dirname, 'client') });
});

app.get('/:str', function(req, res){
    
    var string = req.params.str;
    if(isDate(string)){
        var date = new Date(string);
        json.unix =  Number(date.getTime()/1000);
        json.natural = date.toDateString();
        res.send(JSON.stringify(json));   
    }else if(isUnix(string)){
        var date = new Date(string*1000);
        json.unix =  Number(date.getTime()/1000);
        json.natural = date.toDateString();
        res.send(JSON.stringify(json));   
    }else{
        json.unix =  null;
        json.natural = null;
        res.send(JSON.stringify(json));   
        }
            
    
    
});

function isDate(date) {
    return ( (new Date(date) !== "Invalid Date" && !isNaN(new Date(date)) ));
}

function isUnix(timestamp){
    return (new Date(timestamp*1000)).getTime() > 0 ? true : false;
}



server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("TimeStamp server listening at", addr.address + ":" + addr.port);
});
