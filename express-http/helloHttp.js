var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var credentials = require('./credentials.js');
var request = require('request');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);
app.use(express.static('public'));

app.get('/',function(req,res,next){
  var context = {};
  request('http://api.openweathermap.org/data/2.5/weather?q=corvallis&APPID=' + credentials.owmKey, function(err, response, body){
    if(!err && response.statusCode < 400){
      context.owm = body;
      request({
        "url":"http://httpbin.org/post",
        "method":"POST",
        "headers":{
          "Content-Type":"application/json"
        },
        "body":'{"foo":"bar","number":1}'
      }, function(err, response, body){
        if(!err && response.statusCode < 400){
          context.httpbin = body;
          res.render('home',context);
        }else{
          console.log(err);
          if(response){
            console.log(response.statusCode);
          }
          next(err);
        }
      });
    } else {
      console.log(err);
      if(response){
        console.log(response.statusCode);
      }
      next(err);
    }
  });
});

app.get('/get-ex',function(req,res,next){
  var context = {};
  request('http://api.openweathermap.org/data/2.5/weather?q=corvallis&APPID=' + credentials.owmKey, function(err, response, body){
    if(!err && response.statusCode < 400){
      context.owm = body;
      res.render('home',context);
    } else {
      if(response){
        console.log(response.statusCode);
      }
      next(err);
    }
  });
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
