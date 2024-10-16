import { generateTokenAndSetCookie } from '../lib/utils/generateToken.js';
import User from '../models/users.models.js';
import bcrypt from 'bcrypt';
// import { generateTokenAndSetCookie } from '../lib/utils/generateToken.js';



export const signup = async (req, res) => {
  try{
    const {fullname,user,email,password}=req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ error: "User with this username already exists" });
    }
    
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
        return res.status(400).json({ error: "User with this email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({fullName,
        username,
        email,
        password: hashedPassword
    });

    if(newUser){
        generateTokenAndSetCookie(newUser._id,res);
        await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            email: newUser.email,
            bio: newUser.bio,
            profileImg: newUser.profileImg,
            coverImg: newUser.coverImg,
            followers: newUser.followers,
            following: newUser.following
        })
    } else {
        res.status(400).json({ error: "Failed to create new user" });
    }

  

  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {
    res.json({
        data: "You hit the login endpoint"
    });
};

export const logout = async (req, res) => {
    res.json({
        data: "You hit the logout endpoint"
    });
};