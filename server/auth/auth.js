const jwt = require('jsonwebtoken')

const middleware = (req, res, next) => {
    const authorization = req.headers['authorization']

    // console.log(authorization)
    if (!authorization) {
        res.status(401).json({ message: "Authorization token missing" })
        return
    }
    const token = authorization.split(' ')[1]
    try {
        const decoded = jwt.verify(token, 'RomnickPogi'); // 🔐 Secret should ideally be in .env
        req.user = decoded;
        next();
      } catch (error) {
        return res.status(403).json({ message: 'Invalid or expired token' });
      }
}

module.exports = { middleware }