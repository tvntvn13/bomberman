const http = require('http');
const fsPromises = require('fs').promises;
const fs = require('fs');
const path = require('path');
const port = 8000;

const server = http.createServer((req, res) => {
  const extension = path.extname(req.url);
  console.log("req:", req.method, req.url);

  let contentType;
  switch (extension) {
    case '.css':
      contentType = 'text/css';
      break;
    case '.js':
      contentType = 'application/javascript';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.jpeg':
      contentType = 'image/jpeg';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.wav':
      contentType = "audio/x-wav";
      break;
    case '.txt':
      contentType = 'text/plain';
      break;
    case '.ico':
      contentType = 'image/x-icon'
      break;
    default:
      contentType = 'text/html';
  }

  let filePath;
  if (contentType === 'text/html' && req.url === '/') {
    filePath = path.join(__dirname, 'index.html');
  } else if (contentType === 'text/css' || contentType === 'application/javascript') {
    filePath = path.join(__dirname, req.url);
    console.log("res:", path.join(__dirname, req.url));
  } else {
    filePath = path.join(__dirname, req.url);
  }

  const serveFile = async (filePath, contentType, response) => {
    try {
      const data = await fsPromises.readFile(filePath, 'utf8');
      response.writeHead(200, { 'Content-Type': contentType,});
      response.end(data);
    } catch (err) {
      console.log(err);
      response.statusCode = 500;
      response.end();
    }
  }

  const fileExist = fs.existsSync(filePath);
  if (fileExist) {
    serveFile(filePath, contentType, res);
  } else {
    res.statusCode = 400;
    res.write("file not found");
    res.end();
  }
});

server.listen(port, () => console.log(`server running on port ${port}...\n\n=> http://localhost:8000/`));
