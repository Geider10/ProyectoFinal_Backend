import passport from 'passport';
import { ExtractJwt, Strategy as jwtStrategy } from 'passport-jwt'
import {userModel} from '../models/user.model.js';
import 'dotenv/config';

const SECRET_KEY = process.env.SECRET_KEY;

const strategyConfig = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET_KEY
};

const verifyToken = async(jwt_payload, done) => {
    // req.user = jwt_payload
    if(!jwt_payload) return done(null, false, { messages: 'User not found' }); 
    return done(null, jwt_payload);
};

passport.use('jwt', new jwtStrategy(strategyConfig, verifyToken));

/* ------------------------------------ - ----------------------------------- */
passport.serializeUser((user, done)=>{
    try {
        done(null, user.userId);
    } catch (error) {
        return done(error);
    }
});

passport.deserializeUser(async(id, done)=>{
    try {
        const user = await userModel.findOne({_id : id})
        return done(null, user);
    } catch (error) {
        return done(error);
    }
});