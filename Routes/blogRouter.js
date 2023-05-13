
const express=require("express")
const { postBlog, getBlog, updateblog, deleteblog, updatelike } = require("../Controllers/blogController")

const blogRouter=express.Router()

blogRouter.post("/",postBlog)
blogRouter.get("/",getBlog)
blogRouter.patch("/:id",updateblog)
blogRouter.delete("/:id",deleteblog)
blogRouter.patch("/:id/like",updatelike)

module.exports={
    blogRouter
}