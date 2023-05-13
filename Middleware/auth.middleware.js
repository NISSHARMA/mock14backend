const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
    const token = req.headers.authorization
    if (token) {
        const decoded = jwt.verify(token, "Mock14")
        if (decoded) {

            const body1 = req.body
            body1.userID = decoded.userID
            req.body = body1
            next()
        } else {
            res.status(400).send("Please login first")
        }
    } else {
        res.status(400).send("Please login first")
    }
}


module.exports = {
    auth
}