const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchuser = require('../middlewares/fetchuser')

// ROUTE 1: Sign up...
router.post("/signup", async (req, res)=>{
    try{
        // encrypting password...
        const salt = await bcrypt.genSalt(10)
        const password = await bcrypt.hash(req.body.password, salt)

        const user = new User({...req.body, "password": password})
        await user.save()

        // creating jwt token and sending response...
        const token = jwt.sign(user.id, process.env.JWT_SECRET)
        const success = true
        res.status(200).json({success, token})

    }catch(err){
        // if email is not unique...
        const success = false
        if (err.name === 'MongoServerError' && err.code === 11000){
            res.status(400).json({success, message: "email already exists"})
        }
        else{
            // other errors...
            const success = false
            res.status(500).json({success, message: "Server Error"})
            console.log(err)
        }
    }
})

// ROUTE 2: Log in...
router.post("/login", async(req, res) =>{
    try{
        let user = await User.findOne({email: req.body.email})
        if(!user){
            const success = false
            return res.status(400).json({success, message: "Wrong credentials"})
        }

        const isCorrect = await bcrypt.compare(req.body.password, user.password)
        if(!isCorrect){
            const success = false
            return res.status(400).json({success, message:"Wrong credentials"})
        }

        const token = jwt.sign(user.id, process.env.JWT_SECRET)
        const success = true
        res.status(200).json({success, token})

    }catch(err){
        const success = false
        res.status(400).json({success, message: "Server error"})
        console.error(err)
    }

})

// ROUTE 3: get user...
router.get("/getuser", fetchuser, async(req, res) =>{
    try{
        const user = await User.findById(req.id).select("-password")
        res.send(user)

    }catch(err){
        console.error(err)
        res.status(500).send("Server error")
    }

})


module.exports = router
