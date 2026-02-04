import jwt from 'jsonwebtoken'

const auth = async (req, res, next) => {
    try {
        console.log(req.headers);
        const bearerHeader = req.headers['authorization'];
        console.log(bearerHeader);
        if (typeof bearerHeader != 'undefined') {
            const token = bearerHeader.split(" ")[1];
            const user = jwt.verify(token, process.env.JWT_SECRET);
            console.log(user);
            req.token = user;
            next();
        } else {
            res.status(401).json({ message: "No token Provided" });
        }
    } catch (error) {
        res.status(403).json({ message: "Invalid or Expire token" });
    }
}

export default auth;