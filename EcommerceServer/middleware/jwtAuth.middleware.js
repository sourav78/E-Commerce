import JWT from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    const token = req.cookies.jwttoken

    if(!token){
        return res.status(400).json({
            success: false,
            msg: 'User is not authorized'
        })
    }

    try {
        
        const payload = JWT.verify(token, process.env.JWT_SECRET)
        req.user = payload

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.messae
        })
    }

    next()
}