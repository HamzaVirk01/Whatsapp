const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    f_name: {
        type: String,
        required: [true, 'Please enter first name']
    },
    l_name:{
        type: String,
        required: [true, 'Please enter last name']
    },
    email:{
        type: String,
        required: [true, 'Please enter email']
    },
    password:{
        type: String,
        required: [true, 'Please enter password']
    },
    dob:{
        type: String,
        required: [true, 'Please enter DOB']
    },
    gender:{
        type: String,
        required: [true, 'Please enter gender']
    },
    image:{
        type: String,
        required: false,
        default: null
    },
    about:{
        type: String,
        required: false,
        default: "Hey there, I'm using whatsapp😊"
    },
    status:{
        type: Array,
        default: [],
        required: false
    },
    chatTheme:{
        type: String,
        required: false,
        default: 'https://github.com/hsuntariq/TalkTango/blob/main/client/src/assets/background.jpg?raw=true'
    },
    active:{
        type: Boolean,
        default: 0,
    }
},{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)