

const express = require("express")
const { resetPassword ,userSignup, userLogin} = require("../Controllers/userController")

const userRoute = express.Router()

userRoute.post("/register", userSignup)
userRoute.post("/login", userLogin)
userRoute.patch("/:id/reset",resetPassword)

module.exports = {
    userRoute
}