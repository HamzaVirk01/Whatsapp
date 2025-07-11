const AsyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const bcrypt = require('bcrypt')

const registerUser = AsyncHandler(async (req, res) => {
    //Get the data from frontEnd
    const { f_name, l_name, email, password, dob, gender } = req.body;
    //Chck if user enter all the fields
    if (!f_name || !l_name || !email || !password || !dob || !gender) {
        res.status(400);
        throw new Error("Please enter all the respective fields");
    } 

    //Check if user is already present
    const isUserPresent = await User.findOne({email})
    //If user is present, throw an error
    if(isUserPresent){
        res.status(400)
        throw new Error("User alread exists")
    } else {
        //Generate salt/Gibberish values
        const salt = await bcrypt.genSalt(10)
        //hash the password
        const hashedPassword = await bcrypt.hash(password,salt)

        const createdUser = await User.create({
            f_name, l_name, email, password: hashedPassword, dob, gender
        });
        res.send(createdUser);
    }
});

const loginUser = AsyncHandler(async (req,res) => {
    //Get the data from the back-end
    const {email, password} = req.body
    if(!email || !password) {
        res.status(400)
        throw new Error("Please enter all the fields")
    }
    //Check if user exists
    const checkUser = await User.findOne({email})
    if(!checkUser){
        res.status(404)
        throw new Error("User does not exist")
    } else{
        if(await bcrypt.compare(password,checkUser.password)){
            res.send(checkUser)
        } else{
            res.status(401)
            throw new Error("Invalid Password")
        }
    }
    // res.send("User Logged-in")
})

module.exports = { registerUser, loginUser };
