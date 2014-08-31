
// bring express module and working
var express = require('express'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');
console.log('Running mongoose version %s', mongoose.version);
// use stylus

var stylus = require('stylus');

// get environment try to get from node if set by node ( check)
var env = process.env.NODE_ENV =process.env.NODE_ENV || 'development';

function compile(str, path){
    return stylus(str).set('filename', path);
}

var app = express();

// configure view engine
app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser());
app.use(stylus.middleware({
    src: __dirname + '/public',
    compile: compile
}));
//serve files route

app.use(express.static(__dirname + '/public'));
var connectionUri = 'mongodb://localhost/multivision';
if(env !== 'development')
{
    connectionUri = 'mongodb://sopi:1234Qwer@ds033760.mongolab.com:33760/multivisionsopi';
}
mongoose.connect(connectionUri,function (err) {
    console.log('error: ' + err);
    // if we failed to connect, abort
    if (err) throw err;
});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback() {
    console.log('multivision db connect');
});

var messageSchema = mongoose.Schema({message: String});
var Message = mongoose.model('Message', messageSchema);
var mongoMessage;

Message.findOne().exec(function(err, messageDoc){
    console.log('mongo find one error: ' + err);
    console.log('mongo find one messageDoc: ' + messageDoc);
   mongoMessage = messageDoc && messageDoc.message || 'nothing';
});

app.get('/partials/:partialPath', function(req, res){
    res.render('partials/' + req.params.partialPath);
});
// add route to deliver a home page
// root website
// asterisk route all pages
app.get('*', function  (req, res) {
    res.render('index', {
        mongoMessage: mongoMessage
    });
});

var port = process.env.PORT || 3030;
app.listen(port);