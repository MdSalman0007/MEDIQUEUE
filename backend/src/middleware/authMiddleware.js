import jwt from "jsonwebtoken"

export const protect = (req , res , next) =>{
    let token
    // Check for token in header
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1] 
    }
    if(!token){
        return res.status(401).json({ message : "Not authorized, no token"})
    }
    try{
        const decoded = jwt.verify(token , process.env.JWT_SECRET)

        // Attach decoded data to request
        req.user = decoded
        next()
    } catch(error){
        return res.status(401).json({ message : "Not authorized, invalid token"})
    }

}