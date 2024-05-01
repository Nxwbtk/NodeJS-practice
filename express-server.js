const express = require('express');
const { userData } = require('./data');
const { Pool } = require('pg')
const pool = new Pool({
	user: process.env.POSTGRES_USER,
	host: process.env.POSTGRES_HOST, // use the container's name as the hostname
	database: process.env.POSTGRES_DB,
	password: process.env.POSTGRES_PASSWORD,
	port: process.env.POSTGRES_PORT,
  });
const app = express()

const getUsers = (req, res) => {
	res.json(userData)
}

const getUserById = (req, res) => {
	const id = req.params.userId;
	const user = userData.find(item => item.id === parseInt(id));
	if (user) {
		res.json(user);
	} else {
		res.json({ message: 'User Not Found' });
	}
}

const postUser = (req, res) => {
	const user = req.body;
	const newUser = {
		id: userData.length + 1,
		...user
	}
	userData.push(newUser)
	res.json(newUser)
}

const deleteUser = (req, res) => {
	const id = req.params.userId;
	const user = userData.find(item => item.id === parseInt(id));
	if (user) {
		userData.splice(userData.indexOf(user), 1)
		res.json(user)
	} else {
		res.json({ message: 'User Not Found' })
	}
}

app.get('/', getUsers)
app.get('/:userId', getUserById)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.post('/user', postUser)
app.delete('/:userId', deleteUser)
app.get('/db/hello', async (req, res) => {
    pool.query('SELECT * from myuser', (error, results) => {
        if (error) {
			console.log('GET /db/hello 500')
            throw error
        }
		console.log('GET /db/hello 200')
        // Combine the database results and the message into a single response
        res.status(200).json({ message: 'Hello from the database!', data: results.rows })
    });
});

app.post('/db/user', async (req, res) => {
	const { name } = req.body;
	const allUsers = await pool.query('SELECT * from myuser');
	console.log(allUsers.rows.length);
	pool.query(`INSERT INTO myuser (id, name) VALUES (${allUsers.rows.length + 1}, '${name}')`, (error, results) => {
		if (error) {
			console.log('POST /db/user 500')
			throw error
		}
		console.log('POST /db/user 200')
		res.status(200).json({ message: 'User added to the database!' })
	})
})

app.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${process.env.PORT}`)
})
