import passport from "passport";

// Función personalizada para manejar la autenticación
export const passportCall = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, (err, user, info) => {
      if (err) return next(err); // Manejo de errores
      if (!user) return res.status(401).json({ error: info?.message || 'User unauthorized '});
      req.user = user;// Asignar el usuario al request
      next();
    })(req, res, next);
  };
};