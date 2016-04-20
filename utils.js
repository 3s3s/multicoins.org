'use strict';

var https = require('https');
var http = require('http');

exports.getJSONssl = function(query, callback)
{
	return https.get(query, function(response) {
		var body = '';
		response.on('data', function(chunk) {
			body += chunk;
		});
		response.on('end', function()
		{
		    try {
        		callback(JSON.parse(body));
		    }
		    catch(e) {
		        console.log(e.message);
		    }
		});
	});
};

exports.getJSON = function(query, callback)
{
	return http.get(query, function(response) {
		var body = '';
		response.on('data', function(chunk) {
			body += chunk;
		});
		response.on('end', function()
		{
		    try {
        		callback(JSON.parse(body));
		    }
		    catch(e) {
		        console.log(e.message);
		    }
		});
	});
};

exports.postString = function(host, port, path, headers, strBody, callback) 
{
    const options = { 
        hostname: host, 
        port: port, 
        path: path, 
        method: 'POST', 
        headers: headers
    }; 
    
    var proto = (port == 443) ? https : http;
        
    var req = proto.request(options, function(res) { 
        console.log('Status: ' + res.statusCode); 
        console.log('Headers: ' + JSON.stringify(res.headers)); 
        
        res.setEncoding('utf8'); 
        
		var res_data = '';
		res.on('data', function (chunk) {
			res_data += chunk;
		});
		res.on('end', function() {
			callback({'success': 'success', 'data': res_data});
		});	
    }); 
    
    req.on('error', function(e) { 
        console.log('problem with request: ' + e.message); 
        callback({'success': false, message: 'problem with request: ' + e.message});
    }); 
    
    // write data to request body 
    req.end(strBody);    
}

exports.postJSON = function(host, path, strJSON, callback)
{
    return exports.postString(host, 80, path, {'Content-Type': 'application/json'}, strJSON, callback);
}
exports.postJSONssl = function(host, path, strJSON, callback)
{
    return exports.postString(host, 443, path, {'Content-Type': 'application/json'}, strJSON, callback);
}