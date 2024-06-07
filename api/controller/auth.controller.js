
import bcrypt from "bcrypt"
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const hashedpassword = await bcrypt.hash(password, 10)

        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedpassword,
            },
        })
        console.log(newUser)
        res
        .status(200)
        .json({ message: "user created successfully" })
    }
    catch (err) {
        console.log(err)
        res
            .status(500)
            .json({ message: "failed to create user" })
    }
}
export const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: {
                username
            }
        })

        if (!user)
            return res
                .status(401)
                .json({ message: "invalid crediential" })

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res
                .status(401)
                .json({ message: "invalid crediential" })
        }
        const age = 1000 * 60 * 60 * 7 * 24
        const {password:userPassword,...userInfo}=user
        const token = jwt
            .sign({ id: user.id,isAdmin:false,}, process.env.JWT_SECRET_KEY, { expiresIn: age })

        res
            .cookie("token", token, {
                httpOnly: true,
                maxAge: age,
            })
            .status(200)
            .json(userInfo)
    }
    catch (err) {
        console.log(err)
        res
            .status(500)
            .json({ message: "failed to login" })
    }

}
export const logout = (req, res) => {
    res.clearCookie("token").status(200).json({message:"logout successfully"})

}



