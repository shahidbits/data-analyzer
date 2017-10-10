var region = process.env.REGION || 'ap-south-1';
var streamName = process.env.STREAM_NAME || 'know-debug';
var key = process.env.ACCESS_KEY || 'AKIAJDXRBE5I4H5D6KNQ';
var secret = process.env.ACCESS_SECRET || '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';

var fs = require('fs'),
    Transform = require('stream').Transform,
    kinesis = require('kinesis'),
    kinesisSource = kinesis.stream({
        region: region,
        name: streamName,
        credentials: {
            accessKeyId: key,
            secretAccessKey: secret
        }
    });

// Data is retrieved as Record objects, so let's transform into Buffers
var bufferify = new Transform({objectMode: true})
bufferify._transform = function (record, encoding, cb) {
    cb(null, record.Data)
}

// Write to file
// kinesisSource.pipe(bufferify).pipe(fs.createWriteStream('data.log'));

var pass = new require('stream').PassThrough();
pass.on('data', function (chunk) {
    var textChunk = chunk.toString('utf8');
    io.emit('event', { data: textChunk });
});
kinesisSource.pipe(bufferify).pipe(pass);

// Server
var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
var basicAuth = require('basic-auth');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var auth= function(req, res, next) {
    var user = basicAuth(req);
    if (!user || user.name !== process.env.USER_NAME || user.pass !== process.env.PASSWORD) {
        res.set('WWW-Authenticate', 'Basic realm="KNOW"');
        return res.status(401).send();
    }
    return next();
};

if(process.env.AUTHENTICATION === 'true'){
    console.log('Auth enabled');
    app.use([auth]);
}

io.sockets.on('connection', function (socket) {
    console.log('connection');
    socket.on('memberConnected', function () {
        console.log('Notifier#memberConnected');
    });
});

//Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(serveStatic(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/ping', function(req, res){
    res.send('pong');
});

var PORT = process.env.PORT || 4000;
http.listen(PORT, function(){
    console.log('listening on *: %s', PORT);
});

