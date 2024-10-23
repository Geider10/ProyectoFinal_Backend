import {z} from 'zod';

// Al menos 1 letra MAY/MIN y 1 numero adminite simbolos, + @ + Al menos 1 letra MAY/MIN y 1 + minimo 2 caracteres
const regEmail = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')
const user = z.object({
    first_name : z.string(),
    last_name : z.string(),
    age : z.number().positive(),
    email : z.string().regex(regEmail),
    password : z.string().min(6),
    rol : z.enum(['user','admin'])
})

export const validateUser = (req,res,next) =>{
    try {
        const data = user.safeParse(req.body)
        if(data.error) return res.json({error : 'the data not match with schema'})
        next()
    } catch (error) {
        next(error)
    }
}