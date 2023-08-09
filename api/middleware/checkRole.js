const checkRole = (requiredRole) => {
    return (req, res, next) => {
      // Verificar si existe un usuario autenticado con un rol válido
      if (!req.user || !req.user.role) {
        
          return res.status(403).send("Access denied. User role not specified.");
        }
        
        // Verificar si el rol del usuario tiene permiso para acceder a la ruta
        if (req.user.role !== requiredRole) {
        return res.status(401).send("Acceso denegado. Solo para Usuarios autorizados.");
      }
  
      // Si el usuario tiene el rol necesario, continuar con la siguiente ruta o middleware
      return next();
    };
};

module.exports = checkRole;
