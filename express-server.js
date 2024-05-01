const express = require('express');
const { userData } = require('./data');

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

app.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${process.env.PORT}`)
})
