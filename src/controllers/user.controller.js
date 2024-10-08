export class UserController {
    getProfileUser(req,res){
        const user = req.user
        //req.user.id obtenemos y retornamos el user de la base de datos
        res.json({success:'access to protected route', user : user})
    }
}