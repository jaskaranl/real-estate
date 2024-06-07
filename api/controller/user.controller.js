import prisma from "../lib/prisma.js"
export const getUsers = async (req, res) => {
    console.log("works")
    try {

    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "failed to get users" })
    }
}

export const getUser = async (req, res) => {
    try {

    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "failed to get user" })
    }
}


export const updateUser = async (req, res) => {
    const id = req.params.id
    const tokenUserId = req.userId
    const body = req.body
    
    if (id !== tokenUserId)
        return res.status(403).json({ message: "not authorised!" })
    try {

        const updatedUser = await prisma.user.update({ where: { id }, data: body, })
        res.status(200).json(updatedUser)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "failed to update user" })
    }
}
export const deleteUser = async (req, res) => {
    try {

    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "failed to delete user" })
    }
}

export const savePost = async (req, res) => {
    const postId = req.body.postId
    const tokenUserId = req.userId

    try {
        const savedpost = await prisma.savedPost.findUnique({
            where: {
                userId_postId: {
                    userId: tokenUserId,
                    postId
                }
            }
        })

        if (savedpost) {
            await prisma.savedPost.delete({
                where: {
                    id: savedpost.id,
                }
            })
            res.status(200).json({ message: "Post deleted" });
        }
        else {
            await prisma.savedPost.create({
                data: {
                    userId: tokenUserId, 
                    postId
                }
            })
            res.status(200).json({ message: "Post saved" });
        }

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to save post" });
    }

}