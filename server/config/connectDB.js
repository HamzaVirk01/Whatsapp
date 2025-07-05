const mongoose = require('mongoose')
const connect = async () => {
    await mongoose.connect(process.env.MONGO_URL)
    console.log(`Database is connected on host: ${mongoose.connection.host.cyan}`);
    
}

module.exports = connect