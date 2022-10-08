var jwt = require('jsonwebtoken');
const JWT_SECRECT = "cviktlfndsfvk34r@&&djfvieo"

const fetchuser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ "error": "Please authanticate with valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRECT)
        req.user = data.user
        next()
    } catch (error) {
        res.status(401).send({ "error": "Please authanticate with valid token" })
    }
}
module.exports = fetchuser;