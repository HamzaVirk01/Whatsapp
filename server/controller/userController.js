const AsyncHandler = require('express-async-handler')
const User = require('../models/userModel')

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
        const createdUser = await User.create({
            f_name, l_name, email, password, dob, gender
        });
        res.send(createdUser);
    }
    

});

module.exports = { registerUser };
