import passport from 'passport';
import { ExtractJwt, Strategy as jwtStrategy } from 'passport-jwt'
import dotenv from 'dotenv';
dotenv.config()

//extrae el token desde el header
const strategyConfig = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY
};
//verifica si hay token 
const verifyToken = async(jwt_payload, done) => {
    if(!jwt_payload) return done(null, false, { message: 'User no autherization' }); 
    return done(null, jwt_payload);
};

passport.use('jwt', new jwtStrategy(strategyConfig, verifyToken));
