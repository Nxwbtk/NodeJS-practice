var http = require('http');

const server = http.createServer((req, res) => {
	res.end('Hello World!');
});

server.listen(8000, () => {
	console.log('Server is running on http://localhost:8000');
})