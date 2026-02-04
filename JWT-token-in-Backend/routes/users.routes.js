import express from 'express'
import Users from '../models/users.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await Users.findOne({$or: [{username}, {email}]});
        if(existingUser) return res.status(404).json({message: "Username or email already exists."});

        const hashedPassword = await bcrypt.hash(password, 11);
        const user = new Users({username, email, password: hashedPassword});
        const savedUser = await user.save();
        res.json(savedUser);  
    } catch (error) {
        res.status(500).json({message: error.message});
    }  
});

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await Users.findOne({username});
        if(!user) return res.status(404).json({message: "User not found"});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({message: "Invalid credentials"});

        const token = jwt.sign(
            { userId: user._id, username: user.username }, 
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        res.json({token});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

router.post("/logout", (req, res) => {
    res.json({message: "Logged out successfully."});
})

export default router;