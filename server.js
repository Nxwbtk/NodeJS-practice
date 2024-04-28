var http = require('http');

const server = http.createServer((req, res) => {
	// res.setHeader('Content-Type', 'text/html');
	// res.statusCode = 200;
	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify({ message: 'Hello World' }));
});

server.listen(8000, () => {
	console.log('Server is running on http://localhost:8000');
})