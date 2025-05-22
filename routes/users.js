import express from 'express';
import bcrypt from 'bcrypt'; // using bcrypt instead of bcryptjs
import jwt from 'jsonwebtoken';

const router = express.Router();
const users = [];

// Register Route
router.post('/register', async (req, res) => {
    try {
        console.log("Request body:", req.body);

        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        const existingUser = users.find(user => user.username === username);
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { id: Date.now().toString(), username, password: hashedPassword };
        users.push(newUser);

        console.log("New user registered:", newUser);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error("Error in /register:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = users.find(user => user.username === username);
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const token = jwt.sign({ userId: user.id, username: user.username }, 'secret-key', { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error("Error in /login:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
