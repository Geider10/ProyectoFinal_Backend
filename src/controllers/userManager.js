export class UserManager {
    getProfileUser(req,res){
        const user = req.user
        res.json({success:user})
    }
}