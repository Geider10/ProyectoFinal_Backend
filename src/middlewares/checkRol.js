export const checkRol =(rol) => async (req,res,next)=>{
    try {
        const user = req.user
        if(user.rol !== rol) return res.status(403).json({error : `enpoint not available for ${user.rol}`})
        next()
    } catch (error) {
        next(error)
    }
}