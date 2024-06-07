import jwt from "jsonwebtoken"

export const shouldBeLoggedIn=async(req,res)=>{
    
   console.log(req.userId)
   res.status(200).json({message:"authenticated"})

}
    export const shouldBeAdmin=async(req,res)=>{
        const token=req.cookies.token

    if(!token)
    return res.status(401).json({message:"not authenticated"})

    jwt.verify(token,process.env.JWT_SECRET_KEY,async(err,payload)=>{
        if(err)
        return res.status(401).json({message:"token not valid"})

        if(!payload.isAdmin)
        return res.status(401).json({message:"not authorised"})

        res.status(200).json({message:"auntenicated"})
      
        
    })

    }