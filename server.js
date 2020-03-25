
// cmd 켜서 node server.js 입력해서 하나 서버 실행하고 다시 cmd  하나 더 열어서 npm start 해야된다 
const http = require('http');
const request = require('request');
require('dotenv').config();

const clientId = process.env.REACT_APP_CLIENT_ID;
const secretKey = process.env.REACT_APP_SECRET_KEY; 



console.log('started server on port 5001kjkjkjjk');

http.createServer((req, res) => {

  var code = req.url.split("=")[1];
  if (code) {
    request.post('https://github.com/login/oauth/access_token', {
      form: {
        client_id: clientId,
        client_secret: secretKey,
        code: code
      }
    }, (err, r, body) => {
      console.log('dasdasdsadsa',body)
      res.writeHead(301, {
        'Location': 'https://githubissue.netlify.com/?' + body
      });
      res.end();
    })
    
  } else {
    res.writeHead(404);
    res.end();
  }
}).listen(5001); // when you meet reset error just tell to student change the port number 



