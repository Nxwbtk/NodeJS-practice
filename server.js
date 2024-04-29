var url = require('url');
var path = require('path');
var http = require('http');


const _filename = url.fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

const server = http.createServer((req, res) => {
	if (req.method === 'GET') {
		if (req.url === '/') {
			res.writeHead(200, { 'Content-Type': 'text/html' });
			res.end('<h1>HomePage</h1>');
		} else if (req.url === '/about') {
			res.writeHead(200, { 'Content-Type': 'text/html' });
			res.end('<h1>AboutPage</h1>');
		} else {
			res.writeHead(404, { 'Content-Type': 'text/html' });
			res.end('<h1>404 Page Not Found</h1>');
		}
	} else if (req.method === 'POST') {
		if (req.url === '/api/user') {

		}
	}
});

server.listen(process.env.PORT, () => {
	console.log('Server is running on http://localhost:8000');
})