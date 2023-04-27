const http = require('http');
const fs = require('fs');
const { error } = require('console');

//const indexDocument = fs.readFileSync('index.html', 'utf-8');
//const anotherDocument = fs.readFileSync('another.html', 'utf-8');

function requestListener(request, response) {

  if(request.method === 'GET') {
    if(request.url === '/' || request.url === '/index.html') {
      // You need to load the counter.json here
      // and increment "index" by one and save it
      fs.readFile('counter.json','utf-8',(error, data)=>{
        if (error) throw error
        const count=JSON.parse(data);
        count.index += 1;
        fs.writeFile('counter.json', JSON.stringify(count) , (error,data)=>{
          if (error) throw error
        });
        // You need to replace the '-!-' in index.html with
        // the new count before serving the document
        fs.readFile('index.html', 'utf-8', (err,data)=>{
          if(err) throw err
          const indexSplit = data.split('-!-');
          const newIndexDocument=indexSplit[0]+count.index+indexSplit[1];
          response.writeHead(200);
          response.end(newIndexDocument);
        })
      })
    } else if (request.url ==='/another.html') {
      // You need to load the counter.json here
      // and increment "another" by one and save it
      fs.readFile('counter.json','utf-8',(error, data)=>{
        if (error) throw error
        const count=JSON.parse(data);
        count.another+=1;
        fs.writeFile('counter.json', JSON.stringify(count) , (error,data)=>{
          if (error) throw error
        });
        // You need to replace the '-!-' in another.html
        // the new count before serving the document
        fs.readFile('another.html', 'utf-8', (err,data)=>{
          if(err) throw err
          const indexSplit = data.split('-!-');
          const newAnotherDocument=indexSplit[0]+count.another+indexSplit[1];
          response.writeHead(200);
          response.end(newAnotherDocument);
        })
      });
    } else {
      response.writeHead(404);
      response.end('File not found.');
    }
  }
}

const server = http.createServer(requestListener);
server.listen(3000);
