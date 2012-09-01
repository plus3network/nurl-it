var request = require('request');
var _       = require('underscore');
var util    = require('util');
var colors  = require('colors');

var program    = require('optimist')
  .usage('Usage: $0 [options] <url>')
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
  })
  .options('b',{
    alias: 'body',
    describe: 'The request body'
  }).options('n', {
    alias: 'no-colors',
    describe: 'Turn off colors'
  }).options('c', {
    alias: 'colors',
    default: true
  });

function extractHeaders (headers) {
  var finalHeaders = {};

  if (!util.isArray(headers)) {
    headers = [ headers ];
  }

  headers.forEach(function (item) {
    var parts = item.split(':');
    finalHeaders[parts[0].toLowerCase()] = parts[1];
  });
  
  return finalHeaders;
}

var useColor = true;
if (program.argv.n || !program.argv.colors) {
  colors.mode = 'none';
  useColor = false;
}

if(program.argv._.length < 1 || program.argv.h) {
  console.error(program.help());
  process.exit();
}

var options = { url: program.argv._[0], method: program.argv.method };

if (program.argv.body) {
  options.body = program.argv.body;
}

if (program.argv.header) {
  options.headers = extractHeaders(program.argv.header);
}


request(options, function (err, res, body) {
  if(err) {
    return console.error(err.stack);
  }

  console.log("\nRequest:\n");
  var reqMethodStr = res.request.method+' '+res.request.path+' HTTP/1.1';
  // Workaround for weird bug with colors module.
  console.log((useColor)? reqMethodStr.white : reqMethodStr);
  console.log('host'.cyan+': '+res.request.host.magenta);
  _.each(res.request.headers, function (val,key) {
    if (val) {
      console.log(key.toLowerCase().cyan+': '+(val+'').magenta);
    }
  });

  if (res.request.body) {
    console.log("\n"+(res.request.body+'').yellow);
  }
  
  console.log("\nResponse:\n");
  var resMethodString = 'HTTP/'+res.httpVersionMajor+'.'+res.httpVersionMinor+' '+res.statusCode+' '+res.request.httpModule.STATUS_CODES[res.statusCode];
  // Workaround for weird bug with colors module
  console.log((useColor)? resMethodString.white : resMethodString); 
  _.each(res.headers, function (val, key) { 
    if (val) {
      console.log(key.cyan+': '+(val+'').magenta);
    }
  });

  if (body) { 
    console.log("\n"+body.yellow);
  }
});
