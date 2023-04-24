const mongoose = require('mongoose')
const connectDb = async () => {
    try {
        await mongoose.connect(process.env.mongo_url, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log("mongo db connected ....");
    } catch (error) {
        console.log("error mongo ", error)
    }
}
module.exports = connectDb