const bcrypt = require("bcrypt")
const { UserModel } = require("../Model/userModel")
const jwt = require("jsonwebtoken")
require("dotenv").config()


const userSignup = (req, res) => {
    const { email, password, username, avatar } = req.body
    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            const newUser = await new UserModel({ email, password: hash, username, avatar })
            newUser.save()
            res.status(200).send({ "msg": "User has been registered" })
        })
    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
}

const userLogin = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await UserModel.findOne({ email })
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    res.status(200).send({ "msg": "Login Successfull", "token": jwt.sign({ "userID": user._id }, process.env.Secret), "username": user.username })
                } else {
                    res.status(400).send({ "msg": "Wrong Credential" })
                }
            })
        }
    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
}

const resetPassword = async (req, res) => {

    const payload = req.body
    console.log(payload)

    try {
        const user = await UserModel.findByIdAndUpdate(payload)

        res.status(200).send({ "msg": "User Password Reset" })
    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
}

module.exports = {
    userSignup,
    userLogin,
    resetPassword
}