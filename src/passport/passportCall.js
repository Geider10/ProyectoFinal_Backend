import passport from "passport";
//revisa que el user este auth
export const passportCall = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, (err, user, info) => {//valida el token
      if (err) return next(err);
      if (!user)
        return res.status(401).json({
          error: info?.message || 'Unauthorized'
        });
      req.user = user;//guardar data del user
      next();
    })(req, res, next);
  };
};