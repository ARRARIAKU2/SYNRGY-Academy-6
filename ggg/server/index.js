const http = require('http');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIRECTORY = path.join(__dirname, '../public');
console.log(PUBLIC_DIRECTORY);

const getContent = (fileName) => {
  const filePath = path.join(PUBLIC_DIRECTORY, fileName);
  return fs.readFileSync(filePath);
};

// req: request
// res: response
const server = (req, res) => {
  //   const url = req.url;
  const { url } = req;

  console.log('url > ', url);

  const isJs = url.includes('/scripts');
  const isCss = url.includes('/css');
  const isImage = url.includes('/asset');

  if (url === '/') {
    res.end(getContent('index.html'));
  } else if (url === '/search') {
    res.end(getContent('search.html'));
  } else if (isJs) {
    res.end(getContent(url));
  } else if (isCss) {
    res.end(getContent(url));
  } else if (isImage) {
    res.end(getContent(url));
  } else {
    res.end('page not found');
  }
};

http.createServer(server).listen(4321, '127.0.0.1', () => {
  console.log('Server is running on http://127.0.0.1:4321');
});
