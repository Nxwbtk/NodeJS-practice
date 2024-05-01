import { createServer } from 'http';

let users = [
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
	res.setHeader('Content-Type', 'application/json');
	next();
}

const getUsers = (req, res) => {
	res.write(JSON.stringify(users));
	res.end();
}

const getUserById = (req, res) => {
	const id = req.url.split('/')[3];
	const user = users.find(item => item.id === parseInt(id));
	if (user) {
		res.write(JSON.stringify(user));
	} else {
		res.write(JSON.stringify({ message: 'User Not Found' }));
	}
	res.end();
}

const notFound = (req, res) => {
	res.writeHead(404, { 'Content-Type': 'text/json' });
	res.end(JSON.stringify({ message: 'Not Found' }));
}

const createUser = (req, res) => {
	let body = '';
	req.on('data', (chunk) => {
		body += chunk.toString();
	});
	req.on('end', () => {
		const user = JSON.parse(body);
		users.push(user);
		users.sort((a, b) => a.id - b.id);
		res.write(JSON.stringify(user));
		res.statusCode = 201;
		res.end();
	})
};

const deleteUser = (req, res) => {
	const id = req.url.split('/')[3];
	const user = users.find(item => item.id === parseInt(id));
	if (user) {
		users = users.filter(item => item.id !== parseInt(id));
		res.write(JSON.stringify({ message: 'User Deleted' }));
	} else {
		res.write(JSON.stringify({ message: 'User Not Found' }));
	}
	res.end();
};
//https://youtu.be/32M1al-Y6Ag?si=NWlInEc8CRmdqi3o&t=4404
const server = createServer((req, res) => {
	logger(req, res, () => {
		if (req.method === 'GET') {
			if (req.url === '/api/users') {
				console.log('GET /api/users 200');
				getUsers(req, res);
			} else if (req.url.match(/\api\/user\/([0-9]+)/)) {
				console.log(`GET /api/user/${req.url.split('/')[3]} 200`);
				getUserById(req, res);
			}else {
				console.log('GET 404');
				notFound(req, res);
			}
		} else if (req.method === 'POST') {
			if (req.url === '/api/create-users') {
				createUser(req, res);
			}
		} else if (req.method === 'DELETE') {
			if (req.url.match(/\api\/user\/([0-9]+)/)) {
				deleteUser(req, res);
			}
		}
	});
});

server.listen(process.env.PORT, () => {
	console.log('Server is running on http://localhost:8000');
})