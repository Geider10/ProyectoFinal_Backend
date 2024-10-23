export const checkUser = (req,res,next) =>{
    try {
        const user = req.user 
        if(user.rol !== 'user') return res.status(403).json({error: `endpoint disponible para user, tu eres : ${user.rol}`})
        next()
    } catch (error) {
        next(error)
    }
}