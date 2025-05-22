import express from 'express';
const router = express.Router();
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const users = [];


router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = users.find(user => user.username === username);
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }


        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { id: Date.now().toString(), username, password: hashedPassword };
        users.push(newUser);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
} );


router.post('/login', async (req, res) => {
    try{
        const { username, password } = req.body;
        const user = users.find(user => user.username === username); 
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        const token = jwt.sign({ userId: user.id }, 'secret-key');
        res.status(200).json({ token });

    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


export default router;