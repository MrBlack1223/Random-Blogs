const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    author : {
        type: String,
        required: true
    },
    title : {
        type: String,
        required: true
    },
    text : {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('Blog',blogSchema);