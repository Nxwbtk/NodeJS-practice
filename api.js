import { createServer } from 'http';

const users = [
	{
		id: 1,
		name: 'John Doe'
	},
	{
		id: 2,
		name: 'Jane Doe'
	},
	{
		id: 3,
		name: 'Jim Doe'
	}
];

const logger = (req, res, next) => {
	console.log(`${req.method} ${req.url}`)
	next();
}
//https://youtu.be/32M1al-Y6Ag?si=NWlInEc8CRmdqi3o&t=4404
const server = createServer((req, res) => {
	logger(req, res, () => {
		if (req.method === 'GET') {
			if (req.url === '/api/users') {
				console.log('GET /api/users 200');
				res.writeHead(200, { 'Content-Type': 'application/json' });
				res.end(JSON.stringify(users));
			} else if (req.url.match(/\api\/user\/([0-9]+)/)) {
				const id = req.url.split('/')[3];
				const user = users.find(item => item.id === parseInt(id));
				if (user) {
					console.log(`GET /api/user/${id} 200`);
					res.writeHead(200, { 'Content-Type': 'application/json' });
					res.end(JSON.stringify(user));
				} else {
					console.log(`GET /api/user/${id} 404`);
					res.writeHead(404, { 'Content-Type': 'application/json' });
					res.end(JSON.stringify({ message: 'User Not Found' }));
				}
			}else {
				console.log('GET 404');
				res.writeHead(404, { 'Content-Type': 'text/json' });
				res.end(JSON.stringify({ message: 'Not Found' }));
			}
		}
	});
});

server.listen(process.env.PORT, () => {
	console.log('Server is running on http://localhost:8000');
})