const mongoose = require("mongoose")



const blogSchema = mongoose.Schema({

    username: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    like: {
        type: Number,
        default: 0
    },
    comments: {
        type: [{ username: String, content: String }]
    }
}, {
    timestamps: true
}
)

const BlogModel = mongoose.model("blog", blogSchema)

module.exports = {
    BlogModel
}