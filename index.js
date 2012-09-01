var request = require('request');
var _       = require('underscore');
var program    = require('optimist')
  .usage('Usage: $0')
  .options('h', {
    alias: 'help',
    describe: 'Show this help message'
  })
  .options('H', {
    alias: 'header',
    describe: 'Add a header to the request'
  })
  .options('m', {
    alias: 'method',
    default: 'GET',
    describe: 'The request method'
  });

if(program.argv._.length < 1) {
  console.log(program.help());
}

// var options = {
//   url: 'http://self.plus3.ws:3000/api/v2/auth/authorize',
//   method: 'POST',
//   body: JSON.stringify({ "client_id":"5b7181c3-783b-4a96-9d2c-c16496171592","login":"me@chriscowan.us","password":"monkey" }),
//   headers: {
//     "content-type": 'application/json'
//   }
// };
// 
// var req = request(options, function (err, res, body) {
//   console.log("\nRequest:\n");
//   console.log(res.request.method+' '+res.request.path+' HTTP/1.1');
//   console.log('host: '+res.request.host);
//   _.each(res.request.headers, function (val,key) {
//     if(val) {
//       console.log(key.toLowerCase()+': '+val);
//     }
//   });
//   console.log("\n"+res.request.body);
//   console.log("\n\nResponse:\n");
//   console.log('HTTP/'+res.httpVersionMajor+'.'+res.httpVersionMinor+' '+res.statusCode+' '+res.request.httpModule.STATUS_CODES[res.statusCode]);
//   _.each(res.headers, function (val, key) { 
//     console.log(key+': '+val);
//   });
//   console.log("\n"+body);
// });
