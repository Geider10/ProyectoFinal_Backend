export const checkAdmin = (req,res,next)=>{
    try {
        const user = req.user 
        if(user.rol !== 'admin') return res.status(403).json({error : `endpoint disponible para admin, tu eres : ${user.rol}`})
        next()
    } catch (error) {
        next(error)
    }
}