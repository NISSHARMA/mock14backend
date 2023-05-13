const { BlogModel } = require("../Model/blogModel")


const postBlog = async (req, res) => {

    const payload = req.body
    try {
        const newBlog = await BlogModel(payload)
        newBlog.save()
        res.status(200).send({ "msg": "new blog created" })
    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
}

const getBlog = async (req, res) => {
    let query = {}
    if (req.query.title) {
        query.title = req.query.title
    }
    if (req.query.category) {
        query.category = req.query.category
    }
    if (req.query.page) {
        try {
            const movies = await BlogModel.find(query).skip((req.query.page - 1) * 2).limit(req.query.limit || 5);
            res.status(200).send(movies)
        } catch (error) {
            res.status(400).send(error.message)
        }
    } else {
        try {

            const blog = await BlogModel.find(query)
            res.status(200).send(blog)

        } catch (error) {
            res.status(400).send({ "msg": error.message })
        }

    }

}

const updateblog = async (req, res) => {

    const { id } = req.params
    const payload = req.body
    try {
        const blog = await BlogModel.findByIdAndUpdate({ _id: id }, payload)
        res.status(200).send({ "msg": "Blog has been updated" })

    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
}

const deleteblog = async (req, res) => {
    try {
        const { id } = req.params
        const blog = await BlogModel.findByIdAndDelete({ _id: id })
        res.status(200).send({ "msg": "Blog has been deleted" })
    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
}


const updatelike = async (req, res) => {
    const { id } = req.params
    try {
        const blog = await BlogModel.find({ _id: id })
        const payload = blog.like + 1
        const blog1 = await BlogModel.findByIdAndUpdate({ _id: id, "like": payload })
        res.status(200).send({ "msg": "like has been updated" })

    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
}



module.exports = {
    postBlog,
    getBlog,
    updateblog,
    deleteblog,
    updatelike
}