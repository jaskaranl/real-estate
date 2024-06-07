import jwt from "jsonwebtoken"

export const verifyToken = async (req, res, next) => {
    const token = req.cookies.token

    if (!token)
        return res.status(401).json({ message: "not authenticated" })

     jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
        if (err)
            return res.status(401).json({ message: "token not valid" })
        req.userId=payload.id
        next()
    })



}