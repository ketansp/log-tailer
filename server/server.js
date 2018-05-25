'use strict';

if(process.argv.length < 3){
  console.log('Please specify file name as command line argument');
  process.exit(1);
}

const http = require('http');
const fs = require('fs');
const socket = require('socket.io');
const filePath = process.argv[2];
var lastModifiedDateInMillis, lastReadLineNumber = 0;
const lineCount = 10;

//Create a basic server using http module and send index.html
const app = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(fs.readFileSync(__dirname + '/../client/index.html'));
});

//Start a socket server
const io = socket.listen(app);

//When a new connection is established, return last 10 lines of the file
io.on('connection', function(socket) {
  let linesInFile = fs.readFileSync(filePath).toString().split('\n');
  let linesToSendBack = [];
  for(var i = linesInFile.length - 1; (i > linesInFile.length - 1 - lineCount) && (0<=i); i--){
    linesToSendBack.push(linesInFile[i]);
  }

  //set values in variables for later use
  lastModifiedDateInMillis = new Date(fs.statSync(filePath)['mtime']).getTime();
  lastReadLineNumber = linesInFile.length;

  //emit data to connection
  socket.emit('connectionEstablished', { lines : linesToSendBack.reverse()});
});

//check if file has changed by comparing last modified date
//If yes, send back new lines
function readFileForChanges() {
  const newlyReadLastModifiedDateInMillies = new Date(fs.statSync(filePath)['mtime']).getTime();
  //proceed only if file has been modified
  if(lastModifiedDateInMillis < newlyReadLastModifiedDateInMillies){
    let linesToSendBack = [];
    let linesInFile = fs.readFileSync(filePath).toString().split('\n');
    for(var i = linesInFile.length - 1; i > lastReadLineNumber - 1; i--){
      linesToSendBack.push(linesInFile[i]);
    }

    //set values in variables for later use
    lastModifiedDateInMillis = newlyReadLastModifiedDateInMillies;
    lastReadLineNumber = linesInFile.length;

    io.emit('logUpdate', { lines : linesToSendBack.reverse() });
  }
}

app.listen(3000);
console.log('Started tail logger application on port 3000');

// Send current time every 100 milliseconds
setInterval(readFileForChanges, 100);
